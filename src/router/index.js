import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login'
import head from '@/views/header'
Vue.use(VueRouter)

var router = new VueRouter({
  routes: [
    {
      path: '/',
      component: head
    },
    {
      path: '/login',
      component: login
    }
  ]
})

export default router
