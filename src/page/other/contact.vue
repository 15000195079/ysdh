
<template>
    <div class="lianxiwomen">
        <div class="lianxi-banner" v-if="formData">
            <img :src="formData&&formData[0]&&formData[0].imgx" :onerror="logo" alt="">
        </div>
        <div class="warp">
            <div class="lianxi-title font-30 margin-top-30">
                {{tableData.title}}
            </div>
            <el-row :gutter="0">
                <el-col :xs="24" :sm="12">
                    <div class="lianxi-txt padding-right-90">
                        <div v-html="tableData.content"></div>
                    </div>
                </el-col>
                <el-col :xs="24" :sm="12">
                    <div class="lianxi-map margin-bottom-10">
                        <!-- 百度地图 -->
                        <Mapinfo></Mapinfo>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
// 引入百度地图
import Mapinfo from "@/components/map.vue";

export default {
  activated: function() {
    this.getData();
    this.getAdvert();
  },
  data() {
    return {
      tableData: "",
      formData: [],
      logo: 'this.src="' + require("../../assets/img/defalt.jpg") + '"'
    };
  },
  methods: {
    getData() {
      //请求数据
      this.loading = true;
      this.axios({
        method: "post",
        url: this.API_ROOT + "/home_api/Instruct/read",
        data: {
          id: 1
        },
        headers: this.$store.getters.Request_Head
      }).then(
        response => {
          if (this.getToken(response.data)) {
            this.tableData = response.data.data;
          }
          this.loading = false;
        },
        error => {
          this.loading = false;
          this.$emit("API-ERR");
        }
      );
    },
    //获取广告背景图
    getAdvert() {
      this.axios({
        method: "post",
        url: this.API_ROOT + "/home_api/guanggao",
        data: {
          type: 12,
          listRows: 1
        }
      }).then(
        response => {
          if (this.getToken(response.data)) {
            this.formData = response.data.data;
          }
        },
        error => {
          this.$emit("API-ERR");
        }
      );
    }
  },
  components: {
    Mapinfo
  }
};
</script>

