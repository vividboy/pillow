'use strict';

/**
 * @class pillow.Math Math.
 * @param {Object} options An object literal containing one or more of the following optional properties:
 */

var _Math = {
  getRandom: function(min, max) {
    return Math.random() * (max - min + 1) + min;
  }
};

module.exports = _Math;
