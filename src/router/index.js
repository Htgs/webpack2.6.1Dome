import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home.vue'
import Info from '@/views/info.vue'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'Home',
			component: Home
		},
		{
			path: '/',
			name: 'Info',
			component: Info
		}
	]
})
