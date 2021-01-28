import EmptyLayout from '@/layout/empty'

export default {
    path: 'role',
    redirect: 'role/list',
    component: EmptyLayout,
    meta: {
        title: '角色配置'
    },
    children: [
        {
            path: 'list',
            name: 'UpmsRoleList',
            component: () => import('@/views/umps/role/list'),
            meta: {
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/upms/role'

            }
        },
        {
            path: 'detail',
            name: 'testDetail',
            component: () => import('@/views/umps/role/detail'),
            meta: {
                sidebar: false,
                breadcrumb: false
            }
        }
    ]
}
