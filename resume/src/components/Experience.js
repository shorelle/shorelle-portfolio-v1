import React, { Component } from 'react';
import Heading from './Heading';
import Row from './Row';
import './Experience.css';

class Experience extends Component {
  render() {
    return (
      <section className="experience">
        <Heading type="h2" title="Experience" />
        <Row 
          title="Web Developer &<span class='divider'> </span>Digital Designer" 
          label="Agency Strategic Creative" 
          start="2013" 
          end="now" 
          list={[
            "Developed a wide variety of digital projects for clients, from large-scale international websites to rapid-response microsites and web applications. Utilised best practice HTML/CSS/PHP/Javascript frameworks while meeting strict budgets and deadlines.",
            "Experience integrating with backend PHP/Node servers and web APIs.",
            "Responsible for cross-browser and cross-device testing to ensure responsive and performant results on desktop, tablet and mobile devices.",
            "Designed user interfaces for a range of client briefs using Photoshop, Illustrator and Sketch.",
            "Implemented designs using front-end technologies (Javascript, CSS, SVG, Canvas) to create detailed and interactive UI.",
            "Collaborated with team members using Git, InVision and other tools, with clear and comprehensive documentation.",
            "Mentored junior developers and interns.",
            "Developed digital strategies for large-scale projects, across the project lifecycle from initial wireframes through to development, testing and deployment."
            ]} 
        />
        <Row 
          title="Sustainable Energy Engineer" 
          label="Autonomous Energy" 
          start="2011" 
          end="2013" 
          list={[
            "Designed and implemented photovoltaic systems and energy efficiency projects for schools, organisations and commercial buildings.",
            "Led out development of new digital tools to improve energy management for clients and internal operations.",
            "Communicated technical information clearly and professionally to a wide range of clients."
          ]} 
        />
        <Row 
          title="Freelance Developer & Graphic Designer" 
          label="Various" 
          start="2010" 
          end="2017" 
          list={[
            "Developed and managed websites for small businesses and individuals on Wordpress and Drupal, including ecommerce customisations.",
            "Designed and developed custom Wordpress themes and plugins.",
            "Designed and illustrated for print media including logos, programmes and posters for a range of organisations, from sporting clubs to theatre and sustainability events."
          ]} 
        />
      </section>
    );
  }
}

export default Experience;