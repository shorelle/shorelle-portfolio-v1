/* 
 * Module - Theme
 * ========================================================================== */

import Scroll from './scroll'

const Theme = {

  /**
   * Initialise theme scripts
   */
  init: function() {
    // Check for HTML5 browser
    if (!document.querySelector || !window.addEventListener) return;
    this.smoothScroll();
  },

  /**
   * Smooth scroll anchor tags
   */
  smoothScroll: function() {
    let links = document.getElementsByTagName('a');
    for (let i = 0; i < links.length; ++i) {
      // Get anchor links
      if (links[i].href && links[i].href.indexOf('#') !== -1) {
        links[i].addEventListener('click', function() {
          let target = this.hash.substr(1);

          Scroll.smooth(
            document.getElementById(target),
            500,
            'easeInOutCubic');
        }, false);
      }
    }
  }
}

export default Theme