<template>
    <el-dialog :title="title" :visible.sync="dialogStatus" @close="close" width="80%">
        <div v-loading="loading" element-loading-text="拼命加载中" class="padding-top-10">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column label="批次名称" prop="batch" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="规格" prop="norm">
                </el-table-column>
                <el-table-column label="型号" prop="type">
                </el-table-column>
                <el-table-column prop="total" label="生产数量">
                </el-table-column>
                <el-table-column label="剩余数量">
                    <template slot-scope="scope">
                        <span>{{scope.row.lave||'--'}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="审批状态" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span>{{scope.row.status.title}}</span>
                        <el-popover placement="top" trigger="click" v-if="scope.row.status.id == '3'">
                            <div>退回原因：{{scope.row.beizhu}}</div>
                            <el-button slot="reference" type="text" style="color:blue">查看</el-button>
                        </el-popover>
                    </template>
                </el-table-column>

                <el-table-column label="操作" min-width="120">
                    <template slot-scope="scope">
                        <span class="text-danger" style="cursor:pointer" @click="cancel(scope.row.id)" v-if="scope.row.status.id == '1' || scope.row.status.id == '3'">【删除】</span>
                        <span class="text-primary" style="cursor:pointer" @click="edit(scope.row.id)" v-if="scope.row.status.id == '1' || scope.row.status.id == '3'">【编辑】</span>
                        <a style="color:red;" :href="API_ROOT+'/home_api/download/downloads?type='+'2'+'&id='+scope.row.id+'&token='+uinfo.token" target="_blank" v-if="scope.row.status.id == '4'">
                            下载防伪码
                        </a>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </el-dialog>
</template>
<script>
import { mapState } from "vuex";
export default {
  props: ["dialogFormVisiblepc", "id", "pctitle"],
  data() {
    return {
      title: "",
      loading: false,
      dialogStatus: false,
      tableData: []
    };
  },
  watch: {
    //dialog显示隐藏监听
    dialogFormVisiblepc: function(newValue, oldValue) {
      this.dialogStatus = newValue;
      if (newValue) {
        this.title = "产品批次：" + this.pctitle;
        this.getData();
      }
    }
  },
  methods: {
    //dialog被关闭
    close() {
      this.$emit("CB-dialogFormVisiblepc", false);
    },

    //拉取进行中的授权信息
    getData() {
      this.loading = true;
      this.axios({
        method: "post",
        url: this.API_ROOT + "/home_api/goods/index",
        data: {
          did: this.id
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
          this.$emit("API-ERR");
          this.loading = false;
        }
      );
    },
    //撤销删除批次
    cancel(id) {
      this.$confirm("删除后不可恢复,确定要删除吗?", "操作提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios({
            method: "post",
            url: this.API_ROOT + "/home_api/goods/delete",
            data: {
              id: id
            },
            headers: this.$store.getters.Request_Head
          }).then(
            response => {
              if (this.getToken(response.data)) {
                this.$message({
                  message: "删除成功",
                  type: "success"
                });
              }
              this.$emit("CB-dialogFormVisiblepc", 1);
              this.getData();
            },
            error => {
              this.$emit("API-ERR");
            }
          );
        })
        .catch(() => {});
    },
    //编辑批次
    edit(id) {
      this.$emit("CB-dialogFormVisiblepc", false);
      this.$router.push({
        name: "batch_detail",
        params: {
          did: this.id,
          id: id
        }
      });
    }
  },
  //计算属性
  computed: mapState({
    uinfo: state => state.uinfo
  })
};
</script>
