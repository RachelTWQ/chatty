import React, {Component} from 'react';
import CharBar from './CharBar.jsx';
import MessageList from './MessageList.jsx';

function Navbar () {
  return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
    </nav>
  )
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
          id: 1
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
          id: 2
        }
      ]
    };
  }

  addMsg = (newContent) => {
    const oldMsg = this.state.messages;
    const newMsg = {
      id: this.state.messages.length + 1,
      username: this.state.currentUser.name, 
      content: newContent
    };
    const messages = [...oldMsg, newMsg];
    this.setState({messages: messages});
  }

  addUser = (newUser) => {
    const currentUser = newUser ? {name: newUser} : {name: "Anonymous"};
    this.setState({currentUser: currentUser});
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    const webSocket = new WebSocket( "ws://localhost:3001" );
    webSocket.onopen = (e) => {
      console.log("Connected to server");
      // webSocket.send("")
    }
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }

  render() {
    return (
      <div>
        <Navbar/>
        <MessageList message={this.state.messages}/>
        <CharBar currentUser={this.state.currentUser} addMsg={this.addMsg} addUser={this.addUser}/>
      </div>
    );
  }
}
export default App;
