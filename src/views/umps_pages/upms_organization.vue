<template>
    <div>
        <page-header title="管理员管理" />
        <page-main>
            <el-button size="medium" type="primary" icon="el-icon-plus">新增机构</el-button>
            <search-bar>
                <el-form :model="search" size="small" label-width="100px" label-suffix="：">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="帐号">
                                <el-input v-model="search.account" placeholder="请输入帐号，支持模糊查询" clearable
                                          @keydown.enter.native="getDataList" @clear="getDataList"
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="姓名">
                                <el-input v-model="search.name" placeholder="请输入姓名，支持模糊查询" clearable
                                          @keydown.enter.native="getDataList" @clear="getDataList"
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="手机号">
                                <el-input v-model="search.mobile" placeholder="请输入手机号" clearable
                                          @keydown.enter.native="getDataList" @clear="getDataList"
                                />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search" @click="getDataList">筛 选</el-button>
                    </el-form-item>
                </el-form>
            </search-bar>
            <el-table ref="table" v-loading="loading" class="list-table" :data="dataList" border stripe
                      highlight-current-row
                      @selection-change="batch.selectionDataList = $event"
            >
                <el-table-column v-if="batch.enable" type="selection" width="40" />
                <el-table-column prop="account" width="100" label="编号" align="center" />
                <el-table-column prop="name" label="所属上级" width="200" align="center" />
                <el-table-column prop="mobile" label="组织名称" width="250" align="center" />
                <el-table-column prop="mobile" label="组织描述" width="250" align="center" />
                <el-table-column prop="mobile" label="创建时间" width="150" align="center" />
                <el-table-column label="状态" width="100" align="center" />
                <el-table-column label="操作" align="center" />
            </el-table>
        </page-main>
    </div>
</template>

<script>
export default {
    name: 'UpmsOrganization',
    beforeRouteEnter(to, from, next) {
        // 进入页面时，先将当前页面的 name 信息存入 keep-alive 全局状态
        next(vm => {
            if (!vm.$store.state.settings.enableTabbar && !vm.dialogMode) {
                vm.$store.commit('keepAlive/add', 'upmsOrganization')
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
        let dataList = this.getDataList()
        console.log(dataList)
    },
    methods: {
        getDataList() {
            this.loading = true
            let params = {token: '00001'}
            this.search.account && (params.account = this.search.account)
            this.search.name && (params.name = this.search.name)
            this.search.mobile && (params.mobile = this.search.mobile)
            this.$api.get('mock/test', {
                params
            }).then(res => {
                this.loading = false
                this.dataList = res.data[0]
            })
        }

    }
}
</script>
