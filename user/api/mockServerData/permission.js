import Mock from 'mockjs'
// import Check from "../../views/standard/check";
// import Edit from "../../views/standard/edit";
// import uManage from "../../views/standard/manage";

let user=Mock.mock({
    name:'user1',
    phone:'1',
    password:'1',
    status:'user',
    addr: Mock.mock('@county(true)'),
    'age|18-60': 1,
    birth: Mock.Random.date(),
    sex: Mock.Random.integer(0, 1),
    email:Mock.Random.email('qq.com'),
})

let admin=Mock.mock({
    name:'manager1',
    phone:'123',
    password:'123',
    status:'admin',
    addr: Mock.mock('@county(true)'),
    'age|18-60': 1,
    birth: Mock.Random.date(),
    sex: Mock.Random.integer(0, 1),
    email:Mock.Random.email('qq.com'),
})

export default {



    getMenu: config => {
        console.log(config)
        const { phone, password } = JSON.parse(config.body)
        console.log(JSON.parse(config.body))
        // 先判断用户是否存在
        // 判断账号和密码是否对应
        if (phone === user.phone && password === user.password) {
            return {
                code: 20000,
                data: {
                    menu: [
                        {
                            id:1,
                            path: '/',
                            name: 'home',
                            label: '首页',
                            url: 'home/index'
                        },
                        {
                            id:2,
                            name:'standard',
                            label: '我的标准',
                            children: [
                                {
                                    id:2.1,
                                    path: '/myJoin',
                                    name: 'myJoin',
                                    label: '我的参与',
                                    url: 'standard/myJoin'
                                },
                                {
                                    id:2.2,
                                    path: '/myManage',
                                    name: 'myManage',
                                    label: '我的管理',
                                    url: 'standard/myManage'
                                }
                            ]
                        },
                        {
                            id:3,
                            path: '/message',
                            name: 'message',
                            label: '通知中心',
                            url: 'message/index'
                        },
                        {
                            id:4,
                            label: '个人中心',
                            name:'information',
                            children: [
                                {
                                    id:4.1,
                                    path: '/info',
                                    name: 'info',
                                    label: '个人信息',
                                    url: 'information/info'
                                },
                                {
                                    id:4.2,
                                    path: '/password',
                                    name: 'password',
                                    label: '修改密码',
                                    url: 'information/password'
                                }
                            ]
                        },
                    ],
                    routes: [
                        {
                            id:1,
                            path: '/',
                            name: 'home',
                            label: '首页',
                            url: 'home/index'
                        },
                        {
                            id:2,
                            name:'standard',
                            label: '我的标准',
                            children: [
                                {
                                    id:2.1,
                                    path: '/myJoin',
                                    name: 'myJoin',
                                    label: '我的参与',
                                    url: 'standard/myJoin'
                                },
                                {
                                    id:2.2,
                                    path: '/myManage',
                                    name: 'myManage',
                                    label: '我的管理',
                                    url: 'standard/myManage'
                                }
                            ]
                        },
                        {
                            id:3,
                            path: '/message',
                            name: 'message',
                            label: '通知中心',
                            url: 'message/index'
                        },
                        {
                            id:4,
                            label: '个人中心',
                            name:'information',
                            children: [
                                {
                                    id:4.1,
                                    path: '/info',
                                    name: 'info',
                                    label: '个人信息',
                                    url: 'information/info'
                                },
                                {
                                    id:4.2,
                                    path: '/password',
                                    name: 'password',
                                    label: '修改密码',
                                    url: 'information/password'
                                }
                            ]
                        },
                        {
                            id:5,
                            label: '操作',
                            name:'option',
                            children: [
                                {
                                    id:5.1,
                                    path: '/check',
                                    name: 'check',
                                    label: '查看',
                                    url: 'standard/check'
                                },
                                {
                                    id:5.2,
                                    path: '/edit',
                                    name: 'edit',
                                    label: '编辑',
                                    url: 'standard/edit'
                                },
                                {
                                    id:5.3,
                                    path: '/umanage',
                                    name: 'umanage',
                                    label: '管理',
                                    url: 'standard/manage'
                                }
                            ]
                        },
                    ],
                    user:user,
                    token: Mock.Random.guid(),
                    message: '获取成功'
                }
            }
        } else if (phone === admin.phone && password === admin.password) {
            return {
                code: 20001,
                data: {
                    menu: [
                        {
                            id:1,
                            name:'manage',
                            label: '标准管理',
                            children: [
                                {
                                    id:1.1,
                                    path: '/total',
                                    name: 'total',
                                    label: '数据标准',
                                    url: 'manage/total'
                                },
                                {
                                    id:1.2,
                                    path: '/level',
                                    name: 'level',
                                    label: '分级管理',
                                    url: 'manage/level'
                                }
                            ]
                        },
                        {
                            id:2,
                            path: '/user',
                            name: 'user',
                            label: '用户管理',
                            icon: 'user',
                            url: 'user/index'
                        },
                        {
                            id:3,
                            path: '/adminMessage',
                            name: 'adminMessage',
                            label: '通知中心',
                            url: 'adminMessage/index'
                        },
                        {
                            id:4,
                            label: '个人中心',
                            name:'information',
                            children: [
                                {
                                    id:4.1,
                                    path: '/info',
                                    name: 'info',
                                    label: '个人信息',
                                    url: 'information/info'
                                },
                                {
                                    id:4.2,
                                    path: '/password',
                                    name: 'password',
                                    label: '修改密码',
                                    url: 'information/password'
                                }
                            ]
                        },
                    ],
                    routes: [
                        {
                            id:1,
                            name:'manage',
                            label: '标准管理',
                            children: [
                                {
                                    id:1.1,
                                    path: '/total',
                                    name: 'total',
                                    label: '数据标准',
                                    url: 'manage/total'
                                },
                                {
                                    id:1.2,
                                    path: '/level',
                                    name: 'level',
                                    label: '分级管理',
                                    url: 'manage/level'
                                }
                            ]
                        },
                        {
                            id:2,
                            path: '/user',
                            name: 'user',
                            label: '用户管理',
                            icon: 'user',
                            url: 'user/index'
                        },
                        {
                            id:3,
                            path: '/adminMessage',
                            name: 'adminMessage',
                            label: '通知中心',
                            url: 'adminMessage/index'
                        },
                        {
                            id:4,
                            label: '个人中心',
                            name:'information',
                            children: [
                                {
                                    id:4.1,
                                    path: '/info',
                                    name: 'info',
                                    label: '个人信息',
                                    url: 'information/info'
                                },
                                {
                                    id:4.2,
                                    path: '/password',
                                    name: 'password',
                                    label: '修改密码',
                                    url: 'information/password'
                                }
                            ]
                        },
                    ],
                    level: [
                        {
                            id:1,
                            name: 'total',
                            label: '总体',
                        },
                        {
                            id:2,
                            name:'common',
                            label: '通用',
                            children: [
                                {
                                    id:2.1,
                                    name: 'base',
                                    label: '基础',
                                },
                                {
                                    id:2.2,
                                    name: 'safe',
                                    label: '安全',
                                },
                                {
                                    id:2.3,
                                    name: 'green',
                                    label: '绿色',
                                },
                                {
                                    id:2.4,
                                    name: 'smart',
                                    label: '智慧',
                                }
                            ]
                        },
                        {
                            id:3,
                            name:'build',
                            label: '建设',
                            children: [
                                {
                                    id:3.1,
                                    name: 'base',
                                    label: '基础',
                                },
                                {
                                    id:3.2,
                                    name: 'safe',
                                    label: '安全',
                                },
                                {
                                    id:3.3,
                                    name: 'green',
                                    label: '绿色',
                                },
                                {
                                    id:3.4,
                                    name: 'smart',
                                    label: '智慧',
                                }
                            ]
                        },
                    ],
                    user:admin,
                    token: Mock.Random.guid(),
                    message: '获取成功'
                }
            }
        } else {
            return {
                code: -999,
                data: {
                    message: '手机号或密码不正确'
                }
            }
        }
    },

    //得到注册的结果
    getReg: config=>{
        const {phone} = JSON.parse(config.body)
        if(phone!=='1'&&phone!=='123'&&phone!=='17752369445'){
            return{
                code: 20000,
                data:{
                    message:'注册成功'
                }
            }
        }else{
            return{
                code: -999,
                data:{
                    message: '该用户已存在!'
                }
            }
        }
    },

    //得到修改密码的结果
    getForget: config=>{
        const {phone} = JSON.parse(config.body)
        if(phone==='1'||phone==='123'|phone==='17752369445'){
            return{
                code: 20000,
                data:{
                    message:'修改密码成功！'
                }
            }
        }else{
            return{
                code: -999,
                data:{
                    message: '该用户不存在!'
                }
            }
        }
    }
}