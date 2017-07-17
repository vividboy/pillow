var pillow=function(t){function e(i){if(n[i])return n[i].exports;var r=n[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var n={};return e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,i){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=21)}([function(t,e,n){"use strict";(function(e){"use strcit";var n={create:function(t){if(Object.create)return Object.create(t);var e=function(){};return e.prototype=t,new e},guid:function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(t){var e=16*Math.random()|0;return("x"===t?e:3&e|8).toString(16)})},extend:function(){for(var t=Array.prototype.slice.call(arguments),e=t.shift(),n=0,i=t.length;n<i;n++){var r=t[n];for(var o in r)e[o]=r[o]}return e},inherit:function(t,e){var n=t.prototype;t.prototype=this.create(e.prototype);for(var i in n)t.prototype[i]=n[i];t.prototype.constructor=t,t.sup=e},augment:function(t,e){this.each(e,function(e,n){t.prototype[n]=e})},indexOf:function(t,e){if(t.indexOf)return t.indexOf(e);var n,i=t.length;for(n=0;n<i;n++)if(t[n]===e)return n;return-1},merge:function(t,e){for(var n in e)t[n]=e[n];return t},each:function(t,e){if(t){for(var n in t)t.hasOwnProperty(n)&&e.call(this,t[n],n);return t}},pushUnique:function(t,e){return-1===this.indexOf(t,e)&&(t.push(e),!0)},removeValue:function(t,e){var n=this.indexOf(t,e);if(-1!==n)return t.splice(n,1)[0]},type:function(t){return null===t||void 0===t?String(t):Object.prototype.toString.call(t).replace(/\[object |\]/g,"").toLowerCase()},transpose:function(t){var e={};return this.each(t,function(t,n){e[t]=n}),e},bindEvent:function(t,n){e.addEventListener?e.addEventListener(t,n,!1):document.attachEvent&&document.attachEvent("on"+t,n)}};t.exports=n}).call(e,n(7))},function(t,e,n){"use strict";function i(t){var e=this;i.sup.call(e,t),e.children=[],e.parent=null,r.merge(e,t)}var r=n(0),o=n(22),s={render:function(t){var e=this;e.clear(0,0,e.width,e.height),e._draw(e.context)},prepend:function(t){var e=this;t.parent=e,e.children.unshift(t)},append:function(t){var e=this;t.parent=e,e.children[e.children.length]=t},removeChildren:function(t){this.children[t]&&this.children.splice(t,1)},removeAllChildren:function(){this.children=[]},removeFromParent:function(){var t=this;t.parent&&r.each(this.parent.children,function(e,n){e===t&&t.parent.removeChildren(n)})},dispatch:function(t,e,n){var i=this,r=i.children,o=r.length,s=e-i.x,a=n-i.y;for(i.emit(t,{client:{x:e,y:n},offset:{x:s,y:a}});o--;){var u=r[o];if(u.hitTest&&u.hitTest(s,a))return void u.dispatch(t,s,a)}},hitTest:function(t,e){var n=this;return t>=n.x&&t<=n.x+n.width*n.scaleX&&e>=n.y&&e<=n.y+n.height*n.scaleY}};r.augment(i,s),r.inherit(i,o),t.exports=i},function(t,e,n){"use strict";var i,r,o;!function(n,s){r=[e],i=s,void 0!==(o="function"==typeof i?i.apply(e,r):i)&&(t.exports=o)}(0,function(t,e){function n(t){var e=t||{};e.fps=e.fps||60,this.options=e,this._queue=[],this._paused=!1,this._now=null,this._fps=-1,this._interval=1e3/e.fps}function i(t){var e=t||{};e.container=document.querySelector(e.container)||document.body,e.width=e.width||80,e.height=e.height||48,e.alpha=e.alpha||.9,e.boardColor=e.boardColor||"grey",e.textColor=e.textColor||"red",e.containerStyles=e.containerStyles||{},this.options=e,this._now=null,this._fps=0,this._imgData=null,this._pixelRatio=Math.floor(window.devicePixelRatio)||1,this._context=s.call(this)}function r(){}n.prototype.update=function(t){this._queue.push(t.bind(this))},n.prototype.start=function(){var t=(new Date).getTime()+this._interval,e=function(){this._now=this._now||+new Date;var n=+new Date;n-this._now>=1e3&&(this._now=n,this._fps=-1);var i=(new Date).getTime();i>=t&&(i>=t+this._interval?t=i+this._interval:t+=this._interval,this._fps++,this._paused||this._queue.forEach(function(t){t()})),requestAnimationFrame(e)}.bind(this);e()},n.prototype.stop=function(){this._paused=!0},n.prototype.toggle=function(){this._paused=!this._paused};var o=function(){var t=this._fps,e=this._context;setTimeout(function(){var n=(this.options.height-12)*t/60;e.globalAlpha=this.options.alpha,e.fillStyle=this.options.boardColor,e.clearRect(0,0,this.options.width,this.options.height),e.fillRect(0,0,this.options.width,this.options.height),e.font="2px",e.fillStyle=this.options.textColor,e.fillText("fps: "+t,2,10),e.fillRect(this.options.width-1,this.options.height-n,1*this._pixelRatio,n),this._imgData&&e.putImageData(this._imgData,0,12*this._pixelRatio),this._imgData=e.getImageData(1*this._pixelRatio,12*this._pixelRatio,(this.options.width-1)*this._pixelRatio,(this.options.height-12)*this._pixelRatio)}.bind(this),16)},s=function(){var t=document.createElement("canvas"),e=this.options.width,n=this.options.height;t.style.cssText="width:"+e+"px;height:"+n+"px;",t.width=e*this._pixelRatio,t.height=n*this._pixelRatio;var i=t.getContext("2d");i.scale(this._pixelRatio,this._pixelRatio);var r=document.createElement("div"),o={position:"fixed",top:0,right:0,cursor:"pointer","z-index":999999};for(var s in this.options.containerStyles)o[s]=this.options.containerStyles[s];return Object.keys(o).forEach(function(t){r.style.cssText+=t+":"+o[t]}),r.addEventListener("click",function(t){t.preventDefault()},!1),r.appendChild(t),this.options.container.appendChild(r),i};i.prototype.tick=function(){this._now=this._now||+new Date;var t=+new Date;t-this._now>=1e3&&(o.call(this),this._now=t,this._fps=0),this._fps++},t.Timer=r.Timer=n,t.FPSBoard=r.FPSBoard=i})},function(t,e,n){"use strict";function i(){this.DataHash={},this.NotifyHash={}}var r=n(0),o=function(t,e){for(var n=Array.prototype.slice.call(this.NotifyHash[t]),i=0,o=n.length;i<o;i++){var s=r.extend({},n[i]),a=s.scope?s.scope:this;s.scope=a,s.handler.call(s.scope,e,s)}},s=function(t){var e=this.NotifyHash;t?delete e[t]:this.NotifyHash={}},a=function(t,e){for(var n=t.split(" "),i=0,r=n.length;i<r;i++){var o=n[i];this.NotifyHash[o]||(this.NotifyHash[o]=[]),this.NotifyHash[o].push({handler:e,type:o})}};i.prototype={on:function(t,e,n){if("object"===r.type(t))for(var i in t)a.call(this,i,t[i]);else a.call(this,t,e);return this},once:function(t,e){return this.on(t,e,!0),this},emit:function(t,e){for(var n=t.split(" "),i=0,s=n.length;i<s;i++){var a=n[i];this.NotifyHash[a]&&o.call(this,a,"undefined"===r.type(e)?null:e)}return this},detach:function(){return s.apply(this,arguments),this},set:function(t,e){this.DataHash[t]=e},get:function(t){return this.DataHash[t]},has:function(t){return!!this.DataHash[t]},all:function(){return this.DataHash},remove:function(t){this.DataHash[t]&&delete this.DataHash[t]}},t.exports=i},function(t,e,n){"use strict";function i(t){var e=this;i.sup.call(e,t),r.merge(e,t)}var r=n(0),o=n(1),s={draw:function(){var t=this,e=t.getCurrentFrame?t.getCurrentFrame():null,n=e?e.x:t.x,i=e?e.y:t.y;t.context.drawImage(t.image,n,i,t.width,t.height,0,0,t.width,t.height)},hitTest:function(t,e){var n=this;return t>=n.x&&t<=n.x+n.width&&e>=n.y&&e<=n.y+n.height}};r.augment(i,s),r.inherit(i,o),t.exports=i},function(t,e,n){"use strict";function i(t){this.isRequested=!1,this.frame,this.isCancel=!1,this.callback=[],this.handle=t}function r(t){this.duration=1e3,this.delay=0,this.timing=o.easeIn,r.sup.call(this,t),s.merge(this,t),this.isPlaying=!1,this.delayTick=0,this.frameCount=this.duration/u,this.framePercent=1/this.frameCount,this.frameQueue=[],this.frameIndex=0,this.init()}var o=n(6),s=n(0),a=n(3),u=1e3/60,h=function(t){return setTimeout(t,u)},c=function(t){clearTimeout(t)},f=window.requestAnimateFrame||window.msRequestAnimateFrame||window.webkitRequestAnimateFrame||window.mozkitRequestAnimateFrame||h,l=window.cancelAnimateFrame||window.msCancelAnimateFrame||window.webkitCancelAnimateFrame||window.mozCancelAnimateFrame||c,d={request:function(){var t=this;if(!this.isRequested){var e=arguments;return this.isCancel=!1,this.frame=f(function(){t.isCancel||(t.handle.apply(window,e),t.isRequested=!0,t.callback&&t.callback.forEach(function(t){t&&t()}))}),this}},cancel:function(){this.frame&&(this.isCancel=!0,l(this.frame))},then:function(t){return this.isRequested?t&&t():this.callback.push(t),this},clone:function(){return new i(this.handle)}};s.augment(i,d);var p={init:function(){for(var t=["0"],e=this,n=0;n<this.frameCount;n++){var r=t[0],o=this.framePercent*n;null!==r&&r<=100*o?(this.frameQueue.push(new i(function(){e.emit("frame",{percent:arguments[0],timing:arguments[1]})})),t.shift()):this.frameQueue.length&&this.frameQueue.push(this.frameQueue[this.frameQueue.length-1].clone())}},start:function(){var t=this;if(!this.isPlaying){this.isPlaying=!0;var e=function e(){if(t.isPlaying)if(t.frameIndex===t.frameQueue.length)t.isPlaying=!1,t.emit("end");else{var n=t.framePercent*(t.frameIndex+1).toFixed(10);t.currentFrame=t.frameQueue[t.frameIndex],t.currentFrame.request(n.toFixed(10),t.timing(n).toFixed(10)),t.currentFrame.then(function(){t.frameIndex++,e()})}};return this.delayTick=setTimeout(function(){t.delayTick=0,e()},!t.frameIndex&&t.delay||0),this}},stop:function(){if(this.isPlaying)return this.isPlaying=!1,this.delayTick&&(l(this.delayTick),this.delayTick=0),this.currentFrame&&this.currentFrame.cancel(),this}};s.augment(r,p),s.inherit(r,a),r.requestAnimateFrame=f,r.cancelAnimateFrame=l,r.Tween=o,t.exports=r},function(t,e,n){"use strict";var i=Math.pow,r=Math.sin,o=Math.PI,s=1.70158,a={swing:function(t){return-Math.cos(t*o)/2+.5},easeNone:function(t){return t},easeIn:function(t){return t*t},easeOut:function(t){return(2-t)*t},easeBoth:function(t){return(t*=2)<1?.5*t*t:.5*(1- --t*(t-2))},easeInStrong:function(t){return t*t*t*t},easeOutStrong:function(t){return 1- --t*t*t*t},easeBothStrong:function(t){return(t*=2)<1?.5*t*t*t*t:.5*(2-(t-=2)*t*t*t)},easeInSine:function(t,e,n,i){return-n*Math.cos(t/i*(Math.PI/2))+n+e},easeOutSine:function(t,e,n,i){return n*Math.sin(t/i*(Math.PI/2))+e},easeInOutSine:function(t,e,n,i){return-n/2*(Math.cos(Math.PI*t/i)-1)+e},elasticIn:function(t){return 0===t||1===t?t:-i(2,10*(t-=1))*r(2*o*(t-.075)/.3)},elasticOut:function(t){return 0===t||1===t?t:i(2,-10*t)*r(2*o*(t-.075)/.3)+1},elasticBoth:function(t){return 0===t||2==(t*=2)?t:t<1?i(2,10*(t-=1))*r(2*o*(t-.1125)/.45)*-.5:i(2,-10*(t-=1))*r(2*o*(t-.1125)/.45)*.5+1},backIn:function(t){return 1===t&&(t-=.001),t*t*((s+1)*t-s)},backOut:function(t){return(t-=1)*t*((s+1)*t+s)+1},backBoth:function(t){return(t*=2)<1?t*t*((1+(s*=1.525))*t-s)*.5:.5*((t-=2)*t*((1+(s*=1.525))*t+s)+2)},bounceIn:function(t){return 1-a.bounceOut(1-t)},bounceOut:function(t){var e=7.5625;return t<1/2.75?e*t*t:t<2/2.75?e*(t-=1.5/2.75)*t+.75:t<2.5/2.75?e*(t-=2.25/2.75)*t+.9375:e*(t-=2.625/2.75)*t+.984375}};t.exports=a},function(t,e,n){"use strict";var i;i=function(){return this}();try{i=i||Function("return this")()||(0,eval)("this")}catch(t){"object"==typeof window&&(i=window)}t.exports=i},function(t,e){t.exports={name:"pillowjs",version:"1.1.26",description:"HTML5 2D rendering engine",repository:{type:"git",url:"https://github.com/pillowjs/pillow.git"},keywords:["canvas"],main:"./dist/index.js",homepage:"https://pillowjs.github.com/pillow",precommit:["lint"],scripts:{lint:"eslint ./src ./examples",doc:"rm -rf ./docs/ && jsdoc -c ./jsdoc.json",build:"webpack -p && babel src/ --out-dir dist/",server:"startserver -p 8081 -s -m",test:"node ./test/pillow.test.js",update:"node ./scripts/update.js",prepublish:"npm run build"},dependencies:{"monitor.js":"^1.0.5"},devDependencies:{babel:"~5.8.23","babel-core":"^5.x","babel-loader":"^5.x",eslint:"^4.0.0",jsdoc:"3.4.0","json-loader":"^0.5.2","jsx-loader":"^0.13.2",mocha:"^3.4.2","node-libs-browser":"^2.0.0","pre-commit":"^1.2.2",should:"*",startserver:"^1.3.7","startserver-webpack":"^1.0.2",uitest:"^1.1.4",webpack:"^2.6.1"},startserver:[{"startserver-webpack":"*"}],license:"MIT"}},function(t,e,n){"use strict";(function(e){function i(t){this.keyCode=t}var r=n(0),o=n(5),s=function(){},a={A:65,B:66,C:67,D:68,E:69,F:70,G:71,H:72,I:73,J:74,K:75,L:76,M:77,N:78,O:79,P:80,Q:81,R:82,S:83,T:84,U:85,V:86,W:87,X:88,Y:89,Z:90,ZERO:48,ONE:49,TWO:50,THREE:51,FOUR:52,FIVE:53,SIX:54,SEVEN:55,EIGHT:56,NINE:57,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,LEFT:37,UP:38,RIGHT:39,DOWN:40,BACKSPACE:8,TAB:9,ENTER:13,SHIFT:16,CTRL:17,ALT:18,ESC:27,SPACE:32},u=r.transpose(a),h=[],c=function(t,e,n){n?t[e]=n:t[e]()},f={_downHandler:s,_upHandler:s,_pressHandler:s,isDown:function(){return-1!==r.indexOf(h,this.keyCode)},down:function(t){c(this,"_downHandler",t)},up:function(t){c(this,"_upHandler",t)},press:function(t){c(this,"_pressHandler",t)},unbindDown:function(){this._downHandler=s},unbindUp:function(){this._upHandler=s},unbindPress:function(){this._pressHandler=s}};r.augment(i,f);var l={};l.Key=i;var d=!1,p={simulate:function(){for(var t=0;t<h.length;t++){var e=h[t],n=u[e];n&&l[n].down()}},run:function(t){d=!0,o.requestAnimateFrame.call(e,function(){d&&(l.run(t),t())})},stop:function(){d=!1}};r.extend(l,p),r.each(a,function(t,e){l[e]=new i(t)}),r.bindEvent("keydown",function(t){var e=t.keyCode,n=u[e];r.pushUnique(h,e)&&l[n]&&l[n].press()}),r.bindEvent("keyup",function(t){var e=r.removeValue(h,t.keyCode),n=u[e];n&&l[n].up()}),r.bindEvent("blur",function(t){h.length=0}),t.exports=l}).call(e,n(7))},function(t,e,n){"use strict";function i(t){var e=this;e.types="ontouchend"in document?["touchstart","touchmove","touchend"]:["mousedown","mousemove","mouseup"],e.element=document,r.merge(e,t),this.bind()}var r=n(0),o=function(t){for(var e=0,n=0,i=t;null!==i&&i!==document.body;)e+=i.offsetLeft,n+=i.offsetTop,i=i.offsetParent;return{x:e,y:n}},s={bind:function(){var t=this;t.element=t.screen.target,t.offset=o(t.element),r.each(t.types,function(e){t.element.addEventListener(e,function(n){n.preventDefault();var i=n.changedTouches?n.changedTouches[0].pageX:n.pageX,r=n.changedTouches?n.changedTouches[0].pageY:n.pageY;t.screen.dispatch(e,i-t.offset.x,r-t.offset.y)},!1)})}};r.augment(i,s),t.exports=i},function(t,e,n){"use strict";function i(t){var e=this;i.sup.call(e,t),e.hitType="rect",e.strokeStyle="#000",e.lineWidth=1,e.fillStyle="transparent",e.query=[],r.merge(e,t)}var r=n(0),o=n(1),s={draw:function(){for(var t=this,e=0;e<t.query.length;e++){var n=t.query[e],i=n.action;if(t.context[i]){var o=n.args;"array"!==r.type(o)&&o?t.context[i]=t[i]:t.context[i].apply(t.context,o)}}},push:function(t,e){return this.query.push({action:t,args:e||null}),this},beginPath:function(){this.push("beginPath")},closePath:function(){this.push("closePath")},rect:function(t,e,n,i){var r=this;return r.hitType="rect",r.x=t,r.y=e,r.width=n,r.height=i,r.beginPath(),r.push("rect",[0,0,r.width,r.height]),r.closePath(),r.push("fillStyle",r.fillStyle),r.push("fill"),r.push("lineWidth",r.lineWidth),r.push("strokeStyle",r.strokeStyle),r.push("stroke"),r},circle:function(t,e,n){var i=this;return i.push("moveTo",[t+n,e+n]),i.push("arc",[t+n,e+n,n,0,2*Math.PI,!1]),i.push("stroke"),i.closePath(),i},hitTest:function(t,e){var n=this;if("rect"===n.hitType)return t>=n.x&&t<=n.x+n.width&&e>=n.y&&e<=n.y+n.height}};r.augment(i,s),r.inherit(i,o),t.exports=i},function(t,e,n){"use strict";function i(t){var e=this;i.sup.call(e,t),r.merge(e,t),e.init()}var r=n(0),o=n(1),s={init:function(){var t=this;if(t.target=t.container,!t.target)return void console.log("init error");t.context=t.target.getContext("2d"),t.canvas=t.context.canvas,t.canvas.width=t.width||t.canvas.width,t.canvas.height=t.height||t.canvas.height},run:function(){var t=this;this.render(t.context)},hitTest:function(){return!0}};r.augment(i,s),r.inherit(i,o),t.exports=i},function(t,e,n){"use strict";function i(t){var e=this;e.frame=0,e.paused=!1,e.loop=!0,e.offset={x:0,y:0},i.sup.call(e,t),o.merge(e,t),e.init()}var r=n(4),o=n(0),s={init:function(){var t=this;t.xs=t.size.width/t.width,t.ys=t.size.height/t.height},pause:function(){this.paused=!0},play:function(){this.paused=!1},next:function(){var t=this;!t.paused&&t.frame++},prev:function(){var t=this;!t.paused&&!!t.frame&&t.frame--},to:function(t){var e=this;e.frame=e.paused?e.frame:t},getCurrentFrame:function(){var t=this,e=t.frame%t.xs,n=parseInt(t.frame/t.xs,10)%t.ys;return e||n!==t.ys-1||(t.loop?t.frame=0:t.paused=!0),{x:e*t.width+t.offset.x,y:n*t.height+t.offset.y}},hitTest:function(){return!0}};o.augment(i,s),o.inherit(i,r),t.exports=i},function(t,e,n){"use strict";function i(t){var e=this;i.sup.call(e,t),e.x=0,e.y=0,e.text="",e.font="12px arial",e.color="#000",r.merge(e,t)}var r=n(0),o=n(1),s={draw:function(){var t=this;t.context.fillStyle=t.color,t.context.font=t.font,t.context.fillText(t.text,t.x,t.y)}};r.augment(i,s),r.inherit(i,o),t.exports=i},function(t,e,n){"use strict";function i(){this.paused=null,this.ended=null,this.guid=null,this.node=null,this.init()}function r(t){this.src=t.src,this.pool=t.pool||10,this.duration=0,this.state=null,this.queue=[],this.timers={},c.call(this)}var o=n(0),s={isIOS:!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/i),cache:{},context:null,masterGain:null,isSupported:function(){return"undefined"!=typeof AudioContext||"undefined"!=typeof webkitAudioContext},getContext:function(){return s.isSupported()?s.context?s.context:("undefined"!=typeof AudioContext?s.context=new AudioContext:"undefined"!=typeof webkitAudioContext&&(s.context=new webkitAudioContext),s.context):null},enableIOS:function(){if(s.isIOS){var t=function t(){var e=s.getContext(),n=e.createBufferSource();n.buffer=e.createBuffer(1,1,22050),n.connect(e.destination),n.start(0),e.resume(),n.onended=function(){n.disconnect(0),document.removeEventListener("touchstart",t,!0)}};document.addEventListener("touchstart",t,!0)}}},a={init:function(){this.paused=!0,this.guid=o.guid(),this.node=null,this.create()},create:function(){var t=s.getContext();this.node=t.createGain(),this.node.gain.setValueAtTime(1,t.currentTime),this.node.paused=!0,this.node.connect(s.masterGain)},reset:function(){this.guid=o.guid()}};o.augment(i,a);var u=function(t,e){t.node.bufferSource=s.getContext().createBufferSource(),t.node.bufferSource.buffer=s.cache[e],t.node.bufferSource.connect(t.node),t.node.bufferSource.playbackRate.value=1,t.node.bufferSource.loop=!1},h=function(t,e){var n=0;if(!(e.length<t)){for(var i=0;i<e.length;i++)e[i].ended&&n++;for(var i=e.length-1;i>=0;i--){if(n<=t)return;e[i].ended&&(e[i].node&&e[i].node.disconnect(0),e.splice(i,1),n--)}for(var i=0;i<e.length;i++)if(e[i].ended)return e[i].reset()}},c=function(){var t=this;if(s.isSupported()){var e=s.getContext();s.masterGain=e.createGain(),s.masterGain.gain.value=1,s.masterGain.connect(e.destination);var n=new i;if(this.queue.push(n),s.cache[this.src])return this.duration=s.cache[this.src].duration,void(this.state="loaded");var r=new XMLHttpRequest;r.open("GET",this.src,!0),r.responseType="arraybuffer",r.onload=function(){200===r.status&&e.decodeAudioData(r.response,function(e){e&&t.queue.length>0&&(s.cache[t.src]=e,e&&!t.duration&&(t.duration=e.duration),t.state="loaded")},function(){})};try{r.send()}catch(t){console.log(t)}}},f=function(t,e){t.paused=!0,t.ended=!0,e[t.guid]&&(clearTimeout(e[t.guid]),delete e[t.guid])},l={play:function(){var t=this;if(s.isSupported()){h(this.pool,this.queue);var e=new i;e.paused=!1,e.ended=!1,this.queue.push(e);var n=e.node;"loaded"===this.state&&(u(e,this.src),n.gain.setValueAtTime(1,s.getContext().currentTime),n.bufferSource.start(0,0,this.duration),this.timers[e.guid]=setTimeout(function(){f(e,t.timers)},1e3*this.duration))}}};o.augment(r,l),r.Base=s,t.exports=r},function(t,e,n){"use strict";function i(t){}i.prototype.pointRect=function(t,e,n){return t>n.x&&t<n.right||e>n.y&&e<n.bottom},i.prototype.betweenRects=function(t,e){return(t.right>e.x&&t.right<e.right||t.x>e.x&&t.x<e.right)&&(t.bottom>e.y&&t.bottom<e.bottom||t.y<e.bottom&&t.bottom>e.y)},i.prototype.pointCircle=function(t,e,n){return Math.pow(t-n.x,2)+Math.pow(e-n.y,2)<Math.pow(n.r,2)},i.prototype.betweenCircles=function(t,e){return Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2)<Math.pow(t.r+e.r,2)},t.exports=i},function(t,e,n){"use strict";function i(t){var e=this;e.cache=!0,e.lock=!1,e.source={},i.sup.call(e,t),r.merge(e,t),e.init()}var r=n(0),o=n(1),s={init:function(){},clearCache:function(){this.lock=!1},draw:function(){var t=this,e=t.resource;r.each(t.matrix,function(n,i){r.each(n,function(n,r){t.context.drawImage(e[n].image,0,0,t.size.width,t.size.height,t.size.width*r,t.size.height*i,t.size.width,t.size.height)})}),t.mapCache={},t.cache&&(t.lock=!0)}};r.augment(i,s),r.inherit(i,o),t.exports=i},function(t,e,n){"use strict";var i={getRandom:function(t,e){return Math.random()*(e-t+1)+t},hexToRgb:function(t){var e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);return e?{r:parseInt(e[1],16),g:parseInt(e[2],16),b:parseInt(e[3],16)}:null},degToRad:function(t){return(t+360)%360*(Math.PI/180)}};t.exports=i},function(t,e,n){"use strict";function i(t){var e=this;e.hash={},i.sup.call(e,t),r.merge(e,t)}var r=n(0),o=n(3),s={load:function(t){var e=this;e.num=0,e.query=t,r.each(e.query,function(t){e.imageLoader(t)})},imageLoader:function(t){var e=this,n=new Image;n.crossOrigin="*",n.onload=function(){var i=t.id;e.hash[i]=r.extend({},t,{image:n,width:n.width,height:n.height}),e.num++,e.emit("loaded",r.extend({},t,{number:e.num,id:i,image:e.hash[i]})),e.num===e.getSize()&&e.emit("success",e.hash)},n.src=t.src},getSize:function(){return this.query.length}};r.augment(i,s),r.inherit(i,o),t.exports=i},function(t,e,n){"use strict";function i(t,e){this.x=t||0,this.y=e||0}var r=n(0),o={initialize:function(t,e){this.x=t,this.y=e},set:function(t){return this.x=t.x,this.y=t.y,this},setArray:function(t){return this.x=t[0],this.y=t[1],this},setCoords:function(t,e){return this.x=t,this.y=e,this},get:function(){return new i(this.x,this.y)},mag:function(){return Math.sqrt(this.x*this.x+this.y*this.y)},add:function(t){return this.x+=t.x,this.y+=t.y,this},addArray:function(t){return this.x+=t[0],this.y+=t[1],this},addCoords:function(t,e){return this.x+=t,this.y+=e,this},sub:function(t){return this.x-=t.x,this.y-=t.y,this},subArray:function(t){return this.x-=t[0],this.y-=t[1],this},subCoords:function(t,e){return this.x-=t,this.y-=e,this},mult:function(t){return this.x*=t,this.y*=t,this},scale:function(t){return this.mult(t),this},multVec:function(t){return this.x*=t.x,this.y*=t.y,this},div:function(t){return this.x/=t,this.y/=t,this},divVec:function(t){return this.x/=t.x,this.y/=t.y,this},dist:function(t){var e=this.x-t.x,n=this.y-t.y;return Math.sqrt(e*e+n*n)},dot:function(t){return this.x*t.x+this.y*t.y},dotCoords:function(t,e){return this.x*t+this.y+e},normalize:function(){var t=this.mag();return 0!==t&&1!==t&&this.div(t),this},limit:function(t){return this.mag()>t&&(this.normalize(),this.mult(t)),this},heading2d:function(t,e){return-1*Math.atan2(-e,t)},rotate:function(t){var e=Math.sin(t),n=Math.cos(t),i=n*this.x-e*this.y;return this.y=e*this.x+n*this.y,this.x=i,this},angle:function(t){return Math.acos(this.dot(t)/(this.mag()*t.mag()))},normal:function(){var t=this.vector.x;return this.x=-this.vector.y,this.y=t,this},random:function(t){return this.x=Math.random(),this.y=Math.random(),t&&this.scale(t),this},zero:function(){this.x=0,this.y=0},equals:function(t){return this.x===t.x&&this.y===t.y},toString:function(){return"["+this.x+","+this.y+"]"}};r.augment(i,o),i.add=function(t,e){var n=new i;return n.setCoords(t.x+e.x,t.y+e.y),n},i.sub=function(t,e){var n=new i;return n.setCoords(t.x-e.x,t.y-e.y),n},i.dist=function(t,e){var n=t.x-e.x,i=t.y-e.y;return Math.sqrt(n*n+i*i)},i.random=function(t){var e=new i(Math.random(),Math.random());return t&&e.scale(t),e},i.mult=function(t,e){var n=new i(t.x,t.y);return n.x*=e,n.y*=e,n},i.normal=function(t){return new i(-t.y,t.x)},i.normalize=function(t){var e=new i(t.x,t.y),n=e.mag();return 0!==n&&1!==n&&e.div(n),e},i.componentVector=function(t,e){return e.normalize(),e.mult(t.dot(e)),e},t.exports=i},function(t,e,n){"use strict";var i,r,o;!function(n,s){r=[e],i=s,void 0!==(o="function"==typeof i?i.apply(e,r):i)&&(t.exports=o)}(0,function(t){var e=n(8);t.version=e.version,t.RenderObjectModel=n(1),t.Img=n(4),t.Sprite=n(13),t.Text=n(14),t.Graphics=n(11),t.Screen=n(12),t.Keyboard=n(9),t.Mouse=n(10),t._=n(0),t.Vector2d=n(20),t.Math=n(18),t.SourceLoader=n(19),t.Map=n(17),t.Tween=n(6),t.Collision=n(16),t.Animate=n(5),t.Audio=n(15),t.Timer=n(2).Timer,t.FPSBoard=n(2).FPSBoard})},function(t,e,n){"use strict";function i(){var t=this;i.sup.call(t),t.x=0,t.y=0,t.width=0,t.height=0,t.alpha=1,t.scaleX=1,t.scaleY=1,t.rotation=0,t.angle=0,t.visible=!0,t.event=!0,t.parent=null,t.context=null,t.debug=!1}var r=n(0),o=n(3),s={_draw:function(t){var e=this;if(e.visible){e.context=e.context||t,e.update(),e.context.save(),e.context.globalAlpha=e.alpha,e.context.translate(e.x,e.y),e.context.rotate(e.rotation*Math.PI/180),e.context.scale(e.scaleX,e.scaleY),e.draw(),this._debug();for(var n=0;n<e.children.length;n++)e.children[n]._draw(e.context);e.context.restore()}},_debug:function(t){var e=this;e.debug&&(e.context=e.context||t,e.context.strokeStyle="red",e.context.strokeRect(0,0,e.width,e.height))},draw:function(){},update:function(){var t=this;t.handle=t.handle||arguments[0],t.handle&&t.handle()},clear:function(t,e,n,i){this.context.clearRect(t,e,n,i)}};r.augment(i,s),r.inherit(i,o),t.exports=i}]);