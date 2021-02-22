import Layout from '@/layout'

export default {
    path: '/tms',
    component: Layout,
    redirect: '/tms/tiku',
    meta: {
        title: '题库管理',
        icon: 'sidebar-menu'
    },
    children: [
        {
            path: 'tiku',
            name: 'TikuQuestionRepsList',
            component: () => import(/* webpackChunkName: 'breadcrumb_example' */ '@/views/tiku/question_reps/list'),
            meta: {
                title: '试题管理',
                meta: {
                    sidebar: false,
                    breadcrumb: false
                }
            }
        }
    ]
}
