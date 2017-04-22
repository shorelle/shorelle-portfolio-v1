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

    for (let i = 0; i < links.length; ++i) {
      let cards = Util.getParents(links[i], '.card');

      for (let j = 0; j < cards.length; ++j) {
        let h2List = cards[j].getElementsByTagName('h2'),
            imgList = cards[j].getElementsByTagName('img');

        // Add active classes on mouseover
        links[i].addEventListener('mouseover', function() {
          for (let i = 0; i < h2List.length; ++i) {
            let aList = h2List[i].getElementsByTagName('a');

            for (let i = 0; i < aList.length; ++i) {
              aList[i].classList.add('active');
            }
          }
          for (let i = 0; i < imgList.length; ++i) {
            imgList[i].classList.add('active');
          }
        }, false);

        // Remove active classes on mouseout
        links[i].addEventListener('mouseout', function() {
          for (let i = 0; i < h2List.length; ++i) {
            let aList = h2List[i].getElementsByTagName('a');

            for (let i = 0; i < aList.length; ++i) {
              aList[i].classList.remove('active');
            }
          }
          for (let i = 0; i < imgList.length; ++i) {
            imgList[i].classList.remove('active');
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