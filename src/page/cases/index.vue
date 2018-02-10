<template>
    <div class="warp">
        <el-row :gutter="40">
            <el-col :xs="24" :sm="17" :md="17" :lg="17" :xl="17">
                <div class="dhp-left margin-top-25">
                    <el-row :gutter="0">
                        <el-col :xs="24" :sm="10" :md="10" :lg="10" :xl="10">
                            <h1 class="dhp-h1 no-margin">成功案例
                                <span class="margin-left-30 font-14">共 {{total}} 部动画片名</span>
                            </h1>
                        </el-col>
                        <el-col :xs="24" :sm="14" :md="14" :lg="14" :xl="14">
                            <div class="dhp-search">
                                <el-input placeholder="请输入内容" v-model="keys" clearable class="input-with-select" size="medium" @change="KeysChange">
                                    <el-button slot="append" icon="el-icon-search"></el-button>
                                </el-input>
                            </div>
                        </el-col>
                    </el-row>
                    <!-- 筛选  开始 -->
                    <div class="shuaixuan-box margin-top-15">
                        <div class="shuaixuan-row">
                            <div class="shuaixuan-left padding-10">
                                <span>类别：</span>
                            </div>
                            <div class="shuaixuan-right padding-10">
                                <el-checkbox-group v-model="case_check" size="small" v-bind:style="{ height: activeHeight }" id="checkgroup">
                                    <el-checkbox :label="vo.title" border :key="vo.id" v-for="vo in case_data" class="margin-top-5 margin-bottom-5">
                                        <span class="aui-ellipsis-1" style="padding:1px">{{vo.title}}</span>
                                        <i class="fa fa-window-close" aria-hidden="true"></i>
                                    </el-checkbox>
                                </el-checkbox-group>
                                <el-button type="text" style="position: absolute; top: 87px; right: 370px;color:#5a5e66" @click="indisplay()">{{active}}
                                    <i class="el-icon-arrow-down" v-bind:class="active=='更多'?'el-icon-arrow-down':'el-icon-arrow-up'"></i>
                                </el-button>
                            </div>
                        </div>
                    </div>
                    <!-- 筛选  结束 -->
                    <!-- 筛选结果  开始 -->
                    <!-- 头部 -->
                    <div class="sx-jieguo-title margin-top-30 margin-bottom-20 padding-bottom-15">
                        <!-- <span style="float:left;">全部</span> -->
                        全部
                        <span class="sx-jieguo-btn"  v-if="case_choose&&case_choose.length>0">
                            <span>&nbsp;&nbsp;&nbsp;>&nbsp;&nbsp;&nbsp;</span>
                            <span class="guanjianzi font-12" style="display:inline-block;max-width:70%;">
                                <span :key="vo.id" v-for="(vo,index) in case_choose">
                                    <span v-if="index>0">、</span>{{vo.title}}</span>
                                <i class="fa fa-window-close margin-left-10" aria-hidden="true" @click="allclear"></i>
                            </span>
                        </span>
                        <!-- 当前关键词检索时 -->
                        <span v-if="keys">
                            &nbsp;&nbsp;&nbsp;> &nbsp;&nbsp;&nbsp; {{keys}}
                        </span>
                        <span class="sx-jieguo-num" v-if="keys||case_choose.length>0">共 {{result}} 个结果</span>
                    </div>
                    <!-- 动画片列表 -->
                    <div v-loading="loading" element-loading-text="精彩即将出现…" style="min-height:200px">
                        <h4 class="text-danger" align="center" v-if="!result || !total">哎呦！您太细致了，换个条件再试试吧！</h4>
                        <el-row :gutter="0" class="margin-bottom-15" v-for="(item,index) in tableData" :key="item.id">
                            <el-col :xs="24" :sm="5" :md="5" :lg="5" :xl="5">
                                <div class="dhp-list-img">
                                    <span><img :src="item.banner" alt=""></span>
                                </div>
                            </el-col>
                            <el-col :xs="24" :sm="11" :md="11" :lg="11" :xl="12">
                                <div class="dhp-list-main margin-left-20">
                                    <h2 class="aui-ellipsis-1 font-18 no-margin">{{item.title}}</h2>
                                    <div style="margin-bottom:10px; margin-top:10px;">
                                        <span v-for="item in item.aid" :key="item.id">《{{item.name}}》</span>
                                    </div>

                                    <div class="dhp-list-bq">
                                        <el-tag type="info" size="small" class="margin-right-5 margin-bottom-5" :class="case_check.indexOf(type)!='-1' ? 'active':''" disable-transitions v-for="(type,index) in item.type" :key="type.id">{{type}}</el-tag>
                                    </div>

                                    <div class="dhp-list-txt  font-12 margin-top-5 margin-bottom-20">
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
                                            <router-link :to="{name:''}" v-if="hiddens[index].show ?dex<4 :true" class="margin-right-5" v-for="(vo,dex) in item.exa" :key="vo.id" :href="'http://'+vo.url" target="_blank">
                                                <img :src="vo.img" alt="" :title="vo.name">
                                            </router-link>

                                            <router-link :to="{name:''}" class="margin-right-5" v-if="btns[index].shows" @click.native="shows(index)">
                                                <b @click="shows(index)">···</b>
                                            </router-link>
                                        </div>
                                    </div>
                                </div>
                            </el-col>
                            <!-- offset="1" -->
                            <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
                                <div class="dhp-list-sq font-14">
                                    案例编号：
                                    <span class="font-16">{{item.number}}</span>
                                    <el-button type="danger" class="margin-top-60 font-16 padding-top-10 padding-bottom-10 padding-left-35 padding-right-35" @click="handleEdit(item.id)">查看动画片</el-button>
                                </div>
                            </el-col>
                            <el-col :span="24" class="margin-top-25" v-if="tableData.length>1">
                                <hr>
                            </el-col>
                        </el-row>
                        <!-- 分页 -->
                        <div class="fenye margin-top-20">
                            <el-pagination layout="prev, pager, next" :total="result" prev-text="上一页" next-text="下一页" :page-size="_pageSize" @current-change="handleCurrentChange" :current-page="currentPage">
                            </el-pagination>
                        </div>
                    </div>
                    <!-- 筛选结果  结束 -->
                </div>
            </el-col>
            <el-col :xs="24" :sm="7" :md="7" :lg="7" :xl="7">
                <div class="dhp-right margin-top-80">
                    <Guanggao :bianhao="9">成功案例右1</Guanggao>
                    <Guanggao :bianhao="10">成功案例右2</Guanggao>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import Vue from "vue";
//导入vuex辅助函数
import { mapState } from "vuex";
import Guanggao from "@/components/guanggao";

var data_falg;
export default {
  activated: function() {
    let new_case_check = [];
    $.each(this.case_choose, function(index, item) {
      new_case_check.push(item.title);
    });
    this.case_check = new_case_check;
    this.getData();
  },
  deactivated: function() {
    data_falg = false;
  },
  data() {
    return {
      hiddens: {
        //可售衍生图片判断
      },
      btns: {
        //可售衍生按钮判断
      },
      result: 0,
      total: 0,
      loading: false,
      currentPage: 1,
      keys: "",
      tableData: [],
      _order: "",
      _sort: "",
      seach_data: [],
      case_check: [], //选择的类别,
      caseData: [], //案例简介过长处理
      activeHeight: "90px", //展开、收起高度
      active: "更多" //展开、收起
    };
  },
  watch: {
    case_check: function(newValue, oldValue) {
      if (newValue == oldValue || !data_falg) return;
      if (newValue == "" || !newValue) {
        this.$store.commit("setCase_choose", []);
        this.getData();
        return;
      }
      let demo = this.case_data;
      let newdemo = [];
      $.each(newValue, function(ind, it) {
        $.each(demo, function(index, item) {
          if (item.title == it) {
            newdemo.push(item);
          }
        });
      });
      this.$store.commit("setCase_choose", newdemo);

      this.getData();
    }
  },
  methods: {
    //获取数据
    getData() {
      //请求数据
      this.loading = true;
      this.axios({
        method: "post",
        url: this.API_ROOT + "/home_api/example",
        data: {
          type: this.case_choose,
          keys: this.keys,
          page: this.currentPage,
          listRows: this._pageSize
        },
        headers: this.$store.getters.Request_Head
      }).then(
        response => {
          data_falg = true;
          if (this.getToken(response.data)) {
            this.tableData = response.data.data;
            this.total = response.data.info.count;
            this.result = response.data.count;
            let data = [];
            let btn_data = [];
            //可售衍生品的判断处理
            $.each(response.data.data, function(index, item) {
              item.show = true;
              data.push(item);
              if (item.exa.length > 4) {
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
            $.each(response.data.data, function(index, item) {
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
    //清除检索
    allclear() {
      this.$store.commit("setCase_choose", []);
      this.case_check = [];
      this.getData();
    },
    //页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getData();
    },
    KeysChange(val) {
      this.keys = val.replace(/[\'\"]/g, "").trim();
      this.getData();
    },
    handleEdit(id) {
      this.$router.push({
        name: "case_donghuapian",
        params: {
          id: id
        }
      });
    },
    //点击查看所有可售衍生品
    shows(index) {
      this.hiddens[index].show = false;
      this.btns[index].shows = false;
      this.$forceUpdate();
    },
    //展开、收起
    indisplay() {
      if (this.active == "更多") {
        this.activeHeight = "100%";
        this.active = "收起";
      } else {
        this.activeHeight = "90px";
        this.active = "更多";
      }
    }
  },
  //计算属性
  computed: mapState({
    case_data: state => state.case_data.data,
    case_choose: state => state.case_choose,
    _pageSize: state => state.pageSize,
    _pageSizes: state => state.pageSizes
  }),
  components: {
    Guanggao
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
