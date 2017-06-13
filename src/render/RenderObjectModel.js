'use strict';

const _ = require('../tool/util');
const RenderObject = require('./RenderObject');

function RenderObjectModel(cfg) {
  var that = this;
  RenderObjectModel.sup.call(that, cfg);
  that.children = [];
  that.parent = null;
  _.merge(that, cfg);
}

var proto = {
  render: function(context) {
    var that = this;
    that.clear(0, 0, that.width, that.height);
    that._draw(that.context);
  },
  append: function(node) {
    var that = this;
    node.parent = that;
    that.children[that.children.length] = node;
  },
  removeChildren: function(index) {
    this.children[index] && this.children.splice(index, 1);
  },
  removeAllChildren: function() {
    this.children = [];
  },
  traversal: function(callback) {
    var node = this;
    var current;
    var children;
    var nodes = _.type(node) === 'array' ? node.slice(0).reverse() : [node];
    var parents = [];

    if (_.type(nodes[0]) === 'undefined' && nodes.length === 1) {
      return;
    }
    for (let i = nodes.length - 1; i >= 0; i--) {
      parents.push(null);
    }
    while (nodes.length > 0) {
      current = nodes.pop();
      parents.pop();
      callback(current);
      children = current && current['children'] ? current['children'] : [];
      for (let i = children.length - 1; i >= 0; i--) {
        nodes.push(children[i]);
        parents.push(current);
      }
    }
  },
  dispatch: function(type, x, y) {
    var that = this;
    var children = that.children;
    var i = children.length;
    var _x = x - that.x;
    var _y = y - that.y;
    that.emit(type);
    while (i--) {
      var child = children[i];
      if (child.hitTest(_x, _y)) {
        child.dispatch(type, _x, _y);
        return;
      }
    }
  }
};

_.augment(RenderObjectModel, proto);
_.inherit(RenderObjectModel, RenderObject);

module.exports = RenderObjectModel;
