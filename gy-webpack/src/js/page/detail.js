import resetcss from '../../css/common/reset.css'
import detailcss from '../../css/page/detail.css'
import confirmcss from '../../css/lib/jquery-confirm.min.css'

import jq_validate from 'jqueryValidate'
import jq_confirm from 'jqueryConfirm'
import jq_template from 'artTemplate'
import jq_pagination from 'jqueryPagination'
import jq_column_slider from '../component/column.slider.js'
import jq_discuss from '../component/discuss.js'


$(function(){
    /* 切换图片 */
    $('.main-imgs-list').ColumnSlider();

    /* 讨论模块 */
    $('.btn-commit').discuss({
        err:'.err-msg',
        ttaa: '#discuss-cont',
        sub_url:'../ajax/comment.html',
        get_url:'http://www.local.gy.com/t/active/ajax_discuss/id/739.html'
    });

    /* 查看活动图片的大图 */
    $('.main-imgs-list').on('click','img',function(){
        var _this = $(this);
        $.dialog({
            title: '查看大图',
            content: '<img id="max_img" src="'+$(this).attr('src')+'">',
            onOpenBefore: function () {
                var max_img = $("#max_img");
                initWinCss(max_img.width(),max_img.height());
            }
        });
    });
    /* 初始化弹出层的位置 */
    function initWinCss(w,h){
        var pop_win = $('.jconfirm-scrollpane');
            pop_win.find('.container').css({
                position:'relative',
                width: w,
                height: h,
                left: '50%',
                marginLeft:-(w/2)
            });
    }

    /* tab选项卡 */
    var tabs = {
        init: function () {
            var self = this;
            var detail = $("#active-detail").outerHeight();
            var picture = $("#active-picture").outerHeight();
            var discuss = $("#active-discuss").outerHeight();

            detail = detail == null?0:detail;
            picture = picture == null?0:picture;
            discuss = discuss == null?0:discuss;

            $('.tabs').on('click','a',function(){
                $(this).addClass('cur').siblings('a').removeClass('cur');
            });

            $(window).on('scroll',function(){
                var _scrollTop = $(window).scrollTop(),_tabs = $('.tabs'),_deft = 500;
                if(_scrollTop > _deft){
                    _tabs.addClass('Fixed');
                    if(_scrollTop > _deft + detail){
                        self.addCur(_tabs,1);
                    }else{
                        self.addCur(_tabs,0);
                    }
                    if(_scrollTop > _deft + detail + picture){
                        self.addCur(_tabs,2);
                    }
                }else{
                    _tabs.removeClass('Fixed');
                    self.addCur(_tabs,0);
                }
            });
        },
        addCur: function (obj,ind) {
            obj.find('a').eq(ind).addClass('cur').siblings('a').removeClass('cur');
        }
    };
    tabs.init();


    /* 弹出框 */
    function show_box1() {
        $.dialog({
            title: '请输入手机号',
            content: $("#tpl_entry1").html(),
            onOpenBefore: function () {
                initWinCss(500,'auto');
            },
            onOpen: function () {
                console.log($("#entry-form"));
                $.validator.addMethod( "isPhone",function(value,element){
                    var reg = /^1[34578]\d{9}$/;
                    return reg.test(value);
                } , "请输入合法手机号");
                $("#entry-form").validate({
                    submitHandler: function (form) {
                        var param = $(form).serialize();
                        console.log(param);
                        return false;
                    },
                    rules:{
                        username: {required: true},
                        phone: {
                            required:true,
                            isPhone: true
                        }
                    },
                    messages:{
                        username: {required:"请输入姓名"},
                        phone: {
                            required: "请输入手机号"
                        }
                    }
                });
            }
        });
    }
    function show_box2() {
        $.dialog({
            title: '活动报名',
            content: $("#tpl_entry2").html(),
            onOpenBefore: function () {
                initWinCss(500,'auto');
            }
        });
    }
    function  show_box3() {
        $.dialog({
            title: '活动报名',
            content: $("#tpl_entry3").html(),
            onOpenBefore: function () {
                initWinCss(500,'auto');
            }
        });
    }
    
    $(".btn-join").on('click',function () {
        show_box2();
    });
});