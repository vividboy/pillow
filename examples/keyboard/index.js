/* global pillow */

;(function(global, P) {
  var Screen = P.Screen;
  var Timer = P.Timer;
  var Text = P.Text;
  var Keyboard = P.Keyboard;

  var screen = new Screen({
    container: document.querySelector('#screen'),
    width: 200,
    height: 100,
    x: 0,
    y: 0
  });

  var text = new Text({
    x: 10,
    y: 10,
    width: 100,
    height: 100,
    text: 'keyboard'
  });

  screen.append(text);

  var timer = new Timer({
    fps: 60
  });
  timer.update(function() {
    screen.run();
  });
  timer.start();

  Keyboard.run(function() {
    Keyboard.simulate();
  });
  Keyboard.RIGHT.down(function() {
    text.text = 'keyCode: ' + this.keyCode;
  });
  Keyboard.UP.down(function() {
    text.text = 'keyCode: ' + this.keyCode;
  });
  Keyboard.LEFT.down(function() {
    text.text = 'keyCode: ' + this.keyCode;
  });
})(window, pillow);
