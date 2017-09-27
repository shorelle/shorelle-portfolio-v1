import React, { Component } from 'react';
import Waypoint from 'react-waypoint';
import './Heading.css';

class Heading extends Component {
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
			<div className={this.state.toggle + "heading"}>
				<Waypoint onEnter={this.handleEnter.bind(this)} onLeave={this.handleLeave.bind(this)} />
				{this.props.type === 'h1' && <h1><span>{this.props.title}</span></h1>}
				{this.props.type === 'h2' && <h2><span>{this.props.title}</span></h2>}
			</div>
		);
	}
}

export default Heading;