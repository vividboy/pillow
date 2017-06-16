/* global pillow */

(function(global, P) {
  var canvas = document.getElementById('particle_1');
  var WIDTH = canvas.width;
  var ctx = canvas.getContext('2d');
  var SourceLoader = P.SourceLoader;
  var Timer = P.Timer;

  function position(x, y) {
    return Math.round(x) - Math.round(y) * WIDTH;
  }

  function randomSpeed() {
    return parseInt(Math.random() * 6 - 2, 10);
  }

  var query = [];
  var start = false;
  var loader = new SourceLoader();
  var timer;

  loader.load([{
    id: 'avatar',
    src: 'avatar.png'
  }]);

  loader.on('success', function(e) {
    var source = e['avatar'].image;
    ctx.drawImage(source, 0, 0);
    var cache = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var temp = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = cache.data;
    var tempData = temp.data;

    var preprocess = function() {
      for (var i = 0; i < data.length; i++) {
        if (i % 4 === 3) {
          var x = parseInt(i / 4, 10);
          query.push({
            rgba: [data[i - 3], data[i - 2], data[i - 1], data[i]],
            x: x,
            y: -parseInt(x / WIDTH, 10),
            sx: randomSpeed(),
            sy: randomSpeed()
          });
        }
      }
    };

    preprocess();

    var handle = function() {
      if (start) {
        return;
      }
      start = true;

      timer = new Timer({
        fps: 60
      });
      timer.update(function() {
        for (var i = 0; i < query.length; i++) {
          var d = query[i];
          d.x += d.sx;
          d.y -= d.sy;
          var pos = position(d.x, d.y);
          tempData[pos * 4] = d.rgba[0];
          tempData[pos * 4 + 1] = d.rgba[1];
          tempData[pos * 4 + 2] = d.rgba[2];
          d.rgba === 0 ? d.rgba = 0 : d.rgba[3]--;
          tempData[pos * 4 + 3] = d.rgba[3];
        }
        ctx.putImageData(temp, 0, 0);
      });
      timer.start();
    };

    canvas.addEventListener('mouseenter', handle, false);

    setTimeout(function() {
      handle();
      setTimeout(function() {
        timer.toggle();
      }, 5000);
    }, 3000);

  });

})(window, pillow);

(function(global, P) {
  var canvas = document.getElementById('particle_2');
  var WIDTH = canvas.width;
  var HEIGHT = canvas.height;
  var FPSBoard = P.FPSBoard;
  var Graphics = P.Graphics;
  var Timer = P.Timer;
  var Screen = P.Screen;
  var math = P.Math;
  var RenderObjectModel = P.RenderObjectModel;

  var fpsBoard = new FPSBoard({
    container: '#container',
    width: 100,
    height: 60,
    boardColor: '#222',
    textColor: '#d2ff1d',
    containerStyles: {
      position: 'absolute'
    }
  });

  var screen = new Screen({
    container: canvas,
    width: WIDTH,
    height: HEIGHT,
    x: 0,
    y: 0
  });

  var container = new RenderObjectModel({
    x: 0,
    y: 0,
    width: 200,
    height: 200
  });

  var init = function() {
    container.removeAllChildren();

    var num = 200;
    var centerx = 300;
    var centery = 300;
    var radio1 = 120;
    var radio2 = 150;
    while (num--) {
      var width = 8;
      var height = 4;
      var color = 'red';
      var degrees = math.getRandom(0, 360);
      var rotation = math.getRandom(0, 360);

      var x = math.getRandom(centerx + radio1 * Math.sin(2 * Math.PI / 360 * degrees), centerx + radio2 * Math.sin(2 * Math.PI / 360 * degrees));
      var y = math.getRandom(centery - radio2 * Math.cos(2 * Math.PI / 360 * degrees), centery - radio1 * Math.cos(2 * Math.PI / 360 * degrees));

      var graphics = new Graphics({
        fillStyle: color,
        strokeStyle: color,
        rotation: rotation,
        degrees: degrees,
        scaleX: math.getRandom(0.5, 1),
        scaleY: math.getRandom(0.5, 1),
        speedx: math.getRandom(-1, 1),
        speedy: math.getRandom(0, 1),
        speedxv: math.getRandom(-1, 1) / 10,
        speedyv: math.getRandom(1, 2) / 10,
        delta: math.getRandom(20, 30) * (degrees > 270 ? degrees - 270 : degrees) / 60
      });

      graphics.rect(x, y, width, height);

      graphics.update(function() {
        if (this.degrees > 0 && this.degrees <= 90) {
          if (this.delta > 0) {
            this.y -= this.speedy * 0.5;
          } else {
            this.y += this.speedy;
          }
          this.x += this.speedx * 1.5;
          this.speedx += this.speedxv / 2;
          this.speedy += this.speedyv / 2;
          this.delta--;
        } else if (this.degrees > 270 && this.degrees <= 360) {
          if (this.delta > 0) {
            this.y -= this.speedy * 0.5;
          } else {
            this.y += this.speedy;
          }
          this.x -= this.speedx * 1.5;
          this.speedx += this.speedxv / 2;
          this.speedy += this.speedyv / 2;
          this.delta--;
        } else {
          this.x += this.speedx;
          this.y += this.speedy;
          this.speedx += this.speedxv;
          this.speedy += this.speedyv;
        }
      });
      container.append(graphics);
    }
  };
  screen.append(container);

  screen.update(function() {
  });

  var timer = new Timer({
  });

  timer.update(function() {
    screen.run();
    fpsBoard.tick();
  });

  setInterval(function() {
    init();
  }, 3000);

  timer.start();
})(window, pillow);
