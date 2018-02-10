<template>
    <div>
        <el-row class="bord-btm ">
            <el-col :md="7" class="font-170 text-dark text-bold padding-top-10 padding-bottom-10">
                产品授权信息
            </el-col>
            <el-col :md="6" class="padding-top-5 text-right">
                <el-select v-model="status" size="medium" clearable placeholder="不限授权产品状态" @change="change">
                    <el-option v-for="item in cpoptions" :key="item.id" :label="item.title" :value="item.id">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :md="8" class="padding-top-5 text-right">
                <el-input placeholder="搜索产品编号、名称" v-model="keys" size="medium" class="input-with-select" clearable @change="search">
                    <el-button slot="append" @click="search(keys)">搜索</el-button>
                </el-input>

            </el-col>
            <el-col :md="3" class="padding-top-5 text-right">
                <el-button class="pull-right btn-bg" type="info" size="medium" plain @click="product">
                    新增产品
                </el-button>
            </el-col>
        </el-row>

        <el-row class="margin-top-30" v-if="!count||count==0" style="background-color: #fff;">
            <h4 align="center">暂无授权产品信息！</h4>
        </el-row>
        <el-row class="margin-top-20" v-for="(item,index) in tableData" :key="item.id">
            <el-col class="bg-gray padding-10 card-head-bg font-110 text-dark">
                <div class="pull-left padding-top-5 padding-left-5">
                    <i class="fa fa-shopping-bag fa-lg text-primary margin-right-5"></i> 产品编号：{{item.number}}
                </div>
                <div class="pull-right">
                    <el-button :type="item.status=='5'?'success':item.status=='1'||item.status=='3'?'info':'danger'" size="mini" class="no-margin" plain round>{{productstatus[index]}}</el-button>
                </div>
            </el-col>
            <el-col class="bg-light padding-20">
                <el-alert :title="item.beizhu" type="warning" :closable="false" class="padding-20 font-120 margin-bottom-20" show-icon v-if="item.beizhu && item.status=='1'||item.status=='3'"></el-alert>
                <el-form label-width="110px" label-suffix="：">
                    <el-row>
                        <el-col :sm="12" :md="8">
                            <el-form-item label="产品名称">
                                {{item.title}}
                            </el-form-item>
                        </el-col>

                        <el-col :sm="12" :md="8">
                            <el-form-item label="产品类目">
                                <el-tooltip class="item" effect="dark" :content="item.leixing" placement="top" v-if="item.leixing.length>12">
                                    <span class="aui-ellipsis-1" style="display:block;">
                                        {{item.leixing}}
                                    </span>
                                </el-tooltip>

                                <span class="aui-ellipsis-1" style="display:block;" v-else>
                                     {{item.leixing}}
                                </span>
                            </el-form-item>
                        </el-col>
                        <el-col :sm="12" :md="8" v-if="item.total">
                            <el-form-item label="总产量">
                                {{item.total}}
                            </el-form-item>
                        </el-col>
                        <el-col :sm="12" :md="8" v-if="item.sell">
                            <el-form-item label="已售出数量">
                                {{item.sell}}
                            </el-form-item>
                        </el-col>
                        <el-col :sm="12" :md="8" v-if="item.lave">
                            <el-form-item label="剩余库存数量">
                                {{item.lave}}
                            </el-form-item>
                        </el-col>

                        <el-col :sm="12" :md="8" v-if="item.count">
                            <el-form-item label="生产批次">
                                共{{item.count}}个批次
                                <span class="text-primary" style="cursor:pointer;" @click="management(item.id,item.title)">【管理】</span>
                            </el-form-item>
                        </el-col>
                        <el-col :sm="12" :md="8">
                            <el-form-item label="产品状态">
                                <span class="text-primary">{{item.type}}</span>
                            </el-form-item>
                        </el-col>

                        <el-col :sm="12" :md="8" v-if="item.pid && item.pid.number">
                            <el-form-item label="关联授权编号">
                                {{item.pid.number}}
                            </el-form-item>
                        </el-col>

                    </el-row>
                </el-form>
            </el-col>
            <el-col class="bg-light padding-20 bord-top">
                <button class="btn btn-lg btn-primary margin-right-10 padding-left-40 padding-right-40" @click="addbatch(item.id)" v-if="item.status=='5'">
                    创建批次
                </button>
                <!-- 新增批次通过后才可下载证纸 -->
                <button class="btn btn-lg btn-primary margin-right-10 padding-left-40 padding-right-40" v-if="item.status=='5'" @click="management(item.id,item.title)">
                    下载证纸
                </button>
                <button class="btn btn-lg btn-primary margin-right-10 padding-left-40 padding-right-40" v-if="item.status=='6' || item.status=='1' || item.status=='3'" @click="editProduct(item.pid.id,item.id)">
                    编辑产品
                </button>
                <button class="btn btn-lg btn-primary margin-right-10 padding-left-40 padding-right-40" @click="details(item.id,item.title)">
                    查看
                </button>
                <button class="btn btn-lg btn-danger margin-right-10 padding-left-40 padding-right-40" v-if="item.status=='6' || item.status=='1' || item.status=='3'" @click="deletProduct(item.id)">
                    删除
                </button>
                <div class="pull-right padding-10 font-110">
                    您的专属项目经理：{{item.fuid.name}}（{{item.fuid.phone}}）
                </div>
            </el-col>
        </el-row>
        <!-- 查看产品详情 -->
        <Cpdetails :dialogFormVisiblexq="dialogFormVisiblexq" :xqid="xqid" :xqtitle="xqtitle" @CB-dialogFormVisiblexq="CB_dialogFormVisiblexq"></Cpdetails>
        <!-- 选择授权弹窗 -->
        <Selectauthorization :dialogFormVisible="dialogFormVisible" @CB-dialogFormVisible="CB_dialogFormVisible"></Selectauthorization>
        <!-- 产品批次管理 -->
        <Batchmanagement :dialogFormVisiblepc="dialogFormVisiblepc" :id="id" :pctitle="pctitle" @CB-dialogFormVisiblepc="CB_dialogFormVisiblepc"></Batchmanagement>
    </div>
</template>

<script>
//导入vuex辅助函数
import { mapState } from "vuex";
//选择授权弹窗
import Selectauthorization from "./select_authorization.vue";
//批次管理
import Batchmanagement from "./batch_management.vue";
//查看产品详情
import Cpdetails from "./cp_details.vue";

export default {
  // 当切入路由时，执行该方法
  activated() {
    this.options = this.cpoptions;
    this.getData();
  },
  //数据绑定
  data() {
    return {
      tableData: [],

      status: "", //下拉筛选传参
      keys: "", //搜索传参

      count: 0, //产品数量
      content: [], //产品类目显示处理
      productstatus: [], //产品审核状态转字符串

      dialogFormVisible: false, //授权选择弹窗

      dialogFormVisiblepc: false, //产品批次管理弹窗
      id: "", //产品id (产品批次弹窗)
      pctitle: "", //产品名称 (产品批次弹窗)

      dialogFormVisiblexq: false, //产品详情弹窗
      xqid: "", //产品详情弹窗 当前产品id
      xqtitle: "" //产品详情弹窗 当前产品名称
    };
  },
  methods: {
    //下拉筛选
    change(val) {
      this.getData();
    },
    //搜索
    search(val) {
      this.keys = val.replace(/[\'\"]/g, "").trim();
      this.getData();
    },
    //拉取产品列表
    getData() {
      this.axios({
        method: "post",
        url: this.API_ROOT + "/home_api/derivative/index",
        data: {
          type: this.status,
          keys: this.keys
        },
        headers: this.$store.getters.Request_Head
      }).then(
        response => {
          if (this.getToken(response.data)) {
            this.tableData = response.data.data;
            this.count = response.data.count;
            //产品状态显示处理
            let num = [];
            response.data.data.forEach((item, index) => {
              switch (item.status) {
                case "5":
                  num.push("进行中");
                  break;
                case "1" || "3":
                  num.push("未通过");
                  break;
                default:
                  num.push("审核中");
              }
            });
            this.productstatus = num;
          }
        },
        error => {
          this.$emit("API-ERR");
        }
      );
    },
    //新增产品
    product() {
      this.dialogFormVisible = true;
    },
    CB_dialogFormVisible() {
      this.dialogFormVisible = false;
    },
    //编辑产品
    editProduct(pid, id) {
      this.$router.push({
        name: "shouquanchanpin_detail",
        params: {
          pid: pid,
          id: id
        }
      });
    },
    //删除产品
    deletProduct(id) {
      this.$confirm("删除后不可恢复,确定要删除吗?", "操作提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios({
            method: "post",
            url: this.API_ROOT + "/home_api/derivative/delete",
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
              this.getData();
            },
            error => {
              this.$emit("API-ERR");
            }
          );
        })
        .catch(() => {});
    },

    //新增批次
    addbatch(pid) {
      this.$router.push({
        name: "batch_detail",
        params: {
          did: pid,
          id: 0
        }
      });
    },
    //批次管理
    management(id, pctitle) {
      this.dialogFormVisiblepc = true;
      this.id = id;
      this.pctitle = pctitle;
    },
    CB_dialogFormVisiblepc(id) {
      if (id) {
        this.getData();
      } else {
        this.dialogFormVisiblepc = false;
      }
    },

    //查看产品详情
    details(id, title) {
      this.dialogFormVisiblexq = true;
      this.xqid = id;
      this.xqtitle = title;
    },
    CB_dialogFormVisiblexq() {
      this.dialogFormVisiblexq = false;
    }
  },
  //计算属性
  computed: mapState({
    uinfo: state => state.uinfo,
    cpoptions: state => state.cp_options
  }),
  components: {
    Selectauthorization,
    Batchmanagement,
    Cpdetails
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
.btn-bg {
  background: #38a0f4;
  color: white;
}
</style>
