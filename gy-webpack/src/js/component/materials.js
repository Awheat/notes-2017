/**
 * Created by wuwc on 2016/12/28.
 * 申请物资模块
 *
 */

;(function ($) {
    var defaults = {
        box:''
    };
    /* 申请物资构造函数 */
    var Materials = function (elem,options) {
        var self = this,$form = $(elem),opts = options;

        var $wuzi = $form.find('li'),
            $submitbtn = $form.find('.btn-ok'),
            $cancelbtn = $form.find('.btn-cancel');
        this.events = function () {
            /* 减物资 */
            $wuzi.on('click','.minus',function(){
                var ipt = $(this).next('input'),num = ipt.val();
                    num--;
                    ipt.val(num = num<0?0:num);
                    self.isChoiceWuZi();
            });
            /* 加物资 */
            $wuzi.on('click','.plus',function(){
                var ipt = $(this).prev('input'),num = ipt.val(),max=ipt.data("max");
                num++;
                ipt.val(num > max ? max :num);
                self.isChoiceWuZi();
            });

            /* 提交按钮 */
            $submitbtn.on('click',function () {
                self.isChoiceWuZi();
            });

            $cancelbtn.on('click',function () {
                options.box.close();
            });
        };

        /* 判断是否选择物资项 */
        this.isChoiceWuZi = function () {
            var arr = [],err = $('i.err'),max = 0;
                $wuzi.each(function () {
                    arr.push($(this).find('.number').val())
                });
                max = Math.max.apply(null,arr);
                if(max<1){
                    err.removeClass('hide');
                }else{
                    err.addClass('hide');
                }
        };
        this.custom_reg = function () {
            $.validator.addMethod( "isPhone",function(value,element){
                var reg = /^1[34578]\d{9}$/;
                return reg.test(value);
            } , "请输入合法手机号");
            $.validator.addMethod( "isPostCode",function(value,element){
                var reg = /^[1-9][0-9]{5}$/;
                return reg.test(value);
            } , "请输入合法邮编");
            $.validator.addMethod( "isText",function(value,element){
                return !value.match(/[@#\$%\^&\*]+/g);
            } , "请输入合法字符");
        };

        this.formConfig = {
            submitHandler: function (form) {
                var param = $(form).serialize();
                var url=$(form).data('url');
                $.ajax({
                    url:url,
                    data:param,
                    dataType:'json',
                    type:'post',
                    success:function(result){
                        debugger;
                    }
                })
            },
            rules:{
                name: {required: true},
                phone: {
                    required:true,
                    isPhone: true
                },
                code:{
                    required:true,
                    isPostCode:true
                },
                provinceid:"required",
                cityid:"required",
                countyid:"required",
                address:"required",
                reason:{isText:true}

            },
            messages:{
                name: {required:"请输入姓名"},
                phone: {
                    required: "请输入手机号"
                },
                provinceid: "请选择收获地址",
                cityid: "请选择省",
                countyid: "请选择区",
                address:"请填写详细地址",
                code:{required:"请填写邮编"}
            }
        };


        this.init = function () {
            this.events();
            this.custom_reg();
            $form.validate(this.formConfig);
        };

        this.init();
    };


    /*
     * 注册插件
     * */
    $.fn.materials = function(options){
        var options = $.extend({},defaults,options || {});
        return this.each(function(){
            new Materials(this,options)
        });
    };
})(jQuery);
