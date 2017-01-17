;(function($){
    var defaults = {};
    /* 注册验证 */
    var RegistValidate = function(elem,options){
        var self = this,$form = $(elem),$btn_submit = $form.find('.regist-btn');
        this.timer = '';
        /* 自定义的验证规则 */
        this.custom_reg = function () {
            $.validator.addMethod( "isPhone",function(value,element){
                var reg = /^1[34578]\d{9}$/;
                return reg.test(value);
            } , "请输入合法手机号");

            $.validator.addMethod( "isUserName",function(value,element){
                var reg = /^[_a-zA-Z0-9\u4E00-\u9FA5]{2,24}$/;
                return reg.test(value);
            } , "请输入2-24位合法昵称");
        };
        
        this.events = function () {
            var self = this, is_ajax = true;
            /* 注册手机号或邮箱的切换 */
            
            $(".form-switch").on('click','i',function(){
                var _this = $(this),_tag = $("input[name='tag']");
                if(_tag.val()==0){
                    
                    _this.text('或邮箱注册');
                    _tag.val(1);
                }else{
                   
                    _this.text('或手机注册');
                    _tag.val(0);
                }
                $(".form-email,.form-phone").toggleClass('hide');
            });

            $(".get-msgcode").on('click',function (e) {
                var secs=60,_this = $(this),_phone = $('input[name="phone"]');
                    if(_phone.valid() && is_ajax){
                        is_ajax = false;
                        $.ajax({
                            url:_this.attr('data-url'),
                            type:'post',
                            data:{phone:_phone.val()},
							dataType:"json",
                            success: function (data) {
								is_ajax = true;
								if(data.status==1){	
								   $("#smscode").attr('value',data.smscode);
								   var smscode=$("#smscode").attr('value');
								   //发送手机验证码短信
								   sms(_phone.val(),smscode,secs);
								}else{
									self.show_err('phone_code',data.msg);
								}
                               
                            }
                        });
                    }
            });
        };

        this.initBoxStyle = function (w,h) {
            var pop_win = $('.jconfirm-scrollpane');
            pop_win.find('.container').css({
                position:'relative',
                width: w,
                height: h,
                left: '50%',
                marginLeft:-(w/2)
            });
        };

        this.showSuccessBox = function () {
            var box = $.dialog({
                title: '',
                content: $("#tpl_regist_succ").html(),
                onOpenBefore: function () {
                    self.initBoxStyle(740,'auto');
                },
                onOpen: function () {
                    $(".not-auth").on('click','a',function(){
                        box.close();
                    });
                }
            });
        };
        var err_key = ['nickname','password','repassword','email','email_code','phone','phone_code'];
        var err_vue = {
            _1:"昵称已被注册",
            _2:"昵称长度2-24",
            _3:"昵称仅支持中英文、数字、下划线",
            _4:"密码最少为6个字符",
            _5:"两次密码不一致",
            _6:"邮箱格式不正确",
            _7:"邮箱已被注册",
            _8:"手机号格式不正确",
            _9:"手机号已被注册",
            _10:"验证码错误",
            _11:"成功",
			_12:"注册失败"
			
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
        /* 验证表单的配置文件 */
        var _nickname = $("input[name='nickname']"),
            _email_code = $("input[name='email_code']");

        this.config = {
            ignore: ':hidden',
            submitHandler: function (form){
                var param = $(form).serialize();
                    $.ajax({
                        url: $(form).attr('data-url'),
                        type: "post",
                        dataType: "json",
                        data: param,
                        success: function (data) {
                            console.log(data);
                            var result = data.info;
                            /* 成功 */
                            if(result == 11){
                                $form[0].reset();
								if(data.tag){
									if(data.returnurl){
										var url=data.returnurl
								
									}else{
										var url='/';
									}
								window.location.href=url;
								}else{
									window.location.href='/Uc/register/verify_email';	
								}
                                

                            }else if(result == 10){
                                self.show_err(err_key[4],err_vue._10);
                            }else if(result == 9){
                                self.show_err(err_key[5],err_vue._9);
                            }else if(result == 8){
                                self.show_err(err_key[5],err_vue._8);
                            }else if(result == 7){
                                self.show_err(err_key[3],err_vue._7);
                            }else if(result == 6){
                                self.show_err(err_key[3],err_vue._6);
                            }else if(result == 5){
                                self.show_err(err_key[2],err_vue._5);
                            }else if(result == 4){
                                self.show_err(err_key[1],err_vue._4);
                            }else if(result == 3){
                                self.show_err(err_key[0],err_vue._3);
                            }else if(result == 2){
                                self.show_err(err_key[0],err_vue._2);
                            }else if(result == 1){
                                self.show_err(err_key[0],err_vue._1);
                            }else if(result == 12){
                                self.show_err(err_key[6],err_vue._12);
                            }else{
                                self.show_err(err_key[6],data.msg);
                            }
                        }
                    });
            },
            rules: {
                nickname:{
                    required:true,
                    isUserName:true,
                    remote:{
                        url:_nickname.attr('data-url'),
                        type: 'post',
                        data:{
                            nickname:function () {
                                return _nickname.val();
                            }
                        }
                    }
                },
                password:{required:true,rangelength: [6,32]},
                repassword:{required:true,equalTo: "#password"},
                phone:{required:true,isPhone:true},
                phone_code:{required:true},
                email:{required:true,email:true},
                email_code:{
                    required:true,
                    remote:{
                        url: _email_code.attr('data-url'),
                        type: "post",
                        data: {
                            email_code: function () {
                                return _email_code.val()
                            }
                        }
                    }
                },
                isagree:{required:true}
            },
            messages:{
                nickname:{required:"请输入账号",remote:"用户名已注册"},
                password:{required: "请输入密码",rangelength: $.validator.format("请输入{0}至{1}位密码")},
                repassword:{required: "请再次输入密码",equalTo:"两次密码不一致"},
                phone:{required:"请输入手机号"},
                phone_code:{required:"请输入短信验证码"},
                email:{required:"请输入邮箱",email:"请输入合法的邮箱"},
                email_code:{required:"请输入验证码",remote:"验证码错误"},
                isagree:{required:"是否同意相关服务条款"}
            }
        };

        this.init = function () {
            this.events();
            this.custom_reg();
            $form.validate(this.config);
        };

        this.init();
    };

    /*
     * 注册插件
     * */
    $.fn.regist_validate = function(options){
        var options = $.extend({},defaults,options || {});
        return this.each(function(){
            new RegistValidate(this,options)
        });
    };

})(jQuery);