<template>
    <div>
        <page-header title="管理员管理" />
        <page-main>
            <el-card style="margin-bottom: 12px;">
                <search-bar>
                    <el-form :model="search" size="small" label-width="100px" label-suffix="：">
                        <el-row>
                            <el-col :span="8">
                                <el-form-item size="small" label="组织编号">
                                    <el-input v-model="search.account" placeholder="请输入组织编号" clearable
                                              @keydown.enter.native="getDataList" @clear="getDataList"
                                    />
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item size="small" label="组织名称">
                                    <el-input v-model="search.name" placeholder="请输入组织姓名，支持模糊查询" clearable
                                              @keydown.enter.native="getDataList" @clear="getDataList"
                                    />
                                </el-form-item>
                            </el-col>
                            <el-col :span="2">
                                <el-form-item>
                                    <el-button type="primary" size="small" icon="el-icon-search" @click="getDataList">
                                        筛 选
                                    </el-button>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2">
                                <el-form-item>
                                    <router-link to="organization/add">
                                        <el-button size="small" type="primary" icon="el-icon-plus">新增机构</el-button>
                                    </router-link>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </search-bar>
            </el-card>
            <el-card>
                <el-table ref="table" v-loading="loading" size="small" class="list-table" :data="dataList" border
                          highlight-current-row max-height="520" empty-text="暂无数据"
                          @selection-change="batch.selectionDataList = $event"
                >
                    <el-table-column v-if="batch.enable" type="selection" width="40" />
                    <el-table-column prop="id" label="编号" width="100" align="center" />
                    <el-table-column prop="pid" label="所属上级" width="150" align="center" />
                    <el-table-column prop="oName" label="组织名称" align="center" />
                    <el-table-column prop="oDesc" label="组织描述" align="center" />
                    <el-table-column prop="ctime" label="创建时间" width="180" align="center" />
                    <el-table-column label="状态" width="85" align="center">
                        <template slot-scope="scope">
                            <el-switch v-model="scope.row.status" size="small"
                                       @change="onChangeStatus($event, scope.row)"
                            />
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-popover
                                placement="right"
                                trigger="click"
                            >
                                <p><b>编号：</b><span style="color: red;">{{ scope.row.id }}</span> </p>
                                <p><b>所属上级：</b><span style="color: red;">{{ scope.row.pid }}</span> </p>
                                <p><b>组织名称：</b><span style="color: red;">{{ scope.row.oName }}</span> </p>
                                <p><b>组织描述：</b><span style="color: red;">{{ scope.row.oDesc }}</span> </p>
                                <p><b>组织描述：</b><span style="color: red;">{{ scope.row.ctime }}</span> </p>
                                <el-button slot="reference" type="info" size="small" icon="el-icon-view" circle />
                            </el-popover>
                            <el-dropdown style="margin-left: 12px;" @command="handleMoreOperating($event, scope.row)">
                                <el-button type="primary" size="small" icon="el-icon-more" circle />
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item command="edit">编辑</el-dropdown-item>
                                    <el-dropdown-item command="delete" divided @click="onDelete(scope.row)">
                                        删除
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
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
    beforeRouteLeave(to, from, next) {
        if (!this.$store.state.settings.enableTabbar && !this.dialogMode) {
            // 因为并不是所有的路由跳转都需要将当前页面进行缓存，例如最常见的情况，从列表页进入详情页，则需要将列表页缓存，而从列表页跳转到其它页面，则不需要将列表页缓存
            // 所以下面的代码意思就是，如果目标路由的 name 不在指定的数组内，则将当前页面的 name 从 keep-alive 中删除
            if (!['UpmsOrganizationDetails'].includes(to.name)) {
                // 注意：上面校验的是路由的 name ，下面记录的是当前页面的 name
                this.$store.commit('keepAlive/remove', 'UpmsOrganization')
            }
        }
        next()
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
        getDataList() {
            this.loading = true
            this.$api.get('/upms/organization').then(res => {
                this.loading = false
                this.dataList = res.data.list
            }).catch(() => {
                this.loading = false
            })
        },
        onChangeStatus(val, row) {
            this.$confirm(`确认${val ? '启用' : '停用'}「${row.oName}」吗？`, '确认信息').then(() => {
                alert('ok')
            }).catch(() => {
            })
        },
        handleMoreOperating(command, row) {
            switch (command) {
                case 'edit':
                    this.$message('修改' + JSON.stringify(row))
                    break
                case 'delete':
                    this.$message('删除' + JSON.stringify(row))
                    break
            }
        }
    }
}
</script>
