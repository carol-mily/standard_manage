//存储点击菜单的状态
// import Cookie from "js-cookie";

export default {
    state: {
        stanId:'',
        stanPage:'',
        standard:{},
    },
    mutations: {
        setStanId(state,val){
            state.stanId= val.stanId
            state.stanPage=val.stanPage
        },

        setStandard(state,val){
            state.standard=val
        },

        clearStandard(state){
            state.standard= {}
        }
    },
    actions: {},
    modules: {}
}