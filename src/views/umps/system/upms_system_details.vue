<template>
    <div>
        <page-header :title="pageTitle">
            <el-button icon="el-icon-arrow-left" size="mini" round @click="$router.go(-1)">返回</el-button>
        </page-header>
        <page-main>
            <el-card>
                <el-row>
                    <el-col :md="24" :lg="12">
                        <div v-loading="loading">
                            <el-form ref="form" :model="form" :rules="rules" label-width="120px" label-suffix="：">
                                <el-form-item label="系统名称" prop="title">
                                    <el-input v-model="form.title" placeholder="请输入系统名称" />
                                </el-form-item>
                                <el-form-item label="系统描述" prop="desc">
                                    <el-input v-model="form.title" placeholder="请输入系统描述信息" />
                                </el-form-item>
                                <el-form-item label="系统图标">
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
            </el-card>
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
                value: 'Beijing',
                label: '北京同仁堂有限公司'
            }, {
                value: 'Shanghai',
                label: '上海山姆有限公司'
            }],
            pidValue: '',
            imageUrl: ''
        }
    },

    computed: {
        pageTitle: function() {
            return this.$route.name == 'UpmsSystemDetails' ? '编辑系统' : '新增系统'
        }
    },
    mounted() {
        this.getOrganizationDetails()
    },
    methods: {
        getOrganizationDetails() {
            if (this.$route.name == 'UpmsSystemDetails') {
                this.imageUrl = 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2909012281,3079124615&fm=26&gp=0.jpg'
            }
        }
    }
}
</script>
