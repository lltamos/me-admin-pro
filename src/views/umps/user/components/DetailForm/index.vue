<template>
    <el-row>
        <el-col :md="24" :lg="12">
            <div v-loading="loading">
                <el-form ref="form" :model="form" :rules="rules" label-width="120px" label-suffix="：">
                    <el-form-item label="编号" prop="id">
                        <el-input v-model="form.id" placeholder="系统自动填入编号" disabled/>
                    </el-form-item>

                    <el-form-item label="电话号码" prop="phone">
                        <el-input v-model="form.phone" maxlength="11" placeholder="请输入电话号码"/>
                    </el-form-item>
                    <el-form-item label="电子邮箱" prop="email">
                        <el-input v-model="form.email" placeholder="请输入电子邮箱"/>
                    </el-form-item>
                    <el-form-item label="用户昵称" prop="nickname">
                        <el-input v-model="form.nickname" placeholder="请输入用户昵称"/>
                    </el-form-item>
                    <el-form-item label="真实姓名" prop="realname">
                        <el-input v-model="form.realname" placeholder="请输入真实姓名"/>
                    </el-form-item>
                    <el-form-item label="用户头像">
                        <ImageUpload
                            action="http://scrm.1daas.com/api/upload/upload"
                            :placeholder="form.avatar"
                            :url="form.avatar"
                        />
                    </el-form-item>
                    <el-form-item label="是否启用" prop="locked">
                        <el-radio-group v-model="form.locked" size="small">
                            <el-radio-button :label="1">启用</el-radio-button>
                            <el-radio-button :label="2">停用</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
            </div>
        </el-col>
    </el-row>
</template>

<script>
import tools from '@/util/tool'

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
                phone: '',
                email: '',
                password: '',
                realname: '',
                nickname: '',
                avatar: '',
                locked: 1
            },
            rules: {
                phone: [
                    {required: true, message: '请输入电话号码', trigger: 'blur'}
                ],
                email: [
                    {required: true, message: '请输入邮箱地址', trigger: 'blur'}
                ],
                nickname: [
                    {required: true, message: '请输入用户昵称', trigger: 'blur'}
                ]
            }
        }
    },
    mounted() {
        if (tools.assetNotNull(this.id)) {
            this.getInfo()
        }
    },

    methods: {
        getInfo() {
            this.loading = true
            this.$api.get('/upms/user/get', {
                params: {
                    id: this.id
                }
            }).then(res => {
                this.loading = false
                this.form.id = res.data.id
                this.form.phone = res.data.phone
                this.form.email = res.data.email
                this.form.password = res.data.password
                this.form.realname = res.data.realname
                this.form.nickname = res.data.nickname
                this.form.avatar = res.data.avatar
                this.form.locked = tools.swapStatusInt(res.data.locked)
            })
        },
        submit(callback) {
            this.$refs['form'].validate(valid => {
                if (valid) {
                    this.$api.post('/upms/user/edit', this.form).then(() => {
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
</script>

<style lang="scss" scoped>
// scss
</style>
