<template>
    <div class="dhp-details">
        <div class="dhp-details-top padding-top-50 padding-bottom-20">
            <div class="warp">
                <h1 class="font-30 no-margin dhp-details-h1">
                    <div class="aui-ellipsis-1">{{information.name}}</div>
                </h1>
                <div class="dhp-details-bianhao font-14 margin-top-20">
                    角色编号：
                    <span class="font-16">{{information.number}}</span>
                    <!-- <div class="fenxiang">
                        分享：
                        <i class="fa fa-weixin margin-right-5" aria-hidden="true"></i>
                        <i class="fa fa-qq" aria-hidden="true"></i>
                    </div> -->
                </div>
            </div>
        </div>
        <div class="jsxx-details-jianjie padding-top-25">
            <div class="warp">
                <el-row :gutter="40">
                    <el-col :xs="24" :sm="19" :md="19" :lg="19" :xl="19">
                        <el-row :gutter="40">
                            <el-col :xs="24" :sm="10" :md="10" :lg="10" :xl="10">
                                <div class="jsxx-details-img">
                                    <img :src="information.img" :onerror="errorImg" alt="" style="max-width:354px;max-height:385px">
                                </div>
                            </el-col>
                            <el-col :xs="24" :sm="14" :md="14" :lg="14" :xl="14">
                                <div class="font-18 dhp-details-right-title margin-bottom-15">
                                    <b>角色星级</b>
                                </div>
                                <el-rate v-model="star" disabled text-color="#ff9900" disabled-void-color="#b1bcc8" class="padding-bottom-20 margin-bottom-15">
                                </el-rate>
                                <div class="font-18 dhp-details-right-title margin-bottom-15">
                                    <b>性格描述</b>
                                </div>
                                <div class="dhp-list-main">
                                    <div class="dhp-list-txt font-14 margin-bottom-20 aui-ellipsis-4" v-if="!is_chakan">
                                        {{information.description}}
                                        <div class="dhp-list-txt-bg"></div>
                                    </div>
                                    <div class="font-14 margin-bottom-20" v-html="information.content" v-if="is_chakan">
                                    </div>
                                    <span class="font-12" style="cursor:pointer" @click="chakan" v-if="!is_chakan">查看详细</span>
                                    <span class="font-12" style="cursor:pointer" @click="chakan" v-if="is_chakan">收起</span>
                                </div>
                                <div v-if="information.authentic=='3'" class="font-18 dhp-details-right-title margin-bottom-15 margin-top-30">
                                    <b>标准色值</b>
                                    <span class="font-14 padding-left-30">Pantone色值</span>
                                </div>
                                <!-- <el-button v-if="information.authentic!='3'" type="info" size="medium" class="margin-top-40 margin-bottom-40 padding-left-50 padding-right-50"><b>成为合作伙伴查看专业数据</b></el-button> -->
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :xs="24" :sm="5" :md="5" :lg="5" :xl="5">
                        <div class="dhp-details-ysxg">
                            <div class="dhp-xinxi-title font-18 margin-bottom-20 padding-left-15">
                                <b>衍生相关</b>
                            </div>
                            <div @click="handleEdit_title(information.id,2)">
                                <el-button type="info" class="btn-block no-margin-left margin-bottom-10">
                                    <i class="fa fa-diamond" aria-hidden="true"></i>成功案例</el-button>
                            </div>
                            <span v-for="item in information.derivative" :key="item.id">
                                <a :href="item.url" target="_blank" id="content">
                                    <el-button type="info" class="btn-block no-margin-left margin-bottom-10" v-if="item.url !== ''" id="btn">
                                        <i class="aui-iconfont aui-icon-crown" id="btn"></i>{{item.label}}</el-button>
                                </a>
                            </span>
                        </div>
                    </el-col>
                </el-row>

            </div>
        </div>
        <div class="jsxx-details-down margin-top-40">
            <div class="warp">
                <el-row :gutter="40">
                    <el-col :xs="24" :sm="19" :md="19" :lg="19" :xl="19">
                        <div v-if="information_cartoon.length>0">
                            <div class="dhp-xinxi-title font-18 margin-bottom-20 padding-left-15">
                                <b>来自动画片</b>
                                <router-link :to="{name:'donghuapian'}" class="font-14">更多 > </router-link>
                            </div>
                            <el-row :gutter="20" class="margin-bottom-30">
                                <el-col :xs="24" :sm="6" class="juese-xx-list-box" :key="item.id" v-for="item in information_cartoon">
                                    <div class="juese-xx-list margin-bottom-25">
                                        <div>
                                            <div class="jsxx-list-img" style="cursor:pointer">
                                                <img :src="item.original" alt="" @click="handleEdit(item.id)">
                                            </div>
                                            <div class="jsxx-list-txt margin-top-10 font-14" @click="handleEdit(item.id)" style="cursor:pointer">{{item.cn_name}}</div>
                                        </div>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                        <el-tabs type="border-card" v-if="information.picture&&information.two&&information.five_views&&information.authentic=='3'">
                            <el-tab-pane label="五视图" v-if="information.five_views">
                                <div class="nav-card-txt">
                                    <a class="text-info" style="cursor:pointer" download="五视图" :href="information.five_views">五视图
                                        <i class="fa fa-cloud-download margin-left-5" aria-hidden="true"></i>
                                    </a>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="二维转换图" v-if="information.two">
                                <div class="nav-card-txt">
                                    <a class="text-info" style="cursor:pointer" download="二维转换图" :href="information.two">二维转换图
                                        <i class="fa fa-cloud-download margin-left-5" aria-hidden="true"></i>
                                    </a>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="原图（精选）" v-if="information.picture">
                                <div class="nav-card-txt">
                                    <a class="text-info" style="cursor:pointer" download="原图" :href="information.picture">原图
                                        <i class="fa fa-cloud-download margin-left-5" aria-hidden="true"></i>
                                    </a>
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  activated: function() {
    this.is_chakan = false;
    if (this.$route.params.id) {
      this.getData();
    }
  },
  data() {
    return {
      information_cartoon: [],
      information: "",
      star: 0,
      is_chakan: false,
      errorImg: 'this.src="' + require("../../assets/img/ysdh.jpg") + '"'
    };
  },
  methods: {
    chakan() {
      this.is_chakan = !this.is_chakan;
    },
    getData() {
      this.loading = true;
      this.axios({
        method: "post",
        url: this.API_ROOT + "/home_api/character/read",
        data: {
          id: this.$route.params.id
        },
        headers: this.$store.getters.Request_Head
      }).then(
        response => {
          if (this.getToken(response.data)) {
            this.information_cartoon = response.data.data.cartoon;
            this.information = response.data.data;
            this.star = response.data.data.star;
          }
          this.loading = false;
        },
        error => {
          this.$emit("API-ERR");
          this.loading = false;
        }
      );
    },
    handleEdit(id) {
      this.$router.push({
        name: "dhp-detail",
        params: {
          id: id
        }
      });
    },
    //动画相关跳转详情
    handleEdit_title(id, type) {
      this.$router.push({
        name: "yansheng-cases",
        params: {
          id: id,
          type: type
        }
      });
    }
  },
  computed: {}
};
</script>
<style scoped>
.dhp-list-txt-bg {
  background: -moz-linear-gradient(top, transparent, #f8f8f8);
  background: -webkit-gradient(top, transparent, #f8f8f8);
  background: -o-linear-gradient(top, transparent, #f8f8f8);
  background: -ms-linear-gradient(top, transparent, #f8f8f8);
  background: linear-gradient(top, transparent, #f8f8f8);
}
</style>
