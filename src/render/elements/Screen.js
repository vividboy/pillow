'use strict';

const _ = require('../../tool/util');
const RenderObjectModel = require('../RenderObjectModel');

function Screen(cfg) {
  var that = this;
  Screen.sup.call(that,cfg);
  _.merge(that,cfg);
  that.init();
}

var proto = {
  init: function() {
    var that = this;
    that.target = that.container;
    if (that.target) {
      that.context = that.target.getContext("2d");
      that.canvas = that.context.canvas;
      that.canvas.width = that.width||that.canvas.width;
      that.canvas.height = that.height||that.canvas.height;
    }else{
      _.log('init error');
      return;
    }
  },
  run: function() {
    var that = this;
    this.render(that.context);
  },
  hitTest: function() {
    return true;
  }
};

_.augment(Screen, proto);
_.inherit(Screen, RenderObjectModel);

module.exports = Screen;
