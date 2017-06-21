/* global pillow */

;(function(global, P) {
  var Screen = P.Screen;
  var Timer = P.Timer;
  var FPSBoard = P.FPSBoard;

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
    container: document.querySelector('#screen'),
    width: 200,
    height: 100,
    x: 0,
    y: 0
  });

  var timer = new Timer({
    fps: 60
  });
  timer.update(function() {
    fpsBoard.tick();
    screen.run();
  });
  timer.start();

})(window, pillow);
