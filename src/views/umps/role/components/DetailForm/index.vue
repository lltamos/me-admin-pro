<template>
    <div v-loading="loading">
        <el-form ref="form" :model="form" :rules="rules" label-width="120px" label-suffix="：">
            <el-form-item label="权限名称" prop="title">
                <el-input v-model="form.title" placeholder="请输入权限名称" />
            </el-form-item>
            <el-form-item label="所属系统">
                <el-select v-model="pidValue"
                           style="width: 240px;" placeholder="请选择"
                >
                    <el-option
                        v-for="item in cities"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    >
                        <span style="float: left;">{{ item.id }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px;">{{
                            item.label
                        }}</span>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="所属上级">
                <el-select v-model="pidValue" style="width: 240px;" placeholder="请选择">
                    <el-option
                        v-for="item in cities"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    >
                        <span style="float: left;">{{ item.id }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px;">{{
                            item.label
                        }}</span>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="域及描述" prop="desc">
                <el-input v-model="form.title" type="textarea" placeholder="请输入权限作用域及描述" />
            </el-form-item>
            <el-form-item label="权限类型">
                <el-radio-group v-model="form.type">
                    <el-radio :label="1">目录</el-radio>
                    <el-radio :label="2">菜单</el-radio>
                    <el-radio :label="3">按钮</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="权限路径">
                <el-input v-model="form.title" placeholder="请输入权限路径如：/manage/system/index" />
            </el-form-item>
            <el-form-item label="权限值">
                <el-input v-model="form.title" placeholder="请输入权限值如：upms:system:read" />
            </el-form-item>
            <el-form-item label="权限图标">
                <el-input v-model="form.title" placeholder="请输入权限图标如：el-icon-s-tools" />
            </el-form-item>
            <el-form-item label="排序">
                <el-input v-model="form.title" onkeyup="value=value.replace(/[^\d]/g,0)"
                          placeholder="排序值"
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
</template>

<script>
export default {
    props: {
        id: {
            type: [Number, String],
            default: ''
        }
    },
    data() {
        return {
            // 列表数据
            dataList: [],
            loading: false,
            form: {
                id: this.id,
                title: '',
                status: true,
                type: ''
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
    mounted() {
        if (this.form.id != '') {
            this.getInfo()
        }
    },
    methods: {
        getInfo() {
            this.loading = true
            this.$api.get('mock/umps/role/detail', {
                params: {
                    id: this.form.id
                }
            }).then(res => {
                this.loading = false
                this.form.title = res.data.title
            })
        },
        submit(callback) {
            if (this.form.id == '') {
                this.$refs['form'].validate(valid => {
                    if (valid) {
                        this.$api.post('mock/umps/role/create', this.form).then(() => {
                            this.$message.success({
                                message: '模拟新增成功',
                                center: true
                            })
                            callback && callback()
                        })
                    }
                })
            } else {
                this.$refs['form'].validate(valid => {
                    if (valid) {
                        this.$api.post('mock/umps/role/edit', this.form).then(() => {
                            this.$message.success({
                                message: '模拟编辑成功',
                                center: true
                            })
                            callback && callback()
                        })
                    }
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
// scss
</style>
