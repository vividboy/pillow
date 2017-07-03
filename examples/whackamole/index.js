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

  /*
  var audio = new Audio({
    id: 'audio',
    src: './audio.mp3'
  })*/

  var canvas = document.querySelector('#screen');
  var canvasW = window.innerWidth;
  var canvasH = window.innerHeight;
  canvas.width = canvasW;
  canvas.height = canvasH;
  var rate = canvasW / 750;

  console.log(rate);

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

  var genMole = function(data) {
    var resource = data.resource;
    var number = data.number;
    var offsetX = number % 3 * resource['back'].width * 2.2;
    var offsetY = resource['mole'].height * 4 * parseInt(number / 3, 10);
    var scale = 2 * rate / 2;
    var con = new RenderObjectModel({
      x: 20 + offsetX,
      y: 50 + offsetY,
      scaleX: scale,
      scaleY: scale,
      width: 100,
      height: 100
    });

    var backcon = new RenderObjectModel({
      x: 0,
      y: resource['mole'].height / 2,
      width: 100,
      height: 100
    });

    var back = new Img({
      x: 0,
      y: 0,
      width: resource['back'].width,
      height: resource['back'].height,
      image: resource['back'].image
    });

    backcon.append(back);

    var frontcon = new RenderObjectModel({
      x: 0,
      y: resource['back'].height + resource['mole'].height / 2,
      width: 100,
      height: 100
    });

    var front = new Img({
      x: 0,
      y: 0,
      width: resource['front'].width,
      height: resource['front'].height,
      image: resource['front'].image
    });

    frontcon.append(front);

    var molecon = new RenderObjectModel({
      x: (resource['front'].width - resource['mole'].width) / 2,
      y: 0,
      width: 100,
      height: 100
    });

    var mole = new Img({
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

    mole.on(isMobile ? 'touchstart' : 'mousedown', function() {
    });

    con.update(function() {
    });

    screen.append(con);
  };

  loader.on('success', function(resource) {

    var number = 9;
    while (number--) {
      genMole({
        resource: resource,
        number: number
      });
    }
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
