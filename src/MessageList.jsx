import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  
    render() {
      const messagesArr = this.props.message;
      
      return (
        <main className="messages"  >
            {messagesArr.map((item) => (<Message key={item.id} username={item.username} content={item.content}/>))}
        </main>
      )
    }
  }

  export default MessageList;