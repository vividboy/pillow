'use strict';

var _Math = {
  getRandom: function(min, max) {
    return Math.random() * (max - min + 1) + min;
  }
};

module.exports = _Math;
