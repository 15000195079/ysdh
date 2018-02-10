<template>
    <div v-loading="loading" element-loading-text="拼命加载中">
        <el-row class="bord-btm ">
            <el-col :md="10" class="font-170 text-dark text-bold padding-top-10 padding-bottom-10">
                我的合同信息
            </el-col>
            <el-col :md="6" class="padding-top-5 text-right">
                <el-select v-model="status" size="medium" clearable placeholder="不限合同状态" @change="change">
                    <el-option v-for="item in options" :key="item.id" :label="item.title" :value="item.id">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :md="8" class="padding-top-5 text-right">
                <el-input placeholder="搜索合同信息" v-model="keys" size="medium" class="input-with-select" @change="search" clearable>
                    <el-button slot="append" @click="search(keys)">搜索</el-button>
                </el-input>
            </el-col>
        </el-row>
        <el-row class="margin-top-30" v-if="!count||count==0" style="background-color: #fff;">
            <h4 align="center">暂无合同！</h4>
        </el-row>
        <el-row class="margin-top-30" v-for="(item,index) in tableData" :key="item.id">
            <el-col class="bg-gray padding-10 card-head-bg font-110 text-dark">
                <div class="pull-left padding-top-5 padding-left-5">
                    <i class="fa fa-file-text fa-lg text-primary margin-right-5"></i> 合同编号：{{item.number}}
                </div>
                <div class="pull-right">
                    <el-button size="mini" class="no-margin" plain round :type="item.status =='1' || item.status =='2' ?'danger':item.status=='5'||item.status=='3'||item.status=='7'?'success':'info'">{{item.type}}</el-button>
                </div>
            </el-col>
            <el-col class="bg-light padding-20">
                <el-form label-width="110px" label-suffix="：">
                    <el-row>
                        <el-col :sm="12" :md="8">
                            <el-form-item label="合同名称">
                                {{item.title}}
                            </el-form-item>
                        </el-col>
                        <el-col :sm="12" :md="8">
                            <el-form-item label="关联授权编号">
                                {{item.list.number}}
                            </el-form-item>
                        </el-col>
                        <el-col :sm="12" :md="8" v-if="item.result.strtime">
                            <el-form-item label="合同开始日期">
                                {{item.result.strtime}}
                            </el-form-item>
                        </el-col>
                        <el-col :sm="12" :md="8" v-if="item.yuan">
                            <el-form-item label="合同金额">
                                {{item.yuan}}元
                            </el-form-item>
                        </el-col>
                        <el-col :sm="12" :md="8" v-if="item.payment.count">
                            <el-form-item label="已付款金额">
                                <span>{{item.payment.sum}}元</span>
                                <span style="cursor:pointer;" class="text-primary" @click="record(item.id,item.title)">【付款记录】</span>
                            </el-form-item>
                        </el-col>

                        <el-col :sm="12" :md="8" v-if="item.result.endtime">
                            <el-form-item label="合同结束日期">
                                {{item.result.endtime}}
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-col>
            <el-col class="bg-light padding-20 bord-top">
                <button class="btn btn-lg btn-primary margin-right-10 padding-left-40 padding-right-40" v-if="item.status  == '7'" @click="xuyue(item.id)">
                    我要续约
                </button>
                <button class="btn btn-lg btn-primary margin-right-10 padding-left-40 padding-right-40" v-if="item.status  == '5' ||item.status  == '7'" @click="openTimeline(item.title,item.pid,item.id)">
                    上传付款凭证
                </button>
                <a class="btn btn-lg btn-default margin-right-10 padding-left-40 padding-right-40" :href="API_ROOT+'/home_api/download/downloads?type='+'3'+'&id='+item.id+'&token='+uinfo.token" target="_blank">
                    下载合同
                </a>
                <div class="pull-right padding-10 font-110">
                    您的专属项目经理：{{item.list.fuid.name}}（{{item.list.fuid.phone}}）
                </div>
            </el-col>
        </el-row>
        <!-- 上传付款凭证 -->
        <Payment :dialogFormVisible="dialogFormVisible" :title="title" :pid="pid" :id="id" @CB-dialogFormVisible="CB_dialogFormVisible"></Payment>

        <!-- 查看付款记录 -->
        <Record :dialogFormVisibles="dialogFormVisibles" :titles="titles" :hid="hid" @CB-dialogFormVisibles="CB_dialogFormVisibles"></Record>
    </div>
</template>

<script>
import { mapState } from "vuex";

//上传付款凭证
import Payment from "./payment.vue";
//查看付款记录
import Record from "./record.vue";
export default {
  // 当切入路由时，执行该方法
  activated() {
    this.getData();
  },
  //数据绑定
  data() {
    return {
      tableData: "",
      count: 0,
      keys: "", //搜索
      status: "", //下拉筛选绑定值
      loading: false,
      //付款记录 付款凭证  组件传参
      dialogFormVisible: false,
      dialogFormVisibles: false,
      title: "",
      titles: "",
      pid: 0,
      hid: 0,
      id: 0,
      Data_guoqi: [],
      Data_shenhe: []
    };
  },
  methods: {
    //合同数据
    getData() {
      this.loading = true;
      this.axios({
        method: "post",
        url: this.API_ROOT + "/home_api/contract",
        data: {
          status: this.status,
          keys: this.keys
        },
        headers: this.$store.getters.Request_Head
      }).then(
        response => {
          this.loading = false;
          if (this.getToken(response.data)) {
            this.tableData = response.data.data;
            this.count = response.data.count;
            let num = [];
          }
        },
        error => {
          this.loading = false;
          this.$emit("API-ERR");
        }
      );
    },
    //续约合同
    xuyue(id) {
      this.$confirm("确认要提交吗?", "操作提示", {
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
              }
            },
            error => {
              this.$emit("API-ERR");
            }
          );
        })
        .catch(() => {});
    },

    //上传付款凭证
    openTimeline(title, pid, id) {
      this.id = id;
      this.title = title;
      this.pid = pid;
      this.dialogFormVisible = true;
    },
    CB_dialogFormVisible(num) {
      if (num == 1) {
        this.getData();
      }
      this.dialogFormVisible = false;
    },

    //查看付款记录
    record(id, titles) {
      this.hid = id;
      this.titles = titles;
      this.dialogFormVisibles = true;
    },

    CB_dialogFormVisibles(num) {
      this.dialogFormVisibles = false;
    },

    //搜索
    search(val) {
      this.keys = val.replace(/[\'\"]/g, "").trim();
      this.getData();
    },
    //下拉筛选
    change() {
      this.getData();
    }
  },
  //计算属性
  computed: mapState({
    uinfo: state => state.uinfo,
    options: state => state.ht_options
  }),
  components: {
    Payment,
    Record
  }
};
</script> 



<style scoped>
.img-circle {
  border-radius: 50%;
}

.head-height {
  height: 105px;
}
.tz-bgcolor {
  background-color: #fff1c9;
}
.default_color {
  color: #888;
}
</style>