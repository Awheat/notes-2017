;(function($){
    /*
     *
     *  #配置默认参数#
     *
     * */
    var defaults = {
        pageIndex:1,
        pageSize:5,
        err: '',
        ttaa: '',
        sub_url: '',
        get_url: '',
        sub_callback:function(){},
        get_callback:function(){}
    };

    /* 讨论模块构造函数 */
    var Discuss = function(elem,options){
        var opts = options,
            ttaa = $(opts.ttaa),
            $err = $(opts.err),
            $obj = $(elem);

        this.is_ajax = true;

        /* 绑定事件函数 */
        this.events = function(){
            var self = this;
            $obj.on('click',function(){
                var _this = $(this);
                var val = ttaa.val();
                var result = self.validate(val);
                /* 根据结果处理显示 */
                if(!result.flag){
                    $err.html(result.msg);
                }else{
                    $err.html('');
                    _this.addClass('loading');
                    if(self.is_ajax){
                        self.is_ajax = false;
                        $.post(opts.sub_url,{content:val,id:$('#active_id').val()},function(data){
                            _this.removeClass('loading');
                            ttaa.val('');
                            data = self.dataParse(data);
                            /* 渲染模板并追加到页面 */
                            var tpl=template('tpl_comments_item',data);
                            $(tpl).hide().prependTo($(".comment-list ul")).slideDown();
                            $(".comment-list").find('.none').remove();
                        });
                    }
                }
            });
        };

        /* 验证文本域用户输入内容函数 */
        this.validate = function (v) {
            if(v === ""){
                return this.set_result("请输入内容~");
            }else if(v.match(/[@#\$%\^&\*]+/g)){
                return this.set_result("请输入合法内容~");
            }else if(v.length > 500){
                return this.set_result("最多可输入500合法字符");
            }else {
                return this.set_result("验证通过~",true);
            }
        };

        /* 设计结果函数 */
        this.set_result = function(text,bool){
            return {msg: text,flag: bool || false}
        };

        /* 设置验证结果函数 */
        this.dataParse = function (data) {
            return typeof data == 'string'?JSON.parse(data):data;
        };

        /* 获取评论列表函数 */
        this.getComments = function(index){
            var self = this;
            var cm_list = $('.comment-list');
            $.ajax({
                url:opts.get_url,
                data:{p:opts.pageIndex,pageSize:opts.pageSize},
                dataType:'jsonp',
                success:function(data){
                    data = self.dataParse(data);
                    console.log(data);
                    var cm_list = $('.comment-list');
                    /* 渲染模板 */
                    if(data.data.length == 0){
                        $('<div class="none">暂无评论</div>').appendTo(cm_list);
                    }else{
                        cm_list.find('ul').html(template('tpl_comments',data));
                        if(index == 1) self.pagination('.pagination',data.page.total);
                    }
                    opts.get_callback(data);
                }
            });
        };

        /* 初始化分压插件函数 */
        this.pagination = function(elem,totalPage){
            var self = this;
            $(elem).pagination({
                totalData:totalPage,
                showData:opts.pageSize,
                coping:true,
                homePage:'首页',
                endPage:'末页',
                prevContent:'上页',
                nextContent:'下页',
                callback:function(callback){
                    opts.pageIndex = callback.getCurrent();
                    self.getComments(opts.pageIndex);
                }
            });
        };

        /* 初始化 */
        this.init = function(){
            this.events();
            this.getComments(1);
        };


        /* 调用初始化函数 */
        this.init();
    };

    /*
     * 注册插件
     * */
    $.fn.discuss = function(options){
        var options = $.extend({},defaults,options || {});
        return this.each(function(){
            new Discuss(this,options)
        });
    }
})(jQuery);
