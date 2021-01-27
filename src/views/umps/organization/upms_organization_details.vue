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
                                <el-form-item label="机构名称" prop="title">
                                    <el-input v-model="form.title" placeholder="请输入机构名称" />
                                </el-form-item>
                                <el-form-item label="机构地址" prop="address">
                                    <cascader-area v-model="form.address" />
                                </el-form-item>
                                <el-form-item label="机构描述" prop="desc">
                                    <el-input v-model="form.title" placeholder="请输入机构描述信息" />
                                </el-form-item>
                                <el-form-item label="所属机构">
                                    <el-select v-model="pidValue" style="width: 240px;" placeholder="请选择">
                                        <el-option
                                            v-for="item in cities"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                        >
                                            <span style="float: left;">{{ item.label }}</span>
                                            <span style="float: right; color: #8492a6; font-size: 13px;">{{
                                                item.value
                                            }}</span>
                                        </el-option>
                                    </el-select>
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
            return this.$route.name == 'UpmsOrganizationDetails' ? '编辑机构' : '新增机构'
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
