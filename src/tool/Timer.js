'use strict';

const _ = require('../tool/util');

function Timer(target,fps){
  var that = this;
  that.fps = fps;
  that.target = target;
  that.paused = false;
  that.init();
}
Timer.prototype = {
  init:function(){
    var that = this;
    that.run = function(){
      if(!that.paused){
        that.target.run ? that.target.run():that.target();
      }
      if(that.fps){
        if(that.loop) {
          return
        }
        that.loop = function(){
          global.setTimeout(function(){
            that.run();
            that.loop();
          }, 1000 / that.fps);
          return true
        }
        that.loop()
      }else{
        _.requestAnimationFrame.call(global,function(){
          that.run();
        });
      }
    }
  },
  start:function(){
    var that = this;
    that.run();
  },
  pause:function(){
    this.paused = true;
  },
  go:function(){
    this.paused = false;
  }
};

module.exports = Timer;
