/* global pillow */

;(function(global, pillow) {

  'use strict';
  var _ = pillow._;

  _.ease = function(target, value, rotation) {
    while (Math.abs(target - value) > Math.PI) {
      if (target < value) {
        value -= 2 * Math.PI;
      } else {
        value += 2 * Math.PI;
      }
    }
    return (target - value) * rotation;
  };

  var _eventHandleHash = {};

  var _bindSingleEvent = function(id, handle) {
    if (!_eventHandleHash[this._guid][id]) {
      _eventHandleHash[this._guid][id] = [];
    }
    _eventHandleHash[this._guid][id].push({
      id: this._guid,
      handle: handle,
      type: id
    });
  };

  var _bindEvent = function(map, handle) {
    var that = this;
    if (typeof map === 'string') {
      _bindSingleEvent.call(this, map, handle);
    } else {
      _.each(map, function(handle, id) {
        _bindSingleEvent.call(that, id, handle);
      });
    }
  };

  var _unbindEvent = function(id) {
    if (id) {
      delete _eventHandleHash[this._guid][id];
    } else {
      _eventHandleHash[this._guid] = [];
    }
  };

  var _triggerEvent = function(id, data) {
    var _eventLoop = _eventHandleHash[this._guid][id];
    if (!_eventLoop) return;
    var that = this;
    _.each(_eventLoop, function(e) {
      e.handle.call(that, data, e.type);
    });
  };

  var Events = {
    on: function(map, handle) {
      _bindEvent.call(this, map, handle);
      return this;
    },
    detach: function(id) {
      _unbindEvent.call(this, id);
      return this;
    },
    emit: function(id, data) {
      _triggerEvent.call(this, id, data);
      return this;
    }
  };

  function Screen(config) {
    this._guid = _.guid();
    _eventHandleHash[this._guid] = {};
    _.extend(this, Events);
    pillow.screen = this;
    this.element = config.container;
    this.ctx = this.element.getContext('2d');
    this.left = 0;
    this.top = 0;
    this.width = 0;
    this.height = 0;
    this.displayObject = new DisplayObject(this);
  }

  function DisplayObject(canvas) {
    var that = this;
    this.X = 0;
    this.Y = 0;
    this.Xi = 0;
    this.Yi = 0;
    this.bXi = 0;
    this.bYi = 0;
    this.Xr = 0;
    this.Yr = 0;
    this.startX = 0;
    this.startY = 0;
    this.scale = 0;
    this.wheelDelta = 0;
    this.isDraging = false;
    this.hasMoved = false;
    this.isDown = false;
    this.eventObj = false;
    var sX = 0;
    var sY = 0;

    var resizeHandle = function() {
      var element = canvas.element;
      canvas.width = element.offsetWidth;
      canvas.height = element.offsetHeight;
      for (canvas.left = 0, canvas.top = 0; element != null; element = element.offsetParent) {
        canvas.left += element.offsetLeft;
        canvas.top += element.offsetTop;
      }
      canvas.element.width = canvas.width;
      canvas.element.height = canvas.height;
      canvas.emit('resize');
    };

    var element = canvas.element;

    resizeHandle.call(that);

    var downHandle = function(e) {
      if (!this.isDown) {
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if (element.setCapture) {
          element.setCapture();
        }
        this.isDraging = false;
        this.hasMoved = false;
        this.isDown = true;
        this.eventObj = e;
        this.Xr = e.clientX !== undefined ? e.clientX : e.touches[0].clientX;
        this.Yr = e.clientY !== undefined ? e.clientY : e.touches[0].clientY;
        this.X = sX = this.Xr - canvas.left;
        this.Y = sY = this.Yr - canvas.top + scrollTop;
      }
    };

    var moveHandle = function(e) {
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      this.Xr = e.clientX !== undefined ? e.clientX : e.touches[0].clientX;
      this.Yr = e.clientY !== undefined ? e.clientY : e.touches[0].clientY;
      this.X = this.Xr - canvas.left;
      this.Y = this.Yr - canvas.top + scrollTop;
      if (this.isDown) {
        this.Xi = this.bXi + (this.X - sX);
        this.Yi = this.bYi - (this.Y - sY);
      }
      if (Math.abs(this.X - sX) > 11 || Math.abs(this.Y - sY) > 11) {
        this.hasMoved = true;
        if (this.isDown) {
          if (!this.isDraging) {
            this.startX = sX;
            this.startY = sY;
            canvas.emit('startDrag', e);
            this.isDraging = true;
          } else {
            canvas.emit('drag', e);
          }
        } else {
          sX = this.X;
          sY = this.Y;
        }
      }
      canvas.emit('drag', e);
    };

    var upHandle = function(e) {
      this.bXi = this.Xi;
      this.bYi = this.Yi;
      if (!this.hasMoved) {
        this.X = sX;
        this.Y = sY;
        canvas.emit('down', this.eventObj);
      } else {
        canvas.emit('up', this.eventObj);
      }
      this.isDraging = false;
      this.isDown = false;
      this.hasMoved = false;
      canvas.emit('up', this.eventObj);
      if (element.releaseCapture) {
        element.releaseCapture();
      }
      this.eventObj = false;
    };

    var cancelHandle = function(e) {
      var element = canvas.element;
      if (element.releaseCapture) element.releaseCapture();
      this.isDraging = false;
      this.hasMoved = false;
      this.isDown = false;
      this.bXi = this.Xi;
      this.bYi = this.Yi;
      sX = 0;
      sY = 0;
    };

    if ('ontouchstart' in global) {
      element.addEventListener('touchstart', function(e) {
        downHandle.call(that, e);
        return false;
      });
      element.addEventListener('touchmove', function(e) {
        moveHandle.call(that, e);
        return false;
      });
      element.addEventListener('touchend', function(e) {
        upHandle.call(that, e);
        return false;
      });
      element.addEventListener('touchcancel', function(e) {
        cancelHandle.call(that, e);
        return false;
      });
    }
    global.addEventListener('resize', function() {
      resizeHandle.call(that);
    });
    document.addEventListener('touchmove', function(e) {
      e.preventDefault();
    });
    document.addEventListener('mousedown', function(e) {
      var p = e.target === canvas.element || e.target.parentNode && e.target.parentNode === canvas.element || e.target.parentNode.parentNode && e.target.parentNode.parentNode === canvas.element;
      if (p) {
        if (e.stopPropagation) {
          e.stopPropagation();
        } else {
          e.cancelBubble = true;
        }
        e.preventDefault();
        downHandle.call(that, e);
      }
    }, false);
    document.addEventListener('mousemove', function(e) {
      moveHandle.call(that, e);
    }, false);
    document.addEventListener('mouseup', function(e) {
      upHandle.call(that, e);
    }, false);
    canvas.element.addEventListener('mousewheel', function(e) {
      if (e.preventDefault) {
        e.preventDefault();
      }
      that.wheelDelta = -e.wheelDelta * 0.25;
      canvas.emit('wheel', e);
    }, false);
  }

  var drawRect = function() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.points[0].X, this.points[0].Y);
    this.ctx.lineTo(this.points[1].X, this.points[1].Y);
    this.ctx.lineTo(this.points[2].X, this.points[2].Y);
    this.ctx.lineTo(this.points[3].X, this.points[3].Y);
    this.ctx.closePath();
  };

  function Camera(config) {
    pillow.camera = this;
    this._guid = _.guid();
    _eventHandleHash[this._guid] = {};
    _.extend(this, Events);
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.rx = 0;
    this.ry = 0;
    this.rz = 0;
    this.focalLength = config.focalLength || 500;
    this.speed = config.speed || 0.1;
    this.rotation = config.rotation || 0.025;
    this.enableRx = !!config.disableRx;
    this.enableRy = !!config.disableRy;
    this.enableRz = !!config.disableRz;
    this.cosX = 1;
    this.sinX = 0;
    this.cosY = 1;
    this.sinY = 0;
    this.cosZ = 1;
    this.sinZ = 0;
    this.target = {
      over: false,
      elem: false,
      x: 0,
      y: 0,
      z: 0,
      rx: 0,
      ry: 0,
      rz: 0
    };
  }
  Camera.prototype.move = function() {
    this.emit('move');
    this.x += (this.target.x - this.x) * this.speed;
    this.y += (this.target.y - this.y) * this.speed;
    this.z += (this.target.z - this.z) * this.speed;
    if (this.enableRx) {
      this.rx += _.ease(this.target.rx, this.rx, this.rotation);
      this.cosX = Math.cos(this.rx);
      this.sinX = Math.sin(this.rx);
    }
    if (this.enableRy) {
      this.ry += _.ease(this.target.ry, this.ry, this.rotation);
      this.cosY = Math.cos(this.ry);
      this.sinY = Math.sin(this.ry);
    }
    if (this.enableRz) {
      this.rz += _.ease(this.target.rz, this.rz, this.rotation);
      this.cosZ = Math.cos(this.rz);
      this.sinZ = Math.sin(this.rz);
    }
  };

  function Point(x, y, z, tx, ty) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.tx = tx || 0;
    this.ty = ty || 0;
    this.visible = false;
    this.scale = 0;
    this.X = 0;
    this.Y = 0;
    this.Z = 0;
    this.next = true;
  }

  Point.prototype.projection = function() {
    var sw = this.screen.width >> 1;
    var sh = this.screen.height >> 1;
    var nx = this.x - this.camera.x;
    var ny = this.y - this.camera.y;
    var nz = this.z - this.camera.z;
    var u;
    var t;
    if (this.camera.enableRz) {
      u = this.camera.sinZ * ny + this.camera.cosZ * nx;
      t = this.camera.cosZ * ny - this.camera.sinZ * nx;
    } else {
      u = nx;
      t = ny;
    }
    var s = this.camera.cosY * nz + this.camera.sinY * u;
    this.Z = this.camera.cosX * s - this.camera.sinX * t;
    this.scale = this.camera.focalLength / Math.max(1, this.Z);
    this.X = sw + (this.camera.cosY * u - this.camera.sinY * nz) * this.scale;
    this.Y = -(this.camera.y >> 1) + sh - (this.camera.sinX * s + this.camera.cosX * t) * this.scale;
    this.visible = this.X > -sw * 0.5 && this.X < sw * 2.5 && this.Y > -sh * 0.5 && this.Y < sh * 2.5;
    return this.next;
  };

  function Triangle(parent, p0, p1, p2) {
    this.ctx = parent.ctx;
    this.texture = parent.texture;
    this.p0 = p0;
    this.p1 = p1;
    this.p2 = p2;
    this.d = p0.tx * (p2.ty - p1.ty) - p1.tx * p2.ty + p2.tx * p1.ty + (p1.tx - p2.tx) * p0.ty;
    this.pmy = p1.ty - p2.ty;
    this.pmx = p1.tx - p2.tx;
    this.pxy = p2.tx * p1.ty - p1.tx * p2.ty;
    if (parent.t) parent.t.next = true;
  }

  Triangle.prototype.draw = function() {
    if (this.p0.visible || this.p1.visible || this.p2.visible) {
      var dx, dy, d;
      // ---- centroid ----
      var xc = (this.p0.X + this.p1.X + this.p2.X) / 3;
      var yc = (this.p0.Y + this.p1.Y + this.p2.Y) / 3;
      // ---- clipping ----
      this.ctx.save();
      this.ctx.beginPath();
      dx = xc - this.p0.X;
      dy = yc - this.p0.Y;
      d = Math.max(Math.abs(dx), Math.abs(dy));
      this.ctx.moveTo(this.p0.X - 2 * (dx / d), this.p0.Y - 2 * (dy / d));
      dx = xc - this.p1.X;
      dy = yc - this.p1.Y;
      d = Math.max(Math.abs(dx), Math.abs(dy));
      this.ctx.lineTo(this.p1.X - 2 * (dx / d), this.p1.Y - 2 * (dy / d));
      dx = xc - this.p2.X;
      dy = yc - this.p2.Y;
      d = Math.max(Math.abs(dx), Math.abs(dy));
      this.ctx.lineTo(this.p2.X - 2 * (dx / d), this.p2.Y - 2 * (dy / d));
      this.ctx.closePath();
      this.ctx.clip();
      var t0 = this.p2.X - this.p1.X;
      var t1 = this.p1.Y - this.p2.Y;
      var t2 = this.p2.ty * this.p1.X;
      var t3 = this.p1.tx * this.p2.X;
      var t4 = this.p2.ty * this.p1.Y;
      var t5 = this.p1.ty * this.p2.X;
      var t6 = this.p1.ty * this.p2.Y;
      var t7 = this.p2.tx * this.p1.X;
      var t8 = this.p1.tx * this.p2.Y;
      var t9 = this.p2.tx * this.p1.Y;
      this.ctx.transform(
        -(this.p0.ty * t0 - t5 + t2 + this.pmy * this.p0.X) / this.d,
        (t6 + this.p0.ty * t1 - t4 - this.pmy * this.p0.Y) / this.d,
        (this.p0.tx * t0 - t3 + t7 + this.pmx * this.p0.X) / this.d,
        -(t8 + this.p0.tx * t1 - t9 - this.pmx * this.p0.Y) / this.d,
        (this.p0.tx * (t2 - t5) + this.p0.ty * (t3 - t7) + this.pxy * this.p0.X) / this.d,
        (this.p0.tx * (t4 - t6) + this.p0.ty * (t8 - t9) + this.pxy * this.p0.Y) / this.d
      );
      this.ctx.drawImage(this.texture, 0, 0);
      this.ctx.restore();
    }
    return this.next;
  };

  function Background(parent, imgSrc, lev, callback) {
    this.parent = parent;
    this.points = [];
    this.triangles = [];
    this.ctx = pillow.screen.ctx;
    this.texture = new Image();
    this.texture.src = imgSrc;
    this.isLoading = true;
    this.callback = callback;
    this.textureWidth = 0;
    this.textureHeight = 0;
    this.level = lev || 1;
    this.visible = false;
    this.t = false;
    if (!Point.prototype.screen) {
      Point.prototype.screen = pillow.screen;
      Point.prototype.camera = pillow.camera;
    }
  }

  Background.prototype.setLevel = function(level) {
    this.points.length = 0;
    this.triangles.length = 0;
    this.level = level;
    this.loading();
  };
  Background.prototype.loading = function() {
    if (this.texture.complete) {
      var dir = [0, 1, 1, 0, 0, 0, 1, 1];
      this.isLoading = false;
      this.textureWidth = this.texture.width;
      this.textureHeight = this.texture.height;
      if (this.callback && this.callback.isLoaded) {
        this.callback.isLoaded(this);
      }
      for (var i = 0; i < this.points.length; i++) {
        var p = this.points[i];
        p.tx = this.textureWidth * dir[i];
        p.ty = this.textureHeight * dir[i + 4];
      }

      this.triangulate(this.points[0], this.points[1], this.points[2], this.level);
      this.triangulate(this.points[0], this.points[2], this.points[3], this.level);
      this.points[this.points.length - 1].next = false;
    }
  };
  Background.prototype.subdivise = function(p0, p1) {
    return {
      x: (p1.x + p0.x) * 0.5,
      y: (p1.y + p0.y) * 0.5,
      z: (p1.z + p0.z) * 0.5,
      tx: (p1.tx + p0.tx) * 0.5,
      ty: (p1.ty + p0.ty) * 0.5
    };
  };
  Background.prototype.triangulate = function(p0, p1, p2, level) {
    level--;
    if (level === 0) {
      this.t = new Triangle(this, p0, p1, p2);
      this.triangles.push(this.t);
    } else {
      var p01 = this.subdivise(p0, p1);
      var p12 = this.subdivise(p1, p2);
      var p20 = this.subdivise(p2, p0);
      this.points.push(p01 = new Point(p01.x, p01.y, p01.z, p01.tx, p01.ty));
      this.points.push(p12 = new Point(p12.x, p12.y, p12.z, p12.tx, p12.ty));
      this.points.push(p20 = new Point(p20.x, p20.y, p20.z, p20.tx, p20.ty));
      this.triangulate(p0, p01, p20, level);
      this.triangulate(p01, p1, p12, level);
      this.triangulate(p20, p12, p2, level);
      this.triangulate(p01, p12, p20, level);
    }
  };
  Background.prototype.transform3D = function(backfaceTest) {
    if (this.isLoading) {
      this.loading();
      return false;
    } else {
      for (var i = 0; this.points[i++].projection(););
      if (backfaceTest) {
        var p0 = this.points[0];
        var p1 = this.points[1];
        var p2 = this.points[2];
        return (p1.Y - p0.Y) / (p1.X - p0.X) - (p2.Y - p0.Y) / (p2.X - p0.X) < 0 ^ p0.X <= p1.X === p0.X > p2.X;
      } else {
        return true;
      }
    }
  };
  Background.prototype.draw = function() {
    if (!this.isLoading) {
      for (var i = 0; i < this.triangles.length; i++) {
        this.triangles[i].draw();
      }
    }
  };
  Background.prototype.isPointerInside = function(x, y) {
    drawRect.call(this);
    return this.ctx.isPointInPath(x, y);
  };

  global._pillow = {
    _: pillow._,
    Camera: Camera,
    Point: Point,
    Background: Background,
    Screen: Screen,
    drawRect: drawRect
  };
})(this, pillow);
