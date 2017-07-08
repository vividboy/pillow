/* global pillow */

;(function(global, P) {
  var isMobile = /iPhone|iPad|iPod|Android|BlackBerry|BB10|Silk|Mobi/i.test(navigator.userAgent);
  var Screen = P.Screen;
  var Timer = P.Timer;
  var FPSBoard = P.FPSBoard;
  var RenderObjectModel = P.RenderObjectModel;
  var loader = new P.SourceLoader();
  var Img = P.Img;
  var Mouse = P.Mouse;
  var Audio = P.Audio;
  var isDebug = false;
  var math = P.Math;

  var audio = new Audio({
    id: 'audio',
    src: './audio.mp3'
  });

  Audio.Base.enableIOS();

  var canvas = document.querySelector('#screen');
  var canvasW = window.innerWidth;
  var canvasH = window.innerHeight;
  canvas.width = canvasW;
  canvas.height = canvasH;
  var singleWidth = canvasW / 3;

  var fpsBoard = new FPSBoard({
    container: 'body',
    width: canvasW / 5,
    height: canvasW / 10,
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

  var queue = [];

  var genMole = function(data) {
    var resource = data.resource;
    var number = data.number;
    var rate = resource['mole'].width / singleWidth;

    if (rate < 1) {
      rate = 0.4;
    }
    var offsetY = (singleWidth - (resource['mole'].height + resource['front'].height) * rate) / 2;

    var scale = 1;
    var con = new RenderObjectModel({
      debug: isDebug,
      x: number % 3 * singleWidth,
      y: singleWidth * parseInt(number / 3, 10),
      scaleX: scale,
      scaleY: scale,
      width: singleWidth,
      height: singleWidth,
      number: number
    });

    var backcon = new RenderObjectModel({
      debug: isDebug,
      x: (singleWidth - resource['back'].width * rate) / 2,
      y: resource['mole'].height / 2 * rate + offsetY,
      scaleX: rate,
      scaleY: rate,
      width: resource['back'].width,
      height: resource['back'].height
    });

    var back = new Img({
      debug: isDebug,
      x: 0,
      y: 0,
      width: resource['back'].width,
      height: resource['back'].height,
      image: resource['back'].image
    });

    backcon.append(back);

    var frontcon = new RenderObjectModel({
      debug: isDebug,
      x: (singleWidth - resource['front'].width * rate) / 2,
      y: (resource['back'].height + resource['mole'].height / 2) * rate + offsetY,
      scaleX: rate,
      scaleY: rate,
      width: resource['front'].width,
      height: resource['front'].height
    });

    var front = new Img({
      debug: isDebug,
      x: 0,
      y: 0,
      width: resource['front'].width,
      height: resource['front'].height,
      image: resource['front'].image
    });

    frontcon.append(front);

    var molecon = new RenderObjectModel({
      debug: isDebug,
      x: (singleWidth - resource['mole'].width * rate) / 2,
      y: offsetY,
      originY: offsetY,
      scaleX: rate,
      scaleY: rate,
      width: resource['mole'].width,
      height: resource['mole'].height,
      isUp: false,
      offsetTop: 4,
      offsetBottom: -5
    });

    var mole = new Img({
      debug: isDebug,
      x: 0,
      y: 0,
      width: resource['mole'].width,
      height: resource['mole'].height,
      image: resource['mole'].image
    });

    molecon.append(mole);

    con.append(backcon);
    con.append(molecon);
    con.append(frontcon);

    con.on(isMobile ? 'touchstart' : 'mousedown', function() {
      document.querySelector('#message').innerHTML = `I am number ${this.number + 1}`;
      audio.play();
    });

    con.update(function() {
    });

    screen.append(con);

    return molecon;
  };

  loader.on('success', function(resource) {

    var number = 9;
    while (number--) {
      var molecon = genMole({
        resource: resource,
        number: number
      });
      queue.push(molecon);
    }

    queue.forEach(item => {
      setTimeout(() => {
        item.update(function() {
          if (this.originY - this.y > this.offsetTop) {
            this.isUp = false;
          } else if (this.originY - this.y < this.offsetBottom) {
            this.isUp = true;
          }
          if (this.isUp) {
            this.y--;
          } else {
            this.y++;
          }
        });
      }, math.getRandom(1, 2000));
    });

  });

  loader.load([{
    id: 'back',
    src: './back.png'
  }, {
    id: 'front',
    src: './front.png'
  }, {
    id: 'mole',
    src: './mole.png'
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
