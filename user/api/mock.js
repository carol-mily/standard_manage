//模拟后端数据返回
import Mock from 'mockjs'
import homeApi from './mockServerData/home'
import standardApi from "./mockServerData/standard";
import userApi from './mockServerData/user'
import permissionApi from "./mockServerData/permission";

//定义拦截器
//输入请求地址，接收一个回调函数
Mock.mock('/home/getTotalList',homeApi.getTotalList)

Mock.mock('/standard/getTotal',standardApi.getTotal)
Mock.mock('/standard/deleteTotal',standardApi.deleteTotal)
Mock.mock('/standard/getHomeList',standardApi.getHomeList)
Mock.mock('/standard/getCard',standardApi.getCard)
Mock.mock('/standard/getStanInfo',standardApi.getStanInfo)
Mock.mock('/standard/getStanItem',standardApi.getStanItem)
Mock.mock('/standard/editStan',standardApi.editStan)
Mock.mock('/standard/addStan',standardApi.addStan)
Mock.mock('/standard/deleteStan',standardApi.deleteStan)
Mock.mock('/standard/deleteTable',standardApi.deleteTable)
Mock.mock('/standard/editTable',standardApi.editTable)
Mock.mock('/standard/addTable',standardApi.addTable)
Mock.mock('/standard/deleteItem',standardApi.deleteItem)
Mock.mock('/standard/editItem',standardApi.editItem)
Mock.mock('/standard/addItem',standardApi.addItem)


Mock.mock(/user\/changePassword/,'get',userApi.changePassword)
Mock.mock(/user\/getUser/,'get',userApi.getUserList)
Mock.mock('/user/deleteUser',userApi.deleteUser)
Mock.mock('/user/updateUser',userApi.updateUser)
Mock.mock('/user/createUser',userApi.createUser)

Mock.mock(/permission\/getMenu/,'post',permissionApi.getMenu)
Mock.mock(/permission\/getReg/,'post',permissionApi.getReg)
Mock.mock(/permission\/getForget/,'post',permissionApi.getForget)