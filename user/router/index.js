//路由
import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from "../views/Main"
// import User from "../views/user/index"
// import Home from "../views/home/index"
// import Mall from "../views/mall/index"
// import Page1 from "../views/others/pageOne"
// import Page2 from "../views/others/pageTwo"
import Login from "../views/login/index"
import Register from "../views/register/index"
import Forget from "../views/forget/index"

//整体引入VueRouter
Vue.use(VueRouter)

//传入参数
const routes =[
    {
        path:'/',
        name:'Main',
        component:Main,
        // component:()=>import("../views/Main"),
        //不明白redirect有什么作用
        redirect:'/home',
        children:[
            //静态路由，现在已改为动态路由
            // {
            //     path:'/home',
            //     //为何可以根据name跳转页面原因在此
            //     name:'home',
            //     component:Home
            // },
            // {
            //     path:'/user',
            //     name:'user',
            //     component:User
            //     // component:()=>import("../views/User")
            // },
            // {
            //     path:'/mall',
            //     name:'mall',
            //     component: Mall
            // },
            // {
            //     path:'/page1',
            //     name:'page1',
            //     component: Page1
            // },
            // {
            //     path:'/page2',
            //     name:'page2',
            //     component: Page2
            // }
        ]
    },
    {
        path:'/login',
        name:'/login',
        component: Login
    },
    {
        path:'/register',
        name:'/register',
        component: Register
    },
    {
        path:'/forget',
        name:'/forget',
        component: Forget
    }
]

//配置VueRouter
const router=new VueRouter({
    model:'history',
    routes
})

//传出
export default router