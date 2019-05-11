import React, { Component } from 'react';
import CharBar from './CharBar.jsx';
import MessageList from './MessageList.jsx';

function Navbar({ count }) {
  // Switch user icon from single user to multiple users
  const displayUsers = count <= 1 ? (<p>{count} <i className="fas fa-user"></i> online</p>) : (<p>{count} <i className="fas fa-users"></i> online</p>)
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
    // Set random color for each client upon connection
    const color = ["#32CD32", "#0F42C1", "#FF336E", "#000000"];
    let index = Math.floor(4 * Math.random());
    console.log(color, index)

    this.state = {
      currentUser: { name: "Anonymous" },
      messages: [],
      userCount: 0,
      color: color[index]
    };
    this.socket = new WebSocket("ws://localhost:3001");
  }
  // Helper function to send message to websocket server
  sendMsg = (newContent) => {
    const newMsg = {
      username: this.state.currentUser.name,
      content: newContent,
      type: "postMessage",
      color: this.state.color
    };
    this.socket.send(JSON.stringify(newMsg));
  }
  // Helper function to send notification to websocket server
  sendUser = (usernameEntry) => {
    let currentUser;
    let notification;
    if (usernameEntry) {
      currentUser = { name: usernameEntry };
      notification = {
        content: `${this.state.currentUser.name} has changed their name to ${usernameEntry}.`,
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
  // Helper function to handle count of all connected users from websocket server
  displayUserCount = (num) => {
    const userCount = JSON.parse(num);
    this.setState({ userCount: userCount });
  }
  // Helper function to handle message and notification from websocket server
  displayContent = (data) => {
    const oldMsg = this.state.messages;
    const newMsg = JSON.parse(data);
    const messages = [...oldMsg, newMsg];
    this.setState({ messages: messages });
  }

  componentDidMount() {
    console.log("componentDidMount <App />");

    this.socket.onmessage = (event) => {
      if (typeof (JSON.parse(event.data)) === "number") {
        this.displayUserCount(event.data);
      } else {
        this.displayContent(event.data);
      }
    }
  }

  render() {
    return (
      <div>
        <Navbar count={this.state.userCount} />
        <MessageList message={this.state.messages} />
        <CharBar currentUser={this.state.currentUser} sendMsg={this.sendMsg} sendUser={this.sendUser} />
      </div>
    );
  }
}
export default App;
