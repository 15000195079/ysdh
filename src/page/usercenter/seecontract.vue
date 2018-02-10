<template>
    <el-dialog :title="title_name" :visible.sync="dialogStatus" @close="close" width="50%" style="min-height:400px">
        <h4 class="text-danger" align="center" v-if="tableData && tableData.length<1">暂无合同数据！</h4>
        <div v-for="item in tableData" :key="item.id" class="text item padding-top-10" v-else>
          <el-col style="cursor:pointer;">
            <div>
              <span class="pull-left" @click="openContract(item.id)">{{item.title}}</span>
              <span class="pull-right">
                  <a :href="API_ROOT+'/home_api/download/downloads?type='+'3'+'&id='+item.id+'&token='+uinfo.token" target="_blank">下载</a>
                  <el-button type="text" style="margin-left:20px;" @click="xuyue(item.id)" v-if="item.status== '7'">续约</el-button>
              </span>
            </div>
          </el-col>
          <hr style="margin-top:25px">
        </div>
        <el-dialog width="70%" title="" :visible.sync="innerVisible" append-to-body top="10vh">
            <div v-html="contentData" style="padding:60px"></div>
        </el-dialog>
    </el-dialog>
</template>
<script>
import { mapState } from "vuex";
export default {
  props: ["dialogFormVisibles", "sids", "name"],
  data() {
    return {
      dialogStatus: false,
      innerVisible: false,
      tableData: [],
      contentData: "", //合同信息
      title_name: "" //合同列表title
    };
  },
  watch: {
    dialogFormVisibles: function(newValue, oldValue) {
      this.dialogStatus = newValue;
      if(!this.name) {
        this.title_name = "关联动画片已被删除";
      }else {
        this.title_name = "关于" + this.name + "的合同";
      }
      if (newValue) {
        this.getData();
      }
    }
  },
  methods: {
    close() {
      this.$emit("CB-dialogFormVisibles", false);
    },
    getData() {
      this.axios({
        method: "post",
        url: this.API_ROOT + "/home_api/contract/index",
        data: {
          pid: this.sids,
          is_send: 2
        },
        headers: this.$store.getters.Request_Head
      }).then(
        response => {
          if (this.getToken(response.data)) {
            this.tableData = response.data.data;
          }
        },
        error => {
          this.$emit("API-ERR");
        }
      );
    },
    //点击预览合同
    openContract(id) {
      this.axios({
        method: "post",
        url: this.API_ROOT + "/home_api/contract/preview",
        data: {
          id: id
        },
        headers: this.$store.getters.Request_Head
      }).then(
        response => {
          if (this.getToken(response.data)) {
            this.contentData = response.data.data;
            this.innerVisible = true;
          }
        },
        error => {
          this.$emit("API-ERR");
        }
      );
    },
    //下载合同
    download(id) {
      window.location =
        this.API_ROOT + "/home_api/contract/download?" + "id=" + id;
    },

    //续约跳转
    xuyue(id) {
      this.$confirm("确认要续约吗?", "操作提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios({
            method: "post",
            url: this.API_ROOT + "/home_api/contract/xuyue",
            data: {
              id: id,
              xuyue: 2
            },
            headers: this.$store.getters.Request_Head
          }).then(
            response => {
              if (this.getToken(response.data)) {
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                this.$emit("CB-dialogFormVisibles", false);
              }
            },
            error => {
              this.$emit("API-ERR");
            }
          );
        })
        .catch(() => {});
    }
  },
  computed: mapState({
    uinfo: state => state.uinfo
  })
};
</script>
