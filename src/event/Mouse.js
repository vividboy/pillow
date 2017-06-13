'use strict';

const _ = require('../tool/Util');

function getOffset(element) {
  var x = 0;
  var y = 0;
  var offsetParent = element;
  while (offsetParent !== null && offsetParent !== document.body) {
    x += offsetParent.offsetLeft;
    y += offsetParent.offsetTop;
    offsetParent = offsetParent.offsetParent;
  }
  return {
    x: x,
    y: y
  };
}
function Mouse(cfg) {
  var that = this;
  that.types = 'ontouch' in window ? [
    'touchstart',
    'touchmove',
    'touchend'
  ] : [
    'mousedown',
    'mousemove',
    'mouseup'
  ];
  that.element = document;
  _.merge(that, cfg);
  this.bind();
}
var proto = {
  bind: function() {
    var that = this;
    that.element = that.screen.target;
    that.offset = getOffset(that.element);
    _.each(that.types, function(i) {
      that.element.addEventListener(i, function(e) {
        e.preventDefault();
        var x = e.changedTouches ? e.changedTouches[0].pageX : e.pageX;
        var y = e.changedTouches ? e.changedTouches[0].pageY : e.pageY;
        that.screen.dispatch(i, x - that.offset.x, y - that.offset.y);
      });
    });
  }
};

_.augment(Mouse, proto);

module.exports = Mouse;
