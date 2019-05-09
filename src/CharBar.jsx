import React, { Component } from 'react';

class CharBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      message: ''
    }
    
    this.onNameChange = this.onNameChange.bind(this)
    this.onMessageChange = this.onMessageChange.bind(this)
  }
  
  onNameChange = (event) => {
    this.setState({ name: event.target.value })
  }
  
  onMessageChange = (event) => {
    this.setState({ message: event.target.value })
  }
  
  onEnterPressed = (event) => {
    if(event.keyCode === 13) {
      console.log('enter confirmed')
      this.props.onEnterPressed(this.state.name, this.state.message)
    }
  }
  
  render() {
    return (
      <footer className="chatbar" >
        <input
          className="chatbar-username"
          placeholder="Your Name (Optional)"
          type="text"
          onChange={this.onNameChange}
          onKeyUp={this.onEnterPressed}
        />

        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          type="text"
          onChange={this.onMessageChange}
          onKeyUp={this.onEnterPressed}
        />
      </footer>
    )
  }
}

export default CharBar;