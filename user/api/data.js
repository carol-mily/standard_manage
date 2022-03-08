//接口请求都在该文件中
import axios from "./axios";

//接口请求方法
// export const getMenu = (param) => {
//     return axios.request({
//         url: '/permission/getMenu',
//         method: 'post',
//         data: param
//     })
// }

export const getData = () => {
    return axios.request({
        //mock给定的地址
        url: '/home/getData',
        method: 'get'
    })
}

export const getUser = (params) => {
    return axios.request({
        url: '/user/getUser',
        method: 'get',
        data:params
    })
}

export const getMenu = (params) =>{
    return axios.request({
        url: '/permission/getMenu',
        method: 'post',
        data:params
    })
}