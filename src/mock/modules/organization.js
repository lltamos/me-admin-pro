const Mock = require('mockjs')
const Random = Mock.Random

const AllList = []
for (let i = 0; i < 20; i++) {
    let p_index = Random.natural(10000000000, 90000000000)
    let p_desc = Random.cparagraph(0, 10)

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
        url: 'upms/organization',
        type: 'get',
        result: () => {
            return {
                error: '',
                state: 200,
                data: {
                    list: AllList
                }
            }
        }
    }
]
