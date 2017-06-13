'use strict';

const _ = require('../../tool/util');
const RenderObjectModel = require('../RenderObjectModel');

function Img(cfg) {
  var that = this;
  Img.sup.call(that, cfg);
  _.merge(that, cfg);
}

var proto = {
  draw: function() {
    var that = this;
    var currentFrame = that.getCurrentFrame?that.getCurrentFrame():null;
    var x = currentFrame?currentFrame.x:that.x;
    var y = currentFrame?currentFrame.y:that.y;
    that.context.drawImage(that.image,x,y,that.width,that.height,0,0,that.width,that.height);
  }
};

_.augment(Img, proto);
_.inherit(Img, RenderObjectModel);

module.exports = Img;
