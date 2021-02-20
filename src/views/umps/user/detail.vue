<template>
    <div>
        <page-header :title="$route.name == 'UpmsUserDetail' ? '编辑用户' : '新增用户'">
            <el-button icon="el-icon-arrow-left" size="mini" round @click="$router.go(-1)">返 回</el-button>
        </page-header>
        <page-main>
            <el-card >
                <DetailForm :id="$route.params.id" ref="form" />
            </el-card>
        </page-main>
        <fixed-action-bar>
            <el-button type="primary" @click="onSubmit">提 交</el-button>
            <el-button @click="onCancel">取 消</el-button>
        </fixed-action-bar>
    </div>
</template>

<script>
import DetailForm from './components/DetailForm/index'

export default {
    name: 'UmpsUserDetail',
    components: {
        DetailForm
    },
    data() {
        return {}
    },
    mounted() {
    },
    methods: {
        onSubmit() {
            this.$refs['form'].submit(() => {
                this.$eventBus.$emit('get-data-list')
                this.$router.back()
            })
        },
        onCancel() {
            this.$router.back()
        }
    }
}
</script>

<style lang="scss" scoped>
// scss
</style>
