<template>
  <div class="warp">
      <div class="lianxi-title font-30 margin-top-30">
        {{tableData.title}}
      </div>
      <el-row :gutter="0">
        <el-col :xs="24" :sm="24">
          <div class="lianxi-txt">
            <div v-html="tableData.content"></div>
          </div>
        </el-col>
      </el-row>
  </div>
</template>

<script>
// 引入百度地图
import Mapinfo from "@/components/map.vue";
var flag = false;
export default {
  activated: function() {
    this.getData();
  },
  deactivated: function() {
    flag = false;
  },
  data() {
    return {
      tableData: ""
    };
  },
  watch: {
    "$route.params.id": function(newValue, oldValue) {
      if (newValue == oldValue || !flag) return;
      this.getData();
    }
  },
  methods: {
    getData() {
      //请求数据
      this.loading = true;
      this.axios({
        method: "post",
        url: this.API_ROOT + "/home_api/Instruct/read",
        data: {
          id: this.$route.params.id
        },
        headers: this.$store.getters.Request_Head
      }).then(
        response => {
          flag = true;
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
    }
  },
  components: {
    Mapinfo
  }
};
</script>

