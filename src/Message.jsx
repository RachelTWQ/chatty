import React, {Component} from 'react';

class Message extends Component {
    render() {
      const layout = this.props.type === "incomingMessage" ? 
      (<div className="message">
        <span className="message-username" style={{color: this.props.color}}>{this.props.username}</span>
        <span className="message-content">{this.props.content}</span>
      </div>) :
      (<div className="message system">{this.props.content}</div>)
      return layout;
    }
  }

  export default Message;