// //模拟后端数据返回
// import Mock from 'mockjs'
// import homeApi from './mockServerData/home'
// import standardApi from "./mockServerData/standard";
// import userApi from './mockServerData/user'
// import messageApi from './mockServerData/message'
// //定义拦截器
// //输入请求地址，接收一个回调函数
// Mock.mock('/home/getTotalList',homeApi.getTotalList)
//
// Mock.mock('/standard/getTotal',standardApi.getTotal)
// Mock.mock('/standard/getHomeList',standardApi.getHomeList)
// Mock.mock('/standard/getCard',standardApi.getCard)
// Mock.mock('/standard/getStanInfo',standardApi.getStanInfo)
// Mock.mock('/standard/getStanItem',standardApi.getStanItem)
// Mock.mock('/standard/editStan',standardApi.editStan)
// Mock.mock('/standard/editStanState',standardApi.editStanState)
// Mock.mock('/standard/addStan',standardApi.addStan)
// Mock.mock('/standard/deleteStan',standardApi.deleteStan)
// Mock.mock('/standard/deleteTable',standardApi.deleteTable)
// Mock.mock('/standard/editTable',standardApi.editTable)
// Mock.mock('/standard/addTable',standardApi.addTable)
// Mock.mock('/standard/deleteItem',standardApi.deleteItem)
// Mock.mock('/standard/editItem',standardApi.editItem)
// Mock.mock('/standard/addItem',standardApi.addItem)
// Mock.mock('/standard/getTotalLevel',standardApi.getTotalLevel)
// Mock.mock('/standard/getLevel',standardApi.getLevel)
// Mock.mock('/standard/addLevel',standardApi.addLevel)
// Mock.mock('/standard/editLevel',standardApi.editLevel)
// Mock.mock('/standard/deleteLevel',standardApi.deleteLevel)
//
// /*
//  *这里是user
//  */
// Mock.mock('/user/logIn',userApi.logIn)
// Mock.mock('/user/register',userApi.register)
// Mock.mock(/user\/changePassword/,'get',userApi.changePassword)
// Mock.mock('/user/getUser4Name',userApi.getUser4Name)
// Mock.mock('/user/getUser4Phone',userApi.getUser4Phone)
// Mock.mock('/user/deleteUser',userApi.deleteUser)
// Mock.mock('/user/updateUser',userApi.updateUser)
// Mock.mock('/user/createUser',userApi.createUser)
//
// /*
//  *这里是message
//  */
// Mock.mock('/message/getMessageList',messageApi.getMessageList)
// Mock.mock('/message/setRead',messageApi.setRead)
// Mock.mock('/message/deleteMessage',messageApi.deleteMessage)
// Mock.mock('/message/sendMessage',messageApi.sendMessage)