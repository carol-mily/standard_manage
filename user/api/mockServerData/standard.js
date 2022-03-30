//mock模拟首页的相关数据
import Mock from 'mockjs'

let subList=[]
let cardListJoin = []
let cardListMng = []
let totalList = []

const count = 10


let i = 0, j = 0, k = 0
for (i = 0; i < 20; i++) {
    let subListTable = []
    let tableNum = Mock.Random.integer(1, 5)
    for (j = 0; j < tableNum; j++) {
        let subListItem = []
        let itemNum = Mock.Random.integer(10, 20)
        for (k = 0; k < itemNum; k++) {
            subListItem.push(
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
        subListTable.push(
            Mock.mock({
                id: j,
                name: '表' + j,
                ename: 'table' + j,
                editors: Mock.Random.cname(),
                creDay: Mock.Random.date(),
                description: '这是一个表********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************',
                item: subListItem
            })
        )
    }
    subList.push(
        Mock.mock({
            id: i,
            name: '数据标准' + i,
            ename: 'Standard' + i,
            manager: Mock.Random.cname(),
            editors: [Mock.Random.cname(), Mock.Random.cname()],
            subDay:Mock.Random.date(),
            creDay: Mock.Random.date(),
            level: 1,
            description: '这是一个数据标准***********************************************************************************************************************************',
            table: subListTable
        })
    )
}

for (i = 0; i < count; i++) {
    let stanTableJoin = []
    let tableNum = Mock.Random.integer(1, 5)
    for (j = 0; j < tableNum; j++) {
        let stanItemJoin = []
        let itemNum = Mock.Random.integer(10, 20)
        for (k = 0; k < itemNum; k++) {
            stanItemJoin.push(
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
        stanTableJoin.push(
            Mock.mock({
                id: j,
                name: '表' + j,
                ename: 'table' + j,
                editors: 'user1',
                creDay: Mock.Random.date(),
                description: '这是一个表********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************',
                item: stanItemJoin
            })
        )
    }
    cardListJoin.push(
        Mock.mock({
            id: i,
            name: '参与数据标准' + i,
            ename: 'joinStandard' + i,
            manager: Mock.Random.cname(),
            editors: [Mock.Random.cname(), Mock.Random.cname(),'user1'],
            creDay: Mock.Random.date(),
            level: 1,
            description: '这是一个数据标准***********************************************************************************************************************************',
            table: stanTableJoin
        })
    )
}

for (i = 0; i < count; i++) {
    let stanTableMng = []
    let tableNum = Mock.Random.integer(1, 5)
    for (j = 0; j < tableNum; j++) {
        let stanItemMng = []
        let itemNum = Mock.Random.integer(10, 20)
        for (k = 0; k < itemNum; k++) {
            stanItemMng.push(
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
        stanTableMng.push(
            Mock.mock({
                id: j,
                name: '表' + j,
                ename: 'table' + j,
                editors: 'user1',
                creDay: Mock.Random.date(),
                description: '这是一个表********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************',
                item: stanItemMng
            })
        )
    }
    cardListMng.push(
        Mock.mock({
            id: i,
            name: '管理数据标准' + i,
            ename: 'mngStandard' + i,
            manager: 'user1',
            editors: [Mock.Random.cname(), Mock.Random.cname()],
            creDay: Mock.Random.date(),
            level: 1,
            state: '未发布',
            description: '这是一个数据标准***********************************************************************************************************************************',
            table: stanTableMng
        })
    )
}

function updateTotal() {
    totalList = []
    for (i = 0; i < subList.length; i++) {
        totalList.push(subList[i])
        totalList[i].id = i
    }
    for (j = 0; j < cardListJoin.length; j++) {
        totalList.push(cardListJoin[j])
        totalList[i+j].id = i+j
    }
    for (k = 0; k < cardListMng.length; k++) {
        totalList.push(cardListMng[k])
        totalList[i + j+k].id = i + j+k
    }
}

updateTotal()

export default {
    getTotal: config => {
        const {name, page, limit = 10} = JSON.parse(config.body)

        console.log('name:' + name, 'page:' + page, '分页大小limit:' + limit)
        //筛选name或者manager匹配的项目
        const mockList = totalList.filter(item => {
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

    deleteTotal: config => {
        const {stanId} = JSON.parse(config.body)
        totalList = totalList.filter(u => u.id !== stanId)
        for (let i = 0; i < totalList.length; i++) {
            totalList[i].id = i
        }
        return {
            code: 20000,
            message: '删除成功'
        }
    },

    getHomeList: config => {
        const {name, page, limit = 10} = JSON.parse(config.body)

        console.log('name:' + name, 'page:' + page, '分页大小limit:' + limit)
        //筛选name或者manager匹配的项目
        const mockList = subList.filter(item => {
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

    getCard: config => {
        const {name, pageName} = JSON.parse(config.body)
        console.log('name:' + name, 'page:' + pageName)
        let mockList = []
        //筛选name或者manager匹配的项目
        if (pageName === 'join') {
            mockList = cardListJoin.filter(item => {
                if (name && item.name.indexOf(name) === -1) return false
                return true
            })
        } else if (pageName === 'manage') {
            mockList = cardListMng.filter(item => {
                if (name && item.name.indexOf(name) === -1) return false
                return true
            })
        }
        else if (pageName === 'total') {
            updateTotal()
            mockList = totalList.filter(item => {
                if (name && item.name.indexOf(name) === -1) return false
                return true
            })
        }
        else if (pageName === 'home') {
            updateTotal()
            mockList = totalList.filter(item => {
                if (name && item.name.indexOf(name) === -1) return false
                return true
            })
        }
        return {
            code: 20000,
            //总数据长度
            count: mockList.length,
            //当前页内数据
            list: mockList
        }
    },

    getStanInfo: config => {
        const {stanId, pageName} = JSON.parse(config.body)
        console.log('standardId:' + stanId + '  pageName:' + pageName)
        let mockList = []
        if (pageName === 'join') {
            mockList = cardListJoin.filter(item => {
                if (item.id !== stanId) return false
                return true
            })
        } else if (pageName === 'manage') {
            mockList = cardListMng.filter(item => {
                if (item.id !== stanId) return false
                return true
            })
        }else if (pageName === 'home') {
            console.log('+++++++++++++++++++:')
            mockList = subList.filter(item => {
                if (item.id !== stanId) return false
                return true
            })
        }
        //对分页数据的处理
        return {
            code: 20000,
            //当前页内数据
            list: mockList,
            stanItem: mockList[0].table[0].item
        }
    },

    getStanItem: config => {
        const {stanId, tableId, pageName} = JSON.parse(config.body)
        console.log('stanId:' + stanId + 'tableId:' + tableId + 'pageName' + pageName)
        let mockList = []
        let mockItem = []
        if (pageName === 'join') {
            mockList = cardListJoin.filter(item => {
                if (item.id !== stanId) return false
                return true
            })
            console.log('mockList:' + mockList[0].name)
            let mockTable = mockList[0].table
            mockItem = mockTable.filter(item => {
                if (item.id !== tableId) return false
                return true
            })
        } else if (pageName === 'manage') {
            mockList = cardListMng.filter(item => {
                if (item.id !== stanId) return false
                return true
            })
            console.log('mockList:' + mockList[0].name)
            let mockTable = mockList[0].table
            mockItem = mockTable.filter(item => {
                if (item.id !== tableId) return false
                return true
            })
        }else if (pageName === 'manage') {
            mockList = subList.filter(item => {
                if (item.id !== stanId) return false
                return true
            })
            console.log('mockList:' + mockList[0].name)
            let mockTable = mockList[0].table
            mockItem = mockTable.filter(item => {
                if (item.id !== tableId) return false
                return true
            })
        }
        return {
            code: 20000,
            //当前页内数据
            stanItem: mockItem[0].item,
        }
    },

    /**
     * 添加数据标准
     * @param id
     * @return {*}
     */
    addStan: config => {
        const {pageName, name, ename, manager, editors, creDay, level, description} = JSON.parse(config.body)
        console.log('5555555:' + pageName)
        if (pageName === 'join') {
            cardListJoin.push({
                id: cardListJoin.length,
                name: name,
                ename: ename,
                manager: manager,
                editors: editors,
                creDay: creDay,
                level: level,
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
        } else if (pageName === 'manage') {
            cardListMng.push({
                id: cardListMng.length,
                name: name,
                ename: ename,
                manager: manager,
                editors: editors,
                creDay: creDay,
                level: level,
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
        }
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
        const {stanId, pageName, name, ename, manager, editors, creDay, level, description} = JSON.parse(config.body)
        console.log('5555555:' + pageName)
        if (pageName === 'join') {
            cardListJoin.some(u => {
                if (u.id === stanId) {
                    u.name = name
                    u.ename = ename
                    u.manager = manager
                    u.editors = editors
                    u.creDay = creDay
                    u.level = level
                    u.description = description
                }
            })
        } else if (pageName === 'manage') {
            cardListMng.some(u => {
                if (u.id === stanId) {
                    u.name = name
                    u.ename = ename
                    u.manager = manager
                    u.editors = editors
                    u.creDay = creDay
                    u.level = level
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
     * 删除表
     * @param id
     * @return {*}
     */
    deleteTable: config => {
        const {stanId, tableId, pageName} = JSON.parse(config.body)
        console.log('5555555:' + pageName)
        if (pageName === 'join') {
            cardListJoin[stanId].table = cardListJoin[stanId].table.filter(u => u.id !== tableId)
            for (let i = 0; i < cardListJoin[stanId].table.length; i++) {
                cardListJoin[stanId].table[i].id = i
            }
        } else if (pageName === 'manage') {
            cardListMng[stanId].table = cardListMng[stanId].table.filter(u => u.id !== tableId)
            for (let i = 0; i < cardListMng[stanId].table.length; i++) {
                cardListMng[stanId].table[i].id = i
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
        const {stanId, pageName} = JSON.parse(config.body)
        if (pageName === 'join') {
            cardListJoin = cardListJoin.filter(u => u.id !== stanId)
            for (let i = 0; i < cardListJoin.length; i++) {
                cardListJoin.id = i
            }
        } else if (pageName === 'manage') {
            cardListMng = cardListMng.filter(u => u.id !== stanId)
            for (let i = 0; i < cardListMng.length; i++) {
                cardListMng.id = i
            }
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
        if (pageName === 'join') {
            cardListJoin[stanId].table.push({
                id: cardListJoin[stanId].table.length,
                name: name,
                ename: ename,
                editors: editors,
                creDay: creDay,
                description: description,
                item: []
            })
        } else if (pageName === 'manage') {
            cardListMng[stanId].table.push({
                id: cardListMng[stanId].table.length,
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
        if (pageName === 'join') {
            cardListJoin[stanId].table.some(u => {
                if (u.id === tableId) {
                    u.name = name
                    u.ename = ename
                    u.editors = editors
                    u.creDay = creDay
                    u.description = description
                }
            })
        } else if (pageName === 'manage') {
            cardListMng[stanId].table.some(u => {
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
        if (!itemId) {
            return {
                code: -999,
                message: '参数不正确'
            }
        } else {
            console.log('5555555:' + pageName)
            if (pageName === 'join') {
                for (let i = 0; i < itemId.length; i++) {
                    cardListJoin[stanId].table[tableId].item = cardListJoin[stanId].table[tableId].item.filter(u => u.id !== itemId[i])
                }
                for (let i = 0; i < cardListJoin[stanId].table[tableId].item.length; i++) {
                    cardListJoin[stanId].table[tableId].item[i].id = i
                }
            } else if (pageName === 'manage') {
                for (let i = 0; i < itemId.length; i++) {
                    cardListMng[stanId].table[tableId].item = cardListMng[stanId].table[tableId].item.filter(u => u.id !== itemId[i])
                }
                for (let i = 0; i < cardListMng[stanId].table[tableId].item.length; i++) {
                    cardListMng[stanId].table[tableId].item[i].id = i
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
        if (pageName === 'join') {
            cardListJoin[stanId].table[tableId].item.some(u => {
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
        } else if (pageName === 'manage') {
            cardListMng[stanId].table[tableId].item.some(u => {
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
        if (pageName === 'join') {
            cardListJoin[stanId].table[tableId].item.push({
                id: cardListJoin[stanId].table[tableId].item.length,
                name: name,
                code: code,
                type: type,
                length: length,
                decimal: decimal,
                constraint: constraint,
                remarks: remarks
            })
        } else if (pageName === 'manage') {
            cardListMng[stanId].table[tableId].item.push({
                id: cardListMng[stanId].table[tableId].item.length,
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

}