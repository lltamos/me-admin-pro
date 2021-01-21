import Layout from '@/layout'
import EmptyLayout from '@/layout/empty'

export default {
    path: '/upms',
    component: Layout,
    redirect: '/upms/organization',
    name: 'multilevelMenuExample',
    meta: {
        title: '业务配置',
        icon: 'sidebar-menu'
    },
    children: [
        {
            path: '/organization',
            name: 'upmsOrganization',
            component: () => import(/* webpackChunkName: 'multilevel_menu_example' */ '@/views/umps_pages/upms_organization'),
            meta: {
                title: '机构配置'
            }
        },
        {
            path: '/system',
            name: 'opmsSystem',
            component: () => import(/* webpackChunkName: 'multilevel_menu_example' */ '@/views/umps_pages/upms_system'),
            meta: {
                title: '系统配置'
            }
        },
        {
            path: '/roles',
            name: 'roles',
            component: () => import(/* webpackChunkName: 'multilevel_menu_example' */ '@/views/umps_pages/upms_roles'),
            meta: {
                title: '角色配置'
            }
        },
        {
            path: '/permission',
            name: 'permission',
            component: () => import(/* webpackChunkName: 'multilevel_menu_example' */ '@/views/umps_pages/upms_permission'),
            meta: {
                title: '权限配置'
            }
        },
        {
            path: '/account',
            name: 'account',
            component: () => import(/* webpackChunkName: 'multilevel_menu_example' */ '@/views/umps_pages/upms_account'),
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
