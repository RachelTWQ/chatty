import React, { Component } from 'react';

class CharBar extends Component {

  handleMessageChange = (event) => {
    if (event.key === "Enter") {
      const newContent = event.target.value;
      this.props.sendMsg(newContent);
      event.target.value = "";
    }
  }

  handleNameChange = (event) => {
    if (event.key === "Enter") {
      const usernameEntry = event.target.value;
      this.props.sendUser(usernameEntry);
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
          onKeyDown={this.handleNameChange}
        />

        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          type="text"
          onKeyDown={this.handleMessageChange}
        />
      </footer>
    )
  }
}

export default CharBar;