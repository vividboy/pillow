var pillow =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 19);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

'use strcit';

/**
 * @class pillow._ Utils.
 * @param {Object} options An object literal containing one or more of the following optional properties:
 */

var _ = {
  create: function create(o) {
    if (Object.create) {
      return Object.create(o);
    } else {
      var F = function F() {};
      F.prototype = o;
      return new F();
    }
  },
  guid: function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0;
      var v = c === 'x' ? r : r & 0x3 | 0x8;
      return v.toString(16);
    });
  },
  extend: function extend() {
    var args = this.slice.call(arguments);
    var object = args.shift();
    for (var i = 0, l = args.length; i < l; i++) {
      var props = args[i];
      for (var key in props) {
        object[key] = props[key];
      }
    }
    return object;
  },
  inherit: function inherit(sub, sup) {
    var temp = sub.prototype;
    sub.prototype = this.create(sup.prototype);
    for (var i in temp) {
      sub.prototype[i] = temp[i];
    }
    sub.prototype.constructor = sub;
    sub.sup = sup;
  },
  augment: function augment(r, s) {
    this.each(s, function (v, k) {
      r.prototype[k] = v;
    });
  },
  log: function log(l) {
    console && this.type(console.log) === 'function' && console.log(l);
  },
  indexOf: function indexOf(arr, val) {
    if (arr.indexOf) {
      return arr.indexOf(val);
    }
    var i;
    var len = arr.length;
    for (i = 0; i < len; i++) {
      if (arr[i] === val) {
        return i;
      }
    }
    return -1;
  },
  merge: function merge(r, s) {
    for (var i in s) {
      r[i] = s[i];
    }
    return r;
  },
  each: function each(object, fn) {
    if (!object) {
      return;
    }
    for (var i in object) {
      if (object.hasOwnProperty(i)) {
        fn.call(this, object[i], i);
      }
    }
    return object;
  },
  pushUnique: function pushUnique(arr, val) {
    if (this.indexOf(arr, val) === -1) {
      arr.push(val);
      return true;
    }
    return false;
  },
  removeValue: function removeValue(arr, val) {
    var index = this.indexOf(arr, val);
    if (index !== -1) {
      return arr.splice(index, 1)[0];
    }
  },
  type: function type(c) {
    if (c === null || typeof c === 'undefined') {
      return String(c);
    } else {
      return Object.prototype.toString.call(c).replace(/\[object |\]/g, '').toLowerCase();
    }
  },
  transpose: function transpose(obj) {
    var transpose = {};
    this.each(obj, function (val, key) {
      transpose[val] = key;
    });
    return transpose;
  },
  slice: Array.prototype.slice,
  requestAnimationFrame: global.requestAnimationFrame || global.webkitRequestAnimationFrame || global.mozRequestAnimationFrame || function (callback) {
    global.setTimeout(callback, 1000 / 60);
  },
  bindEvent: function bindEvent(e, handler) {
    if (global.addEventListener) {
      global.addEventListener(e, handler, false);
    } else if (document.attachEvent) {
      document.attachEvent('on' + e, handler);
    }
  }
};

module.exports = _;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var RenderObject = __webpack_require__(20);

/**
 * @class pillow.RenderObjectModel RenderObjectModel.
 * @param {Object} options An object literal containing one or more of the following optional properties:
 * <li><tt>x</tt></li>
 * <li><tt>y</tt></li>
 * <li><tt>width</tt></li>
 * <li><tt>height</tt></li>
 * <li><tt>alpha</tt></li>
 * <li><tt>scaleX</tt></li>
 * <li><tt>scaleY</tt></li>
 * <li><tt>rotation</tt></li>
 * <li><tt>angle</tt></li>
 * <li><tt>visible</tt></li>
 * <li><tt>debug</tt></li>
 */

function RenderObjectModel(cfg) {
  var that = this;
  RenderObjectModel.sup.call(that, cfg);
  that.children = [];
  that.parent = null;
  _.merge(that, cfg);
}

var proto = {
  render: function render(context) {
    var that = this;
    that.clear(0, 0, that.width, that.height);
    that._draw(that.context);
  },
  prepend: function prepend(node) {
    var that = this;
    node.parent = that;
    that.children.unshift(node);
  },
  append: function append(node) {
    var that = this;
    node.parent = that;
    that.children[that.children.length] = node;
  },
  removeChildren: function removeChildren(index) {
    if (this.children[index]) {
      this.children.splice(index, 1);
    }
  },
  removeAllChildren: function removeAllChildren() {
    this.children = [];
  },
  removeFromParent: function removeFromParent() {
    var that = this;
    if (that.parent) {
      _.each(this.parent.children, function (child, index) {
        if (child === that) {
          that.parent.removeChildren(index);
        }
      });
    }
  },
  traversal: function traversal(callback) {
    var node = this;
    var current;
    var children;
    var nodes = _.type(node) === 'array' ? node.slice(0).reverse() : [node];
    var parents = [];

    if (_.type(nodes[0]) === 'undefined' && nodes.length === 1) {
      return;
    }
    for (var i = nodes.length - 1; i >= 0; i--) {
      parents.push(null);
    }
    while (nodes.length > 0) {
      current = nodes.pop();
      parents.pop();
      callback(current);
      children = current && current['children'] ? current['children'] : [];

      for (var i = children.length - 1; i >= 0; i--) {
        nodes.push(children[i]);
        parents.push(current);
      }
    }
  },
  dispatch: function dispatch(type, x, y) {
    var that = this;
    var children = that.children;
    var i = children.length;
    var _x = x - that.x;
    var _y = y - that.y;
    that.emit(type);
    while (i--) {
      var child = children[i];
      if (child.hitTest && child.hitTest(_x, _y)) {
        child.dispatch(type, _x, _y);
        return;
      }
    }
  },
  hitTest: function hitTest(x, y) {
    var that = this;
    return x >= that.x && x <= that.x + that.width && y >= that.y && y <= that.y + that.height;
  }
};

_.augment(RenderObjectModel, proto);
_.inherit(RenderObjectModel, RenderObject);

module.exports = RenderObjectModel;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

;(function (root, factory) {
  'use strict';
  if (true) {
    return !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== 'undefined') {
    return factory(exports);
  } else {
    factory(root['Monitor'] || (root['Monitor'] = {}));
  }
})(undefined, function (exports, undefined) {
  'use strict';

  function Timer(options) {
    var opts = options || {};
    opts.fps = opts.fps || 60;
    this.options = opts;
    this._queue = [];
    this._paused = false;
    this._now = null;
    this._fps = -1;
    this._interval = 1000 / opts.fps;
  }

  Timer.prototype.update = function (handle) {
    this._queue.push(handle.bind(this));
  };

  Timer.prototype.start = function () {
    var targetTime = new Date().getTime() + this._interval;
    var loop = (function () {
      var that = this;
      this._now = this._now || +new Date();
      var now = +new Date();

      if (now - this._now >= 1000) {
        this._now = now;
        this._fps = -1;
      }

      var nowTime = new Date().getTime();

      if (nowTime >= targetTime) {

        if (nowTime >= targetTime + this._interval) {
          targetTime = nowTime + this._interval;
        } else {
          targetTime += this._interval;
        }
        this._fps++;

        if (!this._paused) {
          this._queue.forEach(function (handle) {
            handle();
          });
        }
      }

      requestAnimationFrame(loop);
    }).bind(this);
    loop();
  };

  Timer.prototype.stop = function () {
    this._paused = true;
  };

  Timer.prototype.toggle = function () {
    this._paused = !this._paused;
  };

  var render = function render() {
    var fps = this._fps;
    var context = this._context;
    setTimeout((function () {
      var textHeight = 8;
      var padding = 2;
      var paddingTop = textHeight + padding * 2;
      var height = (this.options.height - paddingTop) * fps / 60;
      context.globalAlpha = this.options.alpha;
      context.fillStyle = this.options.boardColor;
      context.clearRect(0, 0, this.options.width, this.options.height);
      context.fillRect(0, 0, this.options.width, this.options.height);
      context.font = padding + 'px';
      context.fillStyle = this.options.textColor;
      context.fillText('fps: ' + fps, padding, textHeight + padding);
      context.fillRect(this.options.width - 1, this.options.height - height, 1 * this._pixelRatio, height);
      this._imgData && context.putImageData(this._imgData, 0, paddingTop * this._pixelRatio);
      this._imgData = context.getImageData(1 * this._pixelRatio, paddingTop * this._pixelRatio, (this.options.width - 1) * this._pixelRatio, (this.options.height - paddingTop) * this._pixelRatio);
    }).bind(this), 16);
  };

  var create = function create() {
    var canvas = document.createElement('canvas');
    var width = this.options.width;
    var height = this.options.height;
    canvas.style.cssText = 'width:' + width + 'px;height:' + height + 'px;';
    canvas.width = width * this._pixelRatio;
    canvas.height = height * this._pixelRatio;

    var context = canvas.getContext('2d');
    context.scale(this._pixelRatio, this._pixelRatio);

    var container = document.createElement('div');
    var styles = {
      position: 'fixed',
      top: 0,
      right: 0,
      cursor: 'pointer',
      'z-index': 999999
    };

    Object.assign(styles, this.options.containerStyles);

    Object.keys(styles).forEach(function (key) {
      container.style.cssText += key + ':' + styles[key];
    });

    container.addEventListener('click', function (e) {
      e.preventDefault();
    }, false);

    container.appendChild(canvas);
    this.options.container.appendChild(container);
    return context;
  };

  function FPSBoard(options) {
    var opts = options || {};
    opts.container = document.querySelector(opts.container) || document.body;
    opts.width = opts.width || 80;
    opts.height = opts.height || 48;
    opts.alpha = opts.alpha || 0.9;
    opts.boardColor = opts.boardColor || 'grey';
    opts.textColor = opts.textColor || 'red';
    opts.containerStyles = opts.containerStyles || {};
    this.options = opts;
    this._now = null;
    this._fps = 0;
    this._imgData = null;
    this._pixelRatio = Math.floor(window.devicePixelRatio) || 1;
    this._context = create.call(this);
  }

  FPSBoard.prototype.tick = function () {
    this._now = this._now || +new Date();
    var now = +new Date();

    if (now - this._now >= 1000) {
      render.call(this);
      this._now = now;
      this._fps = 0;
    }

    this._fps++;
  };

  function Monitor() {}

  exports.Timer = Monitor.Timer = Timer;
  exports.FPSBoard = Monitor.FPSBoard = FPSBoard;
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var RenderObjectModel = __webpack_require__(1);

/**
 * @class pillow.Img Img.
 * @param {Object} options An object literal containing one or more of the following optional properties:
 * <li><tt>x</tt></li>
 * <li><tt>y</tt></li>
 * <li><tt>width</tt></li>
 * <li><tt>height</tt></li>
 * <li><tt>alpha</tt></li>
 * <li><tt>scaleX</tt></li>
 * <li><tt>scaleY</tt></li>
 * <li><tt>rotation</tt></li>
 * <li><tt>angle</tt></li>
 * <li><tt>visible</tt></li>
 * <li><tt>debug</tt></li>
 */

function Img(cfg) {
  var that = this;
  Img.sup.call(that, cfg);
  _.merge(that, cfg);
}

var proto = {
  draw: function draw() {
    var that = this;
    var currentFrame = that.getCurrentFrame ? that.getCurrentFrame() : null;
    var x = currentFrame ? currentFrame.x : that.x;
    var y = currentFrame ? currentFrame.y : that.y;
    that.context.drawImage(that.image, x, y, that.width, that.height, 0, 0, that.width, that.height);
  },
  hitTest: function hitTest(x, y) {
    var that = this;
    return x >= that.x && x <= that.x + that.width && y >= that.y && y <= that.y + that.height;
  }
};

_.augment(Img, proto);
_.inherit(Img, RenderObjectModel);

module.exports = Img;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var g;

// This works in non-strict mode
g = (function () {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);

function __emit(type, data) {
  var handlers = _.slice.call(this.NotifyHash[type]);
  for (var i = 0, l = handlers.length; i < l; i++) {
    var j = _.extend({}, handlers[i]);
    var scope = j.scope ? j.scope : this;
    j.scope = scope;
    j.handler.call(j.scope, data, j);
  }
};
function __detach(type) {
  var handlers = this.NotifyHash;
  if (type) {
    delete handlers[type];
  } else {
    this.NotifyHash = {};
  }
};
function __bind(key, handle) {
  var events = key.split(' ');
  for (var i = 0, l = events.length; i < l; i++) {
    var t = events[i];
    if (!this.NotifyHash[t]) {
      this.NotifyHash[t] = [];
    }
    this.NotifyHash[t].push({
      handler: handle,
      type: t
    });
  }
}

function Notify() {
  this.DataHash = {};
  this.NotifyHash = {};
}

Notify.prototype = {
  on: function on(arg1, arg2) {
    if (_.type(arg1) === 'object') {
      for (var j in arg1) {
        __bind.call(this, j, arg1[j]);
      }
    } else {
      __bind.call(this, arg1, arg2);
    }
    return this;
  },
  emit: function emit(types, data) {
    var items = types.split(' ');
    for (var i = 0, l = items.length; i < l; i++) {
      var type = items[i];
      if (this.NotifyHash[type]) {
        __emit.call(this, type, _.type(data) === 'undefined' ? null : data);
      }
    }
    return this;
  },
  detach: function detach() {
    __detach.apply(this, arguments);
    return this;
  },
  set: function set(id, value) {
    this.DataHash[id] = value;
  },
  get: function get(id) {
    return this.DataHash[id];
  },
  has: function has(id) {
    return !!this.DataHash[id];
  },
  all: function all() {
    return this.DataHash;
  },
  remove: function remove(id) {
    if (this.DataHash[id]) {
      delete this.DataHash[id];
    }
  }
};

module.exports = Notify;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = {
	"name": "pillowjs",
	"version": "1.1.14",
	"description": "HTML5 2D rendering engine",
	"repository": {
		"type": "git",
		"url": "https://github.com/xudafeng/pillow.git"
	},
	"keywords": [
		"canvas"
	],
	"main": "./dist/index.js",
	"homepage": "https://xudafeng.github.com/pillow",
	"precommit": [
		"lint"
	],
	"scripts": {
		"lint": "eslint ./src ./examples",
		"doc": "rm -rf ./docs/ && jsdoc -c ./jsdoc.json",
		"build": "webpack && babel src/ --out-dir dist/",
		"server": "startserver -p 8081 -s -m",
		"test": "node ./test/pillow.test.js",
		"prepublish": "npm run build"
	},
	"dependencies": {
		"monitor.js": "^1.0.5"
	},
	"devDependencies": {
		"babel": "~5.8.23",
		"babel-core": "^5.x",
		"babel-loader": "^5.x",
		"eslint": "^4.0.0",
		"jsdoc": "3.4.0",
		"json-loader": "^0.5.2",
		"jsx-loader": "^0.13.2",
		"mocha": "^3.4.2",
		"node-libs-browser": "^2.0.0",
		"pre-commit": "^1.2.2",
		"should": "*",
		"startserver": "^1.3.7",
		"startserver-webpack": "^1.0.2",
		"uitest": "^1.1.4",
		"webpack": "^2.6.1"
	},
	"startserver": [
		{
			"startserver-webpack": "*"
		}
	],
	"license": "MIT"
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var _ = __webpack_require__(0);

var noop = function noop() {};

var KEYS = {
  A: 65,
  B: 66,
  C: 67,
  D: 68,
  E: 69,
  F: 70,
  G: 71,
  H: 72,
  I: 73,
  J: 74,
  K: 75,
  L: 76,
  M: 77,
  N: 78,
  O: 79,
  P: 80,
  Q: 81,
  R: 82,
  S: 83,
  T: 84,
  U: 85,
  V: 86,
  W: 87,
  X: 88,
  Y: 89,
  Z: 90,
  ZERO: 48,
  ONE: 49,
  TWO: 50,
  THREE: 51,
  FOUR: 52,
  FIVE: 53,
  SIX: 54,
  SEVEN: 55,
  EIGHT: 56,
  NINE: 57,
  F1: 112,
  F2: 113,
  F3: 114,
  F4: 115,
  F5: 116,
  F6: 117,
  F7: 118,
  F8: 119,
  F9: 120,
  F10: 121,
  F11: 122,
  F12: 123,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  BACKSPACE: 8,
  TAB: 9,
  ENTER: 13,
  SHIFT: 16,
  CTRL: 17,
  ALT: 18,
  ESC: 27,
  SPACE: 32
};

var _KEYS = _.transpose(KEYS);

var keysDown = [];

var handleWrapper = function handleWrapper(key, handlerName, opt_handler) {
  if (opt_handler) {
    key[handlerName] = opt_handler;
  } else {
    key[handlerName]();
  }
};

function Key(keyCode) {
  this.keyCode = keyCode;
}

var proto = {
  _downHandler: noop,
  _upHandler: noop,
  _pressHandler: noop,
  isDown: function isDown() {
    return _.indexOf(keysDown, this.keyCode) !== -1;
  },
  down: function down(opt_handler) {
    handleWrapper(this, '_downHandler', opt_handler);
  },
  up: function up(opt_handler) {
    handleWrapper(this, '_upHandler', opt_handler);
  },
  press: function press(opt_handler) {
    handleWrapper(this, '_pressHandler', opt_handler);
  },
  unbindDown: function unbindDown() {
    this._downHandler = noop;
  },
  unbindUp: function unbindUp() {
    this._upHandler = noop;
  },
  unbindPress: function unbindPress() {
    this._pressHandler = noop;
  }
};

_.augment(Key, proto);

/**
 * @class pillow.Keyboard Provides methods for Keyboard events.
 * @param {Object}
 */

var Keyboard = {};

Keyboard.Key = Key;

var running = false;

var methods = {
  simulate: function simulate() {
    for (var i = 0; i < keysDown.length; i++) {
      var keyCode = keysDown[i];
      var keyName = _KEYS[keyCode];
      if (keyName) {
        Keyboard[keyName].down();
      }
    }
  },
  run: function run(handler) {
    running = true;
    _.requestAnimationFrame.call(global, function () {
      if (!running) {
        return;
      }
      Keyboard.run(handler);
      handler();
    });
  },
  stop: function stop() {
    running = false;
  }
};

_.extend(Keyboard, methods);

_.each(KEYS, function (keyCode, keyName) {
  Keyboard[keyName] = new Key(keyCode);
});

_.bindEvent('keydown', function (evt) {
  var keyCode = evt.keyCode;
  var keyName = _KEYS[keyCode];
  var isNew = _.pushUnique(keysDown, keyCode);
  if (isNew && Keyboard[keyName]) {
    Keyboard[keyName].press();
  }
});

_.bindEvent('keyup', function (evt) {
  var keyCode = _.removeValue(keysDown, evt.keyCode);
  var keyName = _KEYS[keyCode];
  if (keyName) {
    Keyboard[keyName].up();
  }
});

_.bindEvent('blur', function (evt) {
  keysDown.length = 0;
});

module.exports = Keyboard;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);

function getOffset(element) {
  var x = 0;
  var y = 0;
  var offsetParent = element;

  while (offsetParent !== null && offsetParent !== document.body) {
    x += offsetParent.offsetLeft;
    y += offsetParent.offsetTop;
    offsetParent = offsetParent.offsetParent;
  }

  return {
    x: x,
    y: y
  };
}

/**
 * @class pillow.Mouse Provides methods for Mouse events.
 * @param {Object} options An object literal containing one or more of the following optional properties:
 * <li><tt>screen</tt> : the screen.</li>
 */

function Mouse(cfg) {
  var that = this;
  that.types = 'ontouchend' in document ? ['touchstart', 'touchmove', 'touchend'] : ['mousedown', 'mousemove', 'mouseup'];
  that.element = document;
  _.merge(that, cfg);
  this.bind();
}
var proto = {
  bind: function bind() {
    var that = this;
    that.element = that.screen.target;
    that.offset = getOffset(that.element);
    _.each(that.types, function (event) {
      that.element.addEventListener(event, function (e) {
        e.preventDefault();
        var x = e.changedTouches ? e.changedTouches[0].pageX : e.pageX;
        var y = e.changedTouches ? e.changedTouches[0].pageY : e.pageY;
        that.screen.dispatch(event, x - that.offset.x, y - that.offset.y);
      }, false);
    });
  }
};

_.augment(Mouse, proto);

module.exports = Mouse;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var RenderObjectModel = __webpack_require__(1);

/**
 * @class pillow.Graphics Graphics.
 * @param {Object} options An object literal containing one or more of the following optional properties:
 * <li><tt>x</tt></li>
 * <li><tt>y</tt></li>
 * <li><tt>width</tt></li>
 * <li><tt>height</tt></li>
 * <li><tt>alpha</tt></li>
 * <li><tt>scaleX</tt></li>
 * <li><tt>scaleY</tt></li>
 * <li><tt>rotation</tt></li>
 * <li><tt>angle</tt></li>
 * <li><tt>visible</tt></li>
 * <li><tt>debug</tt></li>
 */

function Graphics(cfg) {
  var that = this;
  Graphics.sup.call(that, cfg);
  that.hitType = 'rect';
  that.strokeStyle = '#000';
  that.lineWidth = 1;
  that.fillStyle = 'transparent';
  that.query = [];
  _.merge(that, cfg);
}
var proto = {
  draw: function draw() {
    var that = this;
    for (var i = 0; i < that.query.length; i++) {
      var data = that.query[i];
      var action = data.action;

      if (that.context[action]) {
        var args = data.args;

        if (_.type(args) === 'array' || !args) {
          that.context[action].apply(that.context, args);
        } else {
          that.context[action] = that[action];
        }
      }
    }
  },
  push: function push(action, args) {
    this.query.push({
      action: action,
      args: args ? args : null
    });
    return this;
  },
  beginPath: function beginPath() {
    this.push('beginPath');
  },
  closePath: function closePath() {
    this.push('closePath');
  },
  rect: function rect(x, y, width, height) {
    var that = this;
    that.hitType = 'rect';
    that.x = x;
    that.y = y;
    that.width = width;
    that.height = height;
    that.beginPath();
    that.push('rect', [0, 0, that.width, that.height]);
    that.closePath();
    that.push('fillStyle', that.fillStyle);
    that.push('fill');
    that.push('lineWidth', that.lineWidth);
    that.push('strokeStyle', that.strokeStyle);
    that.push('stroke');
    return that;
  },
  circle: function circle(x, y, radius) {
    var that = this;
    that.push('moveTo', [x + radius, y + radius]);
    that.push('arc', [x + radius, y + radius, radius, 0, Math.PI * 2, false]);
    that.push('stroke');
    that.closePath();
    return that;
  },
  hitTest: function hitTest(x, y) {
    var that = this;

    if (that.hitType === 'rect') {
      return x >= that.x && x <= that.x + that.width && y >= that.y && y <= that.y + that.height;
    }
  }
};

_.augment(Graphics, proto);
_.inherit(Graphics, RenderObjectModel);

module.exports = Graphics;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var RenderObjectModel = __webpack_require__(1);

/**
 * @class pillow.Screen Screen.
 * @param {Object} options An object literal containing one or more of the following optional properties:
 * <li><tt>x</tt></li>
 * <li><tt>y</tt></li>
 * <li><tt>width</tt></li>
 * <li><tt>height</tt></li>
 * <li><tt>alpha</tt></li>
 * <li><tt>scaleX</tt></li>
 * <li><tt>scaleY</tt></li>
 * <li><tt>rotation</tt></li>
 * <li><tt>angle</tt></li>
 * <li><tt>visible</tt></li>
 * <li><tt>debug</tt></li>
 */

function Screen(cfg) {
  var that = this;
  Screen.sup.call(that, cfg);
  _.merge(that, cfg);
  that.init();
}

var proto = {
  init: function init() {
    var that = this;
    that.target = that.container;
    if (that.target) {
      that.context = that.target.getContext('2d');
      that.canvas = that.context.canvas;
      that.canvas.width = that.width || that.canvas.width;
      that.canvas.height = that.height || that.canvas.height;
    } else {
      _.log('init error');
      return;
    }
  },
  run: function run() {
    var that = this;
    this.render(that.context);
  },
  hitTest: function hitTest() {
    return true;
  }
};

_.augment(Screen, proto);
_.inherit(Screen, RenderObjectModel);

module.exports = Screen;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Img = __webpack_require__(3);
var _ = __webpack_require__(0);

/**
 * @class pillow.Sprite Sprite.
 * @param {Object} options An object literal containing one or more of the following optional properties:
 * <li><tt>x</tt></li>
 * <li><tt>y</tt></li>
 * <li><tt>width</tt></li>
 * <li><tt>height</tt></li>
 * <li><tt>alpha</tt></li>
 * <li><tt>scaleX</tt></li>
 * <li><tt>scaleY</tt></li>
 * <li><tt>rotation</tt></li>
 * <li><tt>angle</tt></li>
 * <li><tt>visible</tt></li>
 * <li><tt>debug</tt></li>
 */

function Sprite(cfg) {
  var that = this;
  that.frame = 0;
  that.paused = false;
  that.loop = true;
  that.offset = {
    x: 0,
    y: 0
  };
  Sprite.sup.call(that, cfg);
  _.merge(that, cfg);
  that.init();
}

var proto = {
  init: function init() {
    var that = this;
    that.xs = that.size.width / that.width;
    that.ys = that.size.height / that.height;
  },
  pause: function pause() {
    var that = this;
    that.paused = true;
  },
  play: function play() {
    var that = this;
    that.paused = false;
  },
  next: function next() {
    var that = this;
    !that.paused && that.frame++;
  },
  prev: function prev() {
    var that = this;
    !that.paused && !!that.frame && that.frame--;
  },
  to: function to(index) {
    var that = this;
    that.frame = that.paused ? that.frame : index;
  },
  getCurrentFrame: function getCurrentFrame() {
    var that = this;
    var x = that.frame % that.xs;
    var y = parseInt(that.frame / that.xs, 10);

    if (!x && y === that.ys) {
      if (that.loop) {
        that.frame = 0;
      } else {
        that.paused = true;
      }
    }
    return {
      x: x * that.width + that.offset.x,
      y: y * that.height + that.offset.y
    };
  },
  hitTest: function hitTest() {
    return true;
  }
};

_.augment(Sprite, proto);
_.inherit(Sprite, Img);

module.exports = Sprite;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var RenderObjectModel = __webpack_require__(1);

/**
 * @class pillow.Text Text.
 * @param {Object} options An object literal containing one or more of the following optional properties:
 * <li><tt>x</tt></li>
 * <li><tt>y</tt></li>
 * <li><tt>width</tt></li>
 * <li><tt>height</tt></li>
 * <li><tt>alpha</tt></li>
 * <li><tt>scaleX</tt></li>
 * <li><tt>scaleY</tt></li>
 * <li><tt>rotation</tt></li>
 * <li><tt>angle</tt></li>
 * <li><tt>visible</tt></li>
 * <li><tt>debug</tt></li>
 */

function Text(cfg) {
  var that = this;
  Text.sup.call(that, cfg);
  that.x = 0;
  that.y = 0;
  that.text = '';
  that.font = '12px arial';
  that.color = '#000';
  _.merge(that, cfg);
}

var proto = {
  draw: function draw() {
    var that = this;
    that.context.fillStyle = that.color;
    that.context.font = that.font;
    that.context.fillText(that.text, that.x, that.y);
  }
};

_.augment(Text, proto);
_.inherit(Text, RenderObjectModel);

module.exports = Text;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @class pillow.Collision Collision.
 * @param {Object} options An object literal containing one or more of the following optional properties:
 */

function Collision(cfg) {}

Collision.prototype.pointRect = function (point1, point2, rect) {
  return point1 > rect.x && point1 < rect.right || point2 > rect.y && point2 < rect.bottom;
};

Collision.prototype.betweenRects = function (rect1, rect2) {
  return (rect1.right > rect2.x && rect1.right < rect2.right || rect1.x > rect2.x && rect1.x < rect2.right) && (rect1.bottom > rect2.y && rect1.bottom < rect2.bottom || rect1.y < rect2.bottom && rect1.bottom > rect2.y);
};

Collision.prototype.pointCircle = function (point1, point2, circle) {
  return Math.pow(point1 - circle.x, 2) + Math.pow(point2 - circle.y, 2) < Math.pow(circle.r, 2);
};

Collision.prototype.betweenCircles = function (circle1, circle2) {
  return Math.pow(circle1.x - circle2.x, 2) + Math.pow(circle1.y - circle2.y, 2) < Math.pow(circle1.r + circle2.r, 2);
};

module.exports = Collision;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var RenderObjectModel = __webpack_require__(1);

/**
 * @class pillow.Map Map.
 * @param {Object} options An object literal containing one or more of the following optional properties:
 */

function Map(cfg) {
  var that = this;
  that.cache = true;
  that.lock = false;
  that.source = {};
  Map.sup.call(that, cfg);
  _.merge(that, cfg);
  that.init();
}
var proto = {
  init: function init() {},
  clearCache: function clearCache() {
    var that = this;
    that.lock = false;
  },
  draw: function draw() {
    var that = this;
    var images = that.resource;
    _.each(that.matrix, function (i, x) {
      _.each(i, function (j, y) {
        that.context.drawImage(images[j].image, 0, 0, that.size.width, that.size.height, that.size.width * y, that.size.height * x, that.size.width, that.size.height);
      });
    });
    that.mapCache = {};
    if (that.cache) {
      that.lock = true;
    }
  }
};

_.augment(Map, proto);
_.inherit(Map, RenderObjectModel);

module.exports = Map;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @class pillow.Math Math.
 * @param {Object} options An object literal containing one or more of the following optional properties:
 */

var _Math = {
  getRandom: function getRandom(min, max) {
    return Math.random() * (max - min + 1) + min;
  }
};

module.exports = _Math;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var Notify = __webpack_require__(5);

/**
 * @class pillow.SourceLoader SourceLoader.
 * @param {Object} options An object literal containing one or more of the following optional properties:
 */

function SourceLoader(cfg) {
  var that = this;
  that.hash = {};
  SourceLoader.sup.call(that, cfg);
  _.merge(that, cfg);
}
var proto = {
  load: function load(query) {
    var that = this;
    that.num = 0;
    that.query = query;
    _.each(that.query, function (i) {
      that.imageLoader(i);
    });
  },
  imageLoader: function imageLoader(item) {
    var that = this;
    var image = new Image();
    image.crossOrigin = '*';
    image.onload = function () {
      var id = item.id;
      that.hash[id] = _.extend({}, item, {
        image: image,
        width: image.width,
        height: image.height
      });
      that.num++;
      that.emit('loaded', _.extend({}, item, {
        number: that.num,
        id: id,
        image: that.hash[id]
      }));

      if (that.num === that.getSize()) {
        that.emit('success', that.hash);
      }
    };
    image.src = item.src;
  },
  getSize: function getSize() {
    return this.query.length;
  }
};

_.augment(SourceLoader, proto);
_.inherit(SourceLoader, Notify);

module.exports = SourceLoader;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var pow = Math.pow;
var sin = Math.sin;
var PI = Math.PI;
var BACK_CONST = 1.70158;

/**
 * @class pillow.Tween Tween.
 * @param {Object} options An object literal containing one or more of the following optional properties:
 */

var Tween = {
  swing: function swing(t) {
    return -Math.cos(t * PI) / 2 + 0.5;
  },
  easeNone: function easeNone(t) {
    return t;
  },
  easeIn: function easeIn(t) {
    return t * t;
  },
  easeOut: function easeOut(t) {
    return (2 - t) * t;
  },
  easeBoth: function easeBoth(t) {
    return (t *= 2) < 1 ? 0.5 * t * t : 0.5 * (1 - --t * (t - 2));
  },
  easeInStrong: function easeInStrong(t) {
    return t * t * t * t;
  },
  easeOutStrong: function easeOutStrong(t) {
    return 1 - --t * t * t * t;
  },
  easeBothStrong: function easeBothStrong(t) {
    return (t *= 2) < 1 ? 0.5 * t * t * t * t : 0.5 * (2 - (t -= 2) * t * t * t);
  },
  elasticIn: function elasticIn(t) {
    var p = 0.3;
    var s = p / 4;
    if (t === 0 || t === 1) return t;
    return -(pow(2, 10 * (t -= 1)) * sin((t - s) * (2 * PI) / p));
  },
  elasticOut: function elasticOut(t) {
    var p = 0.3;
    var s = p / 4;
    if (t === 0 || t === 1) return t;
    return pow(2, -10 * t) * sin((t - s) * (2 * PI) / p) + 1;
  },
  elasticBoth: function elasticBoth(t) {
    var p = 0.45;
    var s = p / 4;
    if (t === 0 || (t *= 2) === 2) return t;
    if (t < 1) {
      return -0.5 * (pow(2, 10 * (t -= 1)) * sin((t - s) * (2 * PI) / p));
    }
    return pow(2, -10 * (t -= 1)) * sin((t - s) * (2 * PI) / p) * 0.5 + 1;
  },
  backIn: function backIn(t) {
    if (t === 1) t -= 0.001;
    return t * t * ((BACK_CONST + 1) * t - BACK_CONST);
  },
  backOut: function backOut(t) {
    return (t -= 1) * t * ((BACK_CONST + 1) * t + BACK_CONST) + 1;
  },
  backBoth: function backBoth(t) {
    if ((t *= 2) < 1) {
      return 0.5 * (t * t * (((BACK_CONST *= 1.525) + 1) * t - BACK_CONST));
    }
    return 0.5 * ((t -= 2) * t * (((BACK_CONST *= 1.525) + 1) * t + BACK_CONST) + 2);
  },
  bounceIn: function bounceIn(t) {
    return 1 - Tween.bounceOut(1 - t);
  },
  bounceOut: function bounceOut(t) {
    var s = 7.5625;
    var r;
    if (t < 1 / 2.75) {
      r = s * t * t;
    } else if (t < 2 / 2.75) {
      r = s * (t -= 1.5 / 2.75) * t + 0.75;
    } else if (t < 2.5 / 2.75) {
      r = s * (t -= 2.25 / 2.75) * t + 0.9375;
    } else {
      r = s * (t -= 2.625 / 2.75) * t + 0.984375;
    }
    return r;
  }
};

module.exports = Tween;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);

/**
 * @class pillow.Vector2d Vector2d.
 * @param {Object} options An object literal containing one or more of the following optional properties:
 */

function Vector2d(x, y) {
  this.x = x || 0;
  this.y = y || 0;
}
var proto = {
  initialize: function initialize(x, y) {
    this.x = x;
    this.y = y;
  },
  set: function set(other) {
    this.x = other.x;
    this.y = other.y;
    return this;
  },
  setArray: function setArray(arr) {
    this.x = arr[0];
    this.y = arr[1];
    return this;
  },
  setCoords: function setCoords(x, y) {
    this.x = x;
    this.y = y;
    return this;
  },
  get: function get() {
    return new Vector2d(this.x, this.y);
  },
  mag: function mag() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  },
  add: function add(other) {
    this.x += other.x;
    this.y += other.y;
    return this;
  },
  addArray: function addArray(arr) {
    this.x += arr[0];
    this.y += arr[1];
    return this;
  },
  addCoords: function addCoords(x, y) {
    this.x += x;
    this.y += y;
    return this;
  },
  sub: function sub(other) {
    this.x -= other.x;
    this.y -= other.y;
    return this;
  },
  subArray: function subArray(arr) {
    this.x -= arr[0];
    this.y -= arr[1];
    return this;
  },
  subCoords: function subCoords(x, y) {
    this.x -= x;
    this.y -= y;
    return this;
  },
  mult: function mult(n) {
    this.x *= n;
    this.y *= n;
    return this;
  },
  scale: function scale(n) {
    this.mult(n);
    return this;
  },
  multVec: function multVec(other) {
    this.x *= other.x;
    this.y *= other.y;
    return this;
  },
  div: function div(n) {
    this.x /= n;
    this.y /= n;
    return this;
  },
  divVec: function divVec(other) {
    this.x /= other.x;
    this.y /= other.y;
    return this;
  },
  dist: function dist(other) {
    var dx = this.x - other.x;
    var dy = this.y - other.y;
    return Math.sqrt(dx * dx + dy * dy);
  },
  dot: function dot(other) {
    return this.x * other.x + this.y * other.y;
  },
  dotCoords: function dotCoords(x, y) {
    return this.x * x + this.y + y;
  },
  normalize: function normalize() {
    var m = this.mag();
    if (m !== 0 && m !== 1) {
      this.div(m);
    }
    return this;
  },
  limit: function limit(max) {
    if (this.mag() > max) {
      this.normalize();
      this.mult(max);
    }
    return this;
  },
  heading2d: function heading2d(x, y) {
    var angle = Math.atan2(-y, x);
    return -1 * angle;
  },
  rotate: function rotate(rads) {
    var s = Math.sin(rads);
    var c = Math.cos(rads);
    var xrot = c * this.x - s * this.y;
    this.y = s * this.x + c * this.y;
    this.x = xrot;
    return this;
  },
  angle: function angle(other) {
    return Math.acos(this.dot(other) / (this.mag() * other.mag()));
  },
  normal: function normal() {
    var temp = this.vector.x;
    this.x = -this.vector.y;
    this.y = temp;
    return this;
  },
  random: function random(mag) {
    this.x = Math.random();
    this.y = Math.random();
    if (mag) this.scale(mag);
    return this;
  },
  zero: function zero() {
    this.x = 0;
    this.y = 0;
  },
  equals: function equals(other) {
    return this.x === other.x && this.y === other.y;
  },
  toString: function toString() {
    return '[' + this.x + ',' + this.y + ']';
  }
};

_.augment(Vector2d, proto);

Vector2d.add = function (one, other) {
  var vec = new Vector2d();
  vec.setCoords(one.x + other.x, one.y + other.y);
  return vec;
};

Vector2d.sub = function (one, other) {
  var vec = new Vector2d();
  vec.setCoords(one.x - other.x, one.y - other.y);
  return vec;
};

Vector2d.dist = function (one, other) {
  var dx = one.x - other.x;
  var dy = one.y - other.y;
  return Math.sqrt(dx * dx + dy * dy);
};

Vector2d.random = function (mag) {
  var vec = new Vector2d(Math.random(), Math.random());
  if (mag) vec.scale(mag);
  return vec;
};

Vector2d.mult = function (one, scalar) {
  var vec = new Vector2d(one.x, one.y);
  vec.x *= scalar;
  vec.y *= scalar;
  return vec;
};

Vector2d.normal = function (vec) {
  return new Vector2d(-vec.y, vec.x);
};

Vector2d.normalize = function (vec) {
  var v = new Vector2d(vec.x, vec.y);
  var m = v.mag();
  if (m !== 0 && m !== 1) {
    v.div(m);
  }
  return v;
};

Vector2d.componentVector = function (vec, directionVec) {
  directionVec.normalize();
  directionVec.mult(vec.dot(directionVec));
  return directionVec;
};

module.exports = Vector2d;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* global define */


;(function (root, factory) {
  'use strict';
  if (true) {
    return !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== 'undefined') {
    return factory(exports);
  } else {
    factory(root['pillow'] || (root['pillow'] = {}));
  }
})(undefined, function (exports) {
  var pkg = __webpack_require__(6);
  exports.version = pkg.version;
  exports.RenderObjectModel = __webpack_require__(1);
  exports.Img = __webpack_require__(3);
  exports.Sprite = __webpack_require__(11);
  exports.Text = __webpack_require__(12);
  exports.Graphics = __webpack_require__(9);
  exports.Screen = __webpack_require__(10);

  exports.Keyboard = __webpack_require__(7);
  exports.Mouse = __webpack_require__(8);

  exports._ = __webpack_require__(0);
  exports.Vector2d = __webpack_require__(18);
  exports.Math = __webpack_require__(15);
  exports.SourceLoader = __webpack_require__(16);
  exports.Map = __webpack_require__(14);
  exports.Tween = __webpack_require__(17);
  exports.Collision = __webpack_require__(13);

  exports.Timer = __webpack_require__(2).Timer;
  exports.FPSBoard = __webpack_require__(2).FPSBoard;
});

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var Notify = __webpack_require__(5);

function RenderObject() {
  var that = this;
  RenderObject.sup.call(that);
  that.x = 0;
  that.y = 0;
  that.width = 0;
  that.height = 0;
  that.alpha = 1;
  that.scaleX = 1;
  that.scaleY = 1;
  that.rotation = 0;
  that.angle = 0;
  that.visible = true;
  that.event = true;
  that.parent = null;
  that.context = null;
  that.debug = false;
}

var proto = {
  _draw: function _draw(context) {
    var that = this;
    if (!that.visible) {
      return;
    }
    that.context = that.context || context;
    that.update();
    that.context.save();
    that.context.globalAlpha = that.alpha;
    that.context.translate(that.x, that.y);
    that.context.rotate(that.rotation * Math.PI / 180);
    that.context.scale(that.scaleX, that.scaleY);
    that.draw();
    for (var i = 0; i < that.children.length; i++) {
      that.children[i]._draw(that.context);
    }
    that.context.restore();
  },
  _debug: function _debug(context) {
    var that = this;
    that.context = that.context || context;
    that.draw();
    for (var i = 0; i < that.children.length; i++) {
      that.children[i]._debug(that.context);
    }
  },
  draw: function draw() {},
  update: function update() {
    var that = this;
    that.handle = that.handle || arguments[0];
    if (that.handle) {
      that.handle();
    }
  },
  clear: function clear(x, y, width, height) {
    this.context.clearRect(x, y, width, height);
  }
};

_.augment(RenderObject, proto);
_.inherit(RenderObject, Notify);

module.exports = RenderObject;

/***/ })
/******/ ]);