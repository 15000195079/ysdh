<template>
    <el-container class="no-padding">
        <el-header class="head-bg padding-left-10">
            <div class="warp">
                <el-row :gutter="10">
                    <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
                        <div class="logo">
                            <img src="./assets/img/logo.jpg" alt="" @click="tohome" style="cursor:pointer;">
                        </div>
                    </el-col>
                    <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
                        <div class="shouquan">
                            <span>授权中心</span>
                        </div>
                    </el-col>
                    <el-col :xs="16" :sm="16" :md="16" :lg="16" :xl="16">
                        <div class="nav">
                            <el-menu :default-active="navmenu" :active="navmenu" class="el-menu-demo" mode="horizontal" background-color="transparent" text-color="#fff" active-text-color="#ffd04b" @select="handleSelect">
                                <el-menu-item index="donghuapian">动画片名</el-menu-item>
                                <el-menu-item index="juesexingxiang">角色形象</el-menu-item>
                                <el-menu-item index="news-shouquanfabu">授权发布</el-menu-item>
                                <el-menu-item index="news-redianzixun">热点资讯</el-menu-item>
                                <el-menu-item index="hezuohuoban">合作伙伴</el-menu-item>
                                <el-menu-item index="chenggonganli">成功案例</el-menu-item>
                                <el-menu-item index="contact-us">联系我们</el-menu-item>
                                <el-menu-item index="web">央视动画官网</el-menu-item>
                            </el-menu>
                        </div>
                    </el-col>
                    <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
                        <div class="log-zc" style="cursor:pointer;" v-if="!uinfo.type">
                            <a class="active" @click="handleLogin">登录</a>
                            <a @click="handleRegin">注册</a>
                        </div>
                        <!-- 登录成功 开始，修改资料和密码采用弹窗形式 -->
                        <div class="user-img" v-if="uinfo.type">
                            <el-popover ref="popover4" width="150" placement="bottom" trigger="hover">
                                <el-row>
                                    <button class="btn  margin-bottom-5" style="width:100%;;border-bottom: 1px dashed #DEDEDE;" @click="handleEdit">
                                        <i class="el-icon-edit-outline margin-right-5"></i> 修改资料
                                    </button>
                                    <button class="btn margin-bottom-5" style="width:100%;border-bottom: 1px dashed #DEDEDE;" @click="setPassword">
                                        <i class="ti-key margin-right-5"></i> 修改密码
                                    </button>
                                    <button class="btn " style="width:100%;" @click="loginout">
                                        <i class="ti-power-off margin-right-5"></i> 注销登录
                                    </button>
                                </el-row>
                            </el-popover>
                            <el-button v-popover:popover4 type="text" class="textButton" @click="handleInfo">
                                <a><img :src="uinfo.head" alt=""></a>
                            </el-button>

                        </div>
                        <!-- 登录成功 结束 -->
                    </el-col>
                </el-row>

            </div>
        </el-header>
        <el-main class="margin-top-60">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </el-main>

        <el-footer height="" class="margin-bottom-50 padding-top-50 copy-top">
            <div class="warp">
                <el-row :gutter="10">
                    <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                        <div class="quick_menu">
                            <span class="margin-bottom-20">授权说明</span>
                            <router-link :to="{name:'about',params:{id:2}}">独家授权</router-link>
                            <router-link :to="{name:'about',params:{id:3}}">内容授权</router-link>
                            <router-link :to="{name:'about',params:{id:4}}">商品授权</router-link>
                            <router-link :to="{name:'about',params:{id:5}}">促销授权</router-link>
                        </div>
                    </el-col>
                    <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                        <div class="quick_menu">
                            <span class="margin-bottom-20">如何授权？</span>
                            <router-link :to="{name:'about',params:{id:6}}">注册资质</router-link>
                            <router-link :to="{name:'about',params:{id:7}}">资质尽调</router-link>
                            <router-link :to="{name:'about',params:{id:8}}">授权洽谈</router-link>
                            <router-link :to="{name:'about',params:{id:9}}">授权续约</router-link>
                        </div>
                    </el-col>
                    <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                        <div class="quick_menu">
                            <span class="margin-bottom-20">咨询信息</span>
                            <router-link :to="{name:'about',params:{id:10}}">授权资讯</router-link>
                            <router-link :to="{name:'chenggonganli'}">成功案例</router-link>
                            <router-link :to="{name:'about',params:{id:12}}">公告通知</router-link>
                            <router-link :to="{name:'about',params:{id:13}}">法律声明</router-link>
                        </div>
                    </el-col>
                    <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                        <div class="quick_menu">
                            <span class="margin-bottom-20">联系我们</span>
                            <router-link :to="{name:'about',params:{id:14}}">授权咨询</router-link>
                            <router-link :to="{name:'about',params:{id:15}}">市场合作</router-link>
                            <router-link :to="{name:'about',params:{id:16}}">公司地址</router-link>
                            <router-link :to="{name:'about',params:{id:17}}">举报投诉</router-link>
                        </div>
                    </el-col>
                    <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                        <div class="quick_saoma">
                            <span class="margin-bottom-20">微信微博</span>
                            <div><img src="./assets/img/ewm.jpg" alt=""></div>
                        </div>
                    </el-col>
                    <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                        <div class="quick_saoma">
                            <span class="margin-bottom-20">正品购买及验证</span>
                            <div><img src="./assets/img/xcxm.jpg" alt=""></div>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </el-footer>
        <el-footer class="copy" height="200px">
            <p>京ICP证070359 | 出版物经营许可证 |  网络文化经营许可证京网文[2014]2148-348号  |  违法和不良信息举报电话：4006561155</p>
            <p>Copyright ©2017 央视动画有限公司 版权所有</p>
        </el-footer>
        <el-button type="danger" class="scroll-top btn in" style="animation: jellyIn 0.9s;">
            <i class="fa fa-rocket"></i>
        </el-button>
        <!-- <div class="xuanfu">
            <div class="xf-weixin xf-btn margin-bottom-10">
                <i class="fa fa-weixin"></i>
                <div class="xf-txt margin-top-5">微信</div>
            </div>
            <div class="xf-fankui xf-btn margin-bottom-10">
                <i class="fa fa-envelope-o"></i>
                <div class="xf-txt margin-top-5">反馈</div>
            </div>
            <div class="xf-top xf-btn margin-bottom-10 scroll-top btn in" style="animation: jellyIn 0.8s;">
                <i class="fa fa-rocket"></i>
                <div class="xf-txt margin-top-5">置顶</div>
            </div>
        </div> -->
        <!-- 登录模态框 -->
        <Login :dialogFormVisible="dialogFormVisible" :type="type" @CB-dialogFormVisible="CB_dialogFormVisible"></Login>
        <!--编辑个人资料-->
        <ziliaoEdit :dialogStatus="dialogStatus" @CB-dialogStatus="CB_dialogStatus"></ziliaoEdit>
        <!-- 更改密码弹框 -->
        <SetPassWord :setPasswordStatus='passwordStatus' @CB-setPasswordStatus="CB_setPasswordStatus"></SetPassWord>

    </el-container>
</template>
<script>
import Vue from "vue";
import Element from "element-ui";
import Login from "@/components/login.vue";
import SetPassWord from "@/page/usercenter/setPassWord.vue";
import ziliaoEdit from "@/page/usercenter/gaiInfo.vue";
//导入vuex辅助函数
import { mapState } from "vuex";
import "element-ui/lib/theme-chalk/index.css";
import "@/assets/plugins/element-ui-theme/index.css";

//当前组件下引用适用全局的样式表，其他组件按需引用
import "@/assets/css/base.css";
import "@/assets/plugins/pace/pace.min.css";
import "@/assets/css/themify-icons.min.css";
import "@/assets/css/font-awesome.min.css";
import "@/assets/css/aui-iconfont.css";
import "@/assets/css/style.css";
import "@/assets/css/media.css";
import "@/assets/plugins/pace/pace.min.js";

Vue.use(Element);

export default {
  name: "app",
  data() {
    return {
      passwordStatus: false,
      dialogFormVisible: false,
      dialogStatus: false,
      checked: true,
      formLabelWidth: "120px",
      type: "login"
    };
  },
  //监听是否登出
  watch: {
    "uinfo.token": function(newValue, oldValue) {
      if (newValue == oldValue) return;
      if (typeof newValue == "undefined" || !newValue) {
        this.$router.push({
          name: "home"
        });
        this.$store.commit("setNavmenu", "");
      }
    }
  },
  created: function() {
    this.getlist();
    this.getcase();
  },
  methods: {
    //跳入用户中心
    handleInfo() {
      this.$router.push({
        name: "ucenter_home"
      });
      this.$store.commit("setNavmenu", "");
      this.$store.commit("setUserUrl", "ucenter_home");
    },
    //跳转首页
    tohome() {
      this.$router.push({
        name: "home"
      });
      this.$store.commit("setNavmenu", "");
    },
    //注册
    handleRegin() {
      this.type = "region";
      this.dialogFormVisible = true;
    },
    //登录
    handleLogin() {
      this.type = "login";
      this.dialogFormVisible = true;
    },
    //注销
    loginout() {
      this.lockout();
    },
    //获取字典表数据
    getlist() {
      this.axios({
        method: "post",
        url: this.API_ROOT + "/home_api/animation/gettag",
        data: {
          last_time: this.tcbq_data.last_time
        },
        headers: ""
      }).then(
        response => {
          if (
            response.data &&
            response.data.status.code == 1001 &&
            response.data.data
          ) {
            this.$store.commit("setTcbq_data", response.data.data);
          }
        },
        error => {
          this.$emit("API-ERR");
        }
      );
    },
    getcase() {
      this.axios({
        method: "post",
        url: this.API_ROOT + "/home_api/example/cate",
        data: {
          last_time: this.case_data.last_time
        },
        headers: ""
      }).then(
        response => {
          if (
            response.data &&
            response.data.status.code == 1001 &&
            response.data.data
          ) {
            this.$store.commit("seCcase_data", response.data.data);
          }
        },
        error => {
          this.$emit("API-ERR");
        }
      );
    },

    handleSelect(key, keyPath) {
      if (key == "web") {
        window.open("http://donghua.cctv.com/");
        return;
      }
      this.$router.push({
        name: key
      });
      this.$store.commit("setNavmenu", key);
    },
    //给子组件调用的函数
    CB_dialogFormVisible(val) {
      this.type = "";
      this.activeg = false;
      this.activel = false;
      this.dialogFormVisible = false;
      if (val == "set_password") {
        this.passwordStatus = true;
      }
    },
    //个人资料
    handleEdit() {
      this.dialogStatus = true;
    },
    CB_dialogStatus(val) {
      this.dialogStatus = false;
    },
    //修改密码
    setPassword() {
      this.passwordStatus = true;
    },
    CB_setPasswordStatus(val) {
      this.passwordStatus = false;
    }
  },
  //计算属性
  computed: mapState({
    tcbq_data: state => state.tcbq_data,
    case_data: state => state.case_data,
    navmenu: state => state.navmenu,
    uinfo: state => state.uinfo,
    shouquan_list: state => state.shouquan_list
  }),
  components: {
    Login,
    SetPassWord,
    ziliaoEdit
  }
};
</script>
<style scoped>
.textButton {
  padding: 0;
}

.buttonText {
  color: black;
}

.buttonText:hover {
  color: #ff8c00;
}

.el-menu-demo li hover {
  background-color: none;
}

.el-main {
  min-height: 1165px;
  overflow: visible;
}

.head-bg {
  background-color: rgba(206, 39, 12, 0.85);
}

.logo {
  margin-top: 8px;
}

.shouquan {
  line-height: 60px;
}

.shouquan span {
  color: #d2a19d;
  padding: 3px 5px;
  border: 1px solid #d2a19d;
  border-radius: 3px;
}

.el-menu-item,
.el-submenu__title {
  padding: 0 15px;
}

.quick_menu span,
.quick_saoma span {
  display: block;
  font-weight: bold;
  color: #696969;
  font-size: 14px;
}

.quick_menu a {
  display: block;
  color: #696969;
  font-size: 14px;
  line-height: 24px;
}

.quick_saoma {
  text-align: center;
}

.copy {
  text-align: center;
  background-color: #e9e9e9;
  color: #020202;
  padding: 55px 0 105px;
}

.copy-top {
  border-top: 1px solid #e5e5e5;
}

.xuanfu {
  position: fixed;
  right: 25px;
  top: 50%;
  width: 30px;
  text-align: center;
  color: #7a808f;
}

.xf-btn {
  cursor: pointer;
  margin-bottom: 10px;
}

.xf-btn .xf-txt {
  font-size: 12px;
  margin-top: 5px;
}

.xuanfu .scroll-top.in {
  display: block;
  /* background-color: #42a5f5; */
  color: #7a808f;
  cursor: pointer;
  position: relative;
  bottom: 0;
  right: 0;
  z-index: 999;
  opacity: 1;
  padding: 0;
  font-size: 12px;
  border-radius: 0;
  box-shadow: none;
  transition: all 0.15s;
}

.xuanfu .scroll-top.in > i {
  width: 100%;
  height: auto;
}
</style>
