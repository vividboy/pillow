'use strict';

const _ = require('../tool/Util');
const RenderObject = require('./RenderObject');

/**
 * @class pillow.RenderObjectModel RenderObjectModel.
 * @param {Object} options An object literal containing one or more of the following optional properties:
 * <li><tt>x</tt></li>
 * <li><tt>y</tt></li>
 * <li><tt>width</tt></li>
 * <li><tt>height</tt></li>
 * <li><tt>alpha</tt></li>
 * <li><tt>scaleX</tt></li>
 * <li><tt>scaleY</tt></li>
 * <li><tt>rotation</tt></li>
 * <li><tt>angle</tt></li>
 * <li><tt>visible</tt></li>
 * <li><tt>debug</tt></li>
 */

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
  prepend: function(node) {
    var that = this;
    node.parent = that;
    that.children.unshift(node);
  },
  append: function(node) {
    var that = this;
    node.parent = that;
    that.children[that.children.length] = node;
  },
  removeChildren: function(index) {
    if (this.children[index]) {
      this.children.splice(index, 1);
    }
  },
  removeAllChildren: function() {
    this.children = [];
  },
  removeFromParent: function() {
    var that = this;
    if (that.parent) {
      _.each(this.parent.children, function(child, index) {
        if (child === that) {
          that.parent.removeChildren(index);
        }
      });
    }
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
    that.emit(type, {
      client: {
        x: x,
        y: y
      },
      offset: {
        x: _x,
        y: _y
      }
    });
    while (i--) {
      var child = children[i];
      if (child.hitTest && child.hitTest(_x, _y)) {
        child.dispatch(type, _x, _y);
        return;
      }
    }
  },
  hitTest: function(x, y) {
    var that = this;
    return x >= that.x && x <= that.x + that.width && y >= that.y && y <= that.y + that.height;
  }
};

_.augment(RenderObjectModel, proto);
_.inherit(RenderObjectModel, RenderObject);

module.exports = RenderObjectModel;
