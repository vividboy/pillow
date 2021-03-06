/* global pillow */

;(function(global, P) {
  var Util = P._;
  var CONFIG = global.CONFIG;
  var Screen = P.Screen;
  var Timer = P.Timer;
  var Mouse = P.Mouse;
  var Keyboard = P.Keyboard;
  var SourceLoader = P.SourceLoader;
  var Img = P.Img;
  var RenderObjectModel = P.RenderObjectModel;
  var Generator = global.Generator;
  var Resource = global.Resource;
  var Mario = global.Mario;
  var math = P.Math;
  var HEAD = document.head || document.getElementsByTagName('head')[0] || document.documentElement;

  function XDFsBlog() {
    var that = this;
    that.cnzz();
    if (!document.createElement('canvas').getContext) {
      return;
    }
    that.init();
  }
  var proto = {
    init: function() {
      var that = this;
      that.load();
    },
    start: function() {
      var that = this;
      that.mario.drop();
    },
    load: function() {
      var that = this;
      var loader = new SourceLoader();
      loader.load(Resource);
      loader.on('success', function(e) {
        that.initScreen();
        that.initBackground(e);
        that.initTree(e);
        that.initMap(e);
        that.initCloud(e);
        that.initMario(e);
        that.initMask();
        that.bind();
        that.start();
      });
    },
    initScreen: function() {
      var that = this;
      global.__screen = that.screen = new Screen({
        container: document.querySelector('#screen'),
        width: CONFIG['SCREENWIDTH'],
        height: CONFIG['SCREENHEIGHT'],
        x: 0,
        y: 0
      });
      that.screen.update(function() {
        var gradient = that.screen.context.createLinearGradient(0, 0, 0, CONFIG['SCREENHEIGHT']);
        gradient.addColorStop(0, '#00a4fd');
        gradient.addColorStop(1, '#e7f9fe');
        that.screen.context.fillStyle = gradient;
        that.screen.context.fillRect(0, 0, CONFIG['SCREENWIDTH'], CONFIG['SCREENHEIGHT']);
      });

      var timer = new Timer({
        fps: 60
      });
      timer.update(function() {
        that.screen.run();
      });
      timer.start();
    },
    initMario: function(resource) {
      var that = this;
      var r = resource['mario00'];
      that.mario = new Mario({
        size: {
          width: r.width,
          height: r.height
        },
        offset: {
          x: 0,
          y: 0
        },
        loop: true,
        image: r.image,
        matrix: that.map.matrix
      });
      Keyboard.run(function() {
        Keyboard.simulate();
      });
      Keyboard.RIGHT.down(function() {
        that.mario.forward();
      });
      Keyboard.UP.down(function() {
        that.mario.jump();
      });
      Keyboard.LEFT.down(function() {
        that.mario.backforward();
      });
      that.screen.on('mousedown', function(e) {
        that.mario.forward();
      });
      that.screen.append(that.mario);
    },
    initMap: function(resource) {
      var that = this;
      that.map = new Generator({
        resource: resource
      });
      that.screen.append(that.map);
    },
    initBackground: function(resource) {
      var that = this;
      var num = Math.ceil(CONFIG['SCREENWIDTH'] / resource['bg00'].width);
      for (var i = 0; i < num; i++) {
        var bgContainer = new RenderObjectModel({
          x: i * resource['bg00'].width,
          y: CONFIG['SCREENHEIGHT'] - CONFIG['CELL'] * 9,
          width: resource['bg00'].width,
          height: resource['bg00'].height
        });
        var bg = new Img({
          x: 0,
          y: 0,
          width: resource['bg00'].width,
          height: resource['bg00'].height,
          image: resource['bg00'].image
        });
        bgContainer.append(bg);
        that.screen.append(bgContainer);
      }
    },
    initCloud: function(resource) {
      var that = this;
      var cloudContainer1 = new RenderObjectModel({
        x: math.getRandom(10, 40),
        y: CONFIG['SCREENHEIGHT'] - CONFIG['CELL'] * 10,
        width: resource['cloud00'].width,
        height: resource['cloud00'].height
      });
      var cloud1 = new Img({
        x: 0,
        y: 0,
        width: resource['cloud00'].width,
        height: resource['cloud00'].height,
        image: resource['cloud00'].image
      });
      cloudContainer1.append(cloud1);
      var cloudContainer2 = new RenderObjectModel({
        x: math.getRandom(100, 400),
        y: CONFIG['SCREENHEIGHT'] - CONFIG['CELL'] * 10,
        width: resource['cloud01'].width,
        height: resource['cloud01'].height
      });
      var cloud2 = new Img({
        x: 0,
        y: 0,
        width: resource['cloud01'].width,
        height: resource['cloud01'].height,
        image: resource['cloud01'].image
      });
      cloudContainer2.append(cloud2);
      that.screen.append(cloudContainer1);
      that.screen.append(cloudContainer2);
      var cloudtimer = new Timer(function() {
        cloudContainer1.x += 0.1;
        cloudContainer2.x += 0.2;
      });
      cloudtimer.start();
    },
    initTree: function(resource) {
      var that = this;
      function selectTree(i) {
        switch (i) {
        case 0:
          return math.getRandom(200, 400);
        case 1:
          return CONFIG['SCREENWIDTH'] - resource['tree0' + i].width;
        case 2:
          return 2;
        case 3:
          return math.getRandom(CONFIG['SCREENWIDTH'] / 2, CONFIG['SCREENWIDTH'] / 2 + 100);
        }
      }
      for (var i = 0; i < 4; i++) {
        var container = new RenderObjectModel({
          x: selectTree(i),
          y: CONFIG['SCREENHEIGHT'] - CONFIG['CELL'] * 5,
          width: resource['tree0' + i].width,
          height: 25
        });
        var tree = new Img({
          x: 0,
          y: 0,
          width: resource['tree0' + i].width,
          height: resource['tree0' + i].height,
          image: resource['tree0' + i].image
        });
        container.append(tree);
        that.screen.append(container);
      }
    },
    initMask: function() {
    },
    bind: function() {
      var that = this;
      var m = new Mouse({
        screen: that.screen
      });
      console.log(m);
      global.addEventListener('resize', function() {
      });
    },
    cnzz: function() {
      var node = document.createElement('script');
      node.src = 'http://s4.cnzz.com/stat.php?id=1642323&web_id=1642323';
      node.async = true;
      HEAD.insertBefore(node, HEAD.firstChild);
    }
  };
  Util.augment(XDFsBlog, proto);
  var x = new XDFsBlog();
  console.log(x);
})(window, pillow);
