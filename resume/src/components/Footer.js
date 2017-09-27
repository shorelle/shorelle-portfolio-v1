import React, { Component } from 'react';
import Waypoint from 'react-waypoint';
import BorderLeft from '../assets/border-left.svg';
import BorderRight from '../assets/border-right.svg';
import './Footer.css';

class Footer extends Component {
  constructor(props){
    super(props);
    this.state = { toggle: '' }
  }

  handleEnter() {
    this.setState({ toggle: 'animate ' });
  }

  handleLeave() {
    this.setState({ toggle: '' });
  }

  render() {
    return (
      <footer>
        <div className="content">
          <Waypoint onEnter={this.handleEnter.bind(this)} onLeave={this.handleLeave.bind(this)} />
          <BorderLeft className={this.state.toggle + "border-left"} />
          <h2><span>Thank you for reading!</span></h2>
          <p>Please let me know if you have any questions, or would like to get in touch!</p>
          <p><a href="mailto:desiree@shorelle.net"><span>desiree@shorelle.net</span></a></p>
          <BorderRight className={this.state.toggle + "border-right"} />
        </div>
      </footer>
    );
  }
}

export default Footer;