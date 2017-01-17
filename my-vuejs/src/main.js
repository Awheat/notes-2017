import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import App from './App'
import Home from './views/home'
import Learn from './views/learn.vue'

import BaseJs from './assets/js/base.js'
import BaseCss from './assets/css/base.css'

Vue.use(VueRouter)
Vue.use(ElementUI)

/* 定义两个组件 */
const Foo = { template: '<div>foo</div>'}
const Bar = { template: '<div>bar</div>'}

/* 定义路由 */
const routes = [
	{path: '/', component: Home},
	{path: '/home', component: Home},
	{path: '/learn', component: Learn}
]

/* 创建路由实例 */
const router = new VueRouter({
	routes: routes
});


/* eslint-disable no-new */
new Vue({
  router,
  el:'#app',
  template: '<App/>',
  components: { App }
});