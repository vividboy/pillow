/* global pillow */

; (function (global, P) {
  var RenderObjectModel = P.RenderObjectModel;
  var Img = P.Img;
  var Screen = P.Screen;
  var Sprite = P.Sprite;
  var Mouse = P.Mouse;
  var Timer = P.Timer;
  var math = P.Math;
  var FPSBoard = P.FPSBoard;
  var loader = new P.SourceLoader();
  var isFirst = true;
  var condition = 100;

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

  var CONFIG = {
    SCREENWIDTH: '320',
    SCREENHEIGHT: '458',
    GAP: '100'
  };

  var list = [{
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
  }, {
    id: 'pipeDown',
    src: 'images/pipe-down.png'
  }, {
    id: 'pipeUp',
    src: 'images/pipe-up.png'
  }];

  loader.on('loaded', function (e) {
    var process = e.number / list.length;
  });

  loader.on('success', function (i) {
    new Bird(i);
  });

  loader.load(list);

  function Bird(images) {
    this.stop = false;
    this.resource = images;
    this.init();
  }

  Bird.prototype = {
    init: function () {
      this.initScreen();
      this.initWelcome();
      this.initCeiling();
      this.initLand();
      this.initSky();
      this.initPipe();
      this.initBird();
      this.bind();
    },
    initScreen: function () {
      var that = this;
      this.screen = new Screen({
        container: document.querySelector('#screen'),
        width: CONFIG['SCREENWIDTH'],
        height: CONFIG['SCREENHEIGHT'],
        x: 0,
        y: 0
      });
      this.timer = new Timer();
      this.timer.update(function () {
        that.screen.run();
        fpsBoard.tick();
      });
      this.timer.start();
    },
    initCeiling: function () {
      var cellWidth = this.resource.ceiling.width;
      var cellHeight = this.resource.ceiling.height;
      var counter = 20 || Math.floor(CONFIG['SCREENWIDTH'] / cellWidth) + 100;
      while (counter--) {
        let container = new RenderObjectModel({
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
        container.update(function () {
          this.x--;
        });
        this.screen.append(container);
      }
    },
    initLand: function () {
      var cellWidth = this.resource.land.width;
      var cellHeight = this.resource.land.height;
      var counter = 20 || Math.floor(CONFIG['SCREENWIDTH'] / cellWidth) + 100;
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
        container.update(function () {
          this.x--;
        });
        this.screen.append(container);
      }
    },
    initSky: function () {
      var cellWidth = this.resource.sky.width;
      var cellHeight = this.resource.sky.height;
      var counter = 20 || Math.floor(CONFIG['SCREENWIDTH'] / cellWidth) + 100;
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
        container.update(function () {
          this.x--;
        });
        this.screen.append(container);
      }
    },
    initWelcome: function () {
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
    clearWelcome: function () {
      var cellWidth = this.resource.splash.width;
      var cellHeight = this.resource.splash.height;
      this.screen.removeChildren(0);
    },
    initBird: function () {
      var that = this;
      var cellWidth = this.resource.bird.width;
      var cellHeight = this.resource.bird.height;
      var container = this.birdContainer = new RenderObjectModel({
        x: (CONFIG['SCREENWIDTH'] - cellWidth) / 2 - 80,
        y: (CONFIG['SCREENHEIGHT'] - cellHeight) / 2 + 20,
        width: cellWidth,
        height: cellHeight / 4
      });
      // this.ySpeed = 1;
      // container.update(function() {
      //   if (that.stop) {
      //     return;
      //   }
      //   container.y += that.ySpeed;
      // });
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
      this.birdTimer = new Timer();
      this.birdTimer.update(function () {
        bird.next();
      });
      this.birdTimer.start();
      container.append(bird);
      this.screen.append(container);

      this.screen.on('mousedown', function () {
        if (isFirst) {
          that.clearWelcome();
          isFirst = false;
        }
      });
    },
    initPipe: function () {
      var that = this;
      var cellWidth = this.resource.pipe.width;
      var cellHeight = this.resource.pipe.height;
      var cellDownWidth = this.resource.pipeDown.width;
      var cellDownHeight = this.resource.pipeDown.height;
      var spaceHeight = math.min(cellHeight, CONFIG['SCREENHEIGHT'] - this.resource.ceiling.height - this.resource.land.height);
      var counter = 1;
      while (counter <= 20) {
        var containers = [];
        var random = math.getRandom(80, 230);
        var spaceLeft = spaceHeight - random - cellDownHeight - CONFIG['GAP'];
        var container = new RenderObjectModel({
          x: (CONFIG['SCREENWIDTH'] / 2) * counter,
          y: that.resource.ceiling.height,
          width: cellWidth,
          height: spaceHeight
        });
        var pipeDownContainer = new RenderObjectModel({
          x: (CONFIG['SCREENWIDTH'] / 2) * counter,
          y: random,
          width: cellWidth,
          height: cellHeight
        });
        var downContainer = new RenderObjectModel({
          x: (CONFIG['SCREENWIDTH'] / 2) * counter,
          y: spaceHeight - spaceLeft + cellDownHeight + that.resource.ceiling.height,
          width: cellWidth,
          height: spaceLeft - cellDownHeight
        });
        var pipeUpContainer = new RenderObjectModel({
          x: (CONFIG['SCREENWIDTH'] / 2) * counter,
          y: spaceHeight - spaceLeft + that.resource.ceiling.height,
          width: cellWidth,
          height: cellDownHeight
        });
        containers.push(container);  
        containers.push(pipeDownContainer);     
        containers.push(downContainer);
        containers.push(pipeUpContainer);
        var pipe = new Img({
          x: 0,
          y: 0,
          width: cellWidth,
          height: random,
          image: this.resource.pipe.image
        });
        var pipeDown = new Img({
          x: 0,
          y: 0,
          width: cellDownWidth,
          height: cellDownHeight,
          image: this.resource.pipeDown.image
        });
        var downPipe = new Img({
          x: 0,
          y: 0,
          width: cellWidth,
          height: spaceLeft - cellDownHeight,
          image: this.resource.pipe.image
        });
        var pipeUp  = new Img({
          x: 0,
          y: 0,
          width: cellDownWidth,
          height: cellDownHeight,
          image: this.resource.pipeUp.image
        });
        containers.forEach(container => {
          container.update(function () {
            if (that.stop) {
              return;
            }
            this.x--;
          });
        });
        container.append(pipe);
        pipeDownContainer.append(pipeDown);
        downContainer.append(downPipe);
        pipeUpContainer.append(pipeUp);
        this.screen.append(container);
        this.screen.append(pipeDownContainer);
        this.screen.append(downContainer);
        this.screen.append(pipeUpContainer);
        counter++;
      }
    },
    bind: function () {
      var that = this;
      var m = new Mouse({
        screen: that.screen
      });
    }
    // startround: function() {
    //   var that = this;
    //   new Timer(function() {
    //     if (that.welcomeContainer.alpha === 0) {
    //       return;
    //     }
    //     that.welcomeContainer.alpha -= 0.02;

    //     if (that.welcomeContainer.alpha <= 0) {
    //       that.welcomeContainer.alpha = 0;
    //     }
    //   }).start();
    //   that.stop = false;
    // },
    // jumpUp: function() {
    //   var that = this;
    //   this.ySpeed = -1;
    //   this.jump = setTimeout(function() {
    //     that.ySpeed = 2;
    //     clearTimeout(that.jump);
    //   }, 1000);
    // }
  };

})(window, pillow);