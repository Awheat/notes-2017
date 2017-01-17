import resetcss from '../../css/common/reset.css'
import indexcss from '../../css//page/index.css'

import lazyload from 'jqueryLazyLoad'
import slider from '../component/slider.js'

$(function(){
	$('img').lazyload();

	$(".slider-list").find('li').each(function(){
		var that = $(this),url = that.attr("data-img");
		that.css('background','url("'+url+'")');
	});
    new FullSlider({
        el: '.slider'
    })
});