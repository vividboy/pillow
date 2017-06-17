define('factory',[],function(){
    function Factory(cfg){
        this.container = cfg.container;
        this.num = 64;
        this.diamond = cfg.handle
        this.init();
    }
    Factory.prototype = {
        init:function(){
            this.create(this.num);
        },
        create:function(num){
            var self = this;
            for(var i = 0;i<num;i++){
                var index = self._getRandom(7);
                var TPL = $('<div class="block"></div>').addClass('cell-' + index).data('data-index',index);
                self.diamond.appendNode(TPL);
            }
        },
        _getRandom:function(range){
            return parseInt(Math.random()*range);
        },
        sprite:function(elm,xd,yd,h,l,x,y){
            var self = this;
            var _h = 0,
                _l = 0,
                _x = x,
                _y = y;
            self._elm = elm;
            self._position = $(elm).css('background-position');
            self.diamond.currentSprite = setInterval(function(){
                $(elm).css('background-position',_x +'px '+_y+'px');
                _l ++;
                _x += xd;
                if(_l == l){
                    _h ++;
                    _l = 0;
                    _x = x;
                    _y += yd;
                    if(_h == h){
                        _h = 0;
                        _l = 0;
                        _x = x;
                        _y = y;
                    }
                }
            },16)
        },
        clearSprite:function(){
            var self = this;
            clearInterval(self.diamond.currentSprite);
            $(self._elm).css('background-position',self._position);
        },
        soundPlay:function(n){
            document.getElementById(n).play()
        }
    };
    return Factory;
});
define('initGame',['jQuery','factory','sort'],function($,Factory,Sort){
    function Game(){
        this.Game = {};
        this.init();
    };
    Game.prototype = {
        init:function(){
            var self = this;
            self.gameInstance = $('.J_container_game').diamond({
                selector:'.block',
                unitMargin:{
                    x :10,
                    y:15
                },
               autoHeight:false,
               whensRecountUnitWH:['resize','adjust'] 
            });
            self.initGame();
            self.factory = new Factory({
                container:self.gameInstance.cfg.container,
                handle:self.gameInstance
            });
            self.checkRemove();
            self.bindEvent();
        },
        initGame:function(){
            var self = this;
            self.Game.status = [];
            this.Game.score = 0;
            self.currentIndex = null;
        },
        switchStatus:function(){
            var self = this,
                Game = self.Game;
            self.factory.clearSprite();
            Game.status.push(self.currentIndex);
            if(Game.status.length == 2){
                self.swapStatus();
                Game.status = [];
                self.currentIndex = null;
            }else if(Game.status.length == 1){
                var spriteMap = [];
                switch($(self.currentFirstTarget).data('data-index')){
                    case 0:
                        spriteMap = [self.currentFirstTarget,-65,-69,4,5,4,-1378];
                        break;
                    case 1:
                        spriteMap = [self.currentFirstTarget,-65,-65,4,5,-335,-1615];
                        break;
                    case 2:
                        spriteMap = [self.currentFirstTarget,-70,-64,5,4,-708,-1327];
                        break;
                    case 3:
                        spriteMap = [self.currentFirstTarget,-70,-69,5,4,0,-722];
                        break;
                    case 4:
                        spriteMap = [self.currentFirstTarget,-69,-74,4,5,0,-1074];
                        break;
                    case 5:
                        spriteMap = [self.currentFirstTarget,-74,-67,5,4,-722,-320];
                        break;
                    case 6:
                        spriteMap = [self.currentFirstTarget,-68,-72,4,5,-353,-1329];
                        break;
                }
                self.factory.sprite.apply(self.factory,spriteMap);
            }
        },
        closeAnim:function(){
            var self = this;
             self.gameInstance.cfg.container.removeClass('animation');
        },
        openAnim:function(){
            var self = this;
             self.gameInstance.cfg.container.addClass('animation');
        },
        swapStatus:function(){
            var self = this,r
            Game = self.Game;
            var currentCells = self.gameInstance.cfg.container.children();
            var _cache = Game.status;
            self.swapNodes(currentCells[Game.status[0]],currentCells[Game.status[1]]);
            self.gameInstance.adjust();
            setTimeout(function(){
                if(self.checkRemove()){
                    return;
                }
                self.factory.soundPlay('bad'); 
                var currentCells = self.gameInstance.cfg.container.children();
                self.swapNodes(currentCells[_cache[1]],currentCells[_cache[0]]);
                self.gameInstance.adjust();               
            },1000);
        },
        checkRemove:function(){
            var self = this,
                Game = self.Game;
                Game.mainMap = {};
            var currentCells = self.gameInstance.cfg.container.children();
            var currentP = null;
            var currentIndex = null;
            var currentX = null;
            var currentY = null;
            var operatorNum = null;
            var removeQuery = [];
            function checkInit(k){
                for(var i = 0;i<64;i++){
                    if(!!~$.inArray(i,removeQuery)){
                        continue;
                    }
                    currentP = i;
                    currentIndex = $(currentCells[currentP]).data('data-index');
                    removeQuery.push(currentP);
                    operatorNum = 1;
                    checkUp(currentP);
                }
                return;
            }
            function checkUp(i){
                var _i = i;
                if(!Game.mainMap[_i-8]){
                    checkDown(currentP);
                    return;
                }
                if(Game.mainMap[_i-8].index == currentIndex){
                    removeQuery.push(_i-8);
                    operatorNum ++;
                    checkUp(_i-8);
                }else{
                    checkDown(currentP);
                }
            }
            function checkDown(i){
                var _i = i;
                if(!Game.mainMap[_i+8]){
                    checkHorizontal();
                    return;
                }
                if(Game.mainMap[_i+8].index == currentIndex){
                    removeQuery.push(_i+8);
                    operatorNum ++;
                    checkDown(_i + 8);
                }else{
                    checkHorizontal();
                }
            }
            function checkHorizontal(){
                if(operatorNum <3){
                    for(var i =0;i<operatorNum-1;i++){
                        removeQuery.pop();
                    }
                }
                operatorNum = 1;
                checkLeft(currentP);
            }
            function checkLeft(i){
                var _i = i;
                if(_i%8 == 0){
                    checkRight(currentP);
                    return;
                }
                if(Game.mainMap[_i-1].index == currentIndex){
                    removeQuery.push(_i-1);
                    operatorNum ++;
                    checkLeft(_i-1);
                }else{
                    checkRight(currentP);
                }
            }
            function checkRight(i){
                var _i = i;
                if(_i%7 == 0){
                    checkVertical();
                    return;
                }
                if(Game.mainMap[_i+1].index == currentIndex){
                    removeQuery.push(_i+1);
                    operatorNum ++;
                    checkRight(_i + 1);
                }else{
                    checkVertical();
                }
            }
            function checkVertical(){
                if(operatorNum <3){
                    for(var i =0;i<operatorNum;i++){
                        removeQuery.pop();
                    }
                }
                operatorNum = 1;
            }
            $.each(currentCells,function(k,v){
                Game.mainMap[k] = {
                    index:$(currentCells[k]).data('data-index')
                };
            });
            checkInit();
            self.removeNodes(removeQuery);
            return !!removeQuery.length;
        },
        removeNodes:function(q){
            var self = this;
            var currentCells = self.gameInstance.cfg.container.children();
            $.each(q,function(k,v){
                $(currentCells[v]).remove();
            });
            currentCells = self.gameInstance.cfg.container.children();
            self.factory.create(64- currentCells.length);
            self.gameInstance.adjust();
            if(64- currentCells.length !==0){
                self.getScore();
                self.checkRemove();
            }
        },
        getScore:function(){
            var self = this,
                Game = self.Game;
            Game.score += 5;
            self.factory.soundPlay('match'); 
            $('.J_score').html('Your score : ' + Game.score);    
        },
        swapNodes:function(elm1,elm2){
            function replaceElement(ele1, ele2) {
                var $ele1Temp = $(ele1).clone(true);
                var $ele2Temp = $(ele2).clone(true);
                $(ele1).replaceWith($ele2Temp);
                $(ele2).replaceWith($ele1Temp);
            }
            var self = this;
            replaceElement(elm1,elm2);
            self.openAnim();
        },
        bindEvent:function(){
            var self = this,
                cfg = self.gameInstance.cfg,
                Game = self.Game;
            cfg.container.delegate(cfg.selector,'click',function(e){
                if(!self.checkAccess(self.getIndex(e.currentTarget))){
                    return;
                }
                self.factory.soundPlay('select'); 
                self.closeAnim();
                self.currentFirstTarget = e.currentTarget;
                self.currentIndex = self.getIndex(e.currentTarget);
                self.switchStatus();    
            });
        },
        getIndex:function(elm){
            var self = this,
                cfg = self.gameInstance.cfg,
                _i;
            $.each(cfg.container.children(),function(key,i){
                if(i == elm){
                    _i = key;
                }
            });
            return _i;
        },
        checkAccess:function(i){
            var self = this,
                result = false;
            function access(i){
                var _r = false;
                if(!self.currentIndex || self.currentIndex == i+1 || self.currentIndex == i-1 || self.currentIndex == i+8 || self.currentIndex == i -8){
                    _r = true;
                }
                return _r;
            }
            if(self.currentIndex !== i &&  access(i)){
                result = true;
            }
            return result;
        }
    };
    new Game();
});
