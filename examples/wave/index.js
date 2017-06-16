/* global pillow */

;(function(global, P) {
  var Screen = P.Screen;
  var Timer = P.Timer;

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
    screen.run();
  });
  timer.start();

})(window, pillow);
