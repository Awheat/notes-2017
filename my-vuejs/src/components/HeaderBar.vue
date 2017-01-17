<template>
	<header class="header">
		<router-link to="/login"><span class="hd_user"></span></router-link>
		<div class="hd-search">
			<i class="hd-search-icon"></i>
			<span class="hd-search-text">搜索商品分类</span>
		</div>
		<div class="hd-menu" v-on:click="switchMenus" v-bind:class="{change: isChange}"></div>
	</header>
</template>
<script>
	import store from '../store/index.js'
	export default {
		data(){
			return {}
		},
		computed: {
			isChange() {
				return store.state.isChange
			}
		},
		methods: {
			switchMenus() {
				store.commit('switchMenus')
			}
		}
	}
</script>
<style scoped>
	.header{
		position: relative;
		width: 100%;
		height: 0.7rem;
	}
	.header .hd_user{
		position: absolute;
		top: .1rem;
		left: .2rem;
		display:block;
		width: 0.6rem;
		height: 0.6rem;
		background: url(../assets/images/user.png) no-repeat;
		background-size: cover;
	}
	.header .hd-search{
		position: relative;
		top: .1rem;
		display: block;
		height: 0.6rem;
		margin: 0 1rem;
		color: #999;
		text-align: center;
		background: #f5f5f5;
		border-radius: 50px;
	}
	.header .hd-search i{
		position: relative;
		display: inline-block;
		width: 0.3rem;
		height: 0.3rem;
		top: 0.15rem;
		background: url(../assets/images/search.png) no-repeat;
		background-size: cover;
	}
	.header .hd-search span{
		position: relative;
		top: 0.1rem;
		font-size: 0.25rem;
		padding-left: 0.1rem;
	}
	.header .hd-menu{
		position: absolute;
		top: 0.25rem;
		right: 0.2rem;
		width: 0.35rem;
		height: 0.3rem;
		border-top: 1px solid #999;
		border-bottom: 1px solid #999;
	}
	.header .hd-menu:after {
		position: absolute;
		top: 0.14rem;
		left: 0;
		display: block;
		width: 100%;
		height: 0;
		content: "";
		border-top: 1px solid #999;
	}
	.header .hd-menu.change{
		z-index: 20;
		border-top-color: red;
		border-bottom-color: red; 
	}
	.header .hd-menu.change:after{
		border-top-color: red;
	}
</style>