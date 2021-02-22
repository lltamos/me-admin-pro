const Mock = require('mockjs')

const AllList = []
for (let i = 0; i < 50; i++) {
    AllList.push(Mock.mock({
        id: '@id',
        title: '@ctitle(10, 20)'
    }))
}

module.exports = [
    {
        url: 'tiku/question_reps/list',
        type: 'get',
        result: option => {
            let { title, from, limit } = option.query
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
        url: 'tiku/question_reps/detail',
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
        url: 'tiku/question_reps/create',
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
        url: 'tiku/question_reps/edit',
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
        url: 'tiku/question_reps/delete',
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
