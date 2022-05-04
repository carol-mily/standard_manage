//路由
import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from "../views/Main"
import Home from "../views/home/index"

import Login from "../views/login/index"
import Register from "../views/register/index"
import Forget from "../views/forget/index"
import Check from "../views/standard/check"
import NotFound from "../views/notFound"

//整体引入VueRouter
Vue.use(VueRouter)

//传入参数
const routes =[
    {
        path:'/',
        name:'Main',
        component:Main,
        // component:()=>import("../views/Main"),
        redirect:'/home',   //redirect:重定向到首页
        children:[
            {
                path:'/home',
                //为何可以根据name跳转页面原因在此
                name:'home',
                component:Home
            },
            {
                path: '/check',
                name: 'check',
                label: '查看',
                component:Check
            },
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
    },
    {   //404可能会出现问题
        path:'/NotFound',
        name:'NotFound',
        meta: {
            title: 'Page not found',
            isLogin: false
        },
        component:NotFound
    },
    // {
    //     path: '*',
    //     redirect: '/NotFound'
    // }
]

//配置VueRouter
const router=new VueRouter({
    model:'history',
    routes
})

//传出
export default router