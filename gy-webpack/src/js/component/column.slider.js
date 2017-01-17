;(function($){
    /* 封装jquery插件 */
    $.fn.extend({
        ColumnSlider:function(options){
            return this.each(function(){
                new ColumnSlider(this,options);
            });
        }
    });
    /* 构造函数 */
    function ColumnSlider(element,options){
        /* 初始化参数及变量 */
        this.options = $.extend({},ColumnSlider.DEFAULTS,options);
        this.elem = $(element);
        this.domUl = this.elem.find('ul');
        this.domLi = this.elem.find('li');
        this.domWidth = this.domLi.width();
        this.domBtnPrev = this.elem.find('.btn-prev');
        this.domBtnNext = this.elem.find('.btn-next');
        this.len = this.domLi.length;
        this.index = 0;
        this.timer = null;

        this.init();
    }
    /* 默认参数 */
    ColumnSlider.DEFAULTS = {
        sliderPreView:4,
        autoPlay:false,
        loop:false
    };
    /* ColumnSlider原型 */
    ColumnSlider.prototype = {
        /* 初始化函数 */
        init:function(){
            this.domUl.css('width',this.len*this.domWidth+(this.len*20));

            if(this.len <= 4){
                this.domBtnPrev.hide();
                this.domBtnNext.hide();
            }
            /* 事件函数 */
            this.events();
        },
        /* 事件函数 */
        events:function(){
            var self = this;
            /* 点击go上一个 */
            this.domBtnPrev.on('click',function(){
                self.goPrev();
            });
            /* 点击go下一个 */
            this.domBtnNext.on('click',function(){
                self.goNext();
            });
        },
        /* 播放上一页的函数 */
        goPrev:function(){
            this.index--;
            this.domBtnNext.show();
            if(this.index === 0){
                this.domBtnPrev.hide();
            }
            this.go(this.index);
        },
        /* 播放下一页的函数 */
        goNext:function(){
            this.index++;
            this.domBtnPrev.show();
            if(this.index === this.len-this.options.sliderPreView){
                this.domBtnNext.hide();
            }
            this.go(this.index);
        },
        /* 运动函数 */
        go:function(index){
            var self = this;
            this.domUl.stop().animate({
                left:-(this.domWidth+20)*index
            },500);
        }
    };
})(jQuery);