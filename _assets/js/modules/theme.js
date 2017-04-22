/* 
 * Module - Theme
 * ========================================================================== */

import Util from './util';
import Scroll from './scroll'

const Theme = {

  /**
   * Initialise theme scripts
   */
  init: function() {

    // Check for HTML5 browser
    if (!document.querySelector || !window.addEventListener) return;

    this.cardHover();
    this.smoothScroll();

  },

  /**
   * Hover effect on card
   */
  cardHover: function() {

    let links = document.getElementsByClassName('card-link');

    for (let link of links) {
      for (let card of Util.getParents(link, '.card')) {
        let h2List = card.getElementsByTagName('h2'),
          imgList = card.getElementsByTagName('img');

        // Add active classes on mouseover
        link.addEventListener('mouseover', function() {
          for (let h2 of h2List) {
            for (let a of h2.getElementsByTagName('a')) {
              a.classList.add('active');
            }
          }
          for (let img of imgList) {
            img.classList.add('active');
          }
        }, false);

        // Remove active classes on mouseout
        link.addEventListener('mouseout', function() {
          for (let h2 of h2List) {
            for (let a of h2.getElementsByTagName('a')) {
              a.classList.remove('active');
            }
          }
          for (let img of imgList) {
            img.classList.remove('active');
          }
        }, false);
      }
    }

  },

  /**
   * Smooth scroll anchor tags
   */
  smoothScroll: function() {

    let links = document.getElementsByTagName('a');

    for (let link of links) {
      // Get anchor links
      if (link.href && link.href.indexOf('#') !== -1) {
        link.addEventListener('click', function() {
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