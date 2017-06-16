/* global pillow */

;(function(global, P) {
  var Util = P._;
  var AStar = global.AStar.Constructor;

  if (!AStar) {
    return;
  }
  var Event = {
    on: function(e, type, fn) {
      e.addEventListener(type, fn, false);
    },
    detach: function(e, type, fn) {
      e.removeEventListener(type, fn, false);
    }
  };

  var CONFIG = {
    barrier: 0.2,
    debug: false,
    size: 15,
    diagonal: false,
    cellWidth: 30
  };

  var COLORS = {
    barrier: '#5E80A5',
    path: '#95BE02',
    start: '#F3C903',
    end: '#F3C903',
    avaliable: '#FFF',
    info: '#5E80A5',
    default: '#000'
  };

  function render() {
    var cellWidth = this.cfg.cellWidth;
    var size = this.cfg.size;
    var nodes = this.nodes;
    this.ctx.fillStyle = COLORS['default'];
    this.ctx.fillRect(0, 0, this.container.width, this.container.height);
    for (var y = 0; y < size; y++) {
      for (var x = 0; x < size; x++) {
        if (this.startNode && x === this.startNode.x && y === this.startNode.y) {
          this.ctx.fillStyle = COLORS['start'];
        } else if (this.endNode && x === this.endNode.x && y === this.endNode.y) {
          this.ctx.fillStyle = COLORS['end'];
        } else {
          this.ctx.fillStyle = nodes[y][x] ? COLORS['avaliable'] : COLORS['barrier'];
        }
        this.ctx.fillRect(x * cellWidth + 1, y * cellWidth + 1, cellWidth - 2, cellWidth - 2);
      }
    }
  };

  function setRandomBarrier() {
    var size = this.cfg.size;
    for (var y = 0; y < size; y++) {
      var row = [];
      for (var x = 0; x < size; x++) {
        var barrier = Math.floor(Math.random() * (1 / this.cfg.barrier)) === 0;
        row.push(!barrier);
      }
      this.nodes.push(row);
    }
  };

  function setScreen() {
    this.nodes = [];
    var cellWidth = this.cfg.cellWidth;
    var size = this.cfg.size;
    this.container.width = cellWidth * size;
    this.container.height = cellWidth * size;
    setRandomBarrier.call(this);
    render.call(this);
    this.astar = new AStar(this.nodes, this.cfg);
    showInfo('Click to search.');
  };

  function getPathResult(start, end) {
    var startTime = new Date();
    var path = this.astar.search(start, end);
    var endTime = new Date();
    return {
      path: path.reverse(),
      duration: endTime - startTime
    };
  };

  function getNode(x, y) {
    var res = this.astar.matrix.matrix[y][x];
    return res;
  };

  function animation() {
    var that = this;
    var list = this.result.path;
    var duration = this.result.duration;
    showInfo('duration is ' + duration);
    if (!list.length) {
      return showInfo('No way.');
    }
    var cellWidth = this.cfg.cellWidth;
    var index = 0;
    var handle = function(i) {
      var node = list[i];
      var x = node.x;
      var y = node.y;
      var offsetX = x * cellWidth;
      var offsetY = y * cellWidth;
      var f = node.f;
      var g = node.g;
      var h = node.h;
      that.ctx.fillStyle = COLORS['path'];
      that.ctx.fillRect(offsetX + 1, offsetY + 1, cellWidth - 2, cellWidth - 2);

      if (!that.cfg.debug) {
        return index++;
      }
      that.ctx.fillStyle = COLORS['info'];
      that.ctx.fillText('F:' + f, offsetX + 4, offsetY + 10);
      that.ctx.fillText('G:' + g, offsetX + 4, offsetY + 19);
      that.ctx.fillText('H:' + h, offsetX + 4, offsetY + 28);
      index++;
    };
    var anim = setInterval(function() {
      if (index === list.length - 1) {
        clearInterval(anim);
        return;
      }
      handle.call(that, index);
    }, 100);
  };

  function PathFinding(container, config) {
    if (!container) {
      return;
    }
    this.container = container;
    this.ctx = container.getContext('2d');
    // mix global config
    this.cfg = Util.extend(CONFIG, config || {});
    this.init();
  };

  function showInfo(msg) {
    document.querySelector('#info').innerHTML = 'INFO: ' + msg;
  };

  PathFinding.prototype = {
    init: function() {
      setScreen.call(this);
      this.bindEvent();
    },
    bindEvent: function() {
      var that = this;
      var cellWidth = this.cfg.cellWidth;
      Event.on(this.container, 'click', function(e) {
        var x = parseInt(e.offsetX / cellWidth, 10);
        var y = parseInt(e.offsetY / cellWidth, 10);
        that.searchPath(x, y);
      });
      Event.on(document.querySelector('#panel'), 'change', function(e) {
        var target = e.target;
        var name = target.name;
        var type = target.type;
        var isCheckBox = type === 'checkbox';
        var value = target[isCheckBox ? 'checked' : 'value'];
        that.cfg[name] = value;

        if (!isCheckBox) {
          that.nodes = [];
          setScreen.call(that);
          setRandomBarrier.call(that);
          render.call(that);
          that.astar = new AStar(that.nodes, that.cfg);
        }
      });
    },
    searchPath: function(x, y) {
      var current = getNode.call(this, x, y);

      if (!current.flag.type) {
        return showInfo('node: x:' + x + ' y: ' + y + ' is unavaliable.');
      }

      if (this.startNode) {
        this.endNode = current;
        render.call(this);
        this.result = getPathResult.call(this, this.startNode, this.endNode);
        animation.call(this);
        this.startNode = this.endNode;
      } else {
        this.startNode = current;
        this.startNode.flag.type = true;
        render.call(this);
      }
    }
  };
  var x = new PathFinding(document.querySelector('#screen'), {});
  console.log(x);
})(window, pillow);

