//mock模拟首页的相关数据
import Mock from 'mockjs'

let totalList = []
const count = 25

for (let i = 1; i <= count; i++) {
    totalList.push(
        Mock.mock({
            id:i,
            name: '数据标准' + i,
            subDay: Mock.Random.date(),
            manager: Mock.Random.cname()
        })
    )
}

export default {
    getTotalList: config => {
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
                    id:1,
                    ename: 'total',
                    name: '总体',
                },
                {
                    id:2,
                    ename:'common',
                    name: '通用',
                    children: [
                        {
                            id:2.1,
                            ename: 'base',
                            name: '基础',
                        },
                        {
                            id:2.2,
                            ename: 'safe',
                            name: '安全',
                        },
                        {
                            id:2.3,
                            ename: 'green',
                            name: '绿色',
                        },
                        {
                            id:2.4,
                            ename: 'smart',
                            name: '智慧',
                        }
                    ]
                },
                {
                    id:3,
                    ename:'build',
                    name: '建设',
                    children: [
                        {
                            id:3.1,
                            ename: 'base',
                            name: '基础',
                        },
                        {
                            id:3.2,
                            ename: 'safe',
                            name: '安全',
                        },
                        {
                            id:3.3,
                            ename: 'green',
                            name: '绿色',
                        },
                        {
                            id:3.4,
                            ename: 'smart',
                            name: '智慧',
                        }
                    ]
                },
            ],
        }
    }
}