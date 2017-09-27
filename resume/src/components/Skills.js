import React, { Component } from 'react';
import Heading from './Heading';
import './Skills.css';

class Skills extends Component {
  render() {
    return (
      <section className="skills">
        <Heading type="h2" title="Skills" />
        <div className="sets">
          <div className="set development">
            <h3>Web Development</h3>
            <ul>
              <li>HTML5</li>
              <li>CSS3
                <ul>
                  <li>SASS/LESS/PostCSS</li>
                </ul>
              </li>
              <li>PHP
                <ul>
                  <li>Wordpress, Drupal</li>
                </ul>
              </li>
              <li>MySQL/NoSQL</li>
              <li>Python</li>
            </ul>
            <ul>
              <li>Javascript
                <ul>
                  <li>ES5/ES6</li>
                  <li>Node</li>
                  <li>React, Angular, Vue.js</li>
                  <li>Canvas, d3.js</li>
                  <li>jQuery</li>
                  <li>Grunt/Gulp/Webpack</li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="set design">
            <h3>Design</h3>
            <ul>
              <li>Photoshop</li>
              <li>Illustrator</li>
              <li>InDesign</li>
              <li>Figma</li>
              <li>Sketch</li>
            </ul>
          </div>
        </div>
      </section>
    );
  }
}

export default Skills;