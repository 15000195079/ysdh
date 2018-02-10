<template>
	<div class="index">
		<div class="index-banner">
			<!-- <img src="../assets/img/index-banner.jpg" alt=""> -->
			<!-- Swiper -->
			<div v-on:mouseenter="stopPlay()" v-on:mouseleave="play()" class="swiper-container gallery-top swiper-container-horizontal">
				<div class="swiper-wrapper">
					<div :key="value.id" v-for="value in lbt" class="swiper-slide swiper-slide-next swiper-lazy" style="width: 100%; height:560px; margin-right: 10px;" v-bind:style="{backgroundImage: 'url(' + value.imgx + ')'}">
						<div class="index-top">
						</div>
					</div>
				</div>
				<!-- Add Pagination -->
				<div class="swiper-pagination swiper-pagination-white"></div>
			</div>
		</div>
		<div class="index-main">
			<div class="index-search-btn margin-bottom-15">
				<el-radio v-model="radio" label="1" style="color:#2F3B38">动画片名</el-radio>
				<el-radio v-model="radio" label="2" style="color:#2F3B38">角色形象</el-radio>
				<el-radio v-model="radio" label="3" style="color:#2F3B38">授权公司查询</el-radio>
				<el-radio v-model="radio" label="4" style="color:#2F3B38">正版验证</el-radio>
			</div>
			<div class="dhp-search margin-bottom-50">
				<el-input :placeholder="placeholder" v-model="keys" size="medium" class="input-with-select" @change="KeysChange">
					<el-button slot="suffix" size="medium" type="text" class="suffix-button" icon="el-icon-search" @click="KeysChange(keys)" v-loading="vloading"></el-button>
				</el-input>
			</div>
			<div class="warp" v-loading="loading" element-loading-text="拼命加载中">
				<el-row :gutter="16" class="margin-bottom-25">
					<el-col :xs="24" :sm="8">
						<div class="index-img-list">
							<div class="index-img-box">
								<img src="../assets/img/index-img01.jpg" alt="">
								<div class="index-img-txt">
									<p class="font-24 margin-top-50 margin-bottom-10">
										<b>央视动画作品</b>
									</p>
									<span>共有{{tableData.ani_count}}部</span><br>
									<el-button class="margin-top-40" @click="todonghua">查看全部</el-button>
								</div>
							</div>
							<div class="index-img-tag index-img-tag01 font-12 margin-top-30">
								<span v-for="item in tableData.animation" :key="item.id" @click="todonghuaDetail(item.id)" style="cursor:pointer;max-width:320px;;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;"> 《{{item.cn_name}}》</span>
							</div>
						</div>
					</el-col>
					<el-col :xs="24" :sm="8">
						<div class="index-img-list">
							<div class="index-img-box">
								<img src="../assets/img/index-img02.jpg" alt="">
								<div class="index-img-txt">
									<p class="font-24 margin-top-50 margin-bottom-10">
										<b>最热角色形象</b>
									</p>
									<span>共有{{tableData.char_count}}个</span><br>
									<el-button class="margin-top-40" @click="tojueshe()">查看全部</el-button>
								</div>
							</div>
							<div class="index-img-tag index-img-tag02 font-12 margin-top-30">
								<span v-for="items in tableData.character" :key="items.id" @click="tojuesheDetail(items.id)" style="cursor:pointer;max-width:320px;;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;"> 《{{items.name}}》</span>
							</div>
						</div>
					</el-col>
					<el-col :xs="24" :sm="8">
						<div class="index-img-list" v-if="tableData.news&&tableData.news.length>0">
							<div class="index-img-box" style="cursor:pointer;" @click="tonews(tableData.news[0].id)">
								<img :src="tableData.news[0].img" alt="">
								<div class="index-img-bottom-txt font-14">
									<span>{{tableData.news[0].title}}</span>
								</div>
							</div>
							<div class="index-img-list-jj">
								<ul class="margin-top-30">
									<div v-for="(vo,index) in tableData.news" :key="index">
										<li :class="vo.type.id=='1' ? 'img-list-jj01':'img-list-jj03'" v-if="index>0" style="cursor:pointer;" @click="tonews(vo.id)">
											<el-tag size="mini" color="transparent">{{vo.type.title}}</el-tag>
											<span class="aui-ellipsis-2">{{vo.title}}</span>
										</li>
									</div>
									<!-- <li class="img-list-jj02">
                                        <el-tag type="warning" size="mini" color="transparent">{{tableData.news[2].type.title}}</el-tag>
                                        <span class="img-list-jj-txt aui-ellipsis-2">{{tableData.news[2].title}}</span>
                                    </li>
                                    <li class="img-list-jj03">
                                        <el-tag size="mini" color="transparent">{{tableData.news[3].type.title}}</el-tag>
                                        <span class="img-list-jj-txt aui-ellipsis-2">{{tableData.news[3].title}}</span>
                                    </li> -->
								</ul>
							</div>
						</div>
					</el-col>
				</el-row>
				<hr>
				<div class="index-shop-list margin-top-30">
					<div class="index-shop-left" @click="tocase()" style="cursor:pointer">
						<span class="padding-top-40 padding-bottom-30">衍生商品<br>成功案例</span>
						<img src="../assets/img/index-shop01.jpg" alt="">
					</div>

					<div class="index-shop-right">
						<div class="index-shop-right-list padding-top-20" :class="index>3?'no-border-bottom':''" v-for="(item,index) in ysData" :key="item.id">
							<div class="shop-list-left margin-left-40">
								<h4 class="shop-right-h4 no-margin-top aui-ellipsis-3" style="width:65px;color:#696969;">{{item.name}}</h4>
							</div>
							<div class="shop-list-img">
								<a :href="'http://'+item.url" target="_blank"><img class="margin-right-25" :src="item.img" alt="" style="max-width: 80px;max-height: 100px;"></a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 查看授权公司查询 -->
		<AuthorCompany :dialogFormVisible="dialogFormVisible" :data="com_data" @CB-dialogFormVisible="CB_dialogFormVisible"></AuthorCompany>
		<!-- 查看正版验证 -->
		<GenuineVer :dialogVisible="dialogVisible" :data="cp_data" @CB-dialogVisible="CB_dialogVisible"></GenuineVer>

	</div>

</template>
<script>
import { mapState } from "vuex";
import Swiper from "../../static/js/swiper.min.js";
import "../assets/css/swiper.min.css";
import AuthorCompany from "@/components/authorCompany.vue";
import GenuineVer from "@/components/genuineVer.vue";

export default {
  activated() {
    this.getLbt();
    this.getData();
    this.getYansheng();
  },
  data() {
    return {
      keys: "",
      lbt: [],
      radio: "1",
      placeholder: "检索：动画片名、编号、人物",
      img: 'this.src="' + require("@/assets/img/defalt.jpg") + '"',
      loading: false,
      tableData: {
        ani_count: 0, //动画片集数
        animation: [],
        char_count: 0, //角色个数
        character: [],
        news: []
      },
      vloading: false,
      dialogFormVisible: false,
      dialogVisible: false,
      cp_data: {},
      com_data: [],
      ysData: []
    };
  },
  mounted() {
    this.lunbo();
  },
  watch: {
    radio: function(newValue, oldValue) {
      if (newValue == oldValue) return;
      if (newValue == "1") {
        this.placeholder = "检索：动画片名、编号";
      } else if (newValue == "2") {
        this.placeholder = "检索：角色名称、编号";
      } else if (newValue == "3") {
        this.placeholder = "检索：授权公司";
      } else if (newValue == "4") {
        this.placeholder = "检索：防伪编号";
      }
    }
  },
  methods: {
    //成功案例衍生商品
    getYansheng() {
      this.axios({
        method: "post",
        url: this.API_ROOT + "/home_api/exa/index",
        data: {
          listRows: 8
        },
        headers: this.$store.getters.Request_Head
      }).then(
        response => {
          if (this.getToken(response.data)) {
            this.ysData = response.data.data;
          }
        },
        error => {
          this.$emit("API-ERR");
        }
      );
    },
    // 切换检索
    KeysChange(val) {
      this.keys = val.replace(/[\'\"]/g, "").trim();
      if (!this.keys || this.keys == "") return;
      if (this.radio == "1") {
        this.$router.push({
          name: "donghuapian",
          params: {
            keys: this.keys
          }
        });
        this.$store.commit("setNavmenu", "donghuapian");
      } else if (this.radio == "2") {
        this.$router.push({
          name: "juesexingxiang",
          params: {
            keys: this.keys
          }
        });
        this.$store.commit("setNavmenu", "juesexingxiang");
      } else if (this.radio == "3") {
        this.vloading = true;
        this.axios({
          method: "post",
          url: this.API_ROOT + "/home_api/index/apply",
          data: {
            keys: this.keys
          },
          headers: this.$store.getters.Request_Head
        }).then(
          response => {
            this.vloading = false;
            if (this.getToken(response.data)) {
              if (response.data.data && response.data.data.length > 0) {
                this.com_data = response.data.data;
                this.dialogFormVisible = true;
              } else {
                this.$message.error("未检索到相关信息！");
              }
            }
          },
          error => {
            this.vloading = false;
            this.$emit("API-ERR");
          }
        );
      } else if (this.radio == "4") {
        this.vloading = true;
        this.axios({
          method: "post",
          url: this.API_ROOT + "/home_api/index/verify",
          data: {
            keys: this.keys
          },
          headers: this.$store.getters.Request_Head
        }).then(
          response => {
            this.vloading = false;
            if (this.getToken(response.data)) {
              this.cp_data = response.data.data;
              this.dialogVisible = true;
            }
          },
          error => {
            this.vloading = false;
            this.$emit("API-ERR");
          }
        );
      }
    },
    //跳转
    todonghua() {
      this.$router.push({
        name: "donghuapian"
      });
      this.$store.commit("setNavmenu", "donghuapian");
    },
    todonghuaDetail(id) {
      this.$router.push({
        name: "dhp-detail",
        params: {
          id: id
        }
      });
    },
    tojueshe() {
      this.$router.push({
        name: "juesexingxiang"
      });
      this.$store.commit("setNavmenu", "juesexingxiang");
    },
    tojuesheDetail(id) {
      this.$router.push({
        name: "jsxx-detail",
        params: {
          id: id
        }
      });
    },
    tonews(id) {
      this.$router.push({
        name: "sqfb-details",
        params: {
          id: id
        }
      });
    },
    tocase() {
      this.$router.push({
        name: "chenggonganli"
      });
	  this.$store.commit("setNavmenu", "chenggonganli");
    },
    //获取数据
    getData() {
      this.loading = true;
      this.axios({
        method: "post",
        url: this.API_ROOT + "/home_api/index/animation",
        data: {},
        headers: this.$store.getters.Request_Head
      }).then(
        response => {
          this.loading = false;
          if (this.getToken(response.data)) {
            this.tableData = response.data.data;
          }
        },
        error => {
          this.loading = false;
          this.$emit("API-ERR");
        }
      );
    },
    CB_dialogFormVisible(val) {
      this.dialogFormVisible = false;
    },
    CB_dialogVisible(val) {
      this.dialogVisible = false;
    },
    //轮播图
    getLbt() {
      this.axios({
        method: "post",
        url: this.API_ROOT + "/home_api/guanggao",
        data: {
          type: 1,
          listRows: 2
        },
        headers: this.$store.getters.Request_Head
      }).then(
        response => {
          if (this.getToken(response.data)) {
            this.lbt = response.data.data;
          }
        },
        error => {
          this.$emit("API-ERR");
        }
      );
    },
    lunbo() {
      var galleryTop = new Swiper(".gallery-top", {
        pagination: ".swiper-pagination",
        paginationClickable: true,
        spaceBetween: 30,
        //loop: true,
        observer: true,
        observeParents: true,
        autoplay: 10000,
        effect: "fade",
        speed: 3000,
        fade: {
          crossFade: false
        },
        fade: {
          crossFade: true
        }
      });
    },
    stopPlay() {},
    play() {}
  },
  computed: mapState({
    shouquan_list: state => state.shouquan_list
  }),
  components: {
    AuthorCompany,
    GenuineVer
  }
};
</script>

<style scoped>
.gallery-top {
  width: 100%;
}
.swiper-slide {
  background-size: cover !important;
}

.suffix-button {
  border-radius: 0 4px 4px 0;
  height: 36px;
}
</style>
