//存储点击菜单的状态
import Cookie from "js-cookie";

export default {
    state: {
        tabsList: [
            {
                path: '',
                name: 'home',
                label: '首页',
                icon: 'home'
            }
        ],
        currentMenu: null,
        menu: []
    },
    mutations: {
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

        closeTag(state, val) {
            //找到要删除的索引
            const result = state.tabsList.findIndex(item => item.name === val.name)
            //删除
            state.tabsList.splice(result, 1)
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

        addMenu(state, router) {
            if (!Cookie.get('menu')) {
                return
            }
            //若cookie中有menu
            const menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu
            //动态添加路由
            const menuArray = []
            menu.forEach(item => {
                //判断是否有二级菜单
                if (item.children) {
                    item.children = item.children.map(item => {
                        //注意这里是``而不是''
                        item.component = () => import(`../views/${item.url}`)
                        return item
                    })
                    menuArray.push(...item.children)
                } else {
                    item.component = () => import(`../views/${item.url}`)
                    menuArray.push(item)
                }
            })
            //路由的动态添加
            menuArray.forEach(item => {
                router.addRoute('Main',item)
            })
        }
    },
    actions: {},
    modules: {}
}