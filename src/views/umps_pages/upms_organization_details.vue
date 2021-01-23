<template>
    <div>
        <page-header title="添加管理员" />
        <page-main>
            <el-card />
        </page-main>
    </div>
</template>

<script>
export default {
    name: 'UpmsOrganizationDetails',
    beforeRouteEnter(to, from, next) {
        // 进入页面时，先将当前页面的 name 信息存入 keep-alive 全局状态
        next(vm => {
            if (!vm.$store.state.settings.enableTabbar && !vm.dialogMode) {
                vm.$store.commit('keepAlive/add', 'UpmsOrganizationDetails')
            }
        })
    },
    data() {
        return {
            // 是否开启详情弹框模式
            dialogMode: true,
            // 详情弹框
            detailFormDialog: {
                visible: false,
                id: ''
            },
            // 搜索
            search: {
                account: '',
                name: '',
                mobile: ''
            },
            // 批量操作
            batch: {
                enable: true,
                selectionDataList: []
            },
            // 列表数据
            dataList: [],
            loading: false
        }
    },

    mounted() {
        this.getDataList()
    },
    methods: {

    }
}
</script>
