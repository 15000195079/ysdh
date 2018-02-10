<template>
	<div class="warp">
		<el-row :gutter="40" style="min-height:500px">
			<el-col :xs="24" :sm="17" :md="17" :lg="17" :xl="17" v-loading="loading" element-loading-text="拼命加载中">
				<div class="dhp-left margin-top-25">
					<h1 class="dhp-h1 no-margin-top margin-bottom-20 font-28">
						<b>{{form.title}}</b>
					</h1>
					<div class="dhp-list-bq">
						<el-tag type="default" size="small">{{form.type=="1"?'授权发布':'热点资讯'}}</el-tag>
						&nbsp;&nbsp;&nbsp;&nbsp;{{form.author}}&nbsp;&nbsp;{{form.update_time}}
					</div>
					<el-row class="news-fenxiang margin-top-15 margin-bottom-20">
						<el-col :md="2" :sm="2" :xs="2">
							分享到：
						</el-col>
						<el-col :md="22" :sm="22" :xs="22">
              <div class="jiathis_style_24x24">

                <a class="jiathis_button_weixin"></a>
                <a class="jiathis_button_cqq"></a>
                <a href="javascript;" v-loading="loading_fx"></a>
                <a class="jiathis_button_tsina"></a>
                <a class="jiathis_button_qzone"></a>
              </div>
						</el-col>
					</el-row>

					<div v-if="form.id">
						<div class="news-details-title-border margin-bottom-25">
						</div>
						<div class="news-content font-16" v-html="form.content"></div>
						<div class="dianzan font-24 margin-top-50">
							<span class="padding-top-10 padding-bottom-10 margin-left-10 margin-right-10" :class="active&&activeCai?'zan-down':'zan-up yizan'" @click="handleCai(form.id,form.tread)">
								<i class="fa fa-thumbs-down" aria-hidden="true"></i>
								<p class="no-margin font-12">{{form.tread}}</p>
							</span>
							<span class="zan-down padding-top-10 padding-bottom-10 margin-left-10 margin-right-10" :class="active&&activeDing?'zan-up':'zan-down yizan'" @click="handleDing(form.id,form.top)">
								<i class="fa fa-thumbs-up" aria-hidden="true"></i>
								<p class="no-margin font-12">{{form.top}}</p>
							</span>
						</div>
					</div>
					<div class="margin-top-40" v-if="!form.id">
						<el-row type="flex" class="row-bg" justify="center">
							<el-col :span="8">
								<span class="text-bolder text-center font-16">未查到相关信息~~~</span>
							</el-col>
						</el-row>
					</div>
				</div>
			</el-col>
			<el-col :xs="24" :sm="7" :md="7" :lg="7" :xl="7">
				<div class="dhp-right margin-top-25">
					<div class="margin-bottom-30">
						<el-input placeholder="请输入内容" v-model="keys" size="medium" @change="KeysChange" class="input-with-select">
							<el-button slot="append" icon="el-icon-search"></el-button>
						</el-input>
					</div>
					<div class="xinwen-zx margin-bottom-42">
						<div class="xwzx-title font-18">
							<span class="padding-top-10">
								<b>相关文章</b>
							</span>
						</div>
						<ul>
							<li class="aui-ellipsis-2 margin-bottom-10 padding-left-10 font-14" v-for="(item,index) in form.recommend" :key="index" @click="handleChange(item.id)">
								<a style="cursor: pointer;">{{item.title}}</a>
							</li>
						</ul>
					</div>
					<hr>
					<div class="xiayipian">
						<p>下一篇</p>
						<div class="padding-left-20 next-news" v-if="form.next.id!=null">
							<a class="font-16" style="cursor:pointer;" @click="handleChange(form.next.id)">
								<b>{{form.next.title}}</b>
							</a>
							<div class="dhp-list-bq margin-top-15">
								<el-tag type="default" size="small" v-if="form.next.type">
									<span v-if="form.next.type=='1'">授权发布</span>
									<span v-if="form.next.type=='2'">热点资讯</span>
								</el-tag>
								&nbsp;&nbsp;&nbsp;&nbsp;{{form.next.author}}&nbsp;&nbsp;&nbsp;
								<span v-if="form.next.type">|</span>&nbsp;&nbsp;&nbsp;{{form.next.update_time}}
							</div>
						</div>
						<div class="padding-left-20 next-news" v-if="form.next.id==null">
							<p>已经是最后一篇了~~~</p>
						</div>
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
    this.getRead();
    this.init();
  },
  deactivated: function() {
    this.active = false;
    this.activeDing = false;
    this.activeCai = false;
    this.keys = "";
    document.title = "央视动画授权平台";
  },
  data() {
    return {
      loading: false,
      loading_fx:false,
      keys: "",
      active: false,
      activeDing: false,
      activeCai: false,
      seach_data: "",
      form: {
        author: "",
        content: "",
        daodu: "",
        ding: 0,
        cai: 0,
        next: {
          id: "",
          author: "",
          update_time: "",
          title: "",
          type: ""
        },
        type: "",
        title: "",
        recommend: []
      },
      typeid: parseInt(this.$route.params.id)
    };
  },
  methods: {
    //引入jiaThis插件js文件
    init: function() {
      // 会有警告:‘除非明确打开，否则无法从异步加载的外部脚本写入文档’。
      this.loading_fx=true;
      let url ="http://v3.jiathis.com/code/jia.js";
      let str="utf-8";
      let script = document.createElement("script");
      script.setAttribute("src", url);
      script.setAttribute("charset", str);
      document.getElementsByTagName("body")[0].appendChild(script);
      script.onload=()=> {
        this.loading_fx=false;
      }
    },
    //搜索
    KeysChange(val) {
      this.keys = val.replace(/[\'\"]/g, "").trim();
      if (!this.keys || this.keys == "") return;
      this.$router.push({
        name: "news-search",
        params: {
          keys: this.keys
        }
      });
    },
    //踩
    handleCai(id, cai) {
      for (var i in this.caiData) {
        if (this.caiData[i] == id) {
          this.$message.warning("谢谢，你已经踩过了");
          return;
        }
      }
      for (var i in this.dingData) {
        if (this.dingData[i] == id) {
          this.$message.warning("谢谢，您已经赞过了");
          return;
        }
      }
      this.activeCai = true;
      cai = cai + 1;
      this.form.tread = cai;
      this.setData(id, "", cai);
    },
    //顶
    handleDing(id, ding) {
      for (var i in this.caiData) {
        if (this.caiData[i] == id) {
          this.$message.warning("谢谢，你已经踩过了");
          return;
        }
      }
      for (var i in this.dingData) {
        if (this.dingData[i] == id) {
          this.$message.success("谢谢，您已经赞过了");
          return;
        }
      }
      this.activeDing = true;
      ding = ding + 1;
      this.form.top = ding;
      this.setData(id, ding, "");
    },
    //处理顶踩数据
    setData(id, val, value) {
      this.axios({
        method: "post",
        url: this.API_ROOT + "/home_api/news/topandtread",
        data: {
          id: id,
          top: val,
          tread: value
        },
        headers: this.$store.getters.Request_Head
      }).then(response => {
        if (this.getToken(response.data)) {
          let data = val == "" ? "踩一下" : "顶一下";
          this.$message.success(data);
          if (val == "") {
            this.$store.commit("setcaiData", id);
          } else if (value == "") {
            this.$store.commit("setdingData", id);
          }
          this.active = true;
        }
      });
    },
    //获取数据
    getRead() {
      this.loading = true;
      this.axios({
        method: "post",
        url: this.API_ROOT + "/home_api/news/read",
        data: {
          id: parseInt(this.$route.params.id)
        },
        headers: this.$store.getters.Request_Head
      }).then(
        response => {
          if (this.getToken(response.data)) {
            this.form = response.data.data;
            response.data.data.dynamicTags = response.data.data.dynamicTags.join(
              ","
            );
            document.querySelector('meta[name="keywords"]').content =
              response.data.data.dynamicTags;
            document.querySelector('meta[name="description"]').content =
              response.data.data.miaoshu;
            document.title = response.data.data.title + " - 央视动画授权平台";
            for (var i in this.dingData) {
              if (this.dingData[i] == response.data.data.id) {
                this.active = true;
                this.activeDing = true;
              }
            }
            for (var i in this.caiData) {
              if (this.caiData[i] == response.data.data.id) {
                this.active = true;
                this.activeCai = true;
              }
            }

            //分享 处理
            let summary = response.data.data.daodu;
            let title=response.data.data.title;
            let fullPath = this.$route.fullPath;
            let pic = [response.data.data.img];

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
          this.loading = false;
          this.$emit("API-ERR");
        }
      );
    },
    handleChange(id) {
      this.typeid = id;
      this.$router.push({
        name: "sqfb-details",
        params: {
          id: id
        }
      });
      this.getRead();
    }
  },
  computed: mapState({
    dingData: state => state.dingData,
    caiData: state => state.caiData
  })
};
</script>
<style scoped>
ul li a:hover {
  color: #c7c7e2;
}
.next-news a:hover {
  color: #9999cc;
}
</style>
