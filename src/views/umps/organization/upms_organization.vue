<template>
    <div>
        <page-header title="管理员管理" />
        <page-main>
            <router-link :to="{name:'upmsOrganizationAdd'}">
                <el-button size="small" type="primary" style="margin-bottom: 8px;" icon="el-icon-plus">新增机构</el-button>
            </router-link>
            <el-card style="margin-bottom: 8px; max-height: max-content;">
                <search-bar show-more unfold @toggle="searchMore = $event">
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
                        </el-row>
                        <el-form-item>
                            <el-button type="primary" s icon="el-icon-search" @click="getDataList">筛选</el-button>
                            <el-button icon="el-icon-download">导出</el-button>
                            <el-button type="text" size="small">查看已导出记录</el-button>
                        </el-form-item>
                    </el-form>
                </search-bar>
            </el-card>

            <el-card>
                <el-table ref="table" size="small" class="list-table" :data="dataList" border
                          highlight-current-row max-height="520" empty-text="暂无数据" row-key="id"
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
                                    <router-link :to="{name:'UpmsOrganizationDetails' , params:{id:scope.row.id}}" tag="span">
                                        <el-dropdown-item>编辑</el-dropdown-item>
                                    </router-link>
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
            loading: false,
            searchMore: false
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
                case 'delete':
                    this.$message('删除' + JSON.stringify(row))
                    break
            }
        }
    }
}
</script>
