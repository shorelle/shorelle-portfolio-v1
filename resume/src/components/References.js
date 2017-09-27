import React, { Component } from 'react';
import Hand from '../assets/hand.svg';
import './References.css';

class References extends Component {
  render() {
    return (
    	<section className="references">
	    	<div className="content">
	    		<p><Hand /> <span>References available on request.</span></p>
	    	</div>
    	</section>
    );
  }
}

export default References;