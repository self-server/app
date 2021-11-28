import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import store from './store'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

import router from './router'
import Panel from './components/panel.vue'
Vue.component('Panel', Panel)

import UtilMixin from './mixins/util'
Vue.mixin(UtilMixin)

import './css/app.scss'
Vue.config.productionTip = false

new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
