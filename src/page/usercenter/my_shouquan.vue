<template>
    <div>
        <el-row class="bord-btm ">
            <el-col :md="10" class="font-170 text-dark text-bold padding-top-10 padding-bottom-10">
                我的授权信息
            </el-col>
            <el-col :md="6" class="padding-top-5 text-right">
                <el-select v-model="type" size="medium" clearable placeholder="不限授权状态" @change="change">
                    <el-option v-for="item in options" :key="item.id" :label="item.title" :value="item.id">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :md="8" class="padding-top-5 text-right">
                <el-input placeholder="搜索授权信息" v-model="keys" size="medium" class="input-with-select" @change="search" clearable>
                    <el-button slot="append" @click="search(keys)">搜索</el-button>
                </el-input>
            </el-col>
        </el-row>
        <el-row class="margin-top-30" v-if="!count||count==0" style="background-color: #fff;">
            <h4 align="center">暂无授权信息！</h4>
        </el-row>
        <div v-loading="loading" element-loading-text="拼命加载中">
            <el-row class="margin-top-30" v-for="(item,index) in tableData" :key="item.id">
                <el-col class="bg-gray padding-10 card-head-bg font-110 text-dark">
                    <div class="pull-left padding-top-5 padding-left-5">
                        <i class="fa fa-folder fa-lg text-primary margin-right-5"></i> {{(item.type == 3 ||item.type == 4 || item.type == 5 ) ? '授权编号':'申请编号'}}：{{item.number}}
                    </div>
                    <div class="pull-right">
                        <el-button v-if="item.type !=4" :type="item.type !=8 && item.type !=5 ?'danger':'info'" size="mini" class="no-margin" plain round>{{item.type_name.name}}</el-button>
                        <el-button v-if="item.type ==4" type="success" size="mini" class="no-margin" plain round>{{item.type_name.name}}</el-button>
                    </div>
                </el-col>
                <el-col class="bg-light padding-20">
                    <!-- 授权即将到期时 -->
                    <el-alert title="温馨提示：平台现在已开放其他人员申请此授权，授权到期时若您未进行续约，则表示您放弃此授权，届时将不可再续约！" type="warning" :closable="false" class="padding-20 font-120 margin-bottom-20" show-icon v-if="item.type  == 3"></el-alert>
                    <!-- 待提交认证材料时 -->
                    <el-alert title="温馨提示：请上传认证材料,image图片、txt/pdf/doc 或rar/zip格式!" type="warning" :closable="false" class="padding-20 font-120 margin-bottom-20" show-icon v-if="item.type  == 2 && item.status.id == '95'"></el-alert>
                    <!-- 认证材料被退回||无效授权 -->
                    <el-alert :title="'退回原因：'+item.beizhu+'！'" type="warning" :closable="false" class="padding-20 font-120 margin-bottom-20" show-icon v-if="(item.type  == 2 && item.status.id == '97') || item.type  == 8"></el-alert>

                    <el-form label-width="120px" label-suffix="：">
                        <el-row>
                            <el-col :sm="12" :md="8">
                                <el-form-item label="动画片名">
                                    <div v-if="item.cn_name">
                                        <el-tooltip class="item" effect="dark" :content="item.cn_name" placement="top" v-if="item.show">
                                            <span>
                                                {{item.newcn_name}}...
                                            </span>
                                        </el-tooltip>
                                        <span v-else>{{item.cn_name}}</span>
                                    </div>
                                    <span style="color:red;" v-else>该动画片已被删除</span>
                                </el-form-item>
                            </el-col>

                            <el-col :sm="12" :md="8">
                                <el-form-item label="授权专利">
                                    {{item.apply}}({{item.transfer}})
                                </el-form-item>
                            </el-col>

                            <el-col :sm="12" :md="8" v-if="item.type==3 || item.type==4 || item.type==5">
                                <el-form-item label="授权开始日期">
                                    {{item.start_time||"--"}}
                                </el-form-item>
                            </el-col>
                            <el-col :sm="12" :md="8">
                                <el-form-item label="授权品类">
                                    <el-tooltip class="item" effect="dark" :content="item.authorize_title" placement="top" v-if="item.authorize_title.length>12">
                                        <span class="aui-ellipsis-1" style="display:block;">
                                            {{item.authorize_title}}
                                        </span>
                                    </el-tooltip>
                                    <span class="aui-ellipsis-1" style="display:block;" v-else>
                                        {{item.authorize_title}}
                                    </span>
                                </el-form-item>
                            </el-col>
                            <el-col :sm="12" :md="8" v-if="item.hid && item.hid.length > 0">
                                <el-form-item label="合同信息">
                                    <span>共{{item.count}}份
                                        <span class="text-primary" style="cursor:pointer;" @click="contract(item.id,item.cn_name)">【查看】</span>
                                    </span>
                                </el-form-item>
                            </el-col>

                            <el-col :sm="12" :md="8" v-if="item.type==3 || item.type==4 || item.type==5">
                                <el-form-item label="授权结束日期">
                                    {{item.end_time||"--"}}
                                </el-form-item>
                            </el-col>
                            <el-col :sm="12" :md="8" v-if="item.type==3 || item.type==4 || item.type==5">
                                <el-form-item label="授权产品">
                                    共 {{item.num}} 项
                                    <span class="text-primary" style="cursor:pointer;" @click="see(item.id,item.number)">【查看】</span>
                                    <span class="text-primary" style="cursor:pointer;" @click="add_cp(item.id)">【新增】</span>
                                </el-form-item>
                            </el-col>

                            <el-col :sm="12" :md="8">
                                <el-form-item label="流转状态">
                                    <span>{{item.status.title}}
                                        <span class="text-primary" style="cursor:pointer;" @click="openTimeline(item.id,item.cn_name,item.aid,item.funame)">【查看】</span>
                                    </span>
                                </el-form-item>
                            </el-col>
                            <el-col :sm="12" :md="8" v-if="item.materials">
                                <el-form-item label="认证材料">
                                    <a :href="item.materials" target="_blank">
                                        <span style="width:180px;color:#128ef2;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;display:inline-block">{{item.materials_name}}</span>
                                    </a>
                                </el-form-item>
                            </el-col>

                        </el-row>
                    </el-form>
                </el-col>
                <el-col class="bg-light padding-20 bord-top">
                    <span v-show="item.type == 3 || item.type == 4 ">
                        <button class="btn btn-lg btn-primary margin-right-10 padding-left-40 padding-right-40" @click="contract(item.id,item.cn_name)">
                            我要续约
                        </button>
                        <button class="btn btn-lg btn-default margin-right-10 padding-left-40 padding-right-40" @click="contract(item.id,item.cn_name)">
                            下载合同
                        </button>
                    </span>

                    <a class="btn btn-lg btn-default margin-right-10 padding-left-40 padding-right-40" :href="API_ROOT+'/home_api/download/downloads?type='+'1'+'&id='+item.id+'&token='+uinfo.token" target="_blank" v-if="item.download=='2'">
                        下载资源
                    </a>

                    <button class="btn btn-lg btn-danger btn-default margin-right-10 padding-left-40 padding-right-40" v-if="item.type == 1 || item.type == 8" @click="delete_sq(item.id)">
                        删除
                    </button>

                    <!-- 上传认证材料 -->
                    <div v-show="item.type == 2 && (item.status.id == '95' ||  item.status.id == '97' || item.status.id == '96')" style="display:inline-block;">
                        <Uploader :buttonID="item.number" theme="btn-primary" button_size="btn-lg" :filters="filters" @Callback-UploadProgress="CB_UploadProgress" @Callback-GetFileInfo="CB_GetFileInfo" button_text="上传认证材料"></Uploader>
                    </div>

                    <div class="pull-right padding-10 font-110" v-if="item.funame">
                        您的专属项目经理：{{item.funame.name}}（{{item.funame.phone}}）
                    </div>
                </el-col>
            </el-row>
        </div>
        <!-- 上传进度显示 -->
        <el-progress class="progress" type="circle" :percentage="audio_percent" :status="audio_status" v-if="audio_percent>0"></el-progress>

        <!-- 查看合同 -->
        <Seecontract :dialogFormVisibles="dialogFormVisibles" :sids="sids" :name="name" @CB-dialogFormVisibles="CB_dialogFormVisibles"></Seecontract>
        <!-- 查看流转图 -->
        <Timeline :dialogFormVisible="timeline_status" :sid="sid" :aid="aid" :dhname="dhname" :fuid="fuid" @CB-dialogFormVisible="CB_timeline"></Timeline>
        <!-- 查看产品列表 -->
        <Product :dialogFormVisiblecp="dialogFormVisiblecp" @CB-dialogFormVisiblecp="CB_dialogFormVisiblecp" :cpid="cpid" :cptitle="cptitle"></Product>
    </div>
</template>

<script>
import { mapState } from "vuex";
//上传
import Uploader from "@/components/pl-upload.vue";
//查看合同
import Seecontract from "./seecontract.vue";
//查看流转图
import Timeline from "./timeline.vue";
//查看产品列表
import Product from "./product.vue";
export default {
  // 当切入路由时，执行该方法
  activated() {
    this.getData();
  },
  //数据绑定
  data() {
    return {
      tableData: [],
      count: 0,
      content: "默认", //授权品类页面展示
      keys: "", //检索
      type: "", //下拉筛选绑定值
      loading: false,

      //上传接口 传递参数
      materials_name: "",
      materials: "",
      id: 0,
      aid: 0,
      fuid: 0,

      //流转图弹窗参数传递
      timeline_status: false,
      sid: 0,
      dhname: "",
      aid: 0,
      fuid: 0,

      //查看合同弹窗参数传递
      dialogFormVisibles: false,
      sids: "",
      name: "",

      //查看产品弹窗参数传递
      dialogFormVisiblecp: false,
      cpid: 0,
      cptitle: "",

      audio_status: "", //进度状态
      audio_percent: 0, //上传进度
      //限制上传文件
      filters: {
        max_file_size: "20mb",
        mime_types: [
          { title: "Image files", extensions: "jpg,gif,png" },
          { title: "Zip files", extensions: "zip" },
          { title: "Rar files", extensions: "rar" },
          { title: "Document files", extensions: "pdf,doc,txt" }
        ]
      }
    };
  },
  methods: {
    //拉取授权信息数据
    getData() {
      this.loading = true;
      this.axios({
        method: "post",
        url: this.API_ROOT + "/home_api/apply_authorize/index",
        data: {
          type: this.type,
          keys: this.keys,
          info: "",
          listRows: 200,
          _order: "type",
          _sort: "asc"
        },
        headers: this.$store.getters.Request_Head
      }).then(
        response => {
          this.loading = false;
          if (this.getToken(response.data)) {
            this.tableData = response.data.data;
            this.count = response.data.count;
          }
        },
        error => {
          this.loading = false;
          this.$emit("API-ERR");
        }
      );
    },
    //删除未审核的和无效的授权
    delete_sq(id) {
      this.$confirm("删除后不可恢复，确定要删除吗?", "操作提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios({
            method: "post",
            url: this.API_ROOT + "/home_api/apply_authorize/delete",
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
                this.getData();
              }
            },
            error => {
              this.$emit("API-ERR");
            }
          );
        })
        .catch(() => {});
    },
    //上传成功后的回调
    CB_GetFileInfo(res, id) {
      this.tableData.forEach((item, index) => {
        if (item.number == id) {
          item.materials_name = res.name;
          item.materials = res.url + res.file;
          this.$forceUpdate();
        }
      });
      this.onSubmit(id);
    },
    //上传进度
    CB_UploadProgress(file) {
      this.audio_status = "";
      this.audio_percent = file.percent;
      if (this.audio_percent == 100) {
        this.audio_status = "success";
        this.audio_percent = 0;
      }
    },
    //删除上传材料
    audios_close(id) {
      this.tableData.forEach((item, index) => {
        if (item.number == id) {
          item.materials_name = "";
          item.materials = "";
          this.$forceUpdate();
        }
      });
    },
    //提交材料
    onSubmit(id) {
      this.tableData.forEach((item, index) => {
        if (item.number == id) {
          this.materials_name = item.materials_name;
          this.materials = item.materials;
          this.id = item.id;
          this.aid = item.aid;
          this.fuid = item.fuid;
        }
      });
      this.axios({
        method: "post",
        url: this.API_ROOT + "/home_api/apply_authorize/update",
        data: {
          materials_name: this.materials_name,
          materials: this.materials,
          id: this.id, //授权信息ID
          aid: this.aid, //授权信息动画ID
          fuid: this.fuid,
          status: 96
        },
        headers: this.$store.getters.Request_Head
      }).then(
        response => {
          if (this.getToken(response.data)) {
            this.$message({
              message: "上传成功",
              type: "success"
            });
          }
          this.getData();
        },
        error => {
          this.$emit("API-ERR");
        }
      );
    },
    //搜索
    search(val) {
      this.keys = val.replace(/[\'\"]/g, "").trim();
      this.getData();
    },
    //下拉筛选
    change() {
      this.getData();
    },
    //查看合同
    contract(id, name) {
      this.dialogFormVisibles = true;
      this.sids = id;
      this.name = name;
    },
    CB_dialogFormVisibles() {
      this.dialogFormVisibles = false;
    },

    //流转详情
    openTimeline(id, name, aid, fuid) {
      this.timeline_status = true;
      this.sid = id;
      this.aid = aid;
      this.dhname = name;
      this.fuid = fuid;
    },
    CB_timeline(id) {
      if (id) {
        this.getData();
      }
      this.timeline_status = false;
    },
    //查看产品列表
    see(id, title) {
      this.dialogFormVisiblecp = true;
      this.cpid = id;
      this.cptitle = title;
    },
    CB_dialogFormVisiblecp() {
      this.dialogFormVisiblecp = false;
    },
    //新增产品
    add_cp(id) {
      this.$router.push({
        name: "shouquanchanpin_detail",
        params: {
          pid: id,
          id: 0
        }
      });
    }
  },
  //计算属性
  computed: mapState({
    uinfo: state => state.uinfo,
    options: state => state.options
  }),
  components: {
    Uploader,
    Timeline,
    Seecontract,
    Product
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
.el-form-item__label {
  width: 148px;
}
.progress {
  position: fixed;
  left: 50%;
  top: 50%;
  margin: -50px 0 0 -50px;
}
</style>
