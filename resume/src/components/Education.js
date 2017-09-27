import React, { Component } from 'react';
import Heading from './Heading';
import Row from './Row';
import './Education.css';

class Education extends Component {
  render() {
    return (
      <section className="education">
        <Heading type="h2" title="Education" />
        <Row 
          title="Certificate IV in Graphic Design" 
          label="Shillington College" 
          start="2013" 
        />
        <Row 
          title="Bachelor of Engineering<span class='divider'> </span>& Bachelor of Science" 
          label="University of New South Wales" 
          start="2012" 
          list={[
            "Honours Class I", 
            "Scientia Scholarship", 
            "Majored in Mathematics & Photovoltaics"
          ]} 
        />
      </section>
    );
  }
}

export default Education;