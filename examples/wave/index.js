/* global pillow */

;(function(global, P) {
  var Screen = P.Screen;
  var Timer = P.Timer;
  var FPSBoard = P.FPSBoard;
  var Mouse = P.Mouse;
  var Vector2d = P.Vector2d;
  var math = P.Math;

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

  var timer = new Timer();

  var container = document.getElementById('container');
  var canvas = document.getElementById('screen');
  var canvasW = container.clientWidth;
  var canvasH = 200;
  canvas.width = canvasW;
  canvas.height = canvasH;

  var color = '#4fb3fe';
  var query = [];
  var points = [];
  const diff = 500;
  const max = 10;
  const v = 0.25;
  const delta = 0.01;
  var diffdelta = diff;
  var clientx = 150;

  for (var i = 0; i < canvasW; i++) {
    var x = i;
    var y = canvasH / 3;
    var baseY = canvasH / 3;
    var vector = new Vector2d(x, y);
    vector.baseY = baseY;
    vector.v = 0;
    vector.temp = 0;
    vector.update = function(diff) {
      this.temp = diff + this.baseY;
      this.v += this.temp - this.y;
      this.v *= 0.8;
      this.y += this.v * 0.1;
    };
    query[i] = vector;
    points[i] = 0;
  }

  var screen = new Screen({
    x: 0,
    y: 0,
    container: canvas,
    width: canvasW,
    height: canvasH
  });

  screen.update(function() {
    diffdelta *= v;
    points[clientx] = diffdelta;

    for (let i = clientx - 1; i > 0; i--) {
      let current = clientx - i;

      if (current > max) {
        current = max;
      }
      points[i] -= (points[i] - points[i + 1]) * (1 - delta * current);
    }

    for (let i = clientx; i < canvasW; i++) {
      let current = i - clientx;

      if (current > max) {
        current = max;
      }
      points[i] -= (points[i] - points[i - 1]) * (1 - delta * current);
    }

    for (let i = 0; i < query.length; i++) {
      query[i].update(points[i]);
    }

    this.context.beginPath();
    this.context.moveTo(0, canvasH);
    this.context.fillStyle = color;

    for (var i = 0; i < query.length; i++) {
      this.context.lineTo(query[i].x, query[i].y);
    }

    this.context.lineTo(canvasW, canvasH);
    this.context.fill();
  });

  var clickHandle = function(e) {
    var x = e.client.x;
    diffdelta = diff;
    clientx = x >> 0;
    points[clientx] = diffdelta;
  };

  screen.on('mousedown', clickHandle);
  screen.on('touchstart', clickHandle);

  var mouse = new Mouse({
    screen: screen
  });

  console.log(mouse);

  timer.update(function() {
    screen.run();
    fpsBoard.tick();
  });

  timer.start();

  setInterval(function() {
    diffdelta = diff;
    clientx = math.getRandom(0, canvasW) >> 0;
    points[clientx] = diffdelta;
  }, 1000);

})(window, pillow);
