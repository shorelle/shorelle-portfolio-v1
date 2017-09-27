import React, { Component } from 'react';
import Heading from './Heading';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <header>
        <div className="label">Resume</div>
        <Heading type="h1" title="Desiree Surjadi" />
        <p className="intro">I am a web developer and designer with <span className="highlight">4+ years of experience</span>.<span className="divider"> </span>I'm passionate about integrating frontend web technologies and design to create innovative, accessible applications that communicate ideas and engage with people. Coming from a multidisciplinary background, I’m always looking to learn more and get better at making cool things!</p>
      </header>
    );
  }
}

export default Header;