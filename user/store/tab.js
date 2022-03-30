//存储点击菜单的状态
import Cookie from "js-cookie";

export default {
    state: {
        tabsList: [],
        currentMenu: null,
        menu: [],
        routes:[]
    },
    mutations: {
        startTag(state,val){
            if(val===0){
                state.tabsList = [
                    {
                        path: '/home',
                        name: 'home',
                        label: '首页',
                    }
                ]
            }else{
                state.tabsList = [
                    {
                        path: '/total',
                        name: 'total',
                        label: '数据标准',
                    }
                ]
            }
        },

        closeTag(state, val) {
            //找到要删除的索引
            const result = state.tabsList.findIndex(item => item.name === val.name)
            //删除
            state.tabsList.splice(result, 1)
        },

        clearTag(state){
            state.tabsList = []
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
            state.menu = []
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

        addRoutes(state, router){
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
                        console.log('加载路由：'+item.label)
                        //注意这里是``而不是''
                        item.component = () => import(`../views/${item.url}`)
                        return item
                    })
                    routeArray.push(...item.children)
                } else {
                    console.log('加载路由：'+item.label)
                    item.component = () => import(`../views/${item.url}`)
                    routeArray.push(item)
                }
            })
            //路由的动态添加
            routeArray.forEach(item => {
                router.addRoute('Main',item)
            })
        }
    },
    actions: {},
    modules: {}
}