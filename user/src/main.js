import Vue from 'vue'
import App from './App.vue'


import ElementUI, {Message, MessageBox} from 'element-ui' //element-ui的全部组件
import 'element-ui/lib/theme-chalk/index.css'//element-ui的css

import router from '../router'
//引入axios
import http from 'axios'
import '../api/mock'
import store from '../store'
import request from "../api/request";

Vue.use(ElementUI) //使用elementUI，注入插件
//axios并不是插件，因此需要绑定在Vue.prototype上
Vue.prototype.$http = http
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message
Vue.prototype.request = request

Vue.config.productionTip = false

/**
 *重新设置message显示时间
 *
 */
//注意：这里使用的$message,所以在使用时候也是this.$message
Vue.prototype.$message = function (msg) {
    return Message({
        message: msg,
        duration: 1000
    })
}
//分别对success、warning和error等样式进行设置
Vue.prototype.$message.success = function (msg) {
    return Message.success({
        message: msg,
        duration: 1000
    })
}
Vue.prototype.$message.warning = function (msg) {
    return Message.warning({
        message: msg,
        duration: 1000
    })
}
Vue.prototype.$message.error = function (msg) {
    return Message.error({
        message: msg,
        duration: 1000
    })
}

// //导航守卫，对路由进行监听
// router.beforeEach((to, from, next) => {
//     //调用store中的getToken，获取token,防止页面刷新后丢失token信息
//     store.commit('getToken')
//     const token = store.state.user.token
//     //若token不存在且或者当前不为login页面时，不允许进入其他页面
//     //注册和忘记密码界面无法进入的原因应该在这里
//     if (!token && (to.name !== '/login'&&to.name !== '/register'&&to.name !== '/forget')) {
//         console.log("当前跳转网页为："+to.name)
//         next({name: '/login'})
//     }else if(token && to.name==='/login'){
//         next({name:'/home'})
//     } else {
//         next()
//     }
// })


new Vue({
    store,
    router,
    render: h => h(App),
    //动态路由，解决刷新出现白屏的问题,但是白屏还是有问题
    created() {
        //在页面加载时读取sessionStorage里的状态信息
        if (sessionStorage.getItem("store")) {
            this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem("store"))))
        }
        //在页面刷新时将vuex里的信息保存到sessionStorage里
        window.addEventListener("beforeunload", () => {
            sessionStorage.setItem("store", JSON.stringify(this.$store.state))
        })
        if (this.$store.state.user.user.phone !== undefined) {  //已登录
            store.commit('addRoutes', this.$router) //需要先将内存中的动态路由重新添加
            console.log('在main.js中刷新路由')
            console.log(router.getRoutes())
            store.commit('addMenu', router)  //添加路由
        }
    },
}).$mount('#app')
