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

export const getTotalList=(params)=>{
    return axios.request({
        //mock给定的地址
        url: '/home/getTotalList',
        method: 'get',
        data:params
    })
}

export const getTotal=(params)=>{
    return axios.request({
        //mock给定的地址
        url: '/standard/getTotal',
        method: 'get',
        data:params
    })
}

export const deleteTotal=(params)=>{
    return axios.request({
        //mock给定的地址
        url: '/standard/deleteTotal',
        method: 'get',
        data:params
    })
}

export const getHomeList=(params)=>{
    return axios.request({
        //mock给定的地址
        url: '/standard/getHomeList',
        method: 'get',
        data:params
    })
}

export const getCard=(params)=>{
    return axios.request({
        //mock给定的地址
        url: '/standard/getCard',
        method: 'get',
        data:params
    })
}

export const getStanInfo=(params)=>{
    return axios.request({
        //mock给定的地址
        url: '/standard/getStanInfo',
        method: 'get',
        data:params
    })
}

export const getStanItem=(params)=>{
    return axios.request({
        //mock给定的地址
        url: '/standard/getStanItem',
        method: 'get',
        data:params
    })
}

export const editStan=(params)=>{
    return axios.request({
        //mock给定的地址
        url: '/standard/editStan',
        method: 'get',
        data:params
    })
}

export const addStan=(params)=>{
    return axios.request({
        //mock给定的地址
        url: '/standard/addStan',
        method: 'get',
        data:params
    })
}

export const deleteStan=(params)=>{
    return axios.request({
        //mock给定的地址
        url: '/standard/deleteStan',
        method: 'get',
        data:params
    })
}

export const deleteTable=(params)=>{
    return axios.request({
        //mock给定的地址
        url: '/standard/deleteTable',
        method: 'get',
        data:params
    })
}

export const addTable=(params)=>{
    return axios.request({
        //mock给定的地址
        url: '/standard/addTable',
        method: 'get',
        data:params
    })
}

export const editTable=(params)=>{
    return axios.request({
        //mock给定的地址
        url: '/standard/editTable',
        method: 'get',
        data:params
    })
}

export const deleteItem=(params)=>{
    return axios.request({
        //mock给定的地址
        url: '/standard/deleteItem',
        method: 'get',
        data:params
    })
}

export const editItem=(params)=>{
    return axios.request({
        //mock给定的地址
        url: '/standard/editItem',
        method: 'get',
        data:params
    })
}

export const addItem=(params)=>{
    return axios.request({
        //mock给定的地址
        url: '/standard/addItem',
        method: 'get',
        data:params
    })
}

export const getUser = (params) => {
    return axios.request({
        url: '/user/getUser',
        method: 'get',
        data:params
    })
}

export const updateUser = (params) => {
    return axios.request({
        url: '/user/updateUser',
        method: 'get',
        data:params
    })
}

export const createUser = (params) => {
    return axios.request({
        url: '/user/createUser',
        method: 'get',
        data:params
    })
}

export const deleteUser = (params) => {
    return axios.request({
        url: '/user/deleteUser',
        method: 'get',
        data:params
    })
}

export const changePassword = (params) => {
    return axios.request({
        url: '/user/changePassword',
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

export const getReg = (params)=>{
    return axios.request({
        url: '/permission/getReg',
        method:'post',
        data:params
    })
}

export const getForget= (params)=>{
    return axios.request({
        url: '/permission/getForget',
        method:'post',
        data:params
    })
}