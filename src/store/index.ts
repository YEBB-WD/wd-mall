import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    userId: '',
    accessToken: '',
    isAuth: false,
    role: '',
    name: '',
    session_hours: 12,
  },
  mutations: {
    setUserId (state, payload) {
      state.userId = payload.userId
      state.role = payload.role
      state.name = payload.name
      localStorage.userId = payload.userId
      localStorage.role = payload.role
      localStorage.name = payload.name
    },
    setAccessToken (state, accessToken) {
      state.accessToken = accessToken
      state.isAuth = true
      localStorage.accessToken = accessToken
      localStorage.saved = new Date().getTime()
      Vue.prototype.$axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.accessToken
    },
    removeAccessToken (state, context) {
      state.isAuth = false
      Vue.prototype.$axios.defaults.headers.common['Authorization'] = undefined
    }
    // checkSession() {
    //   let saved = localStorage.getItem('saved')
    //   if ( saved && (new Date().getTime() - saved < this.hours * 60 * 60 * 1000)) return true
    //   return false
    // }
  },
  actions: {
    // setUserAccount (context, accessToken, userId, role) {
    //   context.commit('setAccessToken', accessToken)
    //   context.commit('setUserId', userId, role)
    // },
    removeAccessToken (context) {
      this.state.isAuth = false
      Vue.prototype.$axios.defaults.headers.common['Authorization'] = undefined
      context.commit('removeAccessToken')
    }
  },
  getters: {
    getAccessToken: function (state) {
      return state.accessToken;
    },
    getRole: function (state) {
      return localStorage.role;
    },
    getIsAuth: function (state) {
      return state.isAuth;
    }
  },
  modules: {
  }
})

export default store;
