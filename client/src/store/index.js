import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    messages: []
  },
  mutations: {
    setMessages(state, payload){
      state.messages = payload
      console.log(state.messages)
    }
  },
  actions: {
    getAllCorrespondingMsg(context){
      const role = localStorage.getItem('role')
      if(role === 'parent'){
        axios({
          method: 'GET',
          url: 'http://localhost:3001/message/parent',
          headers: {
            access_token : localStorage.getItem('access_token')
          }
        })
        .then(response => {
          context.commit('setMessages', response.data)
        })
        .catch(err => {
          console.log(err)
        })
      } else if(role === 'agency'){
        axios({
          method: 'GET',
          url: 'http://localhost:3001/message/agency',
          headers: {
            access_token : localStorage.getItem('access_token')
          }
        })
        .then(response => {
          context.commit('setMessages', response.data)
        })
        .catch(err => {
          console.log(err)
        })
      }
    },
    getAllMsg(context, id){
      const role = localStorage.getItem('role')
      if(role === 'parent'){
        return axios({
          method: 'GET',
          url: 'http://localhost:3001/message/parent/' + id,
          headers: {
            access_token : localStorage.getItem('access_token')
          }
        })
      } else if(role === 'agency'){
        return axios({
          method: 'GET',
          url: 'http://localhost:3001/message/agency/' + id,
          headers: {
            access_token : localStorage.getItem('access_token')
          }
        })
      }
      
    },
    messageDB(context, payload){
      const role = localStorage.getItem('role')
      if(role === 'parent'){
        axios({
          method: 'POST',
          url: 'http://localhost:3001/message/parent/' + payload.id,
          headers: {
            access_token : localStorage.getItem('access_token')
          },
          data: {
            content: payload.content,
            sender: payload.sender
          }
        })
        .then(() => {
          console.log('Success')
        })
        .catch(err => {
          console.log(err)
        })
      } else if(role === 'agency'){
        axios({
          method: 'POST',
          url: 'http://localhost:3001/message/agency/' + payload.id,
          headers: {
            access_token : localStorage.getItem('access_token')
          },
          data: {
            content: payload.content,
            sender: payload.sender
          }
        })
        .then(() => {
          console.log('Success')
        })
        .catch(err => {
          console.log(err)
        })
      }
    }
  },
  modules: {
  }
})
