import React, { Component } from 'react';

class CharBar extends Component {
  
  _handleKeyDown = (e) => {
    if(e.key === "Enter" && e.shiftKey === false) {
      e.preventDefault();
      const newContent = e.target.value;
      this.props.addMsg(newContent);
      e.target.value = "";
    }
  }
  
  _onChange = (e) => {
    const newUser = e.target.value;
    this.props.addUser(newUser);
  }
 
  render() {
    return (
      <footer className="chatbar" >
        <input
          className="chatbar-username"
          placeholder="Your Name (Optional)"
          defaultValue={this.props.currentUser ? this.props.currentUser.name : "Anonymous"}
          type="text"
          onChange={this._onChange}
        />

        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          type="text"
          onKeyDown={this._handleKeyDown}
        />
      </footer>
    )
  }
}

export default CharBar;