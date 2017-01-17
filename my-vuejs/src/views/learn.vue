<template>
	<div class="shangpin">
		<welcome v-bind:message="message"></welcome>
		<infos :infos="infos"></infos>
		<el-button>默认按钮</el-button>
		<el-button type="primary">主要按钮</el-button>
		<el-button type="text">文字按钮</el-button>
	</div>
</template>

<script>
	import axios from 'axios'
	import Welcome from '../components/learn_welcome.vue'
	import Infos from '../components/learn_infos.vue'
	export default {
		data() {
			return {
				message: 'Hello, WangChengJun',
				infos:{},
			}
		},
		methods: {

			/* 获取数据 */
			getInfos(){
			   axios.get('/api/infos')
				   	.then((response)=>{
				   		console.log(response);
				   		this.infos = response.data.data;
				   	})
				   	.catch(function(error){
				   		console.log(error)
				   	});
			}
		},
		components:{
			Welcome,
			Infos
		},
		mounted() {
			this.getInfos();
		}

	}
</script>