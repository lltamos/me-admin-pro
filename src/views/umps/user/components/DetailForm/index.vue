<template>
    <el-row>
        <el-col>
            <div v-loading="loading">
                <el-form ref="form" :model="form" :rules="rules" label-width="120px" label-suffix="：">
                    <el-form-item label="权限名称" prop="title">
                        <el-input v-model="form.title" placeholder="请输入权限名称" />
                    </el-form-item>
                    <el-form-item label="域及描述" prop="desc">
                        <el-input v-model="form.title" type="textarea" placeholder="请输入权限作用域及描述" />
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
        </el-col>
    </el-row>
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
            loading: false,
            form: {
                id: this.id,
                title: ''
            },
            rules: {
                title: [
                    {required: true, message: '请输入标题', trigger: 'blur'}
                ]
            }
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
            this.$api.get('mock/umps/user/detail', {
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
                        this.$api.post('mock/umps/user/create', this.form).then(() => {
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
                        this.$api.post('mock/umps/user/edit', this.form).then(() => {
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
