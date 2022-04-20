import Mock from 'mockjs'
import standard from "./standard";

//用户列表
let List = []


for (let i = 0; i < 20; i++) {
    List.push(
        Mock.mock({
            id: List.length ,
            name: Mock.Random.cname(),
            phone: /^1[34578]\d{9}$/,//随机电话号码
            password: Mock.Random.integer(1, 10000000),
            status: Mock.Random.integer(0, 1),
            addr: Mock.mock('@county(true)'),
            birth: Mock.Random.date(),
            sex: Mock.Random.integer(0, 1),
            email: Mock.Random.email('qq.com')
        })
    )
}

//设置测试用户
List.push(
    Mock.mock({
        id: List.length,
        name: 'user1',
        phone: '1',
        password: '1',
        status: 0,
        addr: Mock.mock('@county(true)'),
        birth: Mock.Random.date(),
        sex: Mock.Random.integer(0, 1),
        email: Mock.Random.email('qq.com'),
    })
)

//设置测试管理员
List.push(
    Mock.mock({
        id: List.length,
        name: 'admin1',
        phone: '123',
        password: '123',
        status: 1,
        addr: Mock.mock('@county(true)'),
        'age|18-60': 1,
        birth: Mock.Random.date(),
        sex: Mock.Random.integer(0, 1),
        email: Mock.Random.email('qq.com'),
    })
)

//进入系统所需菜单和路由
let userMenu = [
    {
        id: 1,
        path: '/',
        name: 'home',
        label: '首页',
        url: 'home/index'
    },
    {
        id: 2,
        name: 'standard',
        label: '我的标准',
        children: [
            {
                id: 2.1,
                path: '/myJoin',
                name: 'myJoin',
                label: '我的参与',
                url: 'standard/myJoin'
            },
            {
                id: 2.2,
                path: '/myManage',
                name: 'myManage',
                label: '我的管理',
                url: 'standard/myManage'
            }
        ]
    },
    {
        id: 3,
        path: '/message',
        name: 'message',
        label: '通知中心',
        url: 'message/index'
    },
    {
        id: 4,
        label: '个人中心',
        name: 'information',
        children: [
            {
                id: 4.1,
                path: '/info',
                name: 'info',
                label: '个人信息',
                url: 'information/info'
            },
            {
                id: 4.2,
                path: '/password',
                name: 'password',
                label: '修改密码',
                url: 'information/password'
            }
        ]
    },
]
let adminMenu = [
    {
        id: 1,
        name: 'manage',
        label: '系统管理',
        children: [
            {
                id: 1.1,
                path: '/total',
                name: 'total',
                label: '标准管理',
                url: 'manage/total'
            },
            {
                id: 1.2,
                path: '/level',
                name: 'level',
                label: '分级管理',
                url: 'manage/level'
            }
        ]
    },
    {
        id: 2,
        name: 'standard',
        label: '我的标准',
        children: [
            {
                id: 2.1,
                path: '/myJoin',
                name: 'myJoin',
                label: '我的参与',
                url: 'standard/myJoin'
            },
            {
                id: 2.2,
                path: '/myManage',
                name: 'myManage',
                label: '我的管理',
                url: 'standard/myManage'
            }
        ]
    },
    {
        id: 3,
        path: '/user',
        name: 'user',
        label: '用户管理',
        icon: 'user',
        url: 'user/index'
    },
    {
        id: 4,
        path: '/message',
        name: 'message',
        label: '通知中心',
        url: 'message/index'
    },
    {
        id: 5,
        label: '个人中心',
        name: 'information',
        children: [
            {
                id: 5.1,
                path: '/info',
                name: 'info',
                label: '个人信息',
                url: 'information/info'
            },
            {
                id: 5.2,
                path: '/password',
                name: 'password',
                label: '修改密码',
                url: 'information/password'
            }
        ]
    },
]
let userRoutes = [
    {
        id: 1,
        path: '/',
        name: 'home',
        label: '首页',
        url: 'home/index'
    },
    {
        id: 2,
        name: 'standard',
        label: '我的标准',
        children: [
            {
                id: 2.1,
                path: '/myJoin',
                name: 'myJoin',
                label: '我的参与',
                url: 'standard/myJoin'
            },
            {
                id: 2.2,
                path: '/myManage',
                name: 'myManage',
                label: '我的管理',
                url: 'standard/myManage'
            }
        ]
    },
    {
        id: 3,
        path: '/message',
        name: 'message',
        label: '通知中心',
        url: 'message/index'
    },
    {
        id: 4,
        label: '个人中心',
        name: 'information',
        children: [
            {
                id: 4.1,
                path: '/info',
                name: 'info',
                label: '个人信息',
                url: 'information/info'
            },
            {
                id: 4.2,
                path: '/password',
                name: 'password',
                label: '修改密码',
                url: 'information/password'
            }
        ]
    },
    {
        id: 5,
        label: '操作',
        name: 'option',
        children: [
            {
                id: 5.1,
                path: '/check',
                name: 'check',
                label: '查看',
                url: 'standard/check'
            },
            {
                id: 5.2,
                path: '/edit',
                name: 'edit',
                label: '编辑',
                url: 'standard/edit'
            },
            {
                id: 5.3,
                path: '/umanage',
                name: 'umanage',
                label: '管理',
                url: 'standard/manage'
            }
        ]
    },
]
let adminRoutes = [
    {
        id: 1,
        name: 'manage',
        label: '系统管理',
        children: [
            {
                id: 1.1,
                path: '/total',
                name: 'total',
                label: '标准管理',
                url: 'manage/total'
            },
            {
                id: 1.2,
                path: '/level',
                name: 'level',
                label: '分级管理',
                url: 'manage/level'
            }
        ]
    },
    {
        id: 2,
        name: 'standard',
        label: '我的标准',
        children: [
            {
                id: 2.1,
                path: '/myJoin',
                name: 'myJoin',
                label: '我的参与',
                url: 'standard/myJoin'
            },
            {
                id: 2.2,
                path: '/myManage',
                name: 'myManage',
                label: '我的管理',
                url: 'standard/myManage'
            }
        ]
    },
    {
        id: 3,
        path: '/user',
        name: 'user',
        label: '用户管理',
        icon: 'user',
        url: 'user/index'
    },
    {
        id: 4,
        path: '/message',
        name: 'message',
        label: '通知中心',
        url: 'message/index'
    },
    {
        id: 5,
        label: '个人中心',
        name: 'information',
        children: [
            {
                id: 5.1,
                path: '/info',
                name: 'info',
                label: '个人信息',
                url: 'information/info'
            },
            {
                id: 5.2,
                path: '/password',
                name: 'password',
                label: '修改密码',
                url: 'information/password'
            }
        ]
    },
    {
        id: 6,
        label: '操作',
        name: 'option',
        children: [
            {
                id: 6.1,
                path: '/check',
                name: 'check',
                label: '查看',
                url: 'standard/check'
            },
            {
                id: 6.2,
                path: '/edit',
                name: 'edit',
                label: '编辑',
                url: 'standard/edit'
            },
            {
                id: 6.3,
                path: '/umanage',
                name: 'umanage',
                label: '管理',
                url: 'standard/manage'
            }
        ]
    },
]
// let level = [
//     {
//         id: 1,
//         name: 'total',
//         label: '总体',
//     },
//     {
//         id: 2,
//         name: 'common',
//         label: '通用',
//         children: [
//             {
//                 id: 2.1,
//                 name: 'base',
//                 label: '基础',
//             },
//             {
//                 id: 2.2,
//                 name: 'safe',
//                 label: '安全',
//             },
//             {
//                 id: 2.3,
//                 name: 'green',
//                 label: '绿色',
//             },
//             {
//                 id: 2.4,
//                 name: 'smart',
//                 label: '智慧',
//             }
//         ]
//     },
//     {
//         id: 3,
//         name: 'build',
//         label: '建设',
//         children: [
//             {
//                 id: 3.1,
//                 name: 'base',
//                 label: '基础',
//             },
//             {
//                 id: 3.2,
//                 name: 'safe',
//                 label: '安全',
//             },
//             {
//                 id: 3.3,
//                 name: 'green',
//                 label: '绿色',
//             },
//             {
//                 id: 3.4,
//                 name: 'smart',
//                 label: '智慧',
//             }
//         ]
//     },
// ]

export default {
    List,

    /**
     * 登录
     * 要带参数 name, page, limt; name可以不填, page,limit有默认值。
     * @param name, page, limit
     * @return {{code: number, count: number, data: *[]}}
     */
    logIn: config => {
        const {phone, password} = JSON.parse(config.body)
        console.log('logIn info:')
        console.log(JSON.parse(config.body))
        // 先判断用户是否存在
        const mockList = List.filter(item => {
            if (item.phone === phone) return true
            return false
        })
        if (mockList.length === 0) {
            return {
                code: -999,
                data: {
                    message: '手机号或密码不正确'
                }
            }
        }
        // 判断账号和密码是否对应
        if (password === mockList[0].password) {
            //判断身份
            if (mockList[0].status === 0) {
                return {
                    code: 20000,
                    data: {
                        menu: userMenu,
                        routes: userRoutes,
                        level: standard.levelList,
                        user: mockList[0],
                        token: Mock.Random.guid(),
                        message: '获取成功'
                    }
                }
            } else if (mockList[0].status === 1) {
                return {
                    code: 20001,
                    data: {
                        menu: adminMenu,
                        routes: adminRoutes,
                        level: standard.levelList,
                        user: mockList[0],
                        token: Mock.Random.guid(),
                        message: '获取成功'
                    }
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

    /**
     * 注册
     */
    register: config => {
        const {name, phone, password} = JSON.parse(config.body)
        console.log('register info:')
        console.log(JSON.parse(config.body))
        // 先判断用户是否存在
        const mockList = List.filter(item => {
            if (item.phone === phone) return true
            return false
        })
        if (mockList.length === 0) {
            //在数据首端添加
            List.push({
                id: List.length,
                name: name,
                phone: phone,
                password: password,
                status: 0,
            })
            return {
                code: 20000,
                data: {
                    message: '注册成功'
                }
            }
        } else {
            return {
                code: -999,
                data: {
                    message: '该手机号已存在账号'
                }
            }
        }
    },

    /**
     * 修改密码
     */
    changePassword: config => {
        const {phone, password} = JSON.parse(config.body)
        console.log('changePassword info:')
        console.log(JSON.parse(config.body))
        // 先判断用户是否存在
        const mockList = List.filter(item => {
            if (item.phone === phone) return true
            return false
        })
        if (mockList.length === 0) {
            return {
                code: -999,
                data: {
                    message: '该账号不存在，请先注册'
                }
            }
        }
        mockList[0].password = password
        return {
            code: 20000,
            data: {
                message: '修改成功'
            }
        }
    },

    /**
     * 获取列表(根据名字获取列表)
     * 要带参数 name, page, limt; name可以不填, page,limit有默认值。
     * @param name, page, limit
     * @return {{code: number, count: number, data: *[]}}
     */
    getUser4Name: config => {
        const {name, page = 1, limit = 10, status = 2} = JSON.parse(config.body)
        console.log('name:' + name, 'page:' + page, '分页大小limit:' + limit, 'status:' + status)
        //匹配名字
        let mockList = List.filter(item => {
            if (name && item.name.indexOf(name) === -1 && item.addr.indexOf(name) === -1) return false
            return true
        })
        //匹配角色
        if (status !== '2') {
            mockList = mockList.filter(item => {
                if (item.status.toString() === status) return true
                return false
            })
        }
        //获取当前页面信息
        const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
        return {
            code: 20000,
            data: {
                count: mockList.length,
                list: pageList
            }
        }
    },

    /**
     * 获取列表(根据手机号获取列表)
     * 要带参数 phone, page, limt; phone可以不填, page,limit有默认值。
     * @param phone, page, limit
     * @return {{code: number, count: number, data: *[]}}
     */
    getUser4Phone: config => {
        const {phone} = JSON.parse(config.body)
        console.log('phone:' + phone)
        const mockList = List.filter(item => {
            if (item.phone === phone) return true
            return false
        })
        return {
            code: 20000,
            data: {
                list: mockList[0]
            }
        }
    },

    /**
     * 增加用户
     * @param name, addr, age, birth, sex
     * @return {{code: number, data: {message: string}}}
     */
    createUser: config => {
        const {name, phone, addr, email, birth, sex, status} = JSON.parse(config.body)
        console.log(JSON.parse(config.body))
        const mockList = List.filter(item => {
            if (item.phone===phone) return true
            return false
        })
        if (mockList.length!==0){
            return {
                code: -999,
                data: {
                    message: '该手机号已存在账号'
                }
            }
        }else{
            //在数据首端添加
            List.unshift({
                name: name,
                addr: addr,
                phone: phone,
                email: email,
                status: status,
                birth: birth,
                sex: sex
            })
            //更新数据的id序号
            for (let i = 0; i < List.length; i++) {
                List[i].id = i + 1
            }
            return {
                code: 20000,
                data: {
                    message: '添加成功'
                }
            }
        }

    },

    /**
     * 删除用户
     * @param id
     * @return {*}
     */
    deleteUser: config => {
        const {phoneList} = JSON.parse(config.body)
        if (!phoneList) {
            return {
                code: -999,
                message: '参数不正确'
            }
        } else {
            for (let i = 0; i < phoneList.length; i++) {
                List = List.filter(item => item.phone !== phoneList[i])
            }
            //更新数组序号
            for (let i = 0; i < List.length; i++) {
                List[i].id = i + 1
            }
            return {
                code: 20000,
                data: {
                    message: '删除成功'
                }
            }
        }
    },

    /**
     * 修改用户
     * @param id, name, addr, age, birth, sex
     * @return {{code: number, data: {message: string}}}
     */
    updateUser: config => {
        const {id, name, phone, addr, email, birth, sex, status} = JSON.parse(config.body)
        const sex_num = parseInt(sex)
        const mockList = List.filter(item => {
            if (item.phone===phone) return true
            return false
        })
        //判断是否与其他用户手机号相同
        if(mockList.length===0||mockList[0].id===id){
            List.some(u => {
                if (u.id === id) {
                    u.name = name
                    u.phone = phone
                    u.email = email
                    u.addr = addr
                    u.birth = birth
                    u.sex = sex_num
                    u.status = status
                    return true
                }
            })
            return {
                code: 20000,
                data: {
                    message: '修改成功'
                }
            }
        }else{
            return {
                code:-999,
                data: {
                    message: '修改成功'
                }
            }
        }
    }
}