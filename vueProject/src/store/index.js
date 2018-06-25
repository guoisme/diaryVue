import Vue from 'vue'
import VueX from 'vuex'
Vue.use(VueX)
export default new VueX.Store({//store对象
    state:{
        user:{
          'name':null,
          'password':null
        }
    },
    mutations:{
    updateUser(state,user){
      state.user=user;
    }
  },
})
