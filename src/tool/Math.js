'use strict';

var _Math = {
  random: function(min, max) {
    return parseInt(Math.random() * (max - min + 1) + min, 10);
  }
};

module.exports = _Math;
