/* ================================================================
 * Matrix by xdf(xudafeng[at]126.com)
 *
 * first created at : Thu Aug 28 2014 15:10:23 GMT+0800 (CST)
 *
 * ================================================================
 * Copyright 2014 xdf
 *
 * Licensed under the MIT License
 * You may not use this file except in compliance with the License.
 *
 * ================================================================ */

;(function(root, factory) {
  'use strict';
  /* amd like aml https://github.com/xudafeng/aml.git */
  if(typeof define === 'function' && define.amd) {
    return define(['exports'], factory);
  }else if(typeof exports !== 'undefined') {
    return factory(exports);
  }else{
    /* browser */
    factory(root['Matrix'] || (root['Matrix'] = {}));
  }
})(this, function(exports, undefined) {

  function Node(x, y, flag) {
    this.x = x;
    this.y = y;
    this.flag = flag || {};
  }

  function generator(nodes) {
    this.nodes = [];
    this.matrix = [];
    for(var y = 0; y < nodes.length; y++) {
      this.matrix[y] = [];
      for(var x = 0; x < nodes[y].length; x++) {
        var node = new Node(x, y, {
          type: nodes[y][x]
        });
        this.matrix[y][x] = node;
        this.nodes.push(node);
      }
    }
  }

  function getNode(x, y) {
    var result = null;
    var matrix = this.matrix;

    if(matrix[y] && matrix[y][x]) {
      result = matrix[y][x];
    }
    return result;
  }

  /**
    * A matrix structure
    * @param {Array}
    * @param {bool}
    */
  function Constructor(nodes, diagonal) {
    if(!nodes) throw('matrix constructor need nodes.');
    this.diagonal = diagonal;
    generator.call(this, nodes);
  }

  var proto = Constructor.prototype;

  proto.get = function(x, y) {
    return getNode.call(this, x, y);
  }

  proto.up = function(x, y) {
    return getNode.call(this, x, y - 1);
  }

  proto.right = function(x, y) {
    return getNode.call(this, x + 1, y);
  }

  proto.down = function(x, y) {
    return getNode.call(this, x, y + 1);
  }

  proto.left = function(x, y) {
    return getNode.call(this, x - 1, y);
  }

  proto.rightUp = function(x, y) {
    return getNode.call(this, x + 1, y - 1);
  }

  proto.rightDown = function(x, y) {
    return getNode.call(this, x, y + 1);
  }

  proto.leftUp = function(x, y) {
    return getNode.call(this, x - 1, y - 1);
  }

  proto.leftDown = function(x, y) {
    return getNode.call(this, x - 1, y + 1);
  }

  proto.neighbors = function(node) {
    var result = [];
    var x = node.x;
    var y = node.y;

    this.left(x, y) && result.push(this.left(x, y));
    this.right(x, y) && result.push(this.right(x, y));
    this.down(x, y) && result.push(this.down(x, y));
    this.up(x, y) &&  result.push(this.up(x, y));

    if (this.diagonal) {
      this.leftDown(x, y) && result.push(this.leftDown(x, y));
      this.rightDown(x, y) && result.push(this.rightDown(x, y));
      this.leftUp(x, y) && result.push(this.leftUp(x, y));
      this.rightUp(x, y) && result.push(this.rightUp(x, y));
    }
    return result;
  };

  exports.Constructor = Constructor;
  exports.version = '0.1.0';
});
/* vim: set sw=4 ts=4 et tw=80 : */ 

