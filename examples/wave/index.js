/* global pillow */

;(function(global, P) {
  var Screen = P.Screen;
  var Timer = P.Timer;
  var Animate = P.Animate;
  var Tween = Animate.Tween;

  var screen = new Screen({
    container: document.querySelector('#screen'),
    width: 200,
    height: 100,
    x: 0,
    y: 0
  });

  var animate = new Animate({
    duration: 1000,
    timing: Tween.easeIn,
    delay: 0
  });
  animate.on('frame', function() {
  });
  animate.on('end', function() {
  });
  animate.start();
  animate.stop();

  var timer = new Timer({
    fps: 60
  });
  timer.update(function() {
    screen.run();
  });
  timer.start();

})(window, pillow);
