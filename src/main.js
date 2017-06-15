import Vue from 'vue'
import router from './router'
import store from './store'
import App from './app.vue'

require('static/css/sc.scss')
require('static/css/bootstrap.css')

import elementUi from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.use(elementUi)

new Vue({
	store,
	router,
	render: h => h(App)
}).$mount('#app')
