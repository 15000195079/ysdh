<template>
    <button class="btn btn-danger" @click="goBack">
        <i class="el-icon-d-arrow-left"></i> 返回
    </button>
</template>
<script>
export default {
    methods: {
        goBack() {
            this.$router.go(-1)
        }
    }
}
</script>
