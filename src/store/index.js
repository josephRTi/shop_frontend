import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cart: [],
    user: {},
    token: "",
    isAdmin: false
  },
  getters: {
    getCart(state) {
      return state.cart
    },
    getCount(state) {
      return state.cart.length
    }
  },
  mutations: {
    addToCart(state, item) {
      let cartItem = state.cart.filter(i => i.item.id === item.item.id)
      if (cartItem.length) {
        cartItem[0].item.quantity += item.item.quantity
      } else {
        state.cart.push(item)
      }
    },
    setUser(state, response) {
      state.token = response[0].access_token;
      state.user = response[1];
      state.isAdmin = response[2]
    },
    deleteShopItem(state, id) {
      state.cart = state.cart.filter(i => i.id !== id)
    },

  },
  actions: {
  },
  modules: {
  }
})
