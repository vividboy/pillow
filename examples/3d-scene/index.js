/* global _pillow pillow */

;(function(global, P) {
  'use strict';
  var Screen = P.Screen;
  var Camera = P.Camera;
  var Background = P.Background;
  var Point = P.Point;

  var WALL_WIDTH = 1502;
  var structure = [{
    // wall
    fill: {
      r: 100,
      g: 100,
      b: 100,
      light: 0
    },
    x: [-WALL_WIDTH, WALL_WIDTH, WALL_WIDTH, -WALL_WIDTH],
    z: [0, 0, 0, 0],
    y: [500, 500, -500, -500]
  }, {
    // ceilingLight
    fill: {
      r: 0,
      g: 0,
      b: 0
    },
    x: [-1500, 1500, 1500, -1500],
    z: [0, 0, 1550, 1550],
    y: [500, 500, 500, 500]
  }, {
    // groundLight
    fill: {
      r: 0,
      g: 0,
      b: 0
    },
    x: [-1500, 1500, 1500, -1500],
    z: [0, 0, 1550, 1550],
    y: [-500, -500, -500, -500]
  }, {
    img: true
  }];

  var imageData = [ {
    src: './test.jpg',
    x: 0,
    y: 0,
    z: 1500,
    nx: 0,
    nz: 1
  }, {
    src: './test.jpg',
    x: 1500,
    y: 0,
    z: 0,
    nx: -1,
    nz: 0
  }, {
    src: './test.jpg',
    x: -1500,
    y: 0,
    z: 0,
    nx: 1,
    nz: 0
  }];

  var diapo = [];
  var layers = [];
  var light;

  var screen = new Screen({
    container: document.querySelector('#canvas')
  });

  var displayObject = screen.displayObject;
  var ctx = screen.ctx;

  function Polygon(parent, face) {
    this.parent = parent;
    this.ctx = ctx;
    this.color = face.fill || false;
    this.points = [];
    if (!face.img) {
      for (var i = 0; i < 4; i++) {
        this.points[i] = new Point(parent.view.x + face.x[i] * parent.normalZ + face.z[i] * parent.normalX, parent.view.y + face.y[i], parent.view.z + face.x[i] * parent.normalX - face.z[i] * parent.normalZ);
      }
      this.points[3].next = false;
    }
  }

  Polygon.prototype.draw = function() {
    var color = this.color;
    if (color.light || !light) {
      var s = color.light ? this.parent.light : 1;
      light = 'rgba(' + Math.round(color.r * s) + ',' + Math.round(color.g * s) + ',' + Math.round(color.b * s) + ',' + (color.a || 1) + ')';
      ctx.fillStyle = light;
    }
    if (!color.light || this.parent.light < 1) {
      for (var i = 0; i < this.points.length; i++) {
        this.points[i].projection();
      }
      P.drawRect.call(this);
      ctx.fill();
    }
  };

  var camera = new Camera({
    focalLength: Math.sqrt(screen.width) * 8,
    speed: 0.05,
    rotation: 0.02,
    disableRz: true
  });

  camera.on('move', function() {
    if (displayObject.isDraging) {
      this.target.element = false;
      this.target.ry = -screen.displayObject.Xi * 0.01;
      this.target.rx = (displayObject.Y - screen.height * 0.5) / (screen.height * 0.5);
    } else {
      if (this.target.element) {
        this.target.ry = Math.atan2(this.target.element.view.x - this.x, this.target.element.view.z - this.z);
      }
    }
    this.target.rx *= 0.9;
  });
  camera.z = -10000;
  camera.py = 0;

  function Diapo(img) {
    this.img = new Background(this, img.src, 1, {
      isLoaded: function(img) {
        img.parent.isLoaded = true;
        img.parent.loaded(img);
      }
    });
    this.visible = false;
    this.normalX = img.nx;
    this.normalZ = img.nz;
    this.view = new Point(img.x, img.y, img.z);
    this.tx = img.x + img.nx * Math.sqrt(camera.focalLength) * 20;
    this.tz = img.z - img.nz * Math.sqrt(camera.focalLength) * 20;
    this.poly = [];
    for (var i = 0; i < structure.length; i++) {
      var p = structure[i];
      layers[i] = p.img === true ? 1 : 2;
      this.poly.push(new Polygon(this, p));
    }
  };
  Diapo.prototype.loaded = function(img) {
    var d = [-1, 1, 1, -1, 1, 1, -1, -1];
    var w = img.texture.width * 0.5;
    var h = img.texture.height * 0.5;
    for (var i = 0; i < 4; i++) {
      img.points[i] = new Point(this.view.x + w * this.normalZ * d[i], this.view.y + h * d[i + 4], this.view.z + w * this.normalX * d[i]);
    }
  };
  Diapo.prototype.draw = function() {
    this.view.projection();
    if (this.view.Z > -(camera.focalLength >> 1) && this.img.transform3D(true)) {
      this.light = 0.5 + Math.abs(this.normalZ * camera.cosY - this.normalX * camera.sinY) * 0.6;
      this.visible = true;
      this.img.draw();
      if (displayObject.hasMoved || displayObject.isDown) {
        if (this.img.isPointerInside(displayObject.X, displayObject.Y)) camera.over = this;
      }
    } else {
      this.visible = false;
    }
    return true;
  };

  var init = function() {
    var fps = 0;
    var quality = [1, 2];
    screen.on('resize', function() {
      console.log('resize');
    });
    screen.on('down', function() {
      console.log('down');
      if (camera.over) {
        if (camera.over === camera.target.element) {
          camera.target.x = 0;
          camera.target.z = 0;
          camera.target.element = false;
        } else {
          camera.target.element = camera.over;
          camera.target.x = camera.over.tx;
          camera.target.z = camera.over.tz;
          for (var i = 0; i < diapo.length; i++) {
            var d = diapo[i];
            var dx = camera.target.x - d.view.x;
            var dz = camera.target.z - d.view.z;
            var dist = Math.sqrt(dx * dx + dz * dz);
            var lev = dist > 1500 ? quality[0] : quality[1];
            d.img.setLevel(lev);
          }
        }
      }
    });
    screen.on('wheel', function() {
      console.log('wheel');
    });
    screen.on('up', function() {
      console.log('up');
    });
    screen.on('drag', function() {
      console.log('drag');
    });
    screen.on('startDrag', function() {
      console.log('startDrag');
    });

    for (var i = 0; i < imageData.length; i++) {
      var img = imageData[i];
      diapo.push(new Diapo(img));
    }

    setInterval(function() {
      quality = fps > 50 ? [2, 3] : [1, 2];
      fps = 0;
    }, 1000);
    var run = function() {
      ctx.clearRect(0, 0, screen.width, screen.height);
      camera.move();
      for (var k = 0; k < layers.length; k++) {
        var l = layers[k];
        light = false;
        for (var i = 0; i < diapo.length; i++) {
          var d = diapo[i];
          if (l === 1) {
            d.draw();
          } else {
            d.visible && d.poly[k].draw();
          }
        }
      }
      fps++;
      pillow.Animate.requestAnimateFrame(run);
    };
    run();
  };
  window.addEventListener('load', function() {
    init.call(this);
  }, false);
})(this, _pillow);
