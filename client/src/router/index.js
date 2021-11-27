import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "about" */ '../views/dashboard/index.vue')
  },
  {
    path: '/array',
    name: 'Array',
    component: () => import(/* webpackChunkName: "about" */ '../views/array/index.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
