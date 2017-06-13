'use strict';

const _ = require('../tool/util');
const RenderObjectModel = require('../render/RenderObjectModel');

function Map(cfg) {
  var that = this;
  that.cache = true;
  that.lock = false;
  that.source = {};
  Map.sup.call(that, cfg);
  _.merge(that, cfg);
  that.init();
}
var proto = {
  init: function() {
  },
  clearCache: function() {
    var that = this;
    that.lock = false;
  },
  draw: function() {
    var that = this;
    var images = that.resource;
    _.each(that.matrix, function(i, x) {
      _.each(i, function(j, y) {
        that.context.drawImage(images[j].image, 0, 0, that.size.width, that.size.height, that.size.width * y, that.size.height * x, that.size.width, that.size.height);
      });
    });
    that.mapCache = {};
    if (that.cache) {
      that.lock = true;
    }
  }
};

_.augment(Map, proto);
_.inherit(Map, RenderObjectModel);

module.exports = Map;
