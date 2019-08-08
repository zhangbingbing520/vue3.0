import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from '@/router'
import axios from '@/api'
import mycom from '@/components'

Vue.prototype.$http = axios

Vue.config.productionTip = false
Vue.use(mycom)
Vue.use(ElementUI)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
