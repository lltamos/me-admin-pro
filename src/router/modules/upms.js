import Layout from '@/layout'
import EmptyLayout from '@/layout/empty'
import UpmsRole from '@/router/modules/upms.role'
import UpmsOrganization from '@/router/modules/upms.organization'
import UpmsSystem from '@/router/modules/upms.system'
import UpmsPermission from '@/router/modules/upms.permission'

export default {
    path: '/upms',
    component: Layout,
    redirect: '/upms/organization',
    meta: {
        title: '业务配置',
        icon: 'sidebar-menu'
    },
    children: [
        UpmsRole,
        UpmsOrganization,
        UpmsSystem,
        UpmsPermission,

        {
            path: '/account',
            name: 'account',
            component: () => import(/* webpackChunkName: 'multilevel_menu_example' */ '@/views/umps/upms_account'),
            meta: {
                title: '账户配置'
            }
        },
        {
            path: '/level2',
            name: 'multilevelMenuExample0',
            component: EmptyLayout,
            redirect: '/multilevel_menu_example/level2/page',
            meta: {
                title: '...'
            },
            children: [
                {
                    path: '/page',
                    name: 'multilevelMenuExample2-1',
                    component: () => import(/* webpackChunkName: 'multilevel_menu_example' */ '@/views/multilevel_menu_example/level2/page'),
                    meta: {
                        title: '导航2-1'
                    }
                },
                {
                    path: '/level3',
                    name: 'multilevelMenuExample2-2',
                    component: EmptyLayout,
                    redirect: '/multilevel_menu_example/level2/level3/page1',
                    meta: {
                        title: '导航2-2'
                    },
                    children: [
                        {
                            path: '/page1',
                            name: 'multilevelMenuExample2-2-1',
                            component: () => import(/* webpackChunkName: 'multilevel_menu_example' */ '@/views/multilevel_menu_example/level2/level3/page1'),
                            meta: {
                                title: '导航2-2-1'
                            }
                        },
                        {
                            path: '/page2',
                            name: 'multilevelMenuExample2-2-2',
                            component: () => import(/* webpackChunkName: 'multilevel_menu_example' */ '@/views/multilevel_menu_example/level2/level3/page2'),
                            meta: {
                                title: '导航2-2-2'
                            }
                        }
                    ]
                }
            ]
        }
    ]
}
