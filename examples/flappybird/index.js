/* global pillow */

;(function(global, P) {
  var RenderObjectModel = P.RenderObjectModel;
  var Img = P.Img;
  var Screen = P.Screen;
  var Sprite = P.Sprite;
  var Timer = P.Timer;
  var SourceLoader = new P.SourceLoader();
  var Event = {
    on: function(e, type, fn) {
      e.addEventListener(type, fn, false);
    },
    detach: function(e, type, fn) {
      e.removeEventListener(type, fn, false);
    }
  };

  var CONFIG = {
    SCREENWIDTH: '320',
    SCREENHEIGHT: '458'
  };

  SourceLoader.load([{
    id: 'ceiling',
    src: 'images/ceiling.png'
  }, {
    id: 'land',
    src: 'images/land.png'
  }, {
    id: 'splash',
    src: 'images/splash.png'
  }, {
    id: 'bird',
    src: 'images/bird.png'
  }, {
    id: 'sky',
    src: 'images/sky.png'
  }, {
    id: 'pipe',
    src: 'images/pipe.png'
  }]);

  SourceLoader.on('success', function(i) {
    global.sss = new Bird(i);
  });

  function Bird(images) {
    this.stop = true;
    this.resource = images;
    this.init();
  }

  Bird.prototype = {
    init: function() {
      this.initScreen();
      this.initCeiling();
      this.initLand();
      this.initSky();
      this.initWelcome();
      this.initPipe();
      this.initBird();
      this.bindEvent();
    },
    initScreen: function() {
      var that = this;
      this.screen = new Screen({
        container: document.querySelector('#screen'),
        width: CONFIG['SCREENWIDTH'],
        height: CONFIG['SCREENHEIGHT'],
        x: 0,
        y: 0
      });
      this.timer = new Timer({
        fps: 60
      });
      this.timer.update(function() {
        that.screen.run();
      });
      this.timer.start();
    },
    initCeiling: function() {
      var cellWidth = this.resource.ceiling.width;
      var cellHeight = this.resource.ceiling.height;
      var counter = Math.floor(CONFIG['SCREENWIDTH'] / cellWidth) + 100;
      while (counter--) {
        var container = new RenderObjectModel({
          x: counter * cellWidth,
          y: 0,
          width: CONFIG['SCREENWIDTH'],
          height: cellHeight
        });
        container.append(new Img({
          x: 0,
          y: 0,
          width: cellWidth,
          height: cellHeight,
          image: this.resource.ceiling.image
        }));
        container.update(function() {
          this.x--;
        });
        this.screen.append(container);
      }
    },
    initLand: function() {
      var cellWidth = this.resource.land.width;
      var cellHeight = this.resource.land.height;
      var counter = Math.floor(CONFIG['SCREENWIDTH'] / cellWidth) + 100;
      while (counter--) {
        var container = new RenderObjectModel({
          x: counter * cellWidth,
          y: CONFIG['SCREENHEIGHT'] - cellHeight,
          width: CONFIG['SCREENWIDTH'],
          height: cellHeight
        });
        container.append(new Img({
          x: 0,
          y: 0,
          width: cellWidth,
          height: cellHeight,
          image: this.resource.land.image
        }));
        container.update(function() {
          this.x--;
        });
        this.screen.append(container);
      }
    },
    initSky: function() {
      var cellWidth = this.resource.sky.width;
      var cellHeight = this.resource.sky.height;
      var counter = Math.floor(CONFIG['SCREENWIDTH'] / cellWidth) + 100;
      while (counter--) {
        var container = new RenderObjectModel({
          x: counter * cellWidth,
          y: CONFIG['SCREENHEIGHT'] - cellHeight - this.resource.land.height,
          width: CONFIG['SCREENWIDTH'],
          height: cellHeight
        });
        container.append(new Img({
          x: 0,
          y: 0,
          width: cellWidth,
          height: cellHeight,
          image: this.resource.sky.image
        }));
        container.update(function() {
          this.x--;
        });
        this.screen.append(container);
      }
    },
    initWelcome: function() {
      var cellWidth = this.resource.splash.width;
      var cellHeight = this.resource.splash.height;
      var container = new RenderObjectModel({
        x: (CONFIG['SCREENWIDTH'] - cellWidth) / 2,
        y: (CONFIG['SCREENHEIGHT'] - cellHeight) / 3,
        width: cellWidth,
        height: cellHeight
      });
      var welcomeContainer = this.welcomeContainer = new Img({
        x: 0,
        y: 0,
        width: cellWidth,
        height: cellHeight,
        image: this.resource.splash.image
      });
      container.append(welcomeContainer);
      this.screen.append(container);
    },
    initBird: function() {
      var that = this;
      var cellWidth = this.resource.bird.width;
      var cellHeight = this.resource.bird.height;
      var container = this.birdContainer = new RenderObjectModel({
        x: (CONFIG['SCREENWIDTH'] - cellWidth) / 2 - 80,
        y: (CONFIG['SCREENHEIGHT'] - cellHeight) / 2 + 20,
        width: cellWidth,
        height: cellHeight / 4
      });
      this.ySpeed = 1;
      container.update(function() {
        if (that.stop) {
          return;
        }
        container.y += that.ySpeed;
      });
      var bird = new Sprite({
        x: 0,
        y: 0,
        size: {
          width: cellWidth,
          height: cellHeight
        },
        width: cellWidth,
        height: cellHeight / 4,
        loop: true,
        image: this.resource.bird.image
      });
      new Timer(function() {
        bird.next();
      }, 10).start();
      container.append(bird);
      this.screen.append(container);
    },
    initPipe: function() {
      var that = this;
      var cellWidth = this.resource.pipe.width;
      var cellHeight = this.resource.pipe.height;
      var container = new RenderObjectModel({
        x: CONFIG['SCREENWIDTH'],
        y: 0,
        width: cellWidth,
        height: cellHeight
      });
      container.update(function() {
        if (that.stop) {
          return;
        }
        this.x--;
      });
      var pipe = new Img({
        x: 0,
        y: 0,
        width: cellWidth,
        height: cellHeight,
        image: this.resource.pipe.image
      });
      container.append(pipe);
      this.screen.append(container);
    },
    startround: function() {
      var that = this;
      new Timer(function() {
        if (that.welcomeContainer.alpha === 0) {
          return;
        }
        that.welcomeContainer.alpha -= 0.02;

        if (that.welcomeContainer.alpha <= 0) {
          that.welcomeContainer.alpha = 0;
        }
      }).start();
      that.stop = false;
    },
    jumpUp: function() {
      var that = this;
      this.ySpeed = -1;
      this.jump = setTimeout(function() {
        that.ySpeed = 2;
        clearTimeout(that.jump);
      }, 1000);
    },
    bindEvent: function() {
      var that = this;
      Event.on(this.screen.target, 'click', function() {
        if (that.stop) {
          that.startround();
        } else {
          that.jumpUp();
        }
      });
    }
  };

})(window, pillow);
