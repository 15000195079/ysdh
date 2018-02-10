<template>
    <div class="warp">
        <el-row :gutter="40">
            <el-col :xs="24" :md="17">
                <div class="dhp-left margin-top-25">
                    <el-row :gutter="0" v-if="show" class="margin-bottom-20">
                        <el-col :xs="24" :sm="10" :md="10" :lg="24" :xl="10">
                            <h1 class="dhp-h1 no-margin">与&nbsp;
                                <span style="color:#eb2521 !important">'{{total}}'</span>&nbsp;相关的成功案例
                                <span class="margin-left-30 font-14">共 {{tableData.length||'0'}} 条信息</span>
                            </h1>
                        </el-col>
                    </el-row>

                    <div v-else>
                        <el-row :gutter="0">
                            <el-col :xs="24" :md="10">
                                <h1 class="dhp-h1 no-margin">动画片名
                                    <span class="margin-left-30 font-14">共 {{total}} 部动画片</span>
                                </h1>
                            </el-col>
                            <el-col :xs="24" :md="14">
                                <div class="dhp-search">
                                    <el-input placeholder="检索：动画片名、编号、人物" v-model="keys" size="medium" class="input-with-select" @change="KeysChange" clearable>
                                        <el-button slot="append" icon="el-icon-search"></el-button>
                                    </el-input>
                                </div>
                            </el-col>
                        </el-row>
                        <!-- 筛选  开始 -->
                        <div class="shuaixuan-box margin-top-15">
                            <div class="shuaixuan-row">
                                <div class="shuaixuan-left padding-10">
                                    <span>题材：</span>
                                </div>
                                <div class="shuaixuan-right padding-10">
                                    <el-checkbox-group v-model="tc_check" size="small">
                                        <el-checkbox :label="tc.name" border :key="tc.id" v-for="tc in tcbq_data.tc_data" class="margin-top-5 margin-bottom-5">
                                            <span class="aui-ellipsis-1 no-padding">{{tc.name}}</span>
                                            <i class="fa fa-window-close" aria-hidden="true"></i>
                                        </el-checkbox>
                                    </el-checkbox-group>
                                </div>
                            </div>
                            <div class="shuaixuan-row">
                                <div class="shuaixuan-left padding-10">
                                    <span>标签：</span>
                                </div>
                                <div class="shuaixuan-right padding-10">
                                    <el-checkbox-group v-model="bq_check" size="small">
                                        <el-checkbox :label="bq.name" border :key="bq.id" v-for="bq in tcbq_data.bq_data" class="margin-top-5 margin-bottom-5">
                                            <span class="aui-ellipsis-1 no-padding">{{bq.name}}</span>
                                            <i class="fa fa-window-close" aria-hidden="true"></i>
                                        </el-checkbox>
                                    </el-checkbox-group>
                                </div>
                            </div>
                        </div>
                        <!-- 筛选  结束 -->
                        <!-- 筛选结果  开始 -->
                        <!-- 头部 -->
                        <div class="sx-jieguo-title margin-top-30 margin-bottom-20 padding-bottom-15">
                            全部
                            <span v-if="(tcChoose_data&&tcChoose_data.length>0)||(bqChoose_data&&bqChoose_data.length>0)">
                                &nbsp;&nbsp;&nbsp;>&nbsp;&nbsp;&nbsp;
                                <span class="guanjianzi font-12">
                                    <span :key="tc.id" v-for="(tc,index) in tcChoose_data">
                                        <span v-if="index>0">、</span>{{tc.name}}</span>
                                    <span :key="bq.id" v-for="(bq,index) in bqChoose_data">
                                        <span v-if="tcChoose_data.length!=0||(tcChoose_data.length==0&&index!=0)">、</span>{{bq.name}}</span>
                                    <i class="fa fa-window-close margin-left-10" aria-hidden="true" style="cursor:pointer;" @click="allclear"></i>
                                </span>
                            </span>
                            <!-- 当前关键词检索时 -->
                            <span v-if="keys">
                                &nbsp;&nbsp;&nbsp;> &nbsp;&nbsp;&nbsp; {{keys}}
                            </span>
                            <span class="sx-jieguo-num" v-if="sertch && keys|| sertch && bq_check.length>0 ||sertch && tc_check.length>0">共 {{result}} 个结果 </span>
                        </div>
                    </div>
                    <!-- 动画片列表 -->
                    <div v-loading="loading" element-loading-text="精彩即将出现…" style="min-height:200px">
                        <h4 class="text-danger" align="center" v-if="tableData.length==0">哎呦！您太细致了，换个条件再试试吧！</h4>
                        <el-row :gutter="0" class="margin-bottom-30" v-for="item in tableData" :key="item.id">
                            <el-col :xs="24" :sm="5" :md="5" :lg="5" :xl="5">
                                <div class="dhp-list-img" @click="handleEdit(item.id)" style="cursor:pointer">
                                    <span><img :src="item.banner" alt=""></span>
                                    <div class="dhp-list-img-bg">
                                        <span class="font-12 margin-top-25 margin-left-10">全{{item.episodes}}集</span>
                                    </div>
                                </div>
                            </el-col>
                            <el-col :xs="24" :sm="11" :md="11" :lg="11" :xl="12">
                                <div class="dhp-list-main margin-left-20">
                                    <h2 class="aui-ellipsis-1 font-18 margin-top-0" @click="handleEdit(item.id)" style="cursor:pointer">{{item.cn_name}}</h2>
                                    <div class="dhp-list-bq">
                                        <el-tag type="info" size="small" class="margin-right-5 margin-bottom-5" :class="tc_check.indexOf(type)!='-1'||bq_check.indexOf(type)!='-1' ? 'active':''" disable-transitions v-for="type in item.subject" :key="type.id">{{type}}</el-tag>
                                    </div>
                                    <div class="dhp-list-txt aui-ellipsis-5 font-12 margin-top-5 margin-bottom-20" v-if="item.outline">
                                        简介：{{item.outline}}
                                        <div class="dhp-list-txt-bg"></div>
                                    </div>
                                    <div class="font-12" @click="handleEdit(item.id)" style="cursor:pointer" v-if="item.outline">查看详细 > </div>
                                </div>
                            </el-col>
                            <!-- offset="1" -->
                            <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
                                <div class="dhp-list-sq font-14">
                                    片名编号：
                                    <span class="font-16">{{item.number}}</span>
                                    <el-button type="danger" class="margin-top-60 font-16 padding-top-10 padding-bottom-10 padding-left-35 padding-right-35" @click="handleEdit(item.id)">申请授权</el-button>
                                    <!-- <router-link :to="{name:'shenqingshouquan'}">申请授权</router-link> -->
                                </div>
                            </el-col>
                        </el-row>
                        <!-- 分页 -->
                        <div class="fenye margin-top-20" v-if="hidden">
                            <el-pagination layout="prev, pager, next" :total="result" prev-text="上一页" next-text="下一页" :page-size="_pageSize" @current-change="handleCurrentChange" :current-page="currentPage">
                            </el-pagination>
                        </div>
                    </div>
                    <!-- 筛选结果  结束 -->
                </div>
            </el-col>
            <el-col :xs="24" :sm="7" :md="7" :lg="7" :xl="7">
                <div class="dhp-right margin-top-80">
                    <Guanggao :bianhao="2">动画片右1</Guanggao>
                    <Guanggao :bianhao="3">动画片右2</Guanggao>
                    <TopNews>此处显示右侧 新闻资讯</TopNews>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script type="model">
import Vue from "vue";
//导入vuex辅助函数
import { mapState } from "vuex";

//挂载右侧广告位
import Guanggao from "@/components/guanggao.vue";

//挂载文章列表
import TopNews from "@/components/top_news.vue";

import {tostring,mergeToHeavy} from "@/common.js/public";

var data_falg;
export default {
  activated: function() {
    let arr=['aa','bb','cc','cc'];
    arr= [...new Set(arr)]
    const [,,sss] = arr;
    console.log(arr,sss);

    if (this.$route.params.keys) {
      this.keys = this.$route.params.keys;
    }
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

    if (this.$route.params.id) {
      this.show = true;
      this.anliData();
    } else {
      this.show = false;
      this.getData();
    }
  },
  deactivated: function() {
    data_falg = false;
    this.show = false;
  },
  data() {
    return {
      sertch: false,
      hidden: false,
      show: false,
      result: 0,
      total: 0,
      loading: false,
      currentPage: 1,
      keys: "",
      tableData: [],
      _order: "",
      _sort: "",
      seach_data: "",
      tc_check: [], //选中的题材名称
      bq_check: [], //选中的标签名称
      tc_Choose_data: this.tcChoose_data, //选中的题材
      bq_Choose_data: this.bqChoose_data //选中的标签
    };
  },
  watch: {
    //题材选择的监听
    tc_check: function(newValue, oldValue) {
      if (newValue == oldValue || !data_falg) return;
      if (newValue == "" || !newValue) {
        this.tc_Choose_data = [];
        this.$store.commit("setTc_Choose", this.tc_Choose_data);
        this.getData();
        return;
      }
      let demo = this.tcbq_data.tc_data;
      let newdemo = [];
      $.each(newValue, function(ind, it) {
        $.each(demo, function(index, item) {
          if (item.name == it) {
            newdemo.push({ id: item.id, type: 1, name: item.name });
          }
        });
      });
      this.tc_Choose_data = newdemo;
      this.$store.commit("setTc_Choose", this.tc_Choose_data);
      this.getData();
    },
    //标签选择的监听
    bq_check: function(newValue, oldValue) {
      if (newValue == oldValue || !data_falg) return;
      if (newValue == "" || !newValue) {
        this.bq_Choose_data = [];
        this.$store.commit("setBq_Choose", this.bq_Choose_data);
        this.getData();
        return;
      }
      let demo = this.tcbq_data.bq_data;
      let newdemo = [];
      $.each(newValue, function(ind, it) {
        $.each(demo, function(index, item) {
          if (item.name == it) {
            newdemo.push({ id: item.id, type: 2, name: item.name });
          }
        });
      });
      this.bq_Choose_data = newdemo;
      this.$store.commit("setBq_Choose", this.bq_Choose_data);
      this.getData();
    },

    "$route.name": function(newValue, oldValue) {
      if (newValue == oldValue || !data_falg) return;
      if (newValue == "donghuapian") {
        this.show = false;
        this.getData();
      }
    }
  },
  methods: {
    //清除标签，题材
    allclear() {
      this.$store.commit("setTc_Choose", []);
      this.$store.commit("setBq_Choose", []);
      this.tc_check = [];
      this.bq_check = [];
      this.getData();
    },
    //获取数据
    getData() {
      //请求数据
      this.sertch = false;
      this.hidden = true;
      this.loading = true;
      this.axios({
        method: "post",
        url: this.API_ROOT + "/home_api/animation",
        data: {
          subject: this.tc_check,
          tags: this.bq_check,
          keys: this.keys,
          page: this.currentPage,
          listRows: this._pageSize
        },
        headers: this.$store.getters.Request_Head
      }).then(
        response => {
          data_falg = true;
          this.sertch = true;
          if (this.getToken(response.data)) {
            this.tableData = response.data.data;
            this.total = response.data.info.total;
            this.result = response.data.count;
          }
          this.loading = false;
        },
        error => {
          this.loading = false;
          this.$emit("API-ERR");
        }
      );
    },
    //成功案例查看动画请求进来
    anliData() {
      this.hidden = false;
      this.loading = true;
      this.axios({
        method: "post",
        url: this.API_ROOT + "/home_api/example/exatoani",
        data: {
          id: this.$route.params.id
        },
        headers: this.$store.getters.Request_Head
      }).then(
        response => {
          data_falg = true;
          if (this.getToken(response.data)) {
            this.tableData = response.data.data;
            this.total = response.data.info.total;
          }
          this.loading = false;
        },
        error => {
          this.loading = false;
          this.$emit("API-ERR");
        }
      );
    },

    //页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getData();
    },
    //搜索
    KeysChange(val) {
      this.keys = val.replace(/[\'\"]/g, "").trim();
      this.getData();
    },
    //查看详情
    handleEdit(id) {
      this.$router.push({
        name: "dhp-detail",
        params: {
          id: id
        }
      });
    }
  },
  //计算属性
  computed: mapState({
    uinfo: state => state.uinfo,
    tcbq_data: state => state.tcbq_data,
    tcChoose_data: state => state.tcChoose_data,
    bqChoose_data: state => state.bqChoose_data,
    _pageSize: state => state.pageSize,
    _pageSizes: state => state.pageSizes
  }),
  components: {
    Guanggao,
    TopNews
  }
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
