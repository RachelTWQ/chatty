import React, { Component } from 'react';

class CharBar extends Component {
  
  _handleSubmit = (e) => {
    if(e.key === "Enter" && e.shiftKey === false) {
      e.preventDefault();
      const newContent = e.target.value;
      this.props.sendMsg(newContent);
      e.target.value = "";
    }
  }
  
  // _onChange = (e) => {
  //   const newUser = e.target.value;
  //   this.props.addUser(newUser);
  // }

  _handleChange = (e) => {

    if(e.key === "Enter" && e.shiftKey === false) {

      e.preventDefault();
      const newUser = e.target.value;
      this.props.sendUser(newUser);
    }
  }
 
  render() {
    return (
      <footer className="chatbar" >
        <input
          className="chatbar-username"
          placeholder="Your Name (Optional)"
          defaultValue={this.props.currentUser.name}
          type="text"
          onKeyDown={this._handleChange}
        />

        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          type="text"
          onKeyDown={this._handleSubmit}
        />
      </footer>
    )
  }
}

export default CharBar;