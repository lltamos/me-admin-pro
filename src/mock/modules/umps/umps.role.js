const Mock = require('mockjs')
const Random = Mock.Random

const AllList = []
for (let i = 0; i < 50; i++) {
    let p_index = Random.natural(10000000000, 90000000000)
    let p_desc = Random.cparagraph(0, 10)
    if (i == 1 || i == 3) {
        AllList.push(Mock.mock({
            id: Random.natural(0, 1000),
            pid: p_index,
            oName: Random.ctitle(5, 10),
            oDesc: Random.cword(12, 20),
            ctime: Random.datetime(),
            status: Random.boolean(),
            children: [{
                id: Random.natural(1000, 2000),
                pid: p_index,
                ctime: Random.datetime(),
                oName: Random.ctitle(5, 10),
                oDesc: '上海市普陀区金沙江路 1519 弄',
                status: Random.boolean()
            }, {
                id: Random.natural(1000, 2000),
                pid: p_index,
                ctime: Random.datetime(),
                oName: Random.ctitle(5, 10),
                status: Random.boolean(),
                oDesc: '上海市普陀区金沙江路 1519 弄'
            }]
        }))
        continue
    }

    AllList.push(Mock.mock({
        id: Random.natural(0, 1000),
        pid: p_index,
        oName: Random.ctitle(5, 10),
        oDesc: Random.cword(12, 20),
        ctime: Random.datetime(),
        status: Random.boolean(),
        detail: p_desc
    }))
}

module.exports = [
    {
        url: 'umps/role/list',
        type: 'get',
        result: option => {
            let {title, from, limit} = option.query
            from = ~~from
            limit = ~~limit
            let list = AllList.filter(item => {
                return title ? item.title.includes(title) : true
            })
            let pageList = list.filter((item, index) => {
                return index >= from && index < (from + limit)
            })
            return {
                error: '',
                state: 1,
                data: {
                    list: pageList,
                    total: list.length
                }
            }
        }
    },
    {
        url: 'umps/role/detail',
        type: 'get',
        result: option => {
            let info = AllList.filter(item => item.id == option.query.id)
            return {
                error: '',
                state: 1,
                data: info[0]
            }
        }
    },
    {
        url: 'umps/role/create',
        type: 'post',
        result: {
            error: '',
            state: 1,
            data: {
                isSuccess: true
            }
        }
    },
    {
        url: 'umps/role/edit',
        type: 'post',
        result: {
            error: '',
            state: 1,
            data: {
                isSuccess: true
            }
        }
    },
    {
        url: 'umps/role/delete',
        type: 'post',
        result: {
            error: '',
            state: 1,
            data: {
                isSuccess: true
            }
        }
    }
]
