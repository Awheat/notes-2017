import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		isChange: false
	},
	getters: {

	},
	mutations: {
		switchMenus: state => state.isChange = !state.isChange
	},
	actions: {
		
	}
});

export default store;