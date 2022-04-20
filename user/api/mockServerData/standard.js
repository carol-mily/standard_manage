//mock模拟首页的相关数据
import Mock from 'mockjs'
import User from './user.js'

let stanList = [] //数据标准
let levelList = [] //分级数组
let level1List = [], level2List = [], level3List = []

let i, j, k
//发布数据标准
for (i = 0; i < 50; i++) {
    let index = stanList.length
    let manager = Mock.Random.integer(0, 21)
    //模拟数据标准
    stanList.push(
        Mock.mock({
            id: stanList.length,
            name: '数据标准' + stanList.length,
            ename: 'Standard' + stanList.length,
            manager: User.List[manager],
            editors: [User.List[manager], User.List[Mock.Random.integer(0, 21)]],
            state: 2,
            subDay: Mock.Random.date(),
            creDay: Mock.Random.date(),
            level1: -1,
            level2: -1,
            level3: -1,
            description: '这是一个数据标准***********************************************************************************************************************************',
            table: []
        })
    )
    let tableNum = Mock.Random.integer(1, 5)
    for (j = 0; j < tableNum; j++) {
        stanList[index].table.push(
            Mock.mock({
                id: j,
                name: '表' + j,
                ename: 'table' + j,
                creDay: Mock.Random.date(),
                description: '这是一个表********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************',
                item: []
            })
        )
        let itemNum = Mock.Random.integer(10, 20)
        for (k = 0; k < itemNum; k++) {
            stanList[index].table[j].item.push(
                Mock.mock({
                    id: k,
                    name: '表' + j + '字段' + k,
                    code: 'item' + k,
                    type: 'string',
                    length: Mock.Random.integer(0, 100),
                    decimal: Mock.Random.integer(0, 20),
                    constraint: '无',
                    remarks: '该字段为' + '表' + j + '字段' + k,
                })
            )
        }
    }
}

//未发布数据标准
for (i = 0; i < 50; i++) {
    let index = stanList.length
    let manager = Mock.Random.integer(0, 21)
    //模拟数据标准
    stanList.push(
        Mock.mock({
            id: stanList.length,
            name: '数据标准' + stanList.length,
            ename: 'Standard' + stanList.length,
            manager: User.List[manager],
            editors: [User.List[Mock.Random.integer(0, 21)], User.List[Mock.Random.integer(0, 21)]],
            state: Mock.Random.integer(0, 1),
            subDay: Mock.Random.date(),
            creDay: Mock.Random.date(),
            level1: -1,
            level2: -1,
            level3: -1,
            description: '这是一个数据标准***********************************************************************************************************************************',
            table: []
        })
    )
    let tableNum = Mock.Random.integer(1, 5)
    for (j = 0; j < tableNum; j++) {
        stanList[index].table.push(
            Mock.mock({
                id: j,
                name: '表' + j,
                ename: 'table' + j,
                editors: Mock.Random.integer(0, 21),
                creDay: Mock.Random.date(),
                description: '这是一个表********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************',
                item: []
            })
        )
        let itemNum = Mock.Random.integer(10, 20)
        for (k = 0; k < itemNum; k++) {
            stanList[index].table[j].item.push(
                Mock.mock({
                    id: k,
                    name: '表' + j + '字段' + k,
                    code: 'item' + k,
                    type: 'string',
                    length: Mock.Random.integer(0, 100),
                    decimal: Mock.Random.integer(0, 20),
                    constraint: '无',
                    remarks: '该字段为' + '表' + j + '字段' + k,
                })
            )
        }
    }
}

//分级
for (i = 0; i < 3; i++) {
    if (i === 0) {
        level1List.push(
            Mock.mock({
                id: level1List.length,
                value: 'level1id' + level1List.length,
                name: '默认',
                label: '默认',
                level: 1,
                stanNum: 0,
            })
        )
    } else {
        level1List.push(
            Mock.mock({
                id: level1List.length,
                value: 'level1id' + level1List.length,
                name: '级别1+分级' + i,
                label: '级别1+分级' + i,
                level: 1,
                stanNum: 0,
            })
        )
        let level2Num = Mock.Random.integer(0, 5)
        if (level2Num > 1) {
            for (j = 0; j < level2Num; j++) {
                if (j === 0) {
                    level2List.push(
                        Mock.mock({
                            id: level2List.length,
                            value: 'level2id' + level2List.length,
                            name: '默认',
                            label: '默认',
                            level: 2,
                            preLevel: i,
                            stanNum: 0,
                        })
                    )
                } else {
                    level2List.push(
                        Mock.mock({
                            id: level2List.length,
                            value: 'level2id' + level2List.length,
                            name: '级别2+分级' + j,
                            label: '级别2+分级' + j,
                            level: 2,
                            preLevel: i,
                            stanNum: 0,
                        })
                    )
                    let level3Num = Mock.Random.integer(0, 5)
                    if (level3Num > 1) {
                        for (k = 0; k < level3Num; k++) {
                            if (k === 0) {
                                level3List.push(
                                    Mock.mock({
                                        id: level3List.length,
                                        value: 'level3id' + level3List.length,
                                        name: '默认',
                                        label: '默认',
                                        level: 3,
                                        preLevel: level2List.length - 1,
                                        stanNum: 0,
                                    })
                                )
                            } else {
                                level3List.push(
                                    Mock.mock({
                                        id: level3List.length,
                                        value: 'level3id' + level3List.length,
                                        name: '级别3+分级' + k,
                                        label: '级别3+分级' + k,
                                        level: 3,
                                        preLevel: level2List.length - 1,
                                        stanNum: 0,
                                    })
                                )
                            }
                        }
                    }
                }
            }
        }
    }
}

function getNextNum(level, levelId) {
    let children = []
    if (level === 1) {
        children = level2List.filter(item => {
            if (item.preLevel === levelId) return true
            return false
        })
    } else if (level === 2) {
        children = level3List.filter(item => {
            if (item.preLevel === levelId) return true
            return false
        })
    }
    return children.length
}

function getStan() {
    let i
    for (i = 0; i < level1List.length; i++) {
        level1List[i].stanNum = stanList.filter(item => item.level1 === level1List[i].id).length
    }
    for (let i = 0; i < level2List.length; i++) {
        level2List[i].stanNum = stanList.filter(item => item.level2 === level2List[i].id).length
    }
    for (let i = 0; i < level3List.length; i++) {
        level3List[i].stanNum = stanList.filter(item => item.level3 === level3List[i].id).length
    }
}

function buildLevelList() {
    levelList = level1List
    for (let i = 0; i < level1List.length; i++) {
        levelList[i].children = level2List.filter(item => {
            if (levelList[i].id === item.preLevel) return true
            return false
        })
        for (let j = 0; j < levelList[i].children.length; j++) {
            levelList[i].children[j].children = level3List.filter(item => {
                if (levelList[i].children[j].id === item.preLevel) return true
                return false
            })
        }
    }
}

function stanToLevel() {
    buildLevelList()
    for (let i = 0; i < stanList.length; i++) {
        let level1 = Mock.Random.integer(0, level1List.length - 1)
        stanList[i].level1 = level1
        level1List[level1].stanNum++
        if (getNextNum(1, level1) !== 0) {
            let level2 = Mock.Random.integer(0, getNextNum(1, level1) - 1)
            level2 = level2List.filter(item => item.preLevel === level1)[level2].id   //找到对应的id
            stanList[i].level2 = level2
            level2List[level2].stanNum++
            if (getNextNum(2, level2) !== 0) {
                let level3 = Mock.Random.integer(0, getNextNum(2, level2) - 1)
                level3 = level3List.filter(item => item.preLevel === level2)[level3].id   //找到对应的id
                stanList[i].level3 = level3
                level3List[level3].stanNum++
            }
        }
    }
    console.log('level1List:')
    console.log(level1List)
    console.log('level2List:')
    console.log(level2List)
    console.log('level3List:')
    console.log(level3List)
    console.log('levelList:')
    console.log(levelList)
}

stanToLevel()

export default {
    levelList,

    /**
     * 获取多个数据标准
     * @param id
     * @return {*}
     */
    getTotal: config => {
        const {pageName, phone, name, page, limit = 10, level, levelId} = JSON.parse(config.body)
        console.log('function:getTotal' + ' pageName:' + pageName + ' phone:' + phone + ' name:' + name, ' page:' + page, ' 分页大小limit:' + limit, ' level:' + level, ' levelId:' + levelId)
        let mockList = stanList
        if (pageName === 'home') {
            mockList = stanList.filter(item => {    //state=2为已发布
                if (item.state === 2) return true
                return false
            })
        }
        if (name === '') {
            if (level === 1) {
                mockList = mockList.filter((item => item.level1 === levelId))
            } else if (level === 2) {
                mockList = mockList.filter((item => item.level2 === levelId))
            } else if (level === 3) {
                mockList = mockList.filter((item => item.level3 === levelId))
            }
        } else {
            //筛选name或者manager匹配的项目
            mockList = mockList.filter(item => {
                if (name && item.name.indexOf(name) === -1 && item.manager.name.indexOf(name) === -1) return false
                return true
            })
        }
        //对分页数据的处理
        let pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
        return {
            code: 20000,
            data: {
                //总数据长度
                count: mockList.length,
                //当前页内数据
                list: pageList,
            }
        }
    },

    getHomeList: config => {
        const {name, page, limit = 10} = JSON.parse(config.body)

        console.log('name:' + name, 'page:' + page, '分页大小limit:' + limit)
        //筛选name或者manager匹配的项目
        const mockList = stanList.filter(item => {
            if (name && item.name.indexOf(name) === -1 && item.manager.indexOf(name) === -1) return false
            return true
        })
        //对分页数据的处理
        const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
        return {
            code: 20000,
            //总数据长度
            count: mockList.length,
            //当前页内数据
            list: pageList,
            level: [
                {
                    id: 1,
                    ename: 'total',
                    name: '总体',
                },
                {
                    id: 2,
                    ename: 'common',
                    name: '通用',
                    children: [
                        {
                            id: 2.1,
                            ename: 'base',
                            name: '基础',
                        },
                        {
                            id: 2.2,
                            ename: 'safe',
                            name: '安全',
                        },
                        {
                            id: 2.3,
                            ename: 'green',
                            name: '绿色',
                        },
                        {
                            id: 2.4,
                            ename: 'smart',
                            name: '智慧',
                        }
                    ]
                },
                {
                    id: 3,
                    ename: 'build',
                    name: '建设',
                    children: [
                        {
                            id: 3.1,
                            ename: 'base',
                            name: '基础',
                        },
                        {
                            id: 3.2,
                            ename: 'safe',
                            name: '安全',
                        },
                        {
                            id: 3.3,
                            ename: 'green',
                            name: '绿色',
                        },
                        {
                            id: 3.4,
                            ename: 'smart',
                            name: '智慧',
                        }
                    ]
                },
            ],
        }
    },

    /**
     * 获取个人数据标准
     * @param id
     * @return {*}
     */
    getCard: config => {
        const {phone, name, pageName} = JSON.parse(config.body)
        console.log('function:getCard' + ' name:' + name, ' page:' + pageName)
        let mockList = stanList
        //筛选name或者manager匹配的项目
        if (pageName === 'myJoin') {
            //找到该用户参与下的数据标准
            mockList = stanList.filter(item => {
                if (item.manager.phone !== phone) {
                    for (let i = 0; i < item.editors.length; i++) {
                        if (item.editors[i].phone === phone) return true
                    }
                    return false
                }
                return false
            })
        } else if (pageName === 'myManage') {
            //找到该用户管理下的数据标准
            mockList = stanList.filter(item => {
                if (item.manager.phone === phone) return true
                return false
            })
        }
        //找到关键字的数据标准
        mockList = mockList.filter(item => {
            if (name && item.name.indexOf(name) === -1) return false
            return true
        })
        return {
            code: 20000,
            //总数据长度
            data: {
                count: mockList.length,
                //当前页内数据
                list: mockList
            }
        }
    },

    /**
     * 获取数据标准信息
     * @param id
     * @return {*}
     */
    getStanInfo: config => {
        const {stanId, pageName} = JSON.parse(config.body)
        console.log('function:getStanInfo' + ' standardId:' + stanId + '  pageName:' + pageName)
        let mockList = stanList.filter(item => {
            if (item.id !== stanId) return false
            return true
        })
        return {
            code: 20000,
            //当前页内数据
            data: {
                list: mockList[0],
            }
        }
    },

    /**
     * 获取数据标准字段
     * @param id
     * @return {*}
     */
    getStanItem: config => {
        const {stanId, tableId, pageName} = JSON.parse(config.body)
        console.log('stanId:' + stanId + 'tableId:' + tableId + 'pageName' + pageName)
        let mockList = stanList.filter(item => {
            if (item.id !== stanId) return false
            return true
        })
        console.log('mockList:' + mockList[0].name)
        let mockTable = mockList[0].table
        let mockItem = mockTable.filter(item => {
            if (item.id !== tableId) return false
            return true
        })
        return {
            code: 20000,
            data: {
                //当前页内数据
                stanItem: mockItem[0].item,
            }
        }
    },

    /**
     * 添加数据标准
     * @param id
     * @return {*}
     */
    addStan: config => {
        const {
            pageName,
            name,
            ename,
            manager,
            editors,
            creDay,
            level,
            level1,
            level2,
            level3,
            description
        } = JSON.parse(config.body)
        //此处的level1等为level的value值，唯一；但在所有level中并不唯一
        console.log('function:addStan' + ' name:' + name, 'ename: ' + ename, 'manager: ' + manager, 'creDay: ' + creDay, 'level: ' + level, 'level1: ' + level1, 'level2: ' + level2, 'level3: ' + level3, ' page:' + pageName)
        stanList.push({
            id: stanList.length,
            name: name,
            ename: ename,
            manager: manager,
            editors: editors,
            creDay: creDay,
            level: level,
            level1: level > 0 ? level1List.filter(item => item.value === level1)[0].id : 0,
            level2: level > 1 ? level2List.filter(item => item.value === level2)[0].id : -1,
            level3: level > 2 ? level3List.filter(item => item.value === level3)[0].id : -1,
            description: description,
            table: [{
                id: 0,
                name: '默认表',
                ename: 'table',
                editors: '',
                creDay: '',
                description: '',
                item: [{
                    id: 0,
                    name: '默认字段',
                    code: '',
                    type: '',
                    length: '',
                    decimal: '',
                    constraint: '',
                    remarks: '',
                }]
            }]
        })
        //之前的
        // if (pageName === 'myJoin') {
        //     stanList.push({
        //         id: stanList.length,
        //         name: name,
        //         ename: ename,
        //         manager: manager,
        //         editors: editors,
        //         creDay: creDay,
        //         level: level,
        //         description: description,
        //         table: [{
        //             id: 0,
        //             name: '默认表',
        //             ename: 'table',
        //             editors: '',
        //             creDay: '',
        //             description: '',
        //             item: [{
        //                 id: 0,
        //                 name: '默认字段',
        //                 code: '',
        //                 type: '',
        //                 length: '',
        //                 decimal: '',
        //                 constraint: '',
        //                 remarks: '',
        //             }]
        //         }]
        //     })
        // } else if (pageName === 'myManage') {
        //     stanList.push({
        //         id: stanList.length,
        //         name: name,
        //         ename: ename,
        //         manager: manager,
        //         editors: editors,
        //         creDay: creDay,
        //         level: level,
        //         description: description,
        //         table: [{
        //             id: 0,
        //             name: '默认表',
        //             ename: 'table',
        //             editors: '',
        //             creDay: '',
        //             description: '',
        //             item: [{
        //                 id: 0,
        //                 name: '默认字段',
        //                 code: '',
        //                 type: '',
        //                 length: '',
        //                 decimal: '',
        //                 constraint: '',
        //                 remarks: '',
        //             }]
        //         }]
        //     })
        // }
        return {
            code: 20000,
            message: '删除成功'
        }
    },

    /**
     * 编辑数据标准
     * @param id
     * @return {*}
     */
    editStan: config => {
        const {
            stanId,
            name,
            ename,
            manager,
            editors,
            creDay,
            level,
            level1,
            level2,
            level3,
            description
        } = JSON.parse(config.body)
        console.log('function:editStan ', 'stanId: ' + stanId)
        stanList.some(u => {
            if (u.id === stanId) {
                u.name = name
                u.ename = ename
                u.manager = manager
                u.editors = editors
                u.creDay = creDay
                u.level = level
                u.level1 = level > 0 ? level1List.filter(item => item.value === level1)[0].id : 0
                u.level2 = level > 1 ? level2List.filter(item => item.value === level2)[0].id : -1
                u.level3 = level > 2 ? level3List.filter(item => item.value === level3)[0].id : -1
                u.description = description
            }
        })
        return {
            code: 20000,
            message: '删除成功'
        }
    },

    /**
     * 编辑数据标准
     * @param id
     * @return {*}
     */
    editStanState: config => {
        const {stanId, state} = JSON.parse(config.body)
        console.log('function:editStanState ', 'stanId: ' + stanId, ' state:' + state)
        stanList.some(u => {
            if (u.id === stanId) {
                u.state = state
            }
        })
        return {
            code: 20000,
            message: '修改成功'
        }
    },

    /**
     * 删除表
     * @param id
     * @return {*}
     */
    deleteTable: config => {
        const {stanId, tableId, pageName} = JSON.parse(config.body)
        console.log('5555555:' + pageName)
        if (pageName === 'myJoin') {
            stanList[stanId].table = stanList[stanId].table.filter(u => u.id !== tableId)
            for (let i = 0; i < stanList[stanId].table.length; i++) {
                stanList[stanId].table[i].id = i
            }
        } else if (pageName === 'myManage') {
            stanList[stanId].table = stanList[stanId].table.filter(u => u.id !== tableId)
            for (let i = 0; i < stanList[stanId].table.length; i++) {
                stanList[stanId].table[i].id = i
            }
        }
        return {
            code: 20000,
            message: '删除成功'
        }
    },

    /**
     * 删除数据标准
     * @param id
     * @return {*}
     */
    deleteStan: config => {
        const {stanIds} = JSON.parse(config.body)
        for (let i = 0; i < stanIds.length; i++) {
            stanList = stanList.filter(u => u.id !== stanIds[i])
        }
        //更新列表
        for (let i = 0; i < stanList.length; i++) {
            stanList[i].id = i
        }
        return {
            code: 20000,
            message: '删除成功'
        }
    },

    /**
     * 添加表
     * @param id
     * @return {*}
     */
    addTable: config => {
        const {stanId, pageName, name, ename, editors, creDay, description} = JSON.parse(config.body)
        console.log('5555555:' + pageName)
        if (pageName === 'myJoin') {
            stanList[stanId].table.push({
                id: stanList[stanId].table.length,
                name: name,
                ename: ename,
                editors: editors,
                creDay: creDay,
                description: description,
                item: []
            })
        } else if (pageName === 'myManage') {
            stanList[stanId].table.push({
                id: stanList[stanId].table.length,
                name: name,
                ename: ename,
                editors: editors,
                creDay: creDay,
                description: description,
                item: []
            })
        }
        return {
            code: 20000,
            message: '删除成功'
        }
    },

    /**
     * 编辑表
     * @param id
     * @return {*}
     */
    editTable: config => {
        const {stanId, tableId, pageName, name, ename, editors, creDay, description} = JSON.parse(config.body)
        console.log('5555555:' + pageName)
        if (pageName === 'myJoin') {
            stanList[stanId].table.some(u => {
                if (u.id === tableId) {
                    u.name = name
                    u.ename = ename
                    u.editors = editors
                    u.creDay = creDay
                    u.description = description
                }
            })
        } else if (pageName === 'myManage') {
            stanList[stanId].table.some(u => {
                if (u.id === tableId) {
                    u.name = name
                    u.ename = ename
                    u.editors = editors
                    u.creDay = creDay
                    u.description = description
                }
            })
        }
        return {
            code: 20000,
            message: '删除成功'
        }
    },

    /**
     * 删除字段
     * @param id
     * @return {*}
     */
    deleteItem: config => {
        const {stanId, tableId, pageName, itemId} = JSON.parse(config.body)
        console.log('stanid:' + stanId + ' tableid:' + tableId + ' itemid' + itemId)
        if (!itemId) {
            return {
                code: -999,
                message: '参数不正确'
            }
        } else {
            console.log('5555555:' + pageName)
            // for (let i = 0; i < totalList[stanId].table[tableId].length; i++) {
            //     totalList[stanId].table[tableId].item = totalList[stanId].table[tableId].item.filter(u => u.id !== itemId)
            // }
            // for (let i = 0; i < totalList[stanId].table[tableId].item.length; i++) {
            //     totalList[stanId].table[tableId].item[i].id = i
            // }
            if (pageName === 'myJoin') {
                let id = stanId - stanList.length
                console.log('id:' + id)
                for (let i = 0; i < stanList[id].table[tableId].length; i++) {
                    stanList[id].table[tableId].item = stanList[id].table[tableId].item.filter(u => u.id !== itemId)
                }
                for (let i = 0; i < stanList[id].table[tableId].item.length; i++) {
                    stanList[id].table[tableId].item[i].id = i
                }
            } else if (pageName === 'myManage') {
                let id = stanId - stanList.length - stanList.length
                for (let i = 0; i < stanList[id].table[tableId].length; i++) {
                    stanList[id].table[tableId].item = stanList[id].table[tableId].item.filter(u => u.id !== itemId)
                }
                for (let i = 0; i < stanList[stanId].table[tableId].item.length; i++) {
                    stanList[id].table[tableId].item[i].id = i
                }
            }
            return {
                code: 20000,
                message: '删除成功'
            }
        }
    },

    /**
     * 编辑字段
     * @param id
     * @return {*}
     */
    editItem: config => {
        const {
            stanId,
            tableId,
            itemId,
            pageName,
            name,
            code,
            type,
            length,
            decimal,
            constraint,
            remarks
        } = JSON.parse(config.body)
        console.log('5555555:' + pageName)
        if (pageName === 'myJoin') {
            stanList[stanId].table[tableId].item.some(u => {
                if (u.id === itemId) {
                    u.name = name
                    u.code = code
                    u.type = type
                    u.length = length
                    u.decimal = decimal
                    u.constraint = constraint
                    u.remarks = remarks
                }
            })
        } else if (pageName === 'myManage') {
            stanList[stanId].table[tableId].item.some(u => {
                if (u.id === itemId) {
                    u.name = name
                    u.code = code
                    u.type = type
                    u.length = length
                    u.decimal = decimal
                    u.constraint = constraint
                    u.remarks = remarks
                }
            })
        }
        return {
            code: 20000,
            message: '修改成功'
        }
    },

    /**
     * 添加字段
     * @param id
     * @return {*}
     */
    addItem: config => {
        const {
            stanId,
            tableId,
            pageName,
            name,
            code,
            type,
            length,
            decimal,
            constraint,
            remarks
        } = JSON.parse(config.body)
        console.log('5555555:' + pageName)
        if (pageName === 'myJoin') {
            stanList[stanId].table[tableId].item.push({
                id: stanList[stanId].table[tableId].item.length,
                name: name,
                code: code,
                type: type,
                length: length,
                decimal: decimal,
                constraint: constraint,
                remarks: remarks
            })
        } else if (pageName === 'myManage') {
            stanList[stanId].table[tableId].item.push({
                id: stanList[stanId].table[tableId].item.length,
                name: name,
                code: code,
                type: type,
                length: length,
                decimal: decimal,
                constraint: constraint,
                remarks: remarks
            })
        }
        return {
            code: 20000,
            message: '添加成功'
        }
    },

    /**
     * 获取总分级列表
     * @param id
     * @return {*}
     */
    getTotalLevel() {
        console.log('function:getTotalLevel')
        buildLevelList()
        return {
            code: 20000,
            data: {
                //总数据长度
                count: levelList.length,
                //当前页内数据
                level: levelList,
            }
        }
    },

    /**
     * 获取分级列表
     * @param id
     * @return {*}
     */
    getLevel: config => {
        const {name, level, preLevel, page, limit = 10} = JSON.parse(config.body)
        console.log('function:getLevel' + ' level:' + level, ' preLevel:' + preLevel, ' name:' + name, ' page:' + page, ' 分页大小limit:' + limit)
        let mockList
        if (level === 1) {
            mockList = level1List
        } else {
            if (level === 2) {
                mockList = level2List
            } else if (level === 3) {
                mockList = level3List
            }
            mockList = mockList.filter(item => item.preLevel === preLevel)
        }
        //筛选name或者manager匹配的项目
        mockList = mockList.filter(item => {
            if (name && item.name.indexOf(name) === -1) return false
            return true
        })
        //对分页数据的处理
        let pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
        return {
            code: 20000,
            data: {
                //总数据长度
                count: mockList.length,
                //当前页内数据
                list: pageList,
            }
        }
    },

    /**
     * 添加分级列表
     * @param id
     * @return {*}
     */
    addLevel: config => {
        const {level, name, preLevel} = JSON.parse(config.body)
        console.log('function:addLevel level:' + level, ' name:' + name, ' preLevel:' + preLevel)
        if (level === 1) {
            level1List.push({
                id: level1List[level1List.length - 1].id + 1,   //这里必须是唯一标识
                value: 'level1id' + (level1List[level1List.length - 1].id + 1),
                name: 'level1id' + (level1List[level1List.length - 1].id + 1),
                label: name,
                level: level,
                stanNum: 0,
            })
        } else if (level === 2) {
            level2List.push({
                id: level2List[level2List.length - 1].id + 1,   //这里必须是唯一标识
                value: 'level2id' + (level2List[level2List.length - 1].id + 1),
                name: 'level2id' + (level2List[level2List.length - 1].id + 1),
                label: name,
                level: level,
                preLevel: preLevel,
                stanNum: 0,
            })
        } else if (level === 3) {
            level3List.push({
                id: level3List[level3List.length - 1].id + 1,
                value: 'level3id' + (level3List[level3List.length - 1].id + 1),
                name: 'level3id' + (level3List[level3List.length - 1].id + 1),
                label: name,
                level: level,
                preLevel: preLevel,
                stanNum: 0,
            })
        }
        return {
            code: 20000,
            message: '添加成功'
        }
    },

    /**
     * 编辑分级列表
     * @param id
     * @return {*}
     */
    editLevel: config => {
        const {level, id, name} = JSON.parse(config.body)
        console.log('function:editLevel level:' + level, ' id:' + id, ' name:' + name)
        if (level === 1) {
            level1List.some(u => {
                if (u.id === id) {
                    u.name = name
                    u.label = name
                }
            })
        } else if (level === 2) {
            level2List.some(u => {
                if (u.id === id) {
                    u.name = name
                    u.label = name
                }
            })
        } else if (level === 3) {
            level2List.some(u => {
                if (u.id === id) {
                    u.name = name
                    u.label = name
                }
            })
        }
        return {
            code: 20000,
            message: '修改成功'
        }
    },

    /**
     * 删除分级列表
     * @param id
     * @return {*}
     */
    deleteLevel: config => {
        const {level, id} = JSON.parse(config.body)
        console.log('function:deleteLevel level:' + level, ' id:' + id)
        if (!id) {
            return {
                code: -999,
                message: '参数不正确'
            }
        } else {
            if (level === 1) {
                level1List = level1List.filter(item => item.id !== id)
                stanList.some(item => { //对数据标准分类进行处理
                    if (item.level1 === id) {
                        item.level1 = 0
                        item.level2 = -1
                        item.level3 = -1
                    }
                })
            } else if (level === 2) {
                let preLevel = level2List.filter(item => item.id === id)[0].preLevel
                let Level0 = level2List.filter(item => (item.preLevel === preLevel && item.name === '默认'))[0].id    //得到‘默认’的id
                level2List = level2List.filter(item => item.id !== id)  //删除对应id的level
                stanList.some(item => { //对数据标准分类进行处理
                    if (item.level2 === id) {
                        item.level2 = Level0
                        item.level3 = -1
                    }
                })
                // if(level2List.filter(item => item.id !== id).length<2){
                //     stanList.some(item => { //对数据标准分类进行处理
                //         if (item.level1 === id) {
                //             item.level2 = -1
                //             item.level3 = -1
                //         }
                //     })
                // }else{
                //     stanList.some(item => { //对数据标准分类进行处理
                //         if (item.level1 === id) {
                //             item.level2 = 0
                //             item.level3 = -1
                //         }
                //     })
                // }
            } else if (level === 3) {
                let preLevel = level3List.filter(item => item.id === id)[0].preLevel
                let Level0 = level3List.filter(item => (item.preLevel === preLevel && item.name === '默认'))[0].id    //得到‘默认’的id
                level3List = level3List.filter(item => item.id !== id)  //删除对应id的level
                stanList.some(item => { //对数据标准分类进行处理
                    if (item.level3 === id) {
                        item.level3 = Level0
                    }
                })
            }
            getStan()
            return {
                code: 20000,
                message: '删除成功',
                list: stanList
            }
        }
    },
}