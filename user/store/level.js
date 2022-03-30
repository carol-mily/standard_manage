//存储左边的分级
import Cookie from "js-cookie";

export default {
    state: {
        currentLevel: null,
        level: []
    },
    mutations: {
        setLevel(state, val) {
            state.level = val
            //使用cookie缓存
            //使用JSON.stringify将数据序列化
            Cookie.set('level', JSON.stringify(val))
        },

        clearLevel(state) {
            state.level = []
            Cookie.remove('level')
        },

        addLevel(state) {
            if (!Cookie.get('level')) {
                return
            }
            //若cookie中有menu
            const level = JSON.parse(Cookie.get('level'))
            state.level = level

            // //动态添加路由
            // const levelArray = []
            // level.forEach(item => {
            //     //判断是否有二级菜单
            //     if (item.children) {
            //         item.children = item.children.map(item => {
            //             //注意这里是``而不是''
            //             // item.component = () => import(`../views/${item.url}`)
            //             return item
            //         })
            //         levelArray.push(...item.children)
            //     } else {
            //         // item.component = () => import(`../views/${item.url}`)
            //         levelArray.push(item)
            //     }
            // })
            // //路由的动态添加
            // levelArray.forEach(item => {
            //     router.addRoute('Main',item)
            // })
        }
    },
    actions: {},
    modules: {}
}