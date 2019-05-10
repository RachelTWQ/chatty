import React, { Component } from 'react';
import CharBar from './CharBar.jsx';
import MessageList from './MessageList.jsx';

function Navbar({ count }) {
  const displayUsers = count === 1 ? (<p>{ count } <i className="fas fa-user"></i> online</p>) : (<p>{ count } <i className="fas fa-users"></i> online</p>)
  return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty <i className="fas fa-comment-dots"></i></a>
      {displayUsers}
    </nav>
  )
}

class App extends Component {
  constructor(props) {
    super(props);

    const color = ["#32CD32", "#0F42C1", "#FF336E", "#000000"];
    let index = Math.floor(4 * Math.random());
    console.log(color, index)

    this.state = {
      currentUser: { name: "Anonymous" }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      userCount: 0,
      color: color[index]
    };
    this.socket = new WebSocket("ws://localhost:3001");
  }

  sendMsg = (newContent) => {
    const newMsg = {
      username: this.state.currentUser.name,
      content: newContent,
      type: "postMessage",
      color: this.state.color
    };
    this.socket.send(JSON.stringify(newMsg));
  }

  sendUser = (newUser) => {
    let currentUser;
    let notification;
    if (newUser){
      currentUser = { name: newUser };
      notification = {
        content: `${this.state.currentUser.name} has changed their name to ${newUser}.`,
        type: "postNotification"
      }
    } else {
    currentUser = { name: "Anonymous" };
    notification = {
      content: `${this.state.currentUser.name} has changed their name to Anonymous.`,
      type: "postNotification"
    }
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

    this.socket.onmessage = (e) => {
      console.log("close msg", e);
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
        <MessageList message={this.state.messages}/>
        <CharBar currentUser={this.state.currentUser} sendMsg={this.sendMsg} sendUser={this.sendUser} />
      </div>
    );
  }
}
export default App;
