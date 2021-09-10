import Vue from 'vue'
import Vuex from './vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    name: 'Tom',
    age: 18,
    hobbies: ['ping-pong', 'tennis', 'football'],
  },
  getters: {
    getHobbies(state, getters) {
      return state.hobbies.join(' ')
    },
    getName(state, getters) {
      return state.name
    },
  },
  mutations: {
    addAge(state, payload) {
      state.age += payload
    },
    addHobby(state, payload) {
      state.hobbies.push(payload)
    },
  },
  actions: {
    addHobby({ commit }, payload) {
      setTimeout(() => {
        commit('addHobby', payload)
      }, 1000)
    },
  },
})

export default store
