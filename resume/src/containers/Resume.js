import React, { Component } from 'react';
import Header from '../components/Header';
import Experience from '../components/Experience';
import Education from '../components/Education';
import Skills from '../components/Skills';
import Personal from '../components/Personal';
import References from '../components/References';
import Footer from '../components/Footer';
import Swirl from '../assets/swirl.svg';
import '../index.css';
import './Resume.css';

class Resume extends Component {
  render() {
    return (
      <div className="resume">
        <object>
          <Swirl className="animate swirl" />
        </object>
        <div className="page">
          <Header />
          <Experience />
          <Education />
          <Skills />
          <Personal />
          <References />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Resume;
