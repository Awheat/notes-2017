export default class ScrollNav {
	/* 构造函数 */
	constructor(options){
		this.options = options || {};
		this.id = document.getElementById(this.options.id);
		this._ul = this.id.getElementsByTagName('ul')[0];
		this._li = this._ul.getElementsByTagName('li');

		this.init();
	}
	
	/* 初始化函数 */
	init() {
		this.setUlWidth();
		this.events();
	}

	/* 时间函数 */
	events() {
		let _this = this;

		let start_x = 0, move_x = 0, end_left = 0, count_left = 0;
		let max_left = this._ul.offsetWidth - this.id.offsetWidth;


		//监听事件
		this._ul.addEventListener('touchstart',(e) => {
			start_x = parseInt(e.touches[0].pageX);

			//关键的一步：每次开始点的时候记录上一次移动的值
			count_left = _this.getX();
		},false);

		//监听事件
		this._ul.addEventListener('touchmove',(e) => {
			move_x = parseInt(e.touches[0].pageX);

			//因为count_left取出来的时候是负值
			end_left = start_x - move_x + (-count_left);

			//console.log(start_x, move_x, end_left, count_left);

			if(end_left>0){
				if(end_left > max_left || this.getX() >= max_left){
					this._ul.style.webkitTransform = 'translateX('+-max_left+'px)';
				}else{
					this._ul.style.webkitTransform = 'translateX('+-end_left+'px)';
				}
			}else{
				if(end_left <= max_left || this.getX() == 0){
					this._ul.style.webkitTransform = 'translateX('+0+')';
				}else{
					this._ul.style.webkitTransform = 'translateX('+-end_left+'px)';
				}
			}
		},false);
	}

	// 设置ul的宽度
	setUlWidth() {
		let _this = this;
		let n = 0;
		for(let i=0,len=this._li.length;i<len;i++){
			n += _this._li[i].offsetWidth;
		}
		this._ul.style.width = n + 'px';
	}

	/* 获取translateX的值 */
	getX() {
		let _this = this;
		return parseFloat(document.defaultView.getComputedStyle(_this._ul,null).transform.substring(7).split(',')[4]);
	}
}

