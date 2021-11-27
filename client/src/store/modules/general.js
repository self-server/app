import Vue from 'vue'

const store = {
  namespaced: true,
  state: {
    hostname: 'SelfServer',
    online: false,
    uptime: false,
  },
  mutations: {
    SET(state, { key, value}) {
      Vue.set(state, key, value)
    },
    MESSAGE(state, data) {
      Object.entries(JSON.parse(data)).forEach(([key, value]) => {
        if (key in state) Vue.set(state, key, value)
      })
    }
  },
  actions: {
    connect({ commit }) {
      let url = `ws://${window.location.hostname}/general`
      const connect = () => {
        let socket = new WebSocket(url)
        socket.onmessage = event => commit('MESSAGE', event.data)
        socket.onopen    = () => { console.log('connected', url) }
        socket.onclose   = () => { console.log('disconnected, retrying'); setTimeout(connect, 5000) }
      }
      connect()
    }
  },
  getters: {
    hostname: state => state.hostname,
    online:   state => state.online,
    uptime:   state => state.uptime,
  }
}

export default {
  install(Vue, vuex) {
    vuex.registerModule('GENERAL', store)
    vuex.dispatch('GENERAL/connect')
  }
}