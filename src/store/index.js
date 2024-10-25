import { createStore } from 'vuex'
import axios from 'axios';

export default createStore({
  state: {
    user : {
      username: '',
      profile:'',
    },
    isAuthenticated: false,
    token: ''
  },
  getters: {
  },
  mutations: {
    initializeStore(state) {
      if(localStorage.getItem('token')) {

        state.token = localStorage.getItem('token')
        state.isAuthenticated = true
      } else {
        localStorage.removeItem('token');
        state.token = ''
        state.isAuthenticated = false
      }
    },
    setToken(state, token) {
      state.token = token
      state.isAuthenticated = true
    },
    removeToken(state) {
      localStorage.removeItem("token");
      state.token = ''
      state.isAuthenticated = false
      localStorage.clear()
    },
    setUserProfile(state, data) {
       localStorage.removeItem("userData");
       localStorage.setItem("userData", JSON.stringify(data))
       state.user.profile = data.pid;
       state.user.allData = data;
    },
  },
  actions: {
  },
  modules: {
  }
})
