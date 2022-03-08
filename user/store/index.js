import Vue from 'vue'
import Vuex from 'vuex'
import tab from './tab'
import user from './user'

//将vuex进行全局注入
Vue.use(Vuex)

export default new Vuex.Store({
    //将不同模块的store进行引入
    modules:{
        tab,
        user
    }
})