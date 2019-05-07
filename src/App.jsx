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

// class MainMessage extends Component {
//   render() {
//     const messageArr = this.props.message;
//     const displayMsg = messageArr.map(item => {
//       const sortMsg = item.type === "incomingMessage" ? 
//       (<div className="message">
//         <span className="message-username">{item.username}</span>
//         <span className="message-content">{item.content}</span>
//       </div>) :
//       (<div className="message system">{item.content}</div>);
//       return sortMsg;
//     })
//     return (
//       <main className="messages">
//         {displayMsg}
//       </main>
//     )
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
//   }
// }

class App extends Component {
  
  render() {
    return (
      <div>
        <Navbar/>
        <MessageList/>
        <CharBar/>
      </div>
    );
  }
}
export default App;
