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

export const editStanState=(params)=>{
    return axios.request({
        //mock给定的地址
        url: '/standard/editStanState',
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

export const getTotalLevel=()=>{
    return axios.request({
        //mock给定的地址
        url: '/standard/getTotalLevel',
        method: 'get',
    })
}

export const getLevel=(params)=>{
    return axios.request({
        //mock给定的地址
        url: '/standard/getLevel',
        method: 'get',
        data:params
    })
}

export const addLevel=(params)=>{
    return axios.request({
        //mock给定的地址
        url: '/standard/addLevel',
        method: 'get',
        data:params
    })
}

export const editLevel=(params)=>{
    return axios.request({
        //mock给定的地址
        url: '/standard/editLevel',
        method: 'get',
        data:params
    })
}

export const deleteLevel=(params)=>{
    return axios.request({
        //mock给定的地址
        url: '/standard/deleteLevel',
        method: 'get',
        data:params
    })
}

/*
这里是user
 */
export const logIn = (params) => {
    return axios.request({
        url: '/user/logIn',
        method: 'get',
        data:params
    })
}

export const register = (params) => {
    return axios.request({
        url: '/user/register',
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

//原
// export const getUser4Name = (params) => {
//     return axios.request({
//         url: '/user/getUser4Name',
//         method: 'get',
//         data:params
//     })
// }

export const getUser4Name = (params) => {
    return axios.request({
        url: "http://localhost:9090/user/page",
        method: 'get',
        data:params
    })
}

export const getUser4Phone = (params) => {
    return axios.request({
        url: '/user/getUser4Phone',
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

//message
export const getMessageList = (params) => {
    return axios.request({
        url: '/message/getMessageList',
        method: 'get',
        data:params
    })
}

export const setRead = (params) => {
    return axios.request({
        url: '/message/setRead',
        method: 'get',
        data:params
    })
}

export const deleteMessage = (params) => {
    return axios.request({
        url: '/message/deleteMessage',
        method: 'get',
        data:params
    })
}

export const sendMessage = (params) => {
    return axios.request({
        url: '/message/sendMessage',
        method: 'get',
        data:params
    })
}