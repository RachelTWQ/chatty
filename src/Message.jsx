import React, {Component} from 'react';

class Message extends Component {
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
        return (<div>{displayMsg}</div>)
    }
  }

  export default Message;