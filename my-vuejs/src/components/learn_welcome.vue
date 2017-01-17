<template>
	<div class="welcome">
		<h1>{{message}}</h1>
	</div>
</template>

<script>
	export default {
		props:['message']
	}
</script>
<style scoped>
	.welcome{
		width: 96%;
		padding: 30px 0;
		margin: 0 auto;
		border-bottom: 1px solid #000000;
	}
	.welcome h1{
		text-align: center;
		font-size: 0.5rem;
		font-weight: 600;
	}
</style>