/* global pillow */

;(function(global, P) {
  var isMobile = /iPhone|iPad|iPod|Android|BlackBerry|BB10|Silk|Mobi/i.test(navigator.userAgent);
  var Screen = P.Screen;
  var Timer = P.Timer;
  var FPSBoard = P.FPSBoard;
  var RenderObjectModel = P.RenderObjectModel;
  var loader = new P.SourceLoader();
  var math = P.Math;
  var Img = P.Img;
  var Mouse = P.Mouse;

  var canvas = document.querySelector('#screen');
  var canvasW = window.innerWidth;
  var canvasH = window.innerHeight;
  canvas.width = canvasW;
  canvas.height = canvasH;

  var fpsBoard = new FPSBoard({
    container: 'body',
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
    width: canvasW,
    height: canvasH,
    x: 0,
    y: 0
  });

  var mouse = new Mouse({
    screen: screen
  });

  console.log(mouse);

  screen.update(function() {
  });

  loader.on('success', function(resource) {

    var number = 10;
    while (number--) {
      var x = math.getRandom(canvasW / 4, canvasW / 4 * 3);
      var y = math.getRandom(canvasW / 4, canvasW / 4 * 3);
      var alpha = math.getRandom(0, 100) / 100;
      var speed = math.getRandom(1, 5);
      var scaleX = math.getRandom(0, 100) / 200;
      var speedv = math.getRandom(1, 5) / 100;
      var container = new RenderObjectModel({
        debug: true,
        x: x,
        y: y,
        width: 100,
        height: 100
      });

      var image = new Img({
        debug: true,
        x: 0,
        y: 0,
        scaleX: scaleX,
        scaleY: scaleX,
        width: resource['image'].width,
        height: resource['image'].height,
        image: resource['image'].image,
        alpha: alpha,
        speed: speed,
        speedv: speedv,
        scalev: 0.01
      });

      container.on(isMobile ? 'touchstart' : 'mousedown', function() {
        this.removeFromParent();
      });

      image.update(function() {
        if (this.speed <= 0) {
          this.speed += this.speedv;
        } else if (this.speed > 20) {
          this.speed -= this.speedv;
        }
        this.rotation += this.speed;
        if (this.scaleX >= 1 || this.scaleX <= 0) {
          this.scalev = -this.scalev;
        }
        this.scaleX += this.scalev;
        this.scaleY += this.scalev;
      });

      container.append(image);
      screen.append(container);
    }
  });

  loader.load([{
    id: 'image',
    src: '//avatars0.githubusercontent.com/u/9263023?v=3&s=400'
  }, {
    id: 'image1',
    src: '//avatars0.githubusercontent.com/u/9263023?v=3&s=400'
  }]);

  var timer = new Timer({
    fps: 60
  });
  timer.update(function() {
    fpsBoard.tick();
    screen.run();
  });
  timer.start();

})(window, pillow);
