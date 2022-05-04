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

        }
    },
    actions: {},
    modules: {}
}