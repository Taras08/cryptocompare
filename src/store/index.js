import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    arrСurrency: ['BTC','BCH', 'ETH','XRP'],
    arrQuotation: [],
    activeСurrency: 0
  },
  mutations: {
    setQuotation(state, quotation) {
      state.arrQuotation.push(quotation)
    },
    setActiveCurrency(state, n) {
      state.activeСurrency = n
    },
    addQuotation(state,  obj) {
      state.arrQuotation[obj.index].push({close: obj.close, time: obj.time}) 
    }
  },
  actions: {
     getQuotation({commit, state }) {  
      state.arrСurrency.forEach(element => {
         axios.get(`https://min-api.cryptocompare.com/data/v2/histominute?fsym=${element}&tsym=USD&limit=10&api_key={8c54326c45ef8299d552a9b2fa981ac363bb01c868ee6c8b77574f026fd01932}`)
        .then(response => {
            commit('setQuotation', response.data.Data.Data)  
        });
      });
    },
    changeActiveCurrency({commit}, n) {
      commit('setActiveCurrency', n )
    },
    addQuotation({commit, state}, item) {
      const index = state.arrСurrency.findIndex( elem => elem === item.FSYM)
      const obj = {
        index: index,
        close: item['P'],
        time: item['TS']
      }
      if (state.arrQuotation[index][state.arrQuotation[index].length - 1].time < item['TS'] ) commit('addQuotation', obj)
    }
  },
  getters: {
    arrQuotation(state) {
      return state.arrQuotation
    },  
    arrСurrency(state) {
      return state.arrСurrency
    },
    activeСurrency(state) {
      return state.activeСurrency
    }  
  },
  modules: {
  }
})
