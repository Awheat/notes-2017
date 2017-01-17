;(function($){
	/* 构造函数 */
    function FullSlider(options){

        this.options = options || {};
        this.arrowBtn = this.options.arrowBtn || true;
        this._el = $(this.options.el);
        this._ul = this._el.find('ul');
        this._li = this._el.find('li');
        this._btnPrev = this._el.find('.slider-prev');
        this._btnNext = this._el.find('.slider-next');
        this._btnControll = this._el.find('.slider-controll');
        this._width = $('body').width();
        this.len = this._li.length;
        this.ind = 1;
        this.timer = null;

        this.init();
    }

    FullSlider.prototype = {
        init: function() {
            this.setLiWidth(this._width);
            /* 初始化复制dom节点函数 */
            if(this.len !== 1){
                this.cloneNodes();
                this.autoPlay();
            }else{
                this._btnNext.hide();
                this._btnPrev.hide();
            }
            if(!this.arrowBtn){
                this._btnNext.hide();
                this._btnPrev.hide();
            }
            this.events();
        },
        events: function(){
            var self = this;
            /* 点击上一张 */
            this._btnPrev.on('click',function(e){
                self.goPrev();
            });
            /* 点击下一张 */
            this._btnNext.on('click',function(e) {
                self.goNext();
            });
            /* 右下角的控制按钮事件 */
            this._btnControll.on('click','span',function(){
                self.ind = $(this).index()+1;
                self.go(self.ind);
            });
            /* 鼠标悬浮在轮播图上时取消西东播放 */
            this._el.hover(function(){
                clearInterval(self.timer);
            },function(){
                if(self.len !== 1){
                    self.autoPlay();
                }
            });

            $(window).on('resize',function(){

                self._width = $('body').width();

                console.log(self._width);
                self.setLiWidth(self._width);
            });

        },
        /* 自动播放 */
        autoPlay:function(){
            var self = this;
            this.timer = setInterval(function(){
                self.goNext();
            },4000);
        },
        /* 去上一张 */
        goPrev:function(){
            this.ind--;
            if(this.ind === -1){
                this._ul.css('left',-this._width*this.len);
                this.ind = this.len-1;
            }
            this.go(this.ind);
        },
        /* 去下一张 */
        goNext:function(){
            this.ind++;
            if(this.ind === this.len+2){
                this._ul.css('left',-this._width);
                this.ind = 2;
            }
            this.go(this.ind);
        },
        /* 播放函数 */
        go:function(index){
            var self = this;
            if(this.len !== 1){
                this._ul.stop().animate({
                    left:-this._width * index
                },500,function(){
                    /*
                     * 设置控制按钮当前选中的效果
                     * */
                    if(index == self.len+1) index = 1;
                    self._btnControll.find('span').eq(index-1).addClass('active').siblings('span').removeClass('active');
                });
            }
        },
        setLiWidth:function(w){
            var _li_width = w<1100?1100:w;
            this._ul.find('li').css('width',_li_width+'px');

            if(this.len !== 1){
                this._ul.css({
                    width: _li_width * (this.len+2)+'px',
                    left: -_li_width
                });
            }else{
                this._ul.css('width',_li_width*this.len+'px');
            }
        },
        /* 复制第一个和最后一个元素，并设置外层容器的宽度 */
        cloneNodes:function(){
            if(this._ul.find('.clone')>0){
                return false;
            }
            var firstNode = this._ul.find('li:first').clone().addClass('clone');
            var lastNode = this._ul.find('li:last').clone().addClass('clone');
            this.setLiWidth(this._width);
            this._ul.append(firstNode).prepend(lastNode);
            this.setLiWidth(this._width);
            this.addControllerBtn();
        },
        /* 根据元素个数添加控制按钮的个数 */
        addControllerBtn:function(){
            var btns = '';
            for(var i=0;i<this.len;i++){
                btns += '<span></span>';
            }
            this._btnControll.append(btns).find('span').eq(this.ind-1).addClass('active');
        }
    };

    window.FullSlider = FullSlider;
})(jQuery);


