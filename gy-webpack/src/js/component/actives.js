;(function($){
    /* 活动模块 */
    var defaults = {
        pageIndex:1,
        pageSize:9,
        search_callback:function () {}
    };
    
    var Actives  = function (elem,options) {
        var opts = options,
            elem = $(elem);

            this.is_ajax = true;
            /* 事件函数 */
            this.events = function(){
                var self = this;
                elem.find('dd').on('click','span',function(){
                    var that = $(this);
                    that.parents('dd').find('span').removeClass('active');
                    that.addClass('active');
                    if(self.is_ajax){
                        self.getActives(1);
                    }
                });

                elem.find('.chkbox').on('click','input',function(){
                    if(self.is_ajax){
                        self.getActives(1);
                    }
                });
            };

            /* 获取活动 */
            this.getActives = function (pageIndex) {
                this.is_ajax = false;
                var self = this,container = $('.active-list'),url = container.attr('data-url');
                var objs = {
                    p: pageIndex,
                    pageSize: opts.pageSize
                };
                var selected = self.getSlected();
                objs = Object.assign(objs,selected);
                //console.log(objs);
                $.ajax({
                    url:url,
                    data:objs,
                    dataType:'jsonp',
                    success: function (data) {
                        self.is_ajax = true;
                        if(data.list.length == 0){
                            container.html('<div class="none">暂无活动</div>');
                            self.pagination(0);
                        }else{
                            container.html(template('tpl_actives',data));
                            if(pageIndex == 1) self.pagination(data.total);
                        }
                        opts.search_callback(data);
                    }
                });
            };
            /* 分页 */
            this.pagination = function (totalpage) {
                var self = this;
                $('.pagination').pagination({
                    totalData:totalpage,
                    showData:opts.pageSize,
                    coping:true,
                    homePage:'首页',
                    endPage:'末页',
                    prevContent:'上页',
                    nextContent:'下页',
                    callback:function(callback){
                        opts.pageIndex = callback.getCurrent();
                        self.getActives(opts.pageIndex);
                    }
                });
            };
            /* 获取选中的值 */
            this.getSlected = function(){
                var args = {},_type=$('.type'),_category=$('.category'),_address=$('.address'),_chkbox=$('.chkbox');
                if(_type.length>0){
                    args.type = _type.find('span.active').attr('data-id');
                }
                if(_category.length>0){
                    args.category = _category.find('span.active').attr('data-id');
                }
                if(_address.length>0){
                    args.address = _address.find('span.active').attr('data-id');
                }
                if(_chkbox.length>0){
                    var ing = _chkbox.find('.ing_active'),aut = _chkbox.find('.aut_active');
                        args.show_ing = ing.prop('checked')?1:0;
                        args.show_aut = aut.prop('checked')?1:0;
                }
                return args;
            };

            /* 初始化函数 */
            this.init = function () {
                this.events();
                this.getActives(1);
            };

            /* 在构造函数中启用初始化函数 */
            this.init();
    };

    /*
     * 注册插件
     * */
    $.fn.actives = function(options){
        var options = $.extend({},defaults,options || {});
        return this.each(function(){
            new Actives(this,options)
        });
    }
})(jQuery);
!(function () {
    /* 活动列表的js */
    var flag = true;
    $('.more').on('click',function () {
        var that = $(this),cont = that.prev('dd').find('.others');
        if(flag){
            that.html('收起<i class="up"></i>');
            cont.css('height','auto');
            flag = false;
        }else{
            that.html('更多<i class="down"></i>');
            cont.css('height','30px');
            flag = true;
        }
    });
})();