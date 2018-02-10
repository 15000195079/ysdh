<template>
	<div>
		<el-row class=" bg-light bord-btm">
			<el-col :md="8" class="bord-rgt padding-20  head-height">
				<div class="pull-left">
					<img class="img-md img-circle" :src="uinfo.head" @click="editTouxiang" :onerror="errimg">
				</div>
				<div class="pull-left margin-left-10 font-110">
					<div class="padding-10">ID：{{uinfo.account||'--'}}</div>
					<div class="padding-left-10">姓名：{{uinfo.name||'--'}}</div>
				</div>
			</el-col>
			<el-col :md="8" class="bord-rgt padding-40  head-height">
				<div class="pull-left padding-5 font-110">您当前的用户级别：</div>
				<div class="pull-left">
					<el-tag type="danger" size="medium">{{uinfo.type||'--'}}</el-tag>
				</div>
			</el-col>
			<el-col :md="8" class="padding-40  head-height">
				<span @click="setPassword" style="cursor:pointer;"> 修改密码 </span> 丨
				<span @click="handleEdit" style="cursor:pointer;"> 修改资料</span> 丨
				<span @click="loginout" style="cursor:pointer;"> 注销登录</span>
			</el-col>
		</el-row>
		<!-- 注意下面显示最新一条通知的代码，进入该页面后，有通知的情况下再显示。 -->
		<el-row>
			<el-col class="padding-20 text-danger text-bold tz-bgcolor font-110" v-if="message&&!(click_noticeid&&click_noticeid[uinfo.id]&&click_noticeid[uinfo.id].indexOf(message.id)!=-1)">
				<span @click="tomessage(message.id)" style="cursor:pointer;">重要通知：{{message.title}}</span>
			</el-col>
		</el-row>

		<el-row class="margin-top-30" v-if="total_gq>0">
			<h4 class="padding-bottom-10 no-margin">您有{{total_gq}}条授权信息即将过期</h4>
			<el-col>
				<el-table :data="guoqi_data" class="table-head" stripe style="width: 100%">
					<el-table-column prop="number" label="授权编号" fixed min-width="150" show-overflow-tooltip>
					</el-table-column>
					<el-table-column label="授权动画片名" min-width="150" show-overflow-tooltip>
						<template slot-scope="scope">
							<span v-if="scope.row.cn_name">{{scope.row.cn_name}}</span>
							<span style="color:red;" v-else>该动画片已被删除</span>
						</template>
					</el-table-column>
					<el-table-column prop="apply" label="授权权利" min-width="180" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="authorize_title" label="授权品类" min-width="200" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="end_time" label="过期时间" min-width="100" show-overflow-tooltip>
					</el-table-column>
					<el-table-column label="操作" width="130" fixed="right" align="center">
						<template slot-scope="scope">
							<el-button type="info" plain size="small" @click="contract(scope.row.id,scope.row.cn_name)">立即续约</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-col>
		</el-row>

		<el-row class="margin-top-30">
			<h4 class="padding-bottom-10 no-margin">您有{{total_sh}}条授权申请正在审核中</h4>
			<el-table :data="shenhe_data" class="table-head" stripe style="width: 100%" v-loading="loading_s" element-loading-text="拼命加载中">
				<el-table-column prop="number" label="申请编号" fixed min-width="150" show-overflow-tooltip>
				</el-table-column>
				<el-table-column label="授权动画片名" min-width="150" show-overflow-tooltip>
					<template slot-scope="scope">
						<span v-if="scope.row.cn_name">{{scope.row.cn_name}}</span>
						<span style="color:red;" v-else>该动画片已被删除</span>
					</template>
				</el-table-column>
				<el-table-column prop="apply" label="授权权利" min-width="180" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="authorize_title" label="授权品类" min-width="200" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="status" label="审核状态" width="230" fixed="right">
					<template slot-scope="scope" v-if="scope.row.process[0]&&scope.row.process[0].title">
						<div>
							<div class="pull-left"> {{scope.row.process[0].title}}
								<el-button type="text" size="small" @click="openTimeline(scope.row.id,scope.row.cn_name,scope.row.aid,scope.row.fuid)">详情</el-button>
							</div>
						</div>
					</template>
				</el-table-column>
			</el-table>
		</el-row>
		<!-- 以一统计模块，当用户有相关产品信息后再显示 ，没有产品的不要显示  -->
		<el-row class="margin-top-30" v-if="this.chanliang && this.chanliang.length>0">
			<h4 class="padding-bottom-10 no-margin">授权产品统计</h4>
			<!-- 总产量饼图 -->
			<el-col class="table-head" :md="24">
			</el-col>
			<el-col :md="10">
				&nbsp;
			</el-col>
			<el-col :md="14">
				<span class="margin-top-10 pull-right" style="display:inline-block;">
					<span>
						<!-- <el-button :class="color?'success':''" round size="small" @click="btnxl_switch">销量占比</el-button> -->
						<el-button :class="color?'':'success'" round size="small" @click="btncl_switch">产量占比</el-button>
					</span>

					<span style="display:inline-block;margin-left:30px;margin-right:5px;color:#000;font-weight:700;">选择时间</span>
					<el-select v-model="status" size="medium" clearable placeholder="显示时间段内的产品" @change="change" style="width:180px;">
						<el-option v-for="item in this.cpround_options" :key="item.id" :label="item.title" :value="item.id">
						</el-option>
					</el-select>
				</span>
			</el-col>

			<el-col>
				<Bingtu :chanliangStatus="chanliangStatus" :chanliang="chanliang" :chanliangData="chanliangData" @CB-chanliangTu="CB_chanliangTu">
				</Bingtu>
			</el-col>
		</el-row>
		<!-- 更改密码弹框 -->
		<SetPassWord :setPasswordStatus='passwordStatus' @CB-setPasswordStatus="CB_setPasswordStatus"></SetPassWord>
		<!-- 改头像弹框 -->
		<gaiInfoImg :dialogVisibles="dialogVisibles" @Cb-ImgDialog="Cb_ImgDialog"></gaiInfoImg>
		<!--编辑个人资料-->
		<ziliaoEdit :dialogStatus="dialogStatus" @CB-dialogStatus="CB_dialogStatus"></ziliaoEdit>
		<!-- 流转图 -->
		<Timeline :dialogFormVisible="timeline_status" :sid="sid" :aid="aid" :dhname="dhname" :fuid="fuid" @CB-dialogFormVisible="CB_timeline"></Timeline>
    <!-- 查看合同 -->
    <Seecontract :dialogFormVisibles="dialogFormVisibles" :sids="sids" :name="name" @CB-dialogFormVisibles="CB_dialogFormVisibles"></Seecontract>
	</div>
</template>

<script>
import { mapState } from "vuex";
import ziliaoEdit from "./gaiInfo.vue";
import gaiInfoImg from "./gaiInfoImg.vue";
import SetPassWord from "./setPassWord.vue";
import Timeline from "./timeline.vue";
import Uploader from "@/components/pl-upload.vue";
import Bingtu from "../chart/index_zongchanliang.vue";
//查看合同 续约
import Seecontract from "./seecontract.vue";

export default {
  // 当切入路由时，执行该方法
  activated: function() {
    this.gq_Data(); //即将过期
    this.sh_Data(); //审核中
    this.getMessage(); //重要通知
    this.getRound(); //总产量饼图
  },
  deactivated() {
    this.chanliangStatus = false;
  },
  //数据绑定
  data() {
    return {
      errimg: 'this.src="' + require("../../assets/img/avatar.png") + '"',
      message: "", //通知消息
      passwordStatus: false,
      dialogVisibles: false,
      dialogStatus: false,
      guoqi_data: [],
      total_gq: 0, //授权信息即将过期条数
      shenhe_data: [],
      total_sh: 0, //授权申请正在审核中的条数
      loading: false,
      loading_s: false,
      timeline_status: false,
      sid: 0,
      dhname: "",
      aid: 0,
      fuid: 0,
      // 续约传参
      dialogFormVisibles:false,
      sids:"",
      name:"",

      //总产量饼图 传递参数
      chanliang: [], //饼图右侧标记显示数据传递
      chanliangData: [], //饼图数据传递
      chanliangStatus: false, //接口执行标记
      status: "", //下拉筛选绑定值
      color: false, //按钮切换样式控制
      type: 1
    };
  },
  methods: {
    //按钮切换 产量
    btncl_switch() {
      if (this.color) {
        this.color = !this.color;
        this.type = 1;
        this.getRound();
      }
    },
    //按钮切换 销量
    btnxl_switch() {
      if (!this.color) {
        this.color = !this.color;
        this.type = 2;
        this.getRound();
      }
    },
    //产品统计图 下拉筛选
    change() {
      this.getRound();
    },
    //重置chanliangStatus 值
    CB_chanliangTu() {
      this.chanliangStatus = false;
    },
    //产品统计图数据
    getRound() {
      this.axios({
        method: "post",
        url: this.API_ROOT + "/home_api/apply_authorize/round",
        data: {
          mid: this.uinfo.id,
          time: this.status,
          type: this.type
        },
        headers: this.$store.getters.Request_Head
      }).then(
        response => {
          if (this.getToken(response.data)) {
            let data = response.data.data;
            this.chanliang = data.data;
            this.chanliangData = data.derivative;
            this.chanliangStatus = true;
          }
        },
        error => {
          this.$emit("API-ERR");
        }
      );
    },
    //注销
    loginout() {
      this.lockout();
    },
    //个人资料
    handleEdit() {
      this.dialogStatus = true;
    },
    CB_dialogStatus(val) {
      this.dialogStatus = false;
    },
    //更改头像
    editTouxiang() {
      this.dialogVisibles = true;
    },
    Cb_ImgDialog(val) {
      this.dialogVisibles = false;
    },
    //修改密码
    setPassword() {
      this.passwordStatus = true;
    },
    CB_setPasswordStatus(val) {
      this.passwordStatus = false;
    },
    //跳转
    tomessage(id) {
      this.$router.push({
        name: "message_detail",
        params: {
          id: id
        }
      });
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
            this.message = response.data.data.important;
          }
        },
        error => {
          this.$emit("API-ERR");
        }
      );
    },
    //即将过期授权
    gq_Data() {
      this.loading = true;
      this.axios({
        method: "post",
        url: this.API_ROOT + "/home_api/apply_authorize/index",
        data: {
          type: 3,
          listRows: 100
        },
        headers: this.$store.getters.Request_Head
      }).then(
        response => {
          if (this.getToken(response.data)) {
            this.guoqi_data = response.data.data;
            this.total_gq = response.data.count;
          }
          this.loading = false;
        },
        error => {
          this.loading = false;
          this.$emit("API-ERR");
        }
      );
    },
    //审核中授权
    sh_Data() {
      this.loading_s = true;
      this.axios({
        method: "post",
        url: this.API_ROOT + "/home_api/apply_authorize/index",
        data: {
          type: [1, 2],
          listRows: 100
        },
        headers: this.$store.getters.Request_Head
      }).then(
        response => {
          if (this.getToken(response.data)) {
            this.shenhe_data = response.data.data;
            this.total_sh = response.data.count;

            //最新审核状态展示处理
            // $.each(this.shenhe_data,(index,item)=> {
            //   let len = item.process.length;
            //   item.new_process=item.process[len-1].title
            // })
          }
          this.loading_s = false;
        },
        error => {
          this.loading_s = false;
          this.$emit("API-ERR");
        }
      );
    },

    //审核详情
    openTimeline(id, name, aid, fuid) {
      this.timeline_status = true;
      this.sid = id;
      this.aid = aid;
      this.dhname = name;
      this.fuid = fuid;
    },
    CB_timeline(id) {
      if (id) {
        this.sh_Data();
      }
      this.timeline_status = false;
    },
    //查看合同 续约
    contract(id, name) {
      this.dialogFormVisibles = true;
      this.sids = id;
      this.name = name;
    },
    CB_dialogFormVisibles() {
      this.dialogFormVisibles = false;
    }
  },
  //计算属性
  computed: mapState({
    uinfo: state => state.uinfo,
    click_noticeid: state => state.click_noticeid,
    cpround_options: state => state.cpround_options
  }),
  components: {
    ziliaoEdit,
    gaiInfoImg,
    SetPassWord,
    Timeline,
    Uploader,
    Bingtu,
    Seecontract
  }
};
</script>



<style scoped>
.img-circle {
  border-radius: 50%;
  cursor: pointer;
}

.head-height {
  height: 105px;
}
.tz-bgcolor {
  background-color: #fff1c9;
}
.table-head {
  border-top: 3px solid #16a0f8;
}
.success {
  background: #2a9bf3;
  color: white;
}
</style>
