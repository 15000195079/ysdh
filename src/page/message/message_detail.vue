<template>
    <div class="padding-left-20" style="background-color: #fff;padding: 15px;min-height:500px" v-loading="loading" element-loading-text="拼命加载中">
        <el-row>
            <el-col>
                <h3 style="display:inline-block">{{tableData.title}}</h3>
                <!-- 返回上一页组件 -->
                <goBack class="pull-right" style="marginTop:20px;"></goBack>

            </el-col>
            <el-col class="margin-bottom-20">
                <span style="color:#000">{{tableData.update_time}}</span>
                <span class="pull-right" style="width:30%;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;display:inline-block;" v-if="tableData.annex">
                  <span style="color:#000;">附件查看：</span><a :href="tableData.annex_url" target="_blank">{{tableData.annex}}</a>
                </span>
            </el-col>
        </el-row>
        <div v-html="tableData.content"></div>
    </div>
</template>
<script>
import { mapState } from "vuex";
import goBack from "@/components/goBack";
export default {
  activated: function() {
    if (this.$route.params.id) {
      this.getData();
    }
  },
  data() {
    return {
      tableData: [],
      loading: false
    };
  },
  methods: {
    getData() {
      this.loading = true;
      this.axios({
        method: "post",
        url: this.API_ROOT + "/home_api/notice/read",
        data: {
          id: this.$route.params.id
        },
        headers: this.$store.getters.Request_Head
      }).then(
        response => {
          this.loading = false;
          if (this.getToken(response.data)) {
            this.tableData = response.data.data;
            this.isread();
          }
        },
        error => {
          this.loading = false;
          this.$emit("API-ERR");
        }
      );
    },
    isread() {
      let arr = this.click_noticeid;
      let clicknoticeid_data = [];
      if (this.click_noticeid[this.uinfo.id]) {
        clicknoticeid_data = this.click_noticeid[this.uinfo.id];
      }
      if (clicknoticeid_data.indexOf(this.$route.params.id) == -1) {
        clicknoticeid_data.push(this.$route.params.id);
        arr[this.uinfo.id] = clicknoticeid_data;
        this.$store.commit("setclick_noticeid", arr);
        this.$emit("read", 1);
      }
    }
  },
  //计算属性
  computed: mapState({
    uinfo: state => state.uinfo,
    click_noticeid: state => state.click_noticeid
  }),
  components: {
    goBack
  }
};
</script>

