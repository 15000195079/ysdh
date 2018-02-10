<template>
    <div class="warp">
        <el-row :gutter="40">
            <el-col :md="24">
                <div class="dhp-left margin-top-25">
                    <el-row :gutter="0">
                        <el-col :xs="24" :sm="10" :md="10" :lg="24" :xl="10">
                            <h1 class="dhp-h1 no-margin">与&nbsp;
                                <span style="color:#eb2521 !important">'{{name}}'</span>&nbsp;相关的成功案例
                                <span class="margin-left-30 font-14">共 {{total||'0'}} 条信息</span>
                            </h1>
                        </el-col>
                    </el-row>

                    <!-- 动画片列表 -->
                    <div v-loading="loading" element-loading-text="精彩即将出现…" style="min-height:200px">
                        <h4 align="center" class="text-danger" v-if="tableData&&tableData.length<1">暂时没有相关成功案例</h4>
                        <el-row v-else :gutter="0" class="margin-bottom-15 margin-top-30" v-for="(item,index) in tableData" :key="item.id">
                            <el-col :xs="24" :sm="5" :md="5" :lg="5" :xl="5">
                                <div class="dhp-list-img">
                                    <img :src="item.banner" alt="">
                                </div>
                            </el-col>
                            <el-col :xs="24" :sm="11" :md="11" :lg="11" :xl="12">
                                <div class="dhp-list-main margin-left-20">
                                    <h2 class="aui-ellipsis-1 font-18 no-margin">{{item.title}}</h2>
                                    <div style="margin-bottom:10px; margin-top:10px;">
                                        <span v-for="item in item.animation" :key="item.id">《{{item.cn_name}}》</span>
                                    </div>
                                    <div class="dhp-list-bq">
                                        <el-tag type="info" size="small" class="margin-right-10 margin-top-5" v-for="type_i in item.type" :key="type_i.id">{{type_i}}</el-tag>
                                    </div>

                                    <div class="dhp-list-txt  font-12 margin-top-15 margin-bottom-20">
                                        <b>案例简介</b>
                                        <div class="aui-ellipsis-3 margin-bottom-5">
                                            <span>{{caseData[index]}}</span>
                                            <span v-if="item.case.length > 70">...</span>
                                            <span class="font-12 padding-left-10" v-if="item.case.length > 70" style="cursor:pointer;color:#18A3E2" @click="handleEdit(item.id)">查看详细 > </span>
                                        </div>
                                    </div>

                                    <div class="keyansheng-sp" v-if="item.exa&&item.exa.length>0">
                                        <b>可售衍生商品</b>
                                        <div class="margin-top-10 case-yansheng-sp">
                                            <!-- 点击span标签，隐藏自身，同时.case-yansheng-sp高度自动 -->
                                            <router-link :to="{name:''}" v-if="hiddens[index].show ?dex<6 :true" class="margin-right-5" v-for="(vo,dex) in item.exa" :key="vo.id" :href="'http://'+vo.url" target="_blank">
                                                <img :src="vo.img" :title="vo.name">
                                            </router-link>

                                            <router-link :to="{name:''}" class="margin-right-5" v-if="btns[index].shows" @click.native="shows(index)">
                                                <b @click="shows(index)">···</b>
                                            </router-link>
                                        </div>
                                    </div>
                                </div>
                            </el-col>
                            <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
                                <div class="dhp-list-sq font-14">
                                    案例编号：
                                    <span class="font-16">{{item.number}}</span>
                                    <el-button type="danger" class="margin-top-60 font-16 padding-top-10 padding-bottom-10 padding-left-35 padding-right-35" @click="handleEdit(item.id)">查看动画片</el-button>
                                </div>
                            </el-col>
                            <el-col :span="24" class="margin-top-25">
                                <hr>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import Vue from "vue";
//导入vuex辅助函数
import { mapState } from "vuex";

export default {
  activated: function() {
    let new_tc_check = [];
    $.each(this.tcChoose_data, function(index, item) {
      new_tc_check.push(item.name);
    });
    this.tc_check = new_tc_check;

    let new_bq_check = [];
    $.each(this.bqChoose_data, function(index, item) {
      new_bq_check.push(item.name);
    });
    this.bq_check = new_bq_check;
    this.getData();
  },
  deactivated: function() {
    this.tableData = [];
    this.total = 0;
  },
  data() {
    return {
      hiddens: {
        //可售衍生图片判断
      },
      btns: {
        //可售衍生按钮判断
      },
      total: 0,
      loading: false,
      currentPage: 1,
      keys: "",
      tableData: [],
      _order: "",
      _sort: "",
      name: "",
      caseData: [] //案例简介过长处理
    };
  },
  methods: {
    //跳转
    handleEdit(id) {
      this.$router.push({
        name: "case_donghuapian",
        params: {
          id: id
        }
      });
    },
    //获取数据
    getData() {
      //请求数据
      this.loading = true;
      this.axios({
        method: "post",
        url: this.API_ROOT + "/home_api/Animation/relat",
        data: {
          // listRows: 5,
          id: this.$route.params.id,
          type: this.$route.params.type
        },
        headers: this.$store.getters.Request_Head
      }).then(
        response => {
          if (
            this.getToken(response.data) &&
            response.data.data &&
            response.data.data.data
          ) {
            this.tableData = response.data.data.data;
            this.total = response.data.data.data.length;
            this.name = response.data.data.name;

            let data = [];
            let btn_data = [];
            //可售衍生品的判断处理
            $.each(response.data.data.data, function(index, item) {
              item.show = true;
              data.push(item);
              if (item.exa.length > 6) {
                item.shows = true;
                btn_data.push(item);
              } else {
                item.shows = false;
                btn_data.push(item);
              }
            });
            this.hiddens = data;
            this.btns = btn_data;
            //案例简介字符过长 截取处理
            let case_arr = [];
            $.each(response.data.data.data, function(index, item) {
              if (item.case.length > 70) {
                let str = item.case.substring(0, 70);
                case_arr.push(str);
              } else {
                case_arr.push(item.case);
              }
            });
            this.caseData = case_arr;
          }
          this.loading = false;
        },
        error => {
          this.loading = false;
          this.$emit("API-ERR");
        }
      );
    },
    //一页多少条
    handleSizeChange(val) {
      this.$store.commit("setPageSize", val);
      this.getData();
    },

    //页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getData();
    },
    KeysChange(val) {
      this.keys = val.replace(/[\'\"]/g, "");
      this.getData();
    },
    //点击查看所有可售衍生品
    shows(index) {
      this.hiddens[index].show = false;
      this.btns[index].shows = false;
      this.$forceUpdate();
    }
  },
  //计算属性
  computed: mapState({
    tcbq_data: state => state.tcbq_data,
    tcChoose_data: state => state.tcChoose_data,
    bqChoose_data: state => state.bqChoose_data,
    _pageSize: state => state.pageSize,
    _pageSizes: state => state.pageSizes
  })
};
</script>
<style scoped>
.dhp-h1 {
  font-size: 28px;
  font-weight: normal;
}

.dhp-h1 span {
  color: #888;
  display: inline-block;
}

.dhp-search {
  float: right;
  width: 80%;
}

.dhp-list-img-bg {
  background: -moz-linear-gradient(top, transparent, rgba(0, 0, 0, 0.5));
  background: -webkit-gradient(top, transparent, rgba(0, 0, 0, 0.5));
  background: -o-linear-gradient(top, transparent, rgba(0, 0, 0, 0.5));
  background: -ms-linear-gradient(top, transparent, rgba(0, 0, 0, 0.5));
  background: linear-gradient(top, transparent, rgba(0, 0, 0, 0.6));
}

.dhp-list-txt-bg {
  background: -moz-linear-gradient(top, transparent, #fff);
  background: -webkit-gradient(top, transparent, #fff);
  background: -o-linear-gradient(top, transparent, #fff);
  background: -ms-linear-gradient(top, transparent, #fff);
  background: linear-gradient(top, transparent, #fff);
}
</style>
