<template>
    <div class="warp">
        <el-row :gutter="40">
            <el-col :xs="24" :sm="17" :md="17" :lg="17" :xl="17" id="test">
                <div class="dhp-left margin-top-25">
                    <Carouse :title="title" :bianhao="6">走马灯</Carouse>
                    <!-- 标签页 -->
                    <div class="sqfb-tab">
                        <el-tabs v-model="activeName" type="border-card" class="margin-top-35" @tab-click="handleClick">
                            <el-tab-pane label="最新文章" name="news-article"></el-tab-pane>
                            <el-tab-pane label="授权发布" name="news-shouquanfabu"></el-tab-pane>
                            <el-tab-pane label="热点资讯" name="news-redianzixun"></el-tab-pane>
                        </el-tabs>
                    </div>

                    <transition name="el-fade-in-linear">
                        <keep-alive>
                            <router-view ref="mychild"></router-view>
                        </keep-alive>
                    </transition>
                </div>
            </el-col>
            <el-col :xs="24" :sm="7" :md="7" :lg="7" :xl="7" id="test2">
                <div class="dhp-right margin-top-25">
                    <div class="margin-bottom-20">
                        <el-input placeholder="请输入内容" v-model="keys" size="medium" @change="KeysChange" class="input-with-select" clearable>
                            <el-button slot="append" icon="el-icon-search"></el-button>
                        </el-input>
                    </div>
                    <Guanggao :bianhao="7">授权文章右1</Guanggao>
                    <Guanggao :bianhao="8">授权文章右2</Guanggao>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
//导入vuex辅助函数
import { mapState } from "vuex";
import Carouse from "@/page/news/carouse";
import Guanggao from "@/components/guanggao";

export default {
  activated: function() {
      this.keys="";
  },
  data() {
    return {
      total: 0,
      loading: false,
      currentPage: 1,
      keys: "",
      tableData: [],
      _order: "",
      _sort: "",
      seach_data: "",
      checkboxGroup5: [],
      title: "",
      type: "",
      activeName: this.$route.name
    };
  },
  watch: {
    "$route.name": function(newValue, oldValue) {
      if (newValue == "" || !newValue) return;
      this.activeName = newValue;
    }
  },
  methods: {
    //搜索
    KeysChange(val) {
      this.keys = val.replace(/[\'\"]/g, "").trim();
      this.$refs.mychild.getData(this.keys,1);
    },
    //切换导航
    handleClick(tab, event) {
      if (tab.name == "news-article") {
        this.activeName = "news-article";
        this.$refs.mychild.getData(this.keys,6);
      } else if (tab.name == "news-shouquanfabu") {
        this.activeName = "news-shouquanfabu";
        this.$refs.mychild.getData(this.keys,1);
      } else if (tab.name == "news-redianzixun") {
        this.activeName = "news-redianzixun";
        this.$refs.mychild.getData(this.keys,2);
      }
    }
  },
  components: {
    Carouse,
    Guanggao
  }
};
</script>

