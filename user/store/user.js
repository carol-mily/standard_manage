//存储登录凭证token
//缓存依赖于js cookie 因此先使用npm i js-cookie下载依赖
import Cookie from 'js-cookie'

export default {
    state: {
        token: ''
    },

    mutations: {
        setToken(state, val) {
            state.token = val
            //传入名称和数据
            Cookie.set('token', val)
        },

        clearToken(state) {
            state.token = ''
            Cookie.remove('token')
        },

        getToken(state) {
            //若缓存中有token则直接获取，若没有则从state中获取token
            state.token = state.token || Cookie.get('token')
        }
    }
}