;(function($){
    var defaults = {};
    /* 登录验证 */
    var LoginValidate = function(elem,options){
        var self = this,$form = $(elem),$btn_submit = $form.find('.login-btn');

        /* 用户名(邮箱或者手机号的验证) */
        this.is_email_phone = function () {
            $.validator.addMethod( "isEmailOrPhone",function(value,element){
                if(!value.match(/^1[34578]\d{9}$/) && !value.match(/^[\w\-\.]+@[\w\-\.]+(\.\w+)+$/)){
                    return false;
                }
                return true;
            } , "请输入合法邮箱或手机号");
        };
        /* 显示服务器返回的的错误信息 */
        this.show_err = function (name,msg){
            var _input = $("input[name="+name+"]"),
                _label = _input.siblings('label');
                if(_label.length == 0){
                    _input.parent().append('<label id='+name+'_error'+' class="error" for='+name+'>'+msg+'</label>');
                }else{
                    _label.text(msg).show();
                }
        };
        /* 验证的配置文件 */
        var config = {
            ignore: ':hidden',
            submitHandler: function (form) {
                $btn_submit.addClass('disable');
                var param = $(form).serialize();
                //ajax 表单提交
                $.ajax({
                     url: $form.attr('data-url'),
                     type: "post",
                     dataType: "jsonp",
                     data: param,
                     success: function (result) {
                         if(result.status==1){
                             var return_url = $form.find('#returnurl');
                                if(return_url.length>0){
                                    window.location.href=return_url.val();
                                }else{
                                    window.location.href="/";
                                }
                         }else if(result.status == 0){
                             $btn_submit.removeClass('disable');
                             self.show_err('username',result.msg);
                         }else{
                             $btn_submit.removeClass('disable');
                             self.show_err('password',result.msg);
                         }
                     }
                 });
            },
            rules: {
                username:{required:true,isEmailOrPhone:true},
                password:{required:true,minlength: 6}
            },
            messages:{
                username:{required:"请输入账号"},
                password:{required: "请输入密码",minlength: "密码长度不能小于6"}
            }
        };
        /* 初始化函数 */
        this.init = function () {
            this.is_email_phone();
            $form.validate(config);
        };

        this.init();
    };
    /*
     * 注册插件
     * */
    $.fn.login_validate = function(options){
        var options = $.extend({},defaults,options || {});
        return this.each(function(){
            new LoginValidate(this,options)
        });
    }
})(jQuery);