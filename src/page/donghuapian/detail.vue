<template>
    <div class="dhp-details">
        <div class="dhp-details-top padding-top-50 padding-bottom-20">
            <div class="warp">
                <el-row :gutter="0">
                    <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                        <h1 class="font-30 no-margin dhp-details-h1">
                            <div class="aui-ellipsis-1">{{information.cn_name}}</div>
                            <p class="font-18 no-margin margin-top-20 " v-if="information.auth_type == 2 || information.auth_type==3">{{information.en_name}}</p>
                        </h1>
                    </el-col>
                    <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16">
                        <div class="dhp-details-top-right padding-left-50 margin-top-10">
                            <el-tag type="info" style="margin-right:5px" size="small" :key="vo" v-for="vo in information.subject">{{vo}}</el-tag>
                            <el-tag type="info" style="margin-right:5px" size="small" :key="d" v-for="d in information.tags">{{d}}</el-tag>
                            <div class="dhp-details-bianhao font-14 margin-top-20">
                                片名编号：
                                <span class="font-16">{{information.number}}</span>
                                <!-- <div class="fenxiang">
                                    分享：
                                    <i class="fa fa-weixin margin-right-5" aria-hidden="true"></i>
                                    <i class="fa fa-qq" aria-hidden="true"></i>
                                </div> -->
                                <div class="fenxiang jiathis_style_24x24">
                                    分享：
                                    <a class="jiathis_button_weixin" style="display:inline-block;"></a>
                                    <a class="jiathis_button_cqq" style="display:inline-block;"></a>
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="dhp-details-xinxi">
            <div class="warp">
                <el-row :gutter="100">
                    <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8" class="dhp-details-main-left">
                        <div class="dhp-xinxi-left">
                            <div class="dhp-xinxi-title font-18 margin-top-25 margin-bottom-20 padding-left-15">
                                <b>基本信息</b>
                            </div>
                            <el-form :label-position="labelPosition" label-width="100px">
                                <el-form-item label="名称">
                                    <div class="padding-left-15">
                                        <span>{{information.cn_name || '--'}}</span>
                                    </div>
                                </el-form-item>
                                <el-form-item label="制作方式">
                                    <span class="padding-left-15">{{methodType || '--'}}</span>
                                </el-form-item>
                                <el-form-item label="片长">
                                    <span class="padding-left-15" v-if="!information.minutes">--</span>
                                    <span class="padding-left-15" v-else>{{information.minutes}}分钟</span>
                                </el-form-item>
                                <el-form-item label="集数">
                                    <span class="padding-left-15" v-if="!information.episodes">--</span>
                                    <span class="padding-left-15" v-else>{{information.episodes}}集</span>
                                </el-form-item>
                                <el-form-item label="获奖情况">
                                    <div class="padding-left-15">
                                        <span v-if="!information.prizes || information.prizes.length == 0">--</span>
                                        <span v-else>
                                            <span v-for="(item,index) in information.prizes" :key="item.id">
                                                <span v-if="index >0">&nbsp;/&nbsp;</span>
                                                <span>{{item}}</span>
                                            </span>
                                        </span>
                                    </div>
                                </el-form-item>
                                <el-form-item label="主要角色">
                                    <div class="padding-left-15">
                                        <span v-if="!information.role || information.role.length == 0">--</span>
                                        <span v-for="(juese,index) in information.role" :key="juese.id" v-else>
                                            <span v-if="index >0">&nbsp;/&nbsp;</span>{{juese.name}}
                                        </span>
                                    </div>
                                </el-form-item>
                                <el-form-item label="导演">
                                    <div class="padding-left-15">
                                        <span>{{information.director || '--'}}</span>
                                    </div>

                                </el-form-item>
                                <el-form-item label="编剧">
                                    <span class="padding-left-15">{{information.screenwriter || '--'}}</span>
                                </el-form-item>
                                <el-form-item label="发行许可证号" v-if="information.auth_type==3">
                                    <span class="padding-left-15">{{information.license || '--'}}</span>
                                </el-form-item>
                                <el-form-item label="首播时间">
                                    <span class="padding-left-15">{{information.show_time || '--'}}</span>
                                </el-form-item>
                                <el-form-item label="首播平台">
                                    <span class="padding-left-15">{{information.show_platform || '--'}}</span>
                                </el-form-item>
                                <el-form-item label="播出平台">
                                    <div class="padding-left-15">
                                        <span v-if="!information.play_platform || information.play_platform.length==0">--</span>
                                        <span v-else>
                                            <span v-for="(item,index) in information.play_platform" :key="item.id">
                                                <span v-if="index >0"> / </span>
                                                <span>{{item}}</span>
                                            </span>
                                        </span>
                                    </div>
                                </el-form-item>
                                <el-form-item label="最高收视率">
                                    <span class="padding-left-15" v-if="!information.most_rating">--</span>
                                    <span class="padding-left-15" v-else>{{information.most_rating}}%</span>
                                </el-form-item>
                                <el-form-item label="平均收视率" v-if="information.auth_type==2 || information.auth_type=='3'">
                                    <span class="padding-left-15" v-if="!information.average_rating">--</span>
                                    <span class="padding-left-15" v-else>{{information.average_rating}}%</span>
                                </el-form-item>
                                <el-form-item label="版权归属" v-if="information.auth_type==2 || information.auth_type=='3'">
                                    <span class="padding-left-15">{{information.copyright_reserved || '--'}}</span>
                                </el-form-item>
                                <el-form-item label="版权占比" v-if="information.auth_type==3">
                                    <span class="padding-left-15" v-if="information.copyright_for">{{information.copyright_for}}%</span>
                                    <span class="padding-left-15" v-else>--</span>
                                </el-form-item>
                            </el-form>
                            <el-button @click="handleLogin" type="info" v-if="!uinfo.token" size="medium" class="btn-block margin-top-40 margin-bottom-40">
                                <b>成为合作伙伴查看专业数据</b>
                            </el-button>
                        </div>
                    </el-col>

                    <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16" class="dhp-details-main-right">
                        <el-form ref="form" :model="sizeForm" label-position="top" class="margin-top-25">
                            <el-form-item class="margin-bottom-30">
                                <div class="font-18 dhp-details-right-title margin-bottom-15">
                                    <b>选择授权权利</b>
                                    <span class="font-14 padding-left-15">(必选)</span>
                                </div>
                                <el-radio v-model="sizeForm.radio" label="1" border size="medium" @change="change">独家授权</el-radio>
                                <el-radio v-model="sizeForm.radio" label="2" border size="medium" @change="change">非独家授权</el-radio>
                                <el-radio v-model="sizeForm.radio" label="3" border size="medium" @change="change">其他</el-radio>
                                <div v-if="select" style="color:red">请选择授权权利!</div>
                            </el-form-item>

                            <el-form-item class="margin-bottom-30">
                                <div class="font-18 dhp-details-right-title margin-bottom-15">
                                    <b>是否转授权</b>
                                    <span class="font-14 padding-left-15">(必选)</span>
                                </div>
                                <el-radio v-model="sizeForm.radio_detail" label="1" border size="medium" @change="change_s">含转授权</el-radio>
                                <el-radio v-model="sizeForm.radio_detail" label="2" border size="medium" @change="change_s">不含转授权</el-radio>
                                <div v-if="select_two" style="color:red">请选择是否转授权!</div>
                            </el-form-item>
                            <el-form-item class="margin-bottom-30">
                                <div class="font-18 dhp-details-right-title margin-bottom-15">
                                    <b>授权品类</b>
                                    <span class="font-14 padding-left-15">(可多选)</span>
                                </div>
                                <div v-for="(type,index) in shouquanData" :key="type.id">
                                    <el-checkbox v-model="check[index].key" @change="handleCheckAllChange($event,type.data,index)">{{type.title}}</el-checkbox>
                                    <div style="margin: 15px 0;"></div>
                                    <el-checkbox-group v-model="check[index].arr" @change="handleCheckedCitiesChange($event,type.data,index)">
                                        <el-checkbox v-for="item in type.data" :label="item.id" border size="medium" :key="item.id" style="width:160px;">{{item.title}}</el-checkbox>
                                    </el-checkbox-group>
                                    <hr>
                                </div>
                            </el-form-item>
                            <el-form-item size="large">
                                <el-button type="danger" @click="onSubmit" class="padding-left-100 padding-right-100 margin-bottom-40">确认提交</el-button>
                            </el-form-item>
                        </el-form>

                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="dhp-details-down margin-top-40">
            <div class="warp">
                <el-row :gutter="40">
                    <el-col :xs="24" :sm="19" :md="19" :lg="19" :xl="19">
                        <div v-if="information.role && information.role.length>1">
                            <div class="dhp-details-jsrw margin-bottom-30">
                                <div class="dhp-xinxi-title font-18 margin-bottom-20 padding-left-15">
                                    <b>角色人物</b>
                                    <router-link :to="{name:'juesexingxiang'}" class="font-14">更多 > </router-link>
                                </div>
                                <dl class="pingfen-list margin-right-10 no-margin-top margin-bottom-15" v-for="juese in information.role" :key="juese.id">
                                    <dt class="margin-right-10">
                                        <span><img :src="juese.img_s" alt="" @click="handleEdit(juese.id)" style="cursor:pointer"></span>
                                    </dt>
                                    <dd class="no-margin-left margin-top-10">
                                        <span class="font-16" style="cursor:pointer" @click="handleEdit(juese.id)">{{juese.name}}</span>
                                        <el-rate v-model="juese.star" disabled text-color="#ff9900" class="margin-top-5">
                                        </el-rate>
                                    </dd>
                                </dl>
                            </div>
                            <hr />
                        </div>
                        <div class="dhp-details-jqjs margin-top-25" v-if="information.summary">
                            <div class="dhp-xinxi-title font-18 margin-bottom-20 padding-left-15">
                                <b>剧情简介</b>
                            </div>
                            <el-row class="margin-bottom-40">
                                <div v-html="information.summary"></div>
                            </el-row>
                        </div>
                        <!-- 底部选项卡组件 -->
                        <Roleslnformation :type="information.auth_type"></Roleslnformation>

                    </el-col>
                    <el-col :xs="24" :sm="5" :md="5" :lg="5" :xl="5">
                        <div class="dhp-details-ysxg">
                            <div class="dhp-xinxi-title font-18 margin-bottom-20 padding-left-15">
                                <b>衍生相关</b>
                            </div>
                            <div @click="handleEdit_title(information.id,1)">
                                <el-button type="info" class="btn-block no-margin-left margin-bottom-10">
                                    <i class="fa fa-diamond" aria-hidden="true"></i>成功案例</el-button>
                            </div>
                            <span v-for="item in information.derivative" :key="item.id">
                                <a :href="item.url" target="_blank">
                                    <el-button type="info" class="btn-block no-margin-left margin-bottom-10" v-if="item.url !== ''">
                                        <i class="aui-iconfont aui-icon-crown"></i>{{item.label}}</el-button>
                                </a>
                            </span>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <!-- 登录注册 -->
        <Login :dialogFormVisible="dialogFormVisible_login" @CB-dialogFormVisible="CB_dialogFormVisible_login"></Login>
        <!-- 更改密码弹框 -->
        <SetPassWord :setPasswordStatus='passwordStatus' @CB-setPasswordStatus="CB_setPasswordStatus"></SetPassWord>
    </div>
</template>
<script>
//导入vuex辅助函数
import { mapState } from "vuex";

//导入登录公共组件
import Login from "@/components/login.vue";
import SetPassWord from "@/page/usercenter/setPassWord.vue";
//导入底部选项卡组件
import Roleslnformation from "./rolesInformation.vue";

var myPlayer; //实例化audio
var notice; //实例化notify
//导入编辑器组件（共用）
export default {
  activated: function() {
    if (this.$route.params.id) {
      this.getData();
      this.getsq_list();
    }
    this.init();
  },
  deactivated: function() {
    this.select = false;
    this.select_two = false;
    this.sizeForm.radio = "";
    this.sizeForm.radio_detail = "";
    this.shouquanData = [];
  },
  data() {
    return {
      info: "",
      loading: false,
      notify_status: false, //notify是否主动触发
      dialogFormVisible_login: false,
      labelPosition: "right",
      information: "",
      scene: [],
      haibao: [],
      methodType: "",
      shouquanData: [], //授权品类
      check: [], //标签选择数组
      value_data: [], //提交用户选中的信息
      select: false, //提示警告信息
      select_two: false, //提示警告信息
      passwordStatus: false,
      sizeForm: {
        radio: "",
        radio_detail: ""
      }
    };
  },
  watch: {
    //用户登录不同身份状态重新请求对应数据
    uinfo: function(newValue, oldValue) {
      if (this.$route.name == "dhp-detail") {
        this.getData();
      }
    }
  },
  methods: {
    // 查看详情跳转
    getData() {
      this.loading = true;
      this.axios({
        method: "post",
        url: this.API_ROOT + "/home_api/animation/read",
        data: {
          id: this.$route.params.id
        },
        headers: this.$store.getters.Request_Head
      }).then(
        response => {
          if (this.getToken(response.data)) {
            this.information = response.data.data;
            this.role = response.data.data.role;
            if (response.data.data.method == 1) {
              this.methodType = "2D";
            } else if (response.data.data.method == 2) {
              this.methodType = "3D";
            } else {
              this.methodType = "其他";
            }

            //分享 处理
            let summary = response.data.data.summary;
            let title=response.data.data.cn_name;
            let fullPath = this.$route.fullPath;
            let pic = [response.data.data.banner];

            function loadScriptString(code) {
                var script = document.createElement("script");
                script.type = "text/javascript";
                try {
                    script.appendChild(document.createTextNode(code));
                } catch (ex) {
                    script.text = code;
                }
                document.body.appendChild(script);
            }
            loadScriptString("var jiathis_config = {summary:'"+summary+"',url:'http://authorize.cctvag.com/ysdh/web"+fullPath+"',title:'"+title+"',pic:'"+pic+"'}");
          }
          this.loading = false;
        },
        error => {
          this.$emit("API-ERR");
          this.loading = false;
        }
      );
    },
    //授权申请列表数据请求  保存到缓存中
    getsq_list() {
      this.axios({
        method: "post",
        url: this.API_ROOT + "/home_api/animation/authorize",
        data: {
          id: Number(this.$route.params.id)
        },
        headers: this.$store.getters.Request_Head
      }).then(
        response => {
          if (
            response.data &&
            response.data.status.code == 1001 &&
            response.data.data
          ) {
            this.shouquanData = response.data.data;
            let demo = [];
            $.each(response.data.data, function(index, item) {
              demo.push({ key: false, arr: [] });
            });
            this.check = demo;
            this.getcache();
          }
        },
        error => {
          this.$emit("API-ERR");
        }
      );
    },
    //跳转角色详情
    handleEdit(id) {
      this.$router.push({
        name: "jsxx-detail",
        params: {
          id: id
        }
      });
    },
    //跳转至成功案例
    handleEdit_title(id, type) {
      this.$router.push({
        name: "yansheng-cases",
        params: {
          id: id,
          type: type
        }
      });
    },
    //登录
    handleLogin() {
      if (JSON.stringify(this.uinfo) != "{}" && this.uinfo.token != null) {
        alert("已登录 跳转路由");
      } else {
        this.type = "login";
        this.dialogFormVisible_login = true;
      }
    },
    //给子组件调用的函数
    CB_dialogFormVisible_login(val) {
        if(val=="set_password"){
            this.passwordStatus = true;
        }
      this.dialogFormVisible_login = false;
    },

    //拿取用户授权申请提交缓存数据
    getcache() {
      if (this.shouquan_data[this.$route.params.id]) {
        let sq_Data = this.shouquan_data[this.$route.params.id];
        this.sizeForm.radio = sq_Data.radio;
        this.sizeForm.radio_detail = sq_Data.radio_detail;
        this.check = sq_Data.check;
      }
    },
    //必选
    change() {
      this.select = false;
    },
    change_s() {
      this.select_two = false;
    },

    //全选 || 全不选
    handleCheckAllChange(val, data, index) {
      if (val) {
        var arr = [];
        data.forEach(function(item, index) {
          arr.push(item.id);
        });
        this.check[index].arr = arr;
      } else {
        this.check[index].arr = [];
      }
    },
    //全选的样式改变控制
    handleCheckedCitiesChange(value, data, index) {
      let checkedCount = value.length;
      this.check[index].key = checkedCount === data.length;
    },

    onSubmit() {
      //是否登录的判断 需要再测试完善
      if (
        JSON.stringify(this.$store.state.uinfo) != "{}" &&
        this.$store.state.uinfo.token != null
      ) {
        //首先判断 是否开启了可选的授权申请列表
        if(this.shouquanData && this.shouquanData.length == 0) {
          this.$message({
            showClose: true,
            message: "暂无可申请的授权品类",
            type: "error"
          });
          return;
        }
        //必选判断是否选中
        if (!this.sizeForm.radio) {
          this.select = true;
          this.$message({
            showClose: true,
            message: "请选择授权权利",
            type: "error"
          });
          return;
        }
        if (!this.sizeForm.radio_detail) {
          this.select_two = true;
          this.$message({
            showClose: true,
            message: "请选择是否转授权",
            type: "error"
          });
          return;
        }

        //提交用户数据到缓存中
        let duoxuan = false;
        this.check.forEach(function(item, index) {
          if (item.arr && item.arr.length > 0) {
            duoxuan = true;
            return false;
          }
        });
        if (!duoxuan) {
          this.$message({
            showClose: true,
            message: "请至少选择一种授权品类",
            type: "error"
          });
          return;
        }
        let shuju = {
          donghua: this.information,
          uinfo: this.$store.state.uinfo.token,
          check: this.check,
          radio: this.sizeForm.radio,
          radio_detail: this.sizeForm.radio_detail,
          shouquanpinlei: this.shouquanData
        };
        let data = this.shouquan_data;
        data[this.information.id] = shuju;
        this.$store.commit("setshouquan_data", data);
        this.$router.push({
          name: "shenqingshouquan",
          params: {
            id: this.$route.params.id
          }
        });
      } else {
        this.dialogFormVisible_login = true;
      }
    },
    //修改密码
    setPassword() {
      this.passwordStatus = true;
    },
    CB_setPasswordStatus(val) {
      this.passwordStatus = false;
    },
    init: function() {
      this.loading_fx=true;
      let url ="http://v3.jiathis.com/code/jia.js";
      let str="utf-8";
      let script = document.createElement("script");
      script.setAttribute("src", url);
      script.setAttribute("charset", str);
      document.getElementsByTagName("body")[0].appendChild(script);
      // script.onload=()=> {
      //   this.loading_fx=false;
      // }
    }
  },
  //计算属性
  computed: mapState({
    uinfo: state => state.uinfo,
    shouquan_data: state => state.shouquan_data
  }),
  components: {
    Login,
    Roleslnformation,
    SetPassWord
  }
};
</script>
<style scoped>
.dhp-list-txt-bg {
  background: -moz-linear-gradient(top, transparent, #fff);
  background: -webkit-gradient(top, transparent, #fff);
  background: -o-linear-gradient(top, transparent, #fff);
  background: -ms-linear-gradient(top, transparent, #fff);
  background: linear-gradient(top, transparent, #fff);
}
</style>
