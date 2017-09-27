import React, { Component } from 'react';
import Heading from './Heading';
import './Personal.css';

class Personal extends Component {
  render() {
    return (
      <section className="personal">
        <Heading type="h2" title="Side gigs" />
        <div className="content">
          <p>In my spare time, I also enjoy:</p>
          <ul>
            <li>illustration</li>
            <li>film photography</li>
            <li>board games</li>
            <li>lightsaber training!</li>
          </ul>
        </div>
      </section>
    );
  }
}

export default Personal;