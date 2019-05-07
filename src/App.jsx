import React, {Component} from 'react';

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
    )
  }
}

class MainMessage extends Component {
  render() {
    const messageArr = this.props.message;
    const displayMsg = messageArr.map(item => {
      const sortMsg = item.type === "incomingMessage" ? 
      (<div className="message">
        <span className="message-username">{item.username}</span>
        <span className="message-content">{item.content}</span>
      </div>) :
      (<div className="message system">{item.content}</div>);
      return sortMsg;
    })
    return (
      <main className="messages">
        {displayMsg}
      </main>
    )
    // return (
    //   <main className="messages">
    //     <div className="message">
    //       <span className="message-username">Anonymous1</span>
    //       <span className="message-content">I won't be impressed with technology until I can download food.</span>
    //     </div>
    //     <div className="message system">
    //       Anonymous1 changed their name to nomnom.
    //     </div>
    //   </main>
    // )
  }
}

class Footer extends Component {
  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        {
          type: "incomingMessage",
          content: "I won't be impressed with technology until I can download food.",
          username: "Anonymous1"
        },
        {
          type: "incomingNotification",
          content: "Anonymous1 changed their name to nomnom",
        },
        {
          type: "incomingMessage",
          content: "I wouldn't want to download Kraft Dinner. I'd be scared of cheese packet loss.",
          username: "Anonymous2"
        },
        {
          type: "incomingMessage",
          content: "...",
          username: "nomnom"
        },
        {
          type: "incomingMessage",
          content: "I'd love to download a fried egg, but I'm afraid encryption would scramble it",
          username: "Anonymous2"
        },
        {
          type: "incomingMessage",
          content: "This isn't funny. You're not funny",
          username: "nomnom"
        },
        {
          type: "incomingNotification",
          content: "Anonymous2 changed their name to NotFunny",
        },
      ]
    }
  }
  render() {
    return (
      <div>
        <Navbar/>
        <MainMessage message={this.state.messages}/>
        <Footer/>
      </div>
    );
  }
}
export default App;
