import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login'
import home from '@/views/home'
import welcome from '@/views/welcome'
import article from '@/views/article'
import error from '@/views/404'
import store from '@/store'
Vue.use(VueRouter)

var router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: home,
      children: [
        {
          path: '',
          component: welcome
        },
        {
          path: '/article',
          component: article
        }
      ]
    },
    {
      path: '/login',
      component: login
    },
    { path: '*',
      component: error
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && !store.getUser().token) return next('/login')
  next()
})

export default router
