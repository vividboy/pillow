/*! aml v1.0.0 xdf email:xudafeng[at]126.com 2013-09-18 16:16:37 */
!function(a){"use strict";function b(){function a(a,b){for(var c in b)a[c]=b[c];return a}for(var b,c=0;c<arguments.length;)b=c?a(b,arguments[c]):arguments[c],c++;return b}function c(a,b){if(a)for(var c in a)"length"!==c&&"item"!==c&&b.call(this,a[c],c);return a}function d(a){return function(b){return Object.prototype.toString.call(b)==="[object "+a+"]"}}function e(a){return function(b){return"array"==a||"string"==a?0===b.length:void 0}}function f(){}function g(){}function h(){var a=s.path?s.path:o.href;return a}function i(a){this.id=a,this.pwd=h(),this.init()}function j(){}function k(){var a=n.getElementsByTagName("script");return a[a.length-1].getAttribute("data-init")}if(!a.aml){var l="1.0.0",m=document.head||document.getElementsByTagName("head")[0]||document.documentElement,n=document,o=location,p=".js",q={version:l},r=q.data={},s={};d("String"),d("Object"),d("Function");var t=d("Undefined"),u=e("array");e("string");var v=function(a){return/\.js$/i.test(a)},w=function(a){return/\.css$/i.test(a)};f.cache={},b(f,{fire:function(a,b){t(this.cache[a])||this.cache[a].call(this,b)},on:function(a,b){this.cache[a]=b},detach:function(a){t(this.cache[a])||delete this.cache[a]}}),b(g,{}),i.prototype={init:function(){this.router()},router:function(){var a=this;w(a.id)?a.getStyle(this.pwd+a.id):a.getScript(v(a.id)?a.id:this.pwd+a.id+p)},getScript:function(a,b,c){var d=n.createElement("script");return d.src=a,d.async=!0,c&&(d.charset=c),n.addEventListener?d.addEventListener("load",b,!1):d.onreadystatechange=function(){("loaded"==d.readyState||"complete"==d.readyState)&&(d.onreadystatechange=null,b())},m.insertBefore(d,m.firstChild),d},getStyle:function(a,b,c){var d=n.createElement("link");return d.rel="stylesheet",d.href=a,c&&(d.charset=c),d.addEventListener("load",b,!1),m.appendChild(d),d}},b(j,{define:function(a,b,c){f.fire("define",{id:a,deps:b,constructor:c})},require:function(a){return f.fire("load",a),null},exec:function(a){r[a.id].instance=r[a.id].constructor.apply(this,a.depsMods)||{},f.fire("check",r)},load:function(a){new i(a)},save:function(a){r[a.id]&&r[a.id]!=a.id||(r[a.id]=a,f.fire("check",r))},check:function(a){c(a,function(a){if(!a.instance&&a!=r[a]){var b=[],d=[],e=[];c(a.deps,function(a){r[a]?r[a].instance?d.push(r[a].instance):b.push(r[a]):(e.push(a),r[a]=a)}),u(e)&&u(b)?f.fire("exec",{id:a.id,depsMods:d}):(c(e,function(a){f.fire("load",a)}),f.fire("check",b))}})}}),f.on("define",function(a){f.fire("save",a)}),f.on("check",function(a){j.check(a)}),f.on("exec",function(a){j.exec(a)}),f.on("load",function(a){j.load(a)}),f.on("save",function(a){j.save(a)}),j.define.amd={},a.define=j.define,a.require=j.require,k()&&new i(getCurrentScript()),b(q,{config:function(a){b(s,a)}}),a.aml=q}}(this);
// ========================= aml end ===============================


/**
 * diamond 入口
 */
;(function( window, $, undefined ){
    'use strict';

var win = window;
var EMPTY = '';

/**
 * 封装工具库jQuery
 */
;define('jQuery',[],function(){
    return $;
});

/**
 * 默认静态配置模块
 */
;define('config',[],function(){
    'use strict';
    var config = {
        /* @name Config
         * @param {String}  container            外层容器
         * @param {String}  selector             单元选择器
         * @param {String}  filter               单元过滤器
         * @param {String}  fixedSelector        [*]占位选择器
         * @param {String}  priority             优先选择器
         * @param {Number}  gridWidth            最小栅格单元宽度<code>px</code>
         * @param {Object}  unitMargin           单元格外边距<code>px</code>
         * @param {Boolean} closeAnim            是否关闭动画（默认开启）
         * @param {Number}  duration             补间动画时间，此项只针对IE系列生效
         * @param {String}  easing               补间动画算子，此项只针对IE系列生效
         * @param {String}  direction            排序起始方向（可选值：<code>'right'</code>）
         * @param {Boolean} random               随机排序开关（默认关闭）
         * @param {String}  sortBy               排序算法（可选值：<code>'grid'</code>或<code>'cell'</code>，默认为<code>'grid'</code>）
         * @param {Boolean} autoHeight           容器高度自适应开关（默认为true）
         * @param {Boolean} suspend              渲染任务队列是否支持挂起（挂起时主动将执行交给UI线程 | 默认为true）
         * @param {Array}   plugins              插件队列
         * @param {Boolean} closeResize          是否关闭resize绑定（默认不关闭）
         * @param {Number}  resizeFrequency      resize触发频率
         * @param {Array}   whensRecountUnitWH   重新计算单元宽高的行为时刻（可选值：<code>'closeResize', 'adjust'</code>）
         * @param {Number}  delayOnResize        resize时延迟渲染，主要是解决css3动画对页面节点属性更新不及时导致的渲染时依赖的数据不准确问题[临时解决办法]
         * @param {Boolean} landscapeOrientation 布局方向设置为横向，默认为false，竖向
         * @param {String}  exclude              排除设置
         * @param {String}  animType             提供css3动画'css3Anim'（针对高级浏览器），和普通模拟动画'fixedAnim'（针对低版本浏览器）两种选项，可以强制指定
         * @param {Object}  fixedSize            针对固定宽高的情况，若提供宽高则，计算量缩小{width:10,height:10}
         */
        container:EMPTY,
        selector:EMPTY,
        filter:EMPTY,
        fixedSelector:EMPTY,
        priority:EMPTY,
        gridWidth:10,
        unitMargin:{x: 0, y: 0},
        closeAnim:false,
        duration:1,
        easing:'easeNone',
        direction:'left',
        sortBy:EMPTY,
        autoHeight:true,
        closeResize:false,
        plugins:[],
        suspend:true,
        cache:false,
        resizeFrequency:200,
        whensRecountUnitWH:[],
        delayOnResize:-1,
        landscapeOrientation:false,
        exclude:EMPTY,
        animType:EMPTY,
        fixedSize:{}
    };
    return config;
});

/**
 * 浏览器检测，针对IE内核
 * dafeng.xdf@taobao.com
 */
;define('ua',['jQuery'],function($){
    'use strict';
    //用户代理信息
    var _uaStr = navigator.userAgent.toLowerCase();
    if(_uaStr.indexOf('msie')){
        var getVersion = function (str){
            var ieVersions = [6,7,8,9,10],
                __ver = 0;

            $.each(ieVersions,function(key,i){

                if(str.indexOf('msie '+i)&&!__ver) {
                    __ver =  i;
                }
            })
            return __ver;
        }; 
    }
    return getVersion(_uaStr);
});

/**
 * 排序方法合集
 * dafeng.xdf@taobao.com
 */
;define('sort',[],function(){
    var Sort = {
        first:function(arr){
            return arr[0]
        },
        last:function(arr){
            return arr[arr.length - 1];
        },
        swap:function(arr,f,s){
            var _temp = [],
                _arr = [];
            _temp[0] = f;
            _temp[1] = s;
            function sortNumber(a, b){
                return a - b
            }
            _temp = _temp.sort(sortNumber);
            for (var i = 0; i < arr.length;i++){
              if(_temp[0] == i){
                _arr[i] = arr[_temp[1]];
              }else if(_temp[1] == i){ 
                _arr[i] = arr[_temp[0]];
              }else {
                _arr[i] = arr[i];
              }          
            }
            return _arr;
        },
        range:function(){
        
        },
        random:function(){
        
        }
    };
    return Sort;
});

/**
 * @Description: 公用工具类
 * @Author:      dafeng.xdf[at]taobao.com zhuofeng.ls@taobao.com
 * @Date:        2013.3.5
 */
;define('util',['jQuery'],function($){
    'use strict';
    var util = {};

    $.extend(util,{
        /**
         * 等同于kissy的buffer（保留尾帧的任务，延迟指定时间threshold后再执行）
         * 比kissy的buffer优越的一点是可以设置保留首帧还是尾帧任务（execAsap=true表示保留首帧）
         *
         * @param fn reference to original function
         * @param threshold
         * @param context the context of the original function
         * @param execAsap execute at start of the detection period
         * @returns {Function}
         * @private
         */
        debounce:function (fn, threshold, context, execAsap) {
            var timeout; // handle to setTimeout async task (detection period)
            // return the new debounced function which executes the original function only once
            // until the detection period expires
            return function debounced() {
                var obj = context || this, // reference to original context object
                    args = arguments; // arguments at execution time
                // this is the detection function. it will be executed if/when the threshold expires
                function delayed() {
                    // if we're executing at the end of the detection period
                    if (!execAsap)
                        fn.apply(obj, args); // execute now
                    // clear timeout handle
                    timeout = null;
                }

                // stop any current detection period
                if (timeout)
                    clearTimeout(timeout);
                // otherwise, if we're not already waiting and we're executing at the beginning of the detection period
                else if (execAsap)
                    fn.apply(obj, args); // execute now
                // reset the detection period
                timeout = setTimeout(delayed, threshold || 100);
            };
        },
        /**
         * 时间片轮询函数
         * @param items
         * @param process
         * @param context
         * @param callback
         * @returns {{}}
         */
        timedChunk:function(items, process, context, callback) {

            var monitor = {}, timer, todo = []; // 任务队列 | 每一个时间片管理函数（timedChunk）都维护自己的一个任务队列

            var userCfg = context.config,
                qpt = userCfg.qpt || 15;

            monitor.start = function () {

                todo = todo.concat(S.makeArray(items)); // 压入任务队列

                // 轮询函数
                var polling = function () {
                    var start = +new Date;
                    while (todo.length > 0 && (new Date - start < 50)) {
                        var task = todo.splice(0, qpt);
                        process.call(context, task);
                    }

                    if (todo.length > 0) { // 任务队列还有任务，放到下一个时间片进行处理
                        timer = setTimeout(polling, 25);
                        return;
                    }

                    callback && callback.call(context, items);

                    // 销毁该管理器
                    monitor.stop();
                    monitor = null;
                };

                polling();
            };

            monitor.stop = function () {
                if (timer) {
                    clearTimeout(timer);
                    todo = [];
                }
            };
            return monitor;
        },
        throttle :function(func, wait, options) {
            var context, args, result;
            var timeout = null;
            var previous = 0;
            options || (options = {});
            var later = function() {
              previous = options.leading === false ? 0 : new Date;
              timeout = null;
              result = func.apply(context, args);
            };
            return function() {
              var now = new Date;
              if (!previous && options.leading === false) previous = now;
              var remaining = wait - (now - previous);
              context = this;
              args = arguments;
              if (remaining <= 0) {
                clearTimeout(timeout);
                timeout = null;
                previous = now;
                result = func.apply(context, args);
              } else if (!timeout && options.trailing !== false) {
                timeout = setTimeout(later, remaining);
              }
              return result;
            };
        }
    });
    return util;
});


/**
 * @Description: 兼容css3和低版本浏览器动画效果
 * @Author:      dafeng.xdf[at]taobao.com
 * @Date:        2013.3.5
 */
;define('anim',['jQuery','ua'],function($,ua){
    'use strict';
    var letIE10 = ua.ie < 11,
        prefixes = ['-webkit-', '-moz-', '-ms-', '-o-', ''],
        animType = letIE10 ? 'fixedAnim' : 'css3Anim';
    /**
     * @name AutoAnim
     * @class css动画，采用帧重复
     * @constructor
     */
    function AutoAnim(cfg) {
        this.cfg = cfg;
        this._init();
    }
    AutoAnim.prototype = {
        _init: function () {
            this[this.cfg.animType ? this.cfg.animType : animType]();
        },
        /**
         * supply css ua prefix
         */
        cssPrefixes: function (styleKey, styleValue) {
            var fixedRule = {};
            for (var i = 0, len = prefixes.length; i < len; i++) {
                fixedRule[prefixes[i] + styleKey] = styleValue;
            }
            return fixedRule;
        },
        /**
         * css3动画效果
         */
        css3Anim: function () {
            /*
             * css3效果代码添加
             * 为了减少对象读取css3模式去除duration配置，改为css中读取
             */
            var cfg = this.cfg;
            // TODO 优化点：既然css3Anim在循环中，可以考虑将‘cfg.direction !== 'right'’该判断条件在逻辑树上上提，以加快该函数的执行
            $(cfg.elm).css(this.cssPrefixes('transform', 'translate(' + ((cfg.direction !== 'right') ? cfg.x : (cfg.owner.gridSort.containerWH - cfg.elm.__width - cfg.x)) + 'px,' + cfg.y + 'px) '));
        },
        /**
         * 降级模拟css3动画
         */
        fixedAnim: function () {
            var self = this,
                cfg = self.cfg,
                cssRules = {'top': cfg.y};
            if (cfg.closeAnim) {
                this.noneAnim();
                return;
            }
            cssRules[cfg.direction == 'right' ? 'right' : 'left'] = cfg.x;
            $(cfg.elm).animate(cssRules, cfg.duration, cfg.easing, function () {
            });
        },
        /**
         * 无动画
         */
        noneAnim: function () {
            var cfg = this.cfg;
            $(cfg.elm).css({
                left: cfg.x,
                top: cfg.y
            });
        }
    };
    return AutoAnim;
});


/**
 * @Description: 集成一个双向链表方便操作
 * @Author:      dafeng.xdf[at]taobao.com
 * @Date:        2013.3.5
 */
;define('linkedlist',[],function(){
    'use strict';
    /**
     * @name LinkedList
     * @class 双向更新链表
     * @constructor
     */
    function LinkedList(cfg) {
        var self = this;
        self.length = 0;
        self.head = null;
        self.tail = null;
        self.type = cfg.type || true;
        self.query = [];
        self.init();
    }
    LinkedList.prototype = {
        /**
         * 初始化，增加随机序列
         */
        init: function () {
            Array.prototype.shuffle = function () {
                for (var j, x, i = this.length;
                     i;
                     j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
                return this;
            };
        },
        /**
         * 新增节点
         */
        add: function (value) {
            var self = this;
            if (self.type) {
                self.query.push(value);
                return;
            }
            var node = {
                value: value,
                next: null,//前驱
                prev: null//后继
            };
            if (self.length == 0) {
                self.head = self.tail = node;
            } else {
                self.tail.next = node;
                node.prev = self.tail;
                self.tail = node;
            }
            self.length++;
        },
        /**
         * 删除节点
         */
        remove: function (index) {
            var self = this;
            if (index > self.length - 1 || index < 0) {
                return null;
            }
            var node = self.head,
                i = 0;
            if (index == 0) {
                self.head = node.next;
                if (self.head == null) {
                    self.tail = null;
                }
                else {
                    self.head.previous = null;
                }
            }
            else if (index == self.length - 1) {
                node = self.tail;
                self.tail = node.prev;
                self.tail.next = null;
            }
            else {
                while (i++ < index) {
                    node = node.next;
                }
                node.prev.next = node.next;
                node.next.prev = node.prev;
            }
            self.length--;
        },
        /**
         * 获取链表值
         */
        get: function (index) {
            var self = this;
            if (self.type) {
                return self.query[index];
            }
            return self.node(index).value;
        },
        /**
         * 返回链表节点
         */
        node: function (index) {
            var self = this;
            if (index > self.length - 1 || index < 0) {
                return null;
            }
            var node = self.head,
                i = 0;
            while (i++ < index) {
                node = node.next;
            }
            return node;
        },
        /**
         * 更新节点值
         */
        update: function (index, value) {
            var self = this;
            if (self.type) {
                self.query[index] = value;
                return;
            }
            self.node(index).value = value;
        },
        /**
         * 返回query长度
         * @returns {Number}
         */
        size: function(){
            return this.query.length || this.length;
        }
    };
    return LinkedList;
});

/**
 * @Description:    计算排序
 * @Author:         dafeng.xdf[at]taobao.com
 * @Date:           2013.3.5
 * @Todo:           gridSort
 */
;define('gridSort',['jQuery','anim','linkedlist'],function($,AutoAnim,LinkedList){
   'use strict';
    /**
     * @name GridSort
     * @class 栅格布局算法
     */
    function GridSort() {
    }

    GridSort.prototype = {
        init: function (cfg, owner) {
            this.cfg = cfg;
            cfg.owner = owner;
            var items = cfg.container.children(cfg.selector);
            switch (cfg.sortBy){
                case EMPTY:
                case 'grid':
                default:
                    this._gridSort(items);
                    break;
                case 'cell':
                    this._cellSort(items);
                    break;
            }
        },
        _gridSort: function (items) {
            var cfg = this.cfg,
                curQuery = this._getCols();
            // 设置关键帧
            this._setFrame();
            var actions = []; // 注意里面的规则顺序
            if(cfg.exclude !== EMPTY){
                actions.push('_exclude');
            }
            if (cfg.filter !== EMPTY) {
                actions.push('_filter');
            }
            if (cfg.priority !== EMPTY) {
                actions.push('_priority');
            }
            var l = actions.length, m = items.length, s = cfg.cache ? cfg.owner._lastPos : 0, count = s;
            if (l == 0) { // 没有规则，说明全渲染，那就直接渲染
                for (var i = s; i < m; i++) {
                    this._render(curQuery, items[i]);
                }
            } else { // 有规则，走renderQueue
                var renderQueue = []; // 记录的只是序号
                actions.push('_tail');
                for (var j = s; j < m; j++) {
                    for (var t = 0, r; t < l + 1; t++) {
                        r = this[actions[t]](renderQueue, j, items[j]);
                        // 说明得到明确的插入位置，做插入并停止后面的actions执行
                        if (typeof r === 'number') {
                            renderQueue.splice(r, 0, j);
                            break;
                        }
                        // 没得到明确插入位置，本次就不插入
                        // r为false表示继续向后执行后面的actions
                        // r为true表示停止后面的actions执行
                        else if (typeof r === 'boolean' && r) {
                            break;
                        }
                    }
                }
                count = 0;
                for (var k = 0, n = renderQueue.length; k < n; k++) {
                    this._render(curQuery, items[renderQueue[k]]);
                }
            }
            // 记录一下这次渲染结束的位置(即下一次渲染开始的位置)
            cfg.owner._lastPos = m;
            var curMinMaxColHeight = this._getMinMaxColHeight();
            // 更新容器高度
            this.setHeight(curMinMaxColHeight.max);
        },
        _getCols: function () {
            var cfg = this.cfg;
            this.containerWH = cfg.landscapeOrientation ? cfg.container.outerHeight() : cfg.container.outerWidth();
            if (cfg.owner.curQuery && cfg.cache) {
                return cfg.owner.curQuery;
            } else {
                var curQuery = new LinkedList({});
                for (var i = 0, span = Math.ceil(this.containerWH / cfg.gridWidth); i < span; i++) {
                    curQuery.add(0);
                }
                return cfg.owner.curQuery = curQuery;
            }
        },
        _setFrame: function () {
            this.cfg.owner.frame++;
        },
        _exclude:function(queue, idx, elm){
            var cfg = this.cfg;
            if($(elm).hasClass(cfg.exclude)){
                return true;
            }
        },
        _filter: function (queue, idx, elm) {
            var cfg = this.cfg;
            $(elm).show();
            if ($(elm).hasClass(cfg.filter)) {
                $(elm).hide();
                return true; // 停止后面的actions执行，并且不插入
            }
            return false; // 继续执行后面的actions，插入与否由后面的actions决定
        },
        _priority: function (queue, idx, elm) {
            if (typeof queue._priorityInsertPos == 'undefined') {
                queue._priorityInsertPos = 0;
            }
            var cfg = this.cfg;
            if ($(elm).hasClass(cfg.priority)) {
                return queue._priorityInsertPos++; // 找到了队列的插入位置
            }
            return Infinity; // 找到了队列的插入位置，即队列的末尾
        },
        /**
         * 尾部action，只负责把当前的idx压栈，以免丢失
         * @param queue
         * @param idx
         * @param elm
         * @private
         */
        _tail: function (queue, idx, elm) {
            return Infinity; // 找到了队列的插入位置，即队列的末尾
        },
        _render: function (curQuery, item) {
            var self = this,
                cfg = self.cfg;
            var coordinate = self.coordinate(curQuery, item);
            // 调用动画
            self.asyncize(function () {
                self.callAnim(item, coordinate);
            });
        },
        coordinate: function (curQuery, elm) {
            var cfg = this.cfg,
                isRecountUnitWH = cfg.isRecountUnitWH,
                fixedSize = cfg.fixedSize;
            if (isRecountUnitWH || !elm.__width) {
                elm.__width = fixedSize.width ? fixedSize.width : $(elm).outerWidth();
                elm.__height = fixedSize.height ? fixedSize.height : $(elm).outerHeight();
            }
            return this._autoFit(curQuery, elm.__width, elm.__height);
        },
        /**
         * 返回x，y轴坐标
         */
        _autoFit: function (curQuery, cW, cH) {
            var cfg = this.cfg,_position,
                num = Math.ceil((( cfg.landscapeOrientation ? cH : cW ) + cfg.unitMargin.x) / cfg.gridWidth),
                cur = this._getCur(num, curQuery);
            for (var i = cur[0], len = num + cur[0], newH = cur[1] + (cfg.landscapeOrientation ? cW : cH) + cfg.unitMargin.y; i < len; i++) {
                curQuery.update(i, newH);
            }
            _position = [cur[0] * cfg.gridWidth, cur[1]];
            return cfg.landscapeOrientation ? _position.reverse() : _position;
        },
        /**
         * 获取当前指针
         */
        _getCur: function (num, curQuery) {
            return this._skipALG(num, curQuery);
        },
        /**
         * 单步式算法（常规保守的）
         * @param num 粒度
         * @param curQuery
         * @returns {Array}
         * @private
         */
        _stepALG: function (num, curQuery) {
            var cur = [null, Infinity];
            for (var i = 0, len = curQuery.size(); i < len - num + 1; i++) {
                var max = 0;
                for (var j = i; j < i + num; j++) {
                    if (curQuery.get(j) > max) {
                        max = curQuery.get(j);
                    }
                }
                if (cur[1] > max) {
                    cur = [i, max];
                }
            }
            return cur;
        },
        /**
         * 跳跃式算法（性能优越的）
         * @param num 粒度
         * @param curQuery
         * @returns {Array}
         * @private
         */
        _skipALG: function (num, curQuery) {
            var min = Infinity,
                idx = 0,
                len = curQuery.size();
            for (var i = 0; i <= (len < num ? 0 : len - num); i++) {
                var max = -Infinity, curValue;
                for (var j = 0; j < num; j++) {
                    curValue = curQuery.get(i + j);
                    if (curValue >= min) {
                        i += j + 1; // 向后跳跃
                        if (i > len - num) {// 过界了
                            max = min; // 主要是绕过min > max这个条件，以免污染min
                            break;
                        }
                        j = -1; // reset
                        max = -Infinity; // reset
                        continue;
                    }
                    if (curValue > max) {
                        max = curValue;
                    }
                }
                if (min > max) {
                    min = max;
                    idx = i; // 记录位置
                }
            }
            return [idx, min];
        },
        asyncize: function (handle) {
            var self = this,
                cfg = self.cfg;
            if (cfg.suspend) { // TODO 优化点：既然该判断条件可以在逻辑树上上提，以加快该函数的执行
                setTimeout(function () {
                    handle.call(self);
                }, 0);
            } else {
                handle.call(self);
            }
        },
        callAnim: function (elm, coordinate) {
            var cfg = this.cfg;
            new AutoAnim({
                elm: elm,
                x: coordinate[0],
                y: coordinate[1],
                closeAnim: cfg.closeAnim,
                duration: cfg.duration,
                easing: cfg.easing,
                direction: cfg.direction,
                frame: cfg.owner.frame,
                owner: cfg.owner,
                animType:cfg.animType
            });
            elm.autoResponsiveCoordinate = {
                x:coordinate[0],
                y:coordinate[1]
            };
        },
        _getMinMaxColHeight: function () {
            var cfg = this.cfg,
                min = Infinity,
                doneQuery = cfg.owner.curQuery.query, // TODO 如果使用的类型是链表？
                max = Math.max.apply(Math, doneQuery);
            if (max == 0) { // 说明是空容器
                min = 0;
            } else {
                for (var i = 0, len = doneQuery.length; i < len; i++) {
                    if (doneQuery[i] != 0 && doneQuery[i] < min) {
                        min = doneQuery[i];
                    }
                }
            }
            return {
                min: min,
                max: max
            };
        },
        /**
         * 设置容器高度
         * @param height
         */
        setHeight: function (height) {
            var cfg = this.cfg;
            if(!cfg.autoHeight){
                return;
            }
            cfg.landscapeOrientation ? cfg.container.width(height): cfg.container.height(height);
        },
        /**
         * @deprecated 该功能暂时未完善
         *
         * @param items
         * @private
         */
        _cellSort: function (items) {
            var self = this,
                _maxHeight = 0,
                _row = 0,
                curQuery = [];
            $.each(items, function (i, key) {
                S.log('star from here!');
                curQuery.push(self._getCells());
            });
        },
        _getCells: function () {
            return this._getCols();
        }
    };
    return GridSort;
});

/**
 * base 基础结构
 */
;define('base',['jQuery','config','gridSort','util'],function($,Config,GridSort,Util){
    'use strict';
    /**
     * @param options
     * @constructor
     */    
    $.Diamond = function( options ){
        var cfg = this.cfg = {};
        $.extend(cfg,Config,options);
        this.init();
    };
    $.Diamond.prototype = {
        /**
         * 初始化组件
         * @return  排序实例
         */
        init: function () {
            this._bindEvent();
            this.initPlugins();
            this.render();
        },
        /**
         * 初始插件
         */
        initPlugins: function () {
            var cfg = this.cfg;
            for (var i = 0, a = cfg.plugins, len = a.length, v; i < len; i++) {
                v = a[i];
                v.init(this);
            }
        },
        /**
         * 渲染排序结果
         */
        render: function () {
            var self = this,
                cfg = self.cfg,
                whensRecountUnitWH = cfg.whensRecountUnitWH;
            cfg.isRecountUnitWH = !!whensRecountUnitWH.length;
            this.frame = this.frame || 0;
            arguments[0] && $.each(arguments[0], function(key,val){      
                cfg[key] = val;
            });
            this.gridSort = this.gridSort || new GridSort();
            this.gridSort.init(cfg, this);
        },
        /**
         * 添加事件节流阀
         */
        _bindEvent: function () {
            var self = this,
                cfg = self.cfg,
                whensRecountUnitWH = cfg.whensRecountUnitWH;
            !cfg.closeResize && $(win).bind('resize',Util.throttle(function(){
                if(cfg.delayOnResize !== -1){
                    setTimeout(function(){
                        self.render(arguments);
                    },cfg.delayOnResize);
                }else{
                    self.render(arguments);
                }
            },cfg.resizeFrequency));
        },
        /**
         * 重新布局调整
         */
        adjust: function (isRecountUnitWH) {
            var self = this,
                cfg = self.cfg;
            var whensRecountUnitWH = cfg.whensRecountUnitWH;
            this.__isAdjusting = 1;
            this.render({
                cache:false
            });
            this.__isAdjusting = 0;
        },
        isAdjusting: function () {
            return this.__isAdjusting || 0;
        },
        /**
         * 优先排序方法
         * @param {String} 选择器
         */
        priority: function (selector) {
            this.render({
                priority: selector
            });
        },
        /**
         * 过滤方法
         * @param {String} 选择器
         */
        filter: function (selector) {
            this.render({
                filter: selector
            });
        },
        /**
         * 调整边距
         * @param {Object} 边距
         */
        margin: function (margin) {
            this.render({
                unitMargin: margin
            });
        },
        /**
         * 方向设置
         * @param {String} 方向
         */
        direction: function (direction) {
            this.render({
                direction: direction
            });
        },
        /**
         * 随机排序
         */
        random: function () {
            this.render({
                random: true
            });
        },
        /**
         * 改变组件设置
         * @param {Object} 设置对象
         */
        changeCfg: function (cfg) {
            var self = this;
            $.each(cfg,function(key,i){
                self.cfg[key] = i;
            });
        },
        /**
         * append 方法,调用跟随队列优化性能
         * @param {Object} 节点对象（可以为单个元素、多个元素数组、fragments，以及混合数组）
         */
        appendNode: function (nodes) {
            var self = this,
                cfg = self.cfg;
            self.append(nodes);
            self.render({
                cache: true
            });
        },
        /**
         * dom prepend 方法,耗费性能
         * @param {Object} 节点对象（可以为单个元素、多个元素数组、fragments，以及混合数组）
         */
        prependNode: function (nodes) {
            var self = this,
                cfg = self.cfg;
            self.prepend(nodes);
            self.render();
        }  
    };
});

/**
 * diamond 结束出口
 */
$.fn.diamond = function (options) {
    var self = this;
    if (typeof options === 'object') {
        $.extend(options,{
            container:self
        });
        self.each(function () {
            var instance = $.data(self, 'diamond');
            if (instance) {
                instance.option(options);
            } else {
                $.data(self, 'diamond',self.instance = new $.Diamond(options));
            }
        });
    }
    return $.extend(self,self.instance);
};
})(window, jQuery);
