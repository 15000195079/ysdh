<template>
    <el-dialog :title="titles" :visible.sync="dialogStatus" @close="close" width="60%" style="min-height:400px">
        <el-table :data="tableData" v-loading="loading" element-loading-text="拼命加载中">
            <el-table-column prop="bank" label="付款银行" :resizable="false">
            </el-table-column>
            <el-table-column prop="number" label="付款账号" show-overflow-tooltip :resizable="false">
            </el-table-column>
            <el-table-column prop="money" label="付款金额(元)" :resizable="false">
            </el-table-column>
            <el-table-column prop="pay_time" label="付款时间" show-overflow-tooltip :resizable="false">
            </el-table-column>
            <el-table-column label="付款凭证" :resizable="false">
                <template slot-scope="scope">
                    <el-popover placement="left" width="180px" trigger="click">
                        <img :src="scope.row.img" alt="" style="max-width:300px;max-height:300px">
                        <img :src="scope.row.img" alt="" slot="reference" style="width: 40px;margin-top: 5px;cursor:pointer;">
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column prop="status" label="审核状态" show-overflow-tooltip :resizable="false">
            </el-table-column>
        </el-table>
    </el-dialog>
</template>
<script>
import { mapState } from "vuex";
export default {
  props: ["dialogFormVisibles", "hid", "titles"],
  data() {
    return {
      loading: false,
      dialogStatus: false,
      tableData: []
    };
  },
  watch: {
    dialogFormVisibles: function(newValue, oldValue) {
      this.dialogStatus = newValue;
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
      this.loading = true;
      this.axios({
        method: "post",
        url: this.API_ROOT + "/home_api/pay/index",
        data: {
          hid: this.hid
        },
        headers: this.$store.getters.Request_Head
      }).then(
        response => {
          if (this.getToken(response.data)) {
            this.tableData = response.data.data;
            response.data.data.forEach((item, index) => {
              if (item.status == 1) {
                item.status = "未审核";
              } else {
                item.status = "已审核";
              }
            });
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
  computed: mapState({
    uinfo: state => state.uinfo
  })
};
</script>
