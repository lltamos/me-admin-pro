import EmptyLayout from '@/layout/empty'

export default {
    path: 'organization',
    redirect: 'organization/list',
    component: EmptyLayout,
    meta: {
        title: '机构配置'

    },
    children: [
        {
            path: 'list',
            name: 'upmsOrganization',
            component: () => import('@/views/umps/organization/upms_organization'),
            meta: {
                title: '机构列表',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/upms/organization'
            }
        },
        {
            path: 'add',
            name: 'upmsOrganizationAdd',
            component: () => import('@/views/umps/organization/upms_organization_details'),
            meta: {
                title: '新增机构',
                sidebar: false,
                breadcrumb: false

            }
        },
        {
            path: 'detail/:id',
            name: 'UpmsOrganizationDetails',
            component: () => import('@/views/umps/organization/upms_organization_details'),
            meta: {
                title: '修改机构',
                sidebar: false,
                breadcrumb: false
            }
        }
    ]
}
