/* 
 * Module - Utilities
 * ========================================================================== */

const Util = {

  /**
   * Check if element exists
   */
  exists: function(item) {
    return document.querySelectorAll(item).length > 0 ? true : false;
  },

  /**
   * Get all of an element's parent elements up the DOM tree
   * @param  {Node}   elem     The element
   * @param  {String} selector Selector to match against [optional]
   * @return {Array}           The parent elements
   */
  getParents: function(elem, selector) {

    // Element.matches() polyfill
    if (!Element.prototype.matches) {
        Element.prototype.matches =
            Element.prototype.matchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector ||
            Element.prototype.oMatchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            function(s) {
                var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                    i = matches.length;
                while (--i >= 0 && matches.item(i) !== this) {}
                return i > -1;
            };
    }

    // Setup parents array
    var parents = [];

    // Get matching parent elements
    for ( ; elem && elem !== document; elem = elem.parentNode ) {

      // Add matching parents to array
      if (selector) {
        if (elem.matches(selector)) {
          parents.push(elem);
        }
      } else {
        parents.push(elem);
      }

    }

    return parents;

  }
}

export default Util
