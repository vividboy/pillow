'use strict';

const _ = require('../tool/Util');
const Notify = require('../notify/Notify');

function SourceLoader(cfg) {
  var that = this;
  that.hash = {};
  SourceLoader.sup.call(that, cfg);
  _.merge(that, cfg);
}
var proto = {
  load: function(query) {
    var that = this;
    that.num = 0;
    that.query = query;
    _.each(that.query, function(i) {
      that.imageLoader(i);
    });
  },
  imageLoader: function(item) {
    var that = this;
    var image = new Image();
    image.crossOrigin = '*';
    image.onload = function() {
      var id = item.id;
      that.hash[id] = {
        image: image,
        width: image.width,
        height: image.height
      };
      that.num++;
      that.emit('loaded', {
        number: that.num,
        id: id,
        image: that.hash[id]
      });

      if (that.num === that.getSize()) {
        that.emit('success', that.hash);
      }
    };
    image.src = item.src;
  },
  getSize: function() {
    return this.query.length;
  }
};

_.augment(SourceLoader, proto);
_.inherit(SourceLoader, Notify);

module.exports = SourceLoader;
