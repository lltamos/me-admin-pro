const Mock = require('mockjs')
const Random = Mock.Random

const AllList = []
for (let i = 0; i < 20; i++) {
    let p_index = Random.natural(0, 100)
    let p_ctime = Random.datetime()
    let p_city = Random.city()

    AllList.push(Mock.mock({
        id: '@id',
        pid: p_index,
        oName: p_city,
        oDesc: '@ctitle(5, 10)',
        ctime: p_ctime,
        status: '@boolean'
    }))
}

module.exports = [
    {
        url: '/mock/upms/organization',
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
