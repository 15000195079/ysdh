<template>
    <el-dialog :title="title" :visible.sync="dialogStatus" @close="close" width="60%" style="min-height:400px">
        <el-table :data="tableData" v-loading="loading" element-loading-text="拼命加载中">
            <el-table-column prop="title" label="产品名称" :resizable="false">
            </el-table-column>
            <el-table-column prop="leixing" label="产品类目" show-overflow-tooltip :resizable="false">
                <template slot-scope="scope">
                    <span v-for="(cate,index) in scope.row.leixing" :key="cate.index">
                        <span v-if="index >0 && index<2">/</span>
                        <span>{{cate}}</span>
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="count" label="产品批次" :resizable="false">
                <template slot-scope="scope">
                    <span>共
                        <span class="text-primary">{{scope.row.count}}</span>个批次</span>
                </template>
            </el-table-column>
            <el-table-column prop="type" label="产品状态" show-overflow-tooltip :resizable="false">
            </el-table-column>
            <el-table-column prop="status" label="操作" show-overflow-tooltip :resizable="false">
                <template slot-scope="scope">
                    <span class="text-primary" style="cursor:pointer" @click="details(scope.row.id,scope.row.title)">详细</span>
                </template>
            </el-table-column>
        </el-table>
        <!-- 查看产品详情 -->
        <Cpdetails :dialogFormVisiblexq="dialogFormVisiblexq" :xqid="xqid" :xqtitle="xqtitle" @CB-dialogFormVisiblexq="CB_dialogFormVisiblexq"></Cpdetails>
    </el-dialog>
</template>
<script>
import { mapState } from "vuex";
//查看产品详情
import Cpdetails from "./cp_details.vue";
export default {
  props: ["dialogFormVisiblecp", "cpid", "cptitle"],
  data() {
    return {
      loading: false,
      dialogStatus: false,
      title: "",
      tableData: [],

      //产品详情弹窗传参
      dialogFormVisiblexq: false,
      xqid: "",
      xqtitle: ""
    };
  },
  watch: {
    dialogFormVisiblecp: function(newValue, oldValue) {
      this.dialogStatus = newValue;
      if (newValue) {
        this.title = "授权编号：" + this.cptitle;
        this.getData();
      }
    }
  },
  methods: {
    close() {
      this.$emit("CB-dialogFormVisiblecp", false);
    },
    getData() {
      this.loading = true;
      this.axios({
        method: "post",
        url: this.API_ROOT + "/home_api/derivative/index",
        data: {
          pid: this.cpid
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
    //查看产品详细
    details(id, title) {
      this.dialogFormVisiblexq = true;
      this.xqid = id;
      this.xqtitle = title;
    },
    CB_dialogFormVisiblexq() {
      this.dialogFormVisiblexq = false;
    }
  },
  computed: mapState({
    uinfo: state => state.uinfo
  }),
  components: {
    Cpdetails
  }
};
</script>
