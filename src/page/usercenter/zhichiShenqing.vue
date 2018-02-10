<template>
    <div v-loading="loading" element-loading-text="拼命加载中">
        <el-row class="bord-btm ">
            <el-col :md="24" class="font-170 text-dark text-bold padding-top-10 padding-bottom-10">
                支持申请
            </el-col>
        </el-row>
        <el-row style="background-color:#fff;min-height:500px" class="margin-top-30">

        </el-row>
    </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      loading: false
    };
  }
};
</script>