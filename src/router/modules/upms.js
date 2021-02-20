import Layout from '@/layout'
import UpmsRole from '@/router/modules/upms.role'
import UpmsOrganization from '@/router/modules/upms.organization'
import UpmsSystem from '@/router/modules/upms.system'
import UpmsPermission from '@/router/modules/upms.permission'
import UpmsAccount from '@/router/modules/upms.user'

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
        UpmsAccount
    ]
}
