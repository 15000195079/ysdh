<template>
    <div class="warp margin-top-40">
        <el-row :gutter="40">
            <el-col :xs="24" :sm="17" :md="17" :lg="17" :xl="17">
                <h1 class="dhp-h1 no-margin-top margin-bottom-20">搜索详情</h1>
                <news>列表页</news>
            </el-col>
            <el-col :xs="24" :sm="7" :md="7" :lg="7" :xl="7">
                <div class="dhp-right">
                    <div class="margin-bottom-20">
                        <el-input placeholder="请输入搜索内容" v-model="keys" size="medium" @change="KeysChange" class="input-with-select" clearable>
                            <el-button slot="append" icon="el-icon-search"></el-button>
                        </el-input>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import news from "@/page/news/new";
import Guanggao from "@/page/index/guanggao";
export default {
  activated: function() {
    if (this.$route.params.keys) {
      this.keys = this.$route.params.keys;
    }
  },
  data() {
    return {
      keys: this.$route.params.keys
    };
  },
  deactivated: function() {
    this.keys = "";
  },
  methods: {
    //搜索
    KeysChange(val) {
      this.keys = val.replace(/[\'\"]/g, "").trim();
      this.$router.push({
        name: "news-search",
        params: {
          keys: this.keys
        }
      });
    }
  },
  components: {
    Guanggao,
    news
  }
};
</script>