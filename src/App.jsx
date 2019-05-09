import React, { Component } from 'react';
import CharBar from './CharBar.jsx';
import MessageList from './MessageList.jsx';

function Navbar({ count }) {
  return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
      <p>{ count } user(s) online</p>
    </nav>
  )
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: 'Anonymous',
      messages: [],
      userCount: 0
    };
    this.socket = new WebSocket("ws://localhost:3001");
  }

  displayUserCount = (num) => {
    const userCount = JSON.parse(num);
    this.setState({userCount: userCount});
  }

  displayMsg = (data) => {
    const oldMsg = this.state.messages;
    const newData = JSON.parse(data);
    const messages = [...oldMsg, newData];
    this.setState({ messages: messages, user: newData.username });
  }

  componentDidMount() {
    console.log("componentDidMount <App />");

    this.socket.onopen = (e) => {
      console.log("Connected to server");
    }

    this.socket.onmessage = (e) => {
      if (typeof(JSON.parse(e.data)) === "number"){
        this.displayUserCount(e.data);
      } else {
        this.displayMsg(e.data);
        
      }
    }

    // setTimeout(() => {
    //   console.log("Simulating incoming message");
    //   // Add a new message to the list of messages in the data store
    //   const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    //   const messages = this.state.messages.concat(newMessage)
    //   // Update the state of the app component.
    //   // Calling setState will trigger a call to render() in App and all child components.
    //   this.setState({messages: messages})
    // }, 3000);
  }

  // addMsg = (newContent) => {
  //   const newMsg = {
  //     username: this.state.currentUser.name,
  //     content: newContent,
  //     type: "postMessage"
  //   };
  //   this.socket.send(JSON.stringify(newMsg));
  // }

  // addUser = (newUser) => {
  //   const currentUser = newUser ? { name: newUser } : { name: "Anonymous" };
  //   this.setState({currentUser: currentUser});
  //   const notification = {
  //     content: `${this.state.previousUser.name} has changed their name to ${this.state.currentUser.name}.`,
  //     type: "postNotification"
  //   }
  //   this.socket.send(JSON.stringify(notification));
  //   this.setState({previousUser: currentUser});
  // }

  handleEnter = (name, message) => {
    console.log('name: ', name, 'message: ', message);
    let notification = null;
    let messageToSend = null;

    if (name != this.state.user) {
      console.log('username changed')
      if (name === '' && this.state.user !== 'Anonymous') {
        this.setState({ user: 'Anonymous' })
        notification = {
          content: `${this.state.user} has changed their name to Anonymous.`,
          type: "postNotification"
        }
        console.log('state name updated', this.state.user)
      } else if(name !== '' && name !== this.state.user) {
        notification = {
          content: `${this.state.user} has changed their name to ${name}.`,
          type: "postNotification"
        }
        this.setState({ user: name })
        console.log('state name updated', this.state.user)
      } else {
        console.log('blah')
      }

      if (notification) { this.socket.send(JSON.stringify(notification)) }
    }

    if(message !== '') {
      console.log('message not empty, username is: ', this.state.user)
      messageToSend = {
        username: (name === '') ? 'Anonymous' : this.state.user,
        content: message,
        type: "postMessage"
      }

      if (messageToSend) { this.socket.send(JSON.stringify(messageToSend)) }
    }


    console.log('messages:');
    console.log(this.state.messages)
  }

  render() {
    return (
      <div>
        <Navbar count={this.state.userCount}/>
        <MessageList message={this.state.messages} />
        <CharBar currentUser={this.state.currentUser} onEnterPressed={this.handleEnter} />
      </div>
    );
  }
}
export default App;
