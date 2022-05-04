//存储点击菜单的状态
import Cookie from "js-cookie";
import Main from "../views/Main";
import Home from "../views/home";
import Login from "../views/login";
import Register from "../views/register";
import Forget from "../views/forget";

export default {
    state: {
        initState: [
            {
                path: '/',
                name: 'Main',
                component: Main,
                // component:()=>import("../views/Main"),
                //不明白redirect有什么作用
                redirect: '/home',
                children: [
                    //静态路由，现在已改为动态路由
                    {
                        path: '/home',
                        //为何可以根据name跳转页面原因在此
                        name: 'home',
                        component: Home
                    },
                ]
            },
            {
                path: '/login',
                name: '/login',
                component: Login
            },
            {
                path: '/register',
                name: '/register',
                component: Register
            },
            {
                path: '/forget',
                name: '/forget',
                component: Forget
            }
        ],
        tabsList: [
            {
                id: 1,
                isshow: true,
                label: "首页",
                name: "home",
                path: "/",
                pid: null,
                status: 0,
                url: "home/index"
            }
        ],
        currentMenu: null,
        menu: [
            {
                id: 1,
                isshow: true,
                label: "首页",
                name: "home",
                path: "/",
                pid: null,
                status: 0,
                url: "home/index"
            }
        ],
        routes: []
    },
    mutations: {
        startTag(state, val) {
            state.tabsList = [val]
        },

        closeTag(state, val) {
            //找到要删除的索引
            const result = state.tabsList.findIndex(item => item.name === val.name)
            //删除
            state.tabsList.splice(result, 1)
        },

        clearTag(state) {
            state.tabsList = [
                {
                    id: 1,
                    isshow: true,
                    label: "首页",
                    name: "home",
                    path: "/",
                    pid: null,
                    status: 0,
                    url: "home/index"
                }
            ]
            Cookie.remove('tabsList')
        },

        selectMenu(state, val) {
            if (val.name !== 'home') {
                state.currentMenu = val
                const result = state.tabsList.findIndex(item => item.name === val.name)
                //当前选中菜单既不为首页，也不存在于tabsList里面
                if (result === -1) {
                    state.tabsList.push(val)
                } else {
                    state.currentMenu = null
                }
            }
        },

        setMenu(state, val) {
            state.menu = val
            //使用cookie缓存
            //使用JSON.stringify将数据序列化
            Cookie.set('menu', JSON.stringify(val))
        },

        clearMenu(state) {
            state.menu = [
                {
                    id: 1,
                    isshow: true,
                    label: "首页",
                    name: "home",
                    path: "/",
                    pid: null,
                    status: 0,
                    url: "home/index"
                }
            ]
            Cookie.remove('menu')
        },

        addMenu(state) {
            if (!Cookie.get('menu')) {
                return
            }
            //若cookie中有menu
            const menu = JSON.parse(Cookie.get('menu'))
            //给state里的menu赋值
            state.menu = menu
            //动态添加路由
            // const menuArray = []
            // menu.forEach(item => {
            //     //判断是否有二级菜单
            //     if (item.children) {
            //         item.children = item.children.map(item => {
            //             //注意这里是``而不是''
            //             item.component = () => import(`../views/${item.url}`)
            //             return item
            //         })
            //         menuArray.push(...item.children)
            //     } else {
            //         item.component = () => import(`../views/${item.url}`)
            //         menuArray.push(item)
            //     }
            // })
            // //路由的动态添加
            // menuArray.forEach(item => {
            //     router.addRoute('Main',item)
            // })
        },


        setRoutes(state, val) {
            state.routes = val
            //使用cookie缓存
            //使用JSON.stringify将数据序列化
            Cookie.set('routes', JSON.stringify(val))
        },

        clearRoutes(state) {
            state.routes = []
            Cookie.remove('routes')
        },

        addRoutes(state, router) {
            if (!Cookie.get('routes')) {
                return
            }
            //若cookie中有routes
            const routes = JSON.parse(Cookie.get('routes'))
            //给state里的menu赋值
            state.routes = routes
            //动态添加路由
            const routeArray = []
            routes.forEach(item => {
                //判断是否有二级菜单
                if (item.children) {
                    item.children = item.children.map(item => {
                        console.log('加载路由：' + item.label)
                        //注意这里是``而不是''
                        item.component = () => import(`../views/${item.url}`)
                        return item
                    })
                    routeArray.push(...item.children)
                } else {
                    console.log('加载路由：' + item.label)
                    item.component = () => import(`../views/${item.url}`)
                    routeArray.push(item)
                }
            })
            //路由的动态添加
            routeArray.forEach(item => {
                router.addRoute('Main', item)
            })
        }
    },
    actions: {},
    modules: {}
}