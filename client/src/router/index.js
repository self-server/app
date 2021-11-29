import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Dashboard from '../views/dashboard/index.vue'
import Drives from '../views/drives/index.vue'
import Apps from '../views/apps/index.vue'
import Shares from '../views/shares/index.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: { name: 'Dashboard' }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/drives',
    name: 'Drives',
    component: Drives
  },
  {
    path: '/apps',
    name: 'Apps',
    component: Apps
  },
  {
    path: '/shares',
    name: 'Shares',
    component: Shares
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
