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
  var Timer = P.Timer;
  var Screen = P.Screen;
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
    height: 200,
    scaleX: 0,
    scaleY: 0,
    rotation: 0
  });

  screen.append(container);

  screen.update(function() {

  });

  var timer = new Timer();

  timer.update(function() {
    screen.run();
    fpsBoard.tick();
  });

  timer.start();
})(window, pillow);
