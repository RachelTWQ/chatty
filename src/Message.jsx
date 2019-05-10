import React, {Component} from 'react';

class Message extends Component {
    render() {
    //     const sortMsg = this.props.type === "incomingMessage" ? 
    //   (<div className="message">
    //     <span className="message-username">{item.username}</span>
    //     <span className="message-content">{item.content}</span>
    //   </div>) :
    //   (<div className="message system">{item.content}</div>);
    console.log(this.props)
      const layout = this.props.type === "incomingMessage" ? 
      (<div className="message">
        <span className="message-username" style={{color: this.props.color}}>{this.props.username}</span>
        <span className="message-content">{this.props.content}</span>
      </div>) :
      (<div className="message system">{this.props.content}</div>)
    
      return layout;
        // return (
        //     <div className="message">
        //         <span className="message-username">{this.props.username}</span>
        //         <span className="message-content">{this.props.content}</span>
        //     </div>)
    }
  }

  export default Message;