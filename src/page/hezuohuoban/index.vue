<template>
    <div class="warp">
        <div class="dhp-left margin-top-25">
            <h1 class="dhp-h1 no-margin-top margin-bottom-20">合作伙伴</h1>
            <!-- banner -->
            <el-carousel indicator-position="none" height="410px" :arrow="formData.length>1?'hover' :'never'" v-if="formData.length>0">
                <el-carousel-item v-for="(item,index) in formData" :key="index">
                    <div class="sqfb-banner-img huoban-banner-img">
                        <img :src="item.imgx" :onerror="logo" alt="">
                        <div class="sqfb-banner-txt font-18">
                            <span class="font-28 padding-top-50 padding-bottom-45 padding-left-120 padding-right-120">{{item.title}} </span>
                        </div>
                    </div>
                </el-carousel-item>
            </el-carousel>
            <!-- 检索栏 -->
            <div class="hezuohuoban-jiansuo margin-top-25 margin-bottom-15">
                <el-row>
                    <el-col :xs="24" :sm="18" :md="18" :lg="18">
                        <el-cascader :options="options" v-model="area" clearable style="width:40%" @change="handleChange" size="medium" filterable change-on-select placeholder="按照区域检索合作伙伴">
                        </el-cascader>
                    </el-col>
                    <el-col :xs="24" :sm="6" :md="6" :lg="6">
                        <el-input placeholder="检索：合作伙伴名称、电话" v-model="keys" @change="ChangeKeys" size="medium" clearable class="input-with-select">
                            <el-button slot="append" icon="el-icon-search"></el-button>
                        </el-input>
                    </el-col>
                </el-row>
            </div>
            <hr class="margin-bottom-20">
            <div v-if="tableData.length>0">
                <div class="huoban-list">
                    <el-row :gutter="36">
                        <el-col :xs="24" :md="8" :sm="8" v-for="(item, index) in tableData" :key="index">
                            <el-card :body-style="{ padding: '0px' }" class="margin-bottom-30">
                                <div class="huoban-list-img">
                                    <img :src="item.img_s" :onerror="logo" width="340 " height="205" @click="handleImg">
                                    <!-- 选中样式 加 active -->
                                    <span class="">{{item.area[0]}}</span>
                                    <div class="hzhb-ewm" v-if="item.code!=''">
                                        <img :src="item.code" alt="">
                                    </div>
                                </div>
                                <div class="padding-top-15 padding-left-5 padding-right-5">
                                    <div class="font-18 textTitle aui-ellipsis-1">
                                        <el-tooltip class="item" effect="dark" :content="item.name" placement="top-start">
                                            <b>{{item.name}}</b>
                                        </el-tooltip>
                                    </div>
                                    <div class="bottom clearfix margin-top-10 margin-bottom-10 huoban-list-jianjie huoban-list-height">
                                        地址：{{item.address}}<br> 电话：{{item.phone?item.phone:'--'}}
                                        <br>
                                        <span v-if="item.link">网址：
                                            <a :href="'http://'+item.link" target="_blank" class="text-blue" style="color:#128ef2;">{{item.link}}</a>
                                            <span v-if="!item.link">{{'--'}}</span>
                                        </span>
                                    </div>
                                </div>
                            </el-card>
                        </el-col>
                    </el-row>
                </div>
                <!-- 分页 -->
                <div class="fenye margin-top-20" v-if="tableData.length>0">
                    <el-pagination layout="prev, pager, next" :total="total" :current-page="currentPage" @current-change="handleCurrentChange" :page-size="9" prev-text="上一页" next-text="下一页">
                    </el-pagination>
                </div>
            </div>
            <el-row v-if="tableData.length==0">
                <div class="font-16 margin-top-20 margin-bottom-20" align="center">暂无相关数据~~</div>
            </el-row>
            <!-- 筛选结果  结束 -->
        </div>
    </div>
</template>
<script>
import Vue from "vue";
//导入vuex辅助函数
import { mapState } from "vuex";

//导入省市区数据源
import addrData from "@/assets/addrData.json";

export default {
  activated: function() {
    this.getData();
    this.getAdvert();
  },
  data() {
    return {
      total: 0,
      loading: false,
      currentPage: 1,
      keys: "",
      tableData: [],
      formData: [],
      _order: "",
      _sort: "",
      seach_data: "",
      options: addrData,
      area: [],
      dialogStatus: false,
      checkboxGroup5: [],
      logo: 'this.src="' + require("../../assets/img/defalt.jpg") + '"'
    };
  },
  //   mounted: {},
  methods: {
    //二维码
    handleImg() {
      this.dialogStatus = true;
    },
    //接收子组件数据
    CB_dialogStatus(val) {
      this.dialogStatus = false;
    },
    //检索
    ChangeKeys(val) {
      this.keys = val.replace(/[\'\"]/g, "").trim();
      this.getData();
    },
    //下拉筛选
    handleChange(val) {
      this.getData();
    },
    //获取数据
    getData() {
      this.loading = true;
      this.axios({
        method: "post",
        url: this.API_ROOT + "/home_api/partner",
        data: {
          keys: this.keys,
          listRows: 9,
          page: this.currentPage,
          area: this.area
        },
        headers: this.$store.getters.Request_Head
      }).then(
        response => {
          if (this.getToken(response.data)) {
            this.tableData = response.data.data;
            this.total = response.data.count;
          }
          this.loading = false;
        },
        error => {
          this.loading = false;
          this.$emit("API-ERR");
        }
      );
    },
    //获取广告
    getAdvert() {
      this.axios({
        method: "post",
        url: this.API_ROOT + "/home_api/guanggao",
        data: {
          type: 11,
          listRows: 2
        }
      }).then(
        response => {
          if (this.getToken(response.data)) {
            this.formData = response.data.data;
          }
        },
        error => {
          this.$emit("API-ERR");
        }
      );
    },
    //页面切换
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getData();
    }
  }

  //   computed: {}
};
</script>
<style scoped>
.huoban-list-height {
  height: 60px;
}

.textTitle {
  height: 22px;
}
</style>
