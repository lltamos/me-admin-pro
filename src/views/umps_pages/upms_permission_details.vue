<template>
    <div>
        <page-header :title="pageTitle">
            <el-button icon="el-icon-arrow-left" size="mini" round @click="$router.go(-1)">返回</el-button>
        </page-header>
        <page-main>
            <el-row>
                <el-col :md="24" :lg="16">
                    <div v-loading="loading">
                        <el-form ref="form" :model="form" size="small" :rules="rules" label-width="120px" label-suffix="：">
                            <el-form-item label="所属系统">
                                <el-select v-model="pidValue" size="small" style="width: 240px;" placeholder="请选择">
                                    <el-option
                                        v-for="item in cities"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                        <span style="float: left;">{{ item.id }}</span>
                                        <span style="float: right; color: #8492a6; font-size: 13px;">{{ item.label }}</span>
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="权限名称" prop="title">
                                <el-input v-model="form.title" placeholder="请输入机构名称" />
                            </el-form-item>
                            <el-form-item label="权限类型">
                                <el-radio-group>
                                    <el-radio :label="1">菜单</el-radio>
                                    <el-radio :label="2">按钮</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="机构描述" prop="desc">
                                <el-input v-model="form.title" placeholder="请输入机构描述信息" />
                            </el-form-item>

                            <el-form-item label="机构图标">
                                <ImageUpload
                                    action="http://scrm.1daas.com/api/upload/upload"
                                    :placeholder="imageUrl"
                                />
                            </el-form-item>
                            <el-form-item label="是否启用">
                                <el-radio-group v-model="form.status">
                                    <el-radio-button :label="true">启用</el-radio-button>
                                    <el-radio-button :label="false">停用</el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-col>
            </el-row>
        </page-main>
    </div>
</template>

<script>
import ImageUpload from '@/components/ImageUpload'
export default {
    name: 'UpmsOrganizationDetails',
    components: {ImageUpload},
    data() {
        return {
            // 列表数据
            dataList: [],
            loading: false,
            form: {
                id: this.id,
                title: '',
                address: [],
                desc: '',
                status: true
            },
            rules: {
                title: [
                    {required: true, message: '请输入名称', trigger: 'blur'}
                ]
            },
            cities: [{
                id: '01',
                label: 'CRM'
            }, {
                id: '02',
                label: 'TMS'
            }],
            pidValue: '无',
            imageUrl: ''
        }
    },

    computed: {
        pageTitle: function() {
            return this.$route.name == 'UpmsOrganizationDetails' ? '编辑权限' : '新增权限'
        }
    },
    mounted() {
        this.getOrganizationDetails()
    },
    methods: {
        getOrganizationDetails() {
            if (this.$route.name == 'UpmsOrganizationDetails') {
                this.imageUrl = 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2909012281,3079124615&fm=26&gp=0.jpg'
            }
        }
    }
}
</script>
<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
