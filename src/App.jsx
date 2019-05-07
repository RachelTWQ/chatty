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
    }
  }
  
  render() {
    return (
      <div>
        <Navbar/>
        <MessageList message={this.state.messages}/>
        <CharBar currentUser={this.state.currentUser}/>
      </div>
    );
  }
}
export default App;
