<template>
	<div class="home">
		<!-- 侧边栏 -->
		<div class="aside" v-bind:class="{show: isShow}">
			<div class="aside_main"></div>
		</div>
		<HeaderBar></HeaderBar>
		<NavBar></NavBar>
		<div class="pomise">
			<h3>我们保证</h3>
			<div class="pomise_list">
				<a href="#"><img src="../assets/images/pomise.jpg"></a>
				<a href="#"><img src="../assets/images/pomise.jpg"></a>
				<a href="#"><img src="../assets/images/pomise.jpg"></a>
				<a href="#"><img src="../assets/images/pomise.jpg"></a>
			</div>
		</div>

		<div class="product">
			<div class="product_tab clear">
				<span class="active">今日10点上新</span>
				<span>明日10点预告</span>
			</div>
			<ul class="product_list">
				<li>
					<img src="../assets/images/product.jpg">
					<div class="product_info">
						<h3 class="product_name">雅诗兰黛 年轻全盛</h3>
						<p class="product_cont">万千只爱小棕瓶 直达年轻</p>
						<span class="product_state">即将结束</span>
					</div>
				</li>

				<li>
					<img src="../assets/images/product.jpg">
					<div class="product_info">
						<h3 class="product_name">雅诗兰黛 年轻全盛</h3>
						<p class="product_cont">万千只爱小棕瓶 直达年轻</p>
						<span class="product_state">即将结束</span>
					</div>
				</li>

				<li>
					<img src="../assets/images/product.jpg">
					<div class="product_info">
						<h3 class="product_name">雅诗兰黛 年轻全盛</h3>
						<p class="product_cont">万千只爱小棕瓶 直达年轻</p>
						<span class="product_state">即将结束</span>
					</div>
				</li>

				<li>
					<img src="../assets/images/product.jpg">
					<div class="product_info">
						<h3 class="product_name">雅诗兰黛 年轻全盛</h3>
						<p class="product_cont">万千只爱小棕瓶 直达年轻</p>
						<span class="product_state">即将结束</span>
					</div>
				</li>

				<li>
					<img src="../assets/images/product.jpg">
					<div class="product_info">
						<h3 class="product_name">雅诗兰黛 年轻全盛</h3>
						<p class="product_cont">万千只爱小棕瓶 直达年轻</p>
						<span class="product_state">即将结束</span>
					</div>
				</li>

			</ul>
		</div>
	</div>
</template>
<script type="text/javascript">
	import HeaderBar from '../components/HeaderBar.vue'
	import NavBar from '../components/NavBar.vue'
	import store from '../store/index.js'
	export default {
		name: 'home',
		data() {
			return {}
		},
		computed: {
			isShow() {
				return store.state.isChange
			}
		},
		methods: {
			
		},
		// created(){
		// 	console.log('1'+document.getElementById('nav'))
		// },
		// beforeMount() {
		// 	console.log('2'+document.getElementById('nav'))
		// },
		components: {
			HeaderBar,
			NavBar
		},
		mounted() {
			// 数据去重挺好的一个方法
			var s = new Set();
			[1,2,3,2,4,5,2,3,2].map(i=> s.add(i));

			for(let i of s){
				console.log(i)
			}
		}
	}
</script>

<style scoped>
	/*
		1.需要完整的一个环节，这个是必须要的
	*/
	.home {
		position: relative;
	}
	.aside {
		position: fixed;
		top: 0;
		left: 100%;
		z-index: 10;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.5);
		transition: all .5s ease;
	}
	
	.aside .aside_main {
		position: absolute;
		top: 0;
		right: -100%;
		z-index: 11;
		width: 6rem;
		height: 100%;
		background: #fff;
	}
	.aside.show {
		left: 0;
	}
	.aside.show .aside_main{
		right: 0;
		transition:all .5s ease .1s;
	}

	.pomise{}
	.pomise h3{
		text-align: center;
		margin: 0.3rem;
	}
	.pomise .pomise_list{
		font-size: 0;
		padding: 0 .2rem;
	}
	.pomise .pomise_list a{
		display: inline-block;
		width: 1.6rem;
		height: 1.6rem;
		margin-left: 0.18rem;
	}
	.pomise .pomise_list a:last-child{
		margin-left: 0;
	}
	.pomise .pomise_list a img{
		width: 100%;
		height: 100%;
	}
	.product{
		background: #f5f5f5;
	}
	.product .product_tab {
		background: #fff;
	}
	.product .product_tab span{
		display: block;
		float: left;
		width: 50%;
		text-align: center;
		padding: 0.2rem 0;
		font-size: 0.32rem;
	}
	.product .product_tab span.active{
		color: #fe4070;
	}

	.product_list li {
		position: relative;
		margin-bottom: 0.4rem;
		background: #fff;
	}
	.product_list li img{
		display: block;
		width: 100%;
		height: 3rem;
	}
	.product_list .product_info{
		position: relative;
		padding: 0.2rem;
	}
	.product_list .product_info .product_name{
		display: inline-block;
		max-width: 6rem;
		color: #666;
		font-weight: normal;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	.product_list .product_info .product_cont{
		color: #999;
		padding-top: 0.1rem;
	}
	.product_list .product_info .product_state {
		position: absolute;
		top: 0.2rem;
		right: 0.2rem;
		color: #fe4070;
	}
</style>
