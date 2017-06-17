/* global pillow */
'use strict';

(function(global, P) {
  var Util = P._;
  var SourceLoader = P.SourceLoader;
  var loader = new SourceLoader();

  var Event = {
    on: function(e, type, fn) {
      e.addEventListener(type, fn, false);
    },
    detach: function(e, type, fn) {
      e.removeEventListener(type, fn, false);
    }
  };
  var events = 'ontouchend' in document ? ['touchstart', 'touchmove', 'touchend'] : ['mousedown', 'mousemove', 'mouseup'];

  function Timer(defer, handle) {
    this.defer = defer;
    this.handle = handle;
  }

  Timer.prototype.run = function() {
    if (this._running) return;
    var that = this;
    setTimeout(function() {
      that._running = false;
      that.handle();
    }, this.defer);
    this._running = !this._running;
  };

  function Mask(cfg) {
    this.x = cfg.x || 0;
    this.y = cfg.y || 0;
    this.radius = cfg.radius || 0;
  }

  function _bindEvent() {
    var that = this;
    var drag;
    Event.on(this.element, events[0], function(e) {
      drag = !drag;
      that.currentPoint = {
        x: e.offsetX - that.radius / 2,
        y: e.offsetY - that.radius / 2
      };
      _setStartPoint.call(that);
    });
    Event.on(this.element, events[1], function(e) {
      that.currentPoint = {
        x: e.offsetX - that.radius / 2,
        y: e.offsetY - that.radius / 2
      };
      if (drag) that.timer.run();
    });
    Event.on(this.element, events[2], function(e) {
      drag = !drag;
    });
  }

  function _setStartPoint() {
    this.masks = [];
    this.startPoint = this.currentPoint;
    var radius = this.radius;
    while (radius) {
      this.masks.push(new Mask({
        x: this.currentPoint.x,
        y: this.currentPoint.y,
        radius: radius
      }));
      radius--;
    }
  }

  function _drawCircle(point) {
    /*
    this.ctx.moveTo(point.x, point.y);
    this.ctx.arc(point.x, point.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.stroke();
    */
  }

  function _makeWaves() {
    _drawCircle.call(this, this.startPoint);
    _drawCircle.call(this, this.currentPoint);
    this.startPoint = this.currentPoint;
    _drawMask.call(this);
  }

  function _drawMask() {
    for (let i = 0; i < this.masks.length; i++) {
      this.masks[i].imageData = this.ctx.getImageData(this.masks[i].x, this.masks[i].y, this.masks[i].radius, this.masks[i].radius);
      this.masks[i].x += (this.currentPoint.x - this.masks[i].x) / this.image.width * i;
      this.masks[i].y += (this.currentPoint.y - this.masks[i].y) / this.image.width * i;
      this.masks[i].alpha = 0 / this.masks[i].radius;
    }
    for (let i = 0; i < this.masks.length; i++) {
      this.ctx.save();
      this.ctx.globalAlpha = this.masks[i].alpha;
      this.ctx.putImageData(this.masks[i].imageData, this.masks[i].x, this.masks[i].y);
      this.ctx.restore();
    }
  }

  function _init() {
    var that = this;
    this.element.style.cursor = 'pointer';
    this.element.width = this.image.width;
    this.element.height = this.image.height;
    this.ctx = this.element.getContext('2d');
    this.ctx.drawImage(this.image.image, 0, 0);
    this.timer = new Timer(this.defer, function() {
      _makeWaves.call(that);
    });
  }

  function Liquify(options) {
    Util.merge(this, options);
    this.init();
  }

  var proto = Liquify.prototype;

  proto.init = function() {
    _init.call(this);
    _bindEvent.call(this);
  };

  loader.load([{
    id: 'mona',
    src: './images/mona.jpg'
  }]);
  loader.on('success', function(i) {
    var liquify = new Liquify({
      image: i.mona,
      element: document.querySelector('#screen'),
      radius: 100,
      defer: 10
    });
    console.log(liquify);
  });
})(this, pillow);
