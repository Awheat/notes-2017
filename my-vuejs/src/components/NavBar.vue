<template>
	<nav class="nav" id="nav">
		<ul class="clear" id="ul">
			<li class="active">吴忘成</li>
			<li>明天周末</li>
			<li>想睡觉</li>
			<li>麻溜</li>
			<li>天气</li>
			<li>网吧</li>
			<li>旧事</li>
		</ul>
	</nav>
</template>
<script >
	import ScrollNav from '../utils/scroll.nav.js'
	export default {
		data() {
			return {

			}
		},
		mounted() {
			new ScrollNav({id:'nav'});
		}
	}
</script>

<style scoped>
	.nav{
		width: 100%;
		height: 0.8rem;
		overflow: hidden;
	}
	.nav ul{
		width: auto;
		padding: 0 15px;
		transform: translateX(0);
	}
	.nav ul li{
		float: left;
		padding: 0 20px;
		height: 0.7rem;
		line-height: 0.7rem;
		text-align: center;
		/*margin-left: 20px;*/
		color: #666;
		font-size: 0.28px;
		white-space:nowrap;
	}
	.nav ul li.active{
		border-bottom: 2px solid #ed145b;
	}
</style>
