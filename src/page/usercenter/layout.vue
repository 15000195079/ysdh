<template>
  <div class="bg-gray-light padding-top-30">
    <el-container class="warp">
      <el-aside width="115px">
        <el-menu :default-active="user_url" :active="user_url" class="el-menu-vertical-demo" :router="true" background-color="#f5f6f8" @select="handleSelect">
          <div class="text-dark bord-btm padding-bottom-10 mar-btm user-title">用户中心</div>
          <el-menu-item :route="{name:'ucenter_home'}" index="ucenter_home" class="font-130 no-padding">
            <!-- <i class="fa fa-tachometer"></i> -->
            <span slot="title" onselectstart="return false;">我的面板</span>
            <i class="aui-iconfont aui-icon-right"></i>
          </el-menu-item>
          <el-menu-item :route="{name:'myShouquan'}" index="myShouquan" class="font-130 no-padding">
            <!-- <i class="fa fa-sitemap"></i> -->
            <span slot="title" onselectstart="return false;">我的授权</span>
            <i class="aui-iconfont aui-icon-right"></i>
          </el-menu-item>
          <el-menu-item :route="{name:'myHetong'}" index="myHetong" class="font-130 no-padding">
            <!-- <i class="fa fa-file-text"></i> -->
            <span slot="title" onselectstart="return false;">我的合同</span>
            <i class="aui-iconfont aui-icon-right"></i>
          </el-menu-item>
          <el-menu-item :route="{name:'sq_chanpin'}" index="sq_chanpin" class="font-130 no-padding">
            <!-- <i class="fa fa-cubes"></i> -->
            <span slot="title" onselectstart="return false;">授权产品</span>
            <i class="aui-iconfont aui-icon-right"></i>
          </el-menu-item>
          <el-menu-item :route="{name:'message'}" index="message" class="font-130 no-padding">
            <i class="fa fa-bell" style="display: block !important;color:red !important" v-if="show"></i>
            <span slot="title" onselectstart="return false;">通知中心</span>
            <i class="aui-iconfont aui-icon-right"></i>
          </el-menu-item>
          <el-menu-item :route="{name:'zhichishenqing'}" index="6" class="font-130 no-padding">
            <!-- <i class="fa fa-envelope"></i> -->
            <span slot="title" onselectstart="return false;">支持申请</span>
            <i class="aui-iconfont aui-icon-right"></i>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-main class="margin-left-40 margin-bottom-40 user-right-main">
        <keep-alive>
          <router-view @read="read">
            此处显示用户中心右侧内容
          </router-view>
        </keep-alive>
      </el-main>
    </el-container>
  </div>
</template>

<script>
//导入vuex辅助函数
import { mapState } from "vuex";
export default {
  // 当切入路由时，执行该方法
  activated() {
    this.getMessage(); //通知中心是否读取的判断(缓存数据)
  },
  //数据绑定
  data() {
    return {
      show: false, //点点是否显示
      notice: false, //去重判断用户通知是否已读
      letter: false //站内信是否已读
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      this.$store.commit("setUserUrl", key);
    },
    //用户查看通知站内信时发射事件的接收
    read(num) {
      this.getMessage();
    },
    //重要通知
    getMessage() {
      this.axios({
        method: "post",
        url: this.API_ROOT + "/home_api/member/important",
        data: {},
        headers: this.$store.getters.Request_Head
      }).then(
        response => {
          if (this.getToken(response.data)) {
            //获取仓库上次存储的数据/初始数据
            let notice_data = this.notice_id;
            //通过指定用户ID存储每个用户的数据
            notice_data[this.uinfo.id] = response.data.data.id;
            //用户站内信息是否已读判断  后台返回
            this.letter = response.data.data.info;

            //存储到缓存中
            this.$store.commit("setnotice_id", notice_data);
            this.getJudgment();
          }
        },
        error => {
          this.$emit("API-ERR");
        }
      );
    },
    //通知是否已读 点点判断是否显示
    getJudgment() {
      $.each(this.notice_id[this.uinfo.id], (index, item) => {
        if (
          this.click_noticeid[this.uinfo.id] == undefined ||
          this.click_noticeid[this.uinfo.id].indexOf(item) == -1
        ) {
          this.notice = false;
          return false;
        } else {
          this.notice = true;
        }
      });
      if (this.notice && this.letter) {
        this.show = false;
      } else {
        this.show = true;
      }
    }
  },
  //计算属性
  computed: mapState({
    uinfo: state => state.uinfo,
    user_url: state => state.user_url,
    notice_id: state => state.notice_id,
    click_noticeid: state => state.click_noticeid
  })
};
</script>
<style>
.card-head-bg,
.user-right-main .blue-title.el-table th {
  background-color: #daf0ff;
}
</style>

<style scoped>
.el-menu {
  border: 0px;
  background-color: none;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  min-height: 650px;
  text-align: center;
  margin: 0px;
  padding: 0px;
}
.bord-btm {
  border-bottom: 4px solid #f56c6c;
}
.el-menu-item {
  line-height: 50px;
  height: 50px;
  padding: 0px;
  text-align: left;
  -webkit-transition: all 0.25s ease;
  -moz-transition: all 0.25s ease;
  -ms-transition: all 0.25s ease;
  -o-transition: all 0.25s ease;
  transition: all 0.25s ease;
}
.el-menu-item i {
  /*display: none;*/
  float: right;
  display: none;
}
.el-menu-item.is-active {
  padding-left: 6px !important;
}
.el-menu-item:focus,
.el-menu-item:hover {
  background-color: transparent !important;
}
.el-menu-item.is-active i {
  display: block;
}
.user-title {
  text-align: left;
  font-size: 28px;
}
.el-table__fixed,
.el-table__fixed-right {
  overflow: visible;
}
[class*=" fa"],
[class^="fa-"] {
  font-size: 16px;
  margin-right: 6px;
  color: #979797;
}
</style>
