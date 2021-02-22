import EmptyLayout from '@/layout/empty'

export default {
    path: 'system',
    redirect: 'system/list',
    component: EmptyLayout,
    meta: {
        title: '系统配置'
    },
    children: [
        {
            path: 'list',
            name: 'UpmsSystem',
            component: () => import('@/views/umps/system/upms_system'),
            meta: {
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/upms/system'
            }
        },
        {
            path: 'add',
            name: 'UpmsSystemAdd',
            component: () => import('@/views/umps/system/upms_system_details'),
            meta: {
                sidebar: false,
                breadcrumb: false
            }
        },
        {
            path: 'detail/:id',
            name: 'UpmsSystemDetails',
            component: () => import('@/views/umps/system/upms_system_details'),
            meta: {
                sidebar: false,
                breadcrumb: false
            }
        }
    ]
}
