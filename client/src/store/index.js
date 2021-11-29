const RETRY_TIMEOUT = 1000
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// hacky until i find a better way
const dev = process.env.NODE_ENV == 'development'
const api = `ws://${dev ? window.location.hostname + ':8080' : window.location.host }/ws`


import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: (state) => ({ 
    general: { hostname: state.general.hostname },
    options: state.options, 
  })
})

const store = new Vuex.Store({
  state: {
    general: {
      hostname: 'SelfServer',
      uptime: false,
      online: false
    },
    pages: ['Dashboard', 'Drives', 'Shares', 'Apps', ],
    options: {
      dark: false,
      opened: { }
    },
    api: api
  },
  plugins: [vuexLocal.plugin],
  mutations: {
    SET_DARK(state, value) {
      state.options.dark = !!value
    },
    TOGGLE_OPENED(state, panel) {
      state.options.opened[panel] = !state.options.opened[panel]
    },
    SET_OPENED(state, { panel, value }) {
      Vue.set(state.options.opened, panel, value)
    },
    MESSAGE(state, message) {
      let data = JSON.parse(message)
      Object.entries(data).forEach(([key, value]) => {
        if (key in state) {
          Vue.set(state, key, Object.assign(state[key], value))
        }
      })
    }
  },
  actions: {
    setDark({ commit }, value) {
      commit('SET_DARK', value)
    },
    toggleOpen({ commit }, panel) {
      commit('TOGGLE_OPENED', panel)
    },
    setOpened({ commit }, settings) {
      commit('SET_OPENED', settings)
    },
    connect({ commit, state }) {
      const connect = () => {
        let socket = new WebSocket(state.api)
        socket.onmessage = event =>  commit('MESSAGE', event.data) 
        socket.onopen    = () => console.log('connected')
        socket.onclose    = () => { 
          commit('MESSAGE', JSON.stringify({ general: { online: false }}))
          console.log('retrying')
          setTimeout(connect, RETRY_TIMEOUT) 
        }
      }
      connect()
    }
  },
  getters: {
    dark: state => state.options.dark,
    opened: state => state.options.opened,
    pages: state => state.pages,
    general: state => state.general,
    online: state => state.general.online,
  },
  modules: {
  }
})

store.dispatch('connect')

export default store