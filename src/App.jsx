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
      currentUser: { name: "" }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      userCount: 0
    };
    this.socket = new WebSocket("ws://localhost:3001");
  }

  addMsg = (newContent) => {
    const newMsg = {
      username: this.state.currentUser.name,
      content: newContent,
      type: "postMessage"
    };
    this.socket.send(JSON.stringify(newMsg));
  }

  addUser = (newUser) => {

    const currentUser = newUser ? { name: newUser } : { name: "Anonymous" };
    const notification = {
      content: `${this.state.currentUser.name} has changed their name to ${newUser}.`,
      type: "postNotification"
    }
    this.socket.send(JSON.stringify(notification));
    this.setState({ currentUser: currentUser });
  }

  displayUserCount = (num) => {
    const userCount = JSON.parse(num);
    this.setState({userCount: userCount});
  }

  displayMsg = (data) => {
    const oldMsg = this.state.messages;
    const newMsg = JSON.parse(data);
    const messages = [...oldMsg, newMsg];
    this.setState({ messages: messages });
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

  render() {
    return (
      <div>
        <Navbar count={this.state.userCount}/>
        <MessageList message={this.state.messages} />
        <CharBar currentUser={this.state.currentUser} addMsg={this.addMsg} addUser={this.addUser} />
      </div>
    );
  }
}
export default App;
