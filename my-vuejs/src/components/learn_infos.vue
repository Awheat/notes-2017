<template>
	<div class="infos">
		<p><label>姓名：</label>{{infos.name}}</p>
		<p><label>年龄：</label>{{infos.age}}</p>
		<p><label>地址：</label>{{infos.address}}</p>
		<p><label>爱好：</label><span v-for="item in infos.loves">{{item}}</span></p>
	</div>
</template>
<script>
	export default {
		props: ['infos']
	}
</script>
<style scoped>
	.infos{
		padding: 15px;
		margin:20px;
		background-color: #eaeaea;
	}
	.infos p{
		line-height: 20px;
	}
	.infos p span{
		margin-right: 10px;
	}
</style>