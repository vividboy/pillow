'use strict';

;(function(root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    return define(['exports'], factory);
  } else if (typeof exports !== 'undefined') {
    return factory(exports);
  } else {
    factory(root['pillow'] || (root['pillow'] = {}));
  }
})(this, function(exports, undefined) {
  exports.RenderObjectModel = require('./render/RenderObjectModel');
  exports.Img = require('./render/elements/Img');
  exports.Sprite = require('./render/elements/Sprite');
  exports.Text = require('./render/elements/Text');
  exports.Graphics = require('./render/elements/Graphics');
  exports.Screen = require('./render/elements/Screen');

  exports.Keyboard = require('./event/Keyboard');
  exports.Mouse = require('./event/Mouse');

  exports._ = require('./tool/util');
  exports.Timer = require('./tool/Timer');
  exports.Vector2d = require('./tool/Vector2d');
  exports.Math = require('./tool/Math');
  exports.SourceLoader = require('./tool/SourceLoader');
  exports.Map = require('./tool/Map');
});
