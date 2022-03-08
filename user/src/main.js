import Vue from 'vue'
import App from './App.vue'


import ElementUI, {Message, MessageBox} from 'element-ui' //element-ui的全部组件
import 'element-ui/lib/theme-chalk/index.css'//element-ui的css

import router from '../router'
//引入axios
import http from 'axios'
import '../api/mock'
import store from '../store'

Vue.use(ElementUI) //使用elementUI，注入插件
//axios并不是插件，因此需要绑定在Vue.prototype上
Vue.prototype.$http = http
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message

Vue.config.productionTip = false

//导航守卫，对路由进行监听
router.beforeEach((to, from, next) => {
    //调用store中的getToken，获取token,防止页面刷新后丢失token信息
    store.commit('getToken')
    const token = store.state.user.token
    //若token不存在且或者当前不为login页面时，不允许进入其他页面
    //注册和忘记密码界面无法进入的原因应该在这里
    if (!token && to.name !== '/login') {
        console.log("当前跳转网页为："+to.name)
        next({name: '/login'})
    }else if(token && to.name==='/login'){
        next({name:'/home'})
    } else {
        next()
    }
})

new Vue({
    store,
    router,
    render: h => h(App),
    //动态路由，解决刷新出现白屏的问题,但是白屏还是有问题
    created() {
        console.log(router.getRoutes())
        store.commit('addMenu',router)
    }
}).$mount('#app')
