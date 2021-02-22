import EmptyLayout from '@/layout/empty'

export default  {
    path: '/permission',
    component: EmptyLayout,
    meta: {
        title: '权限配置'
    },
    children: [
        {
            path: '',
            name: 'UpmsPermission',
            component: () => import('@/views/umps/permission/upms_permission'),
            meta: {
                sidebar: false,
                breadcrumb: false
            }
        },
        {
            path: 'add',
            name: 'UpmsPermissionAdd',
            component: () => import('@/views/umps/permission/upms_permission_details'),
            meta: {
                sidebar: false,
                breadcrumb: false
            }
        },
        {
            path: 'detail/:id',
            name: 'UpmsPermissionDetails',
            component: () => import('@/views/umps/permission/upms_permission_details'),
            meta: {
                sidebar: false,
                breadcrumb: false
            }
        }
    ]
}
