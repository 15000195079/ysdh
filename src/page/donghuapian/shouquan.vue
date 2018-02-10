<template>
	<div class="shouquan-main">
		<div class="warp">
			<h1 class="dhp-h1 margin-top-25 margin-bottom-20">申请授权</h1>
			<Steps :steps="1">步骤条</Steps>
			<div class="beijing">
				<div class="buzhou-box clearfix">
					<el-col :xs="24" :sm="8">
						<div class="buzhou-list clearfix" style="background-color:#fff;padding-top:20px;margin-top:40px;">
							<img src="../../assets/img/tb-bz01.jpg" alt="">
							<h4>
								<b>动画 IP</b>
							</h4>
							<div class="shouquan-jj">
								<el-row class="">
									<el-col :span="10">
										<div class="buzhou-txt-left">
											动画片名
										</div>
									</el-col>
									<el-col :span="14">
										<div class="buzhou-txt-right aui-ellipsis-1">
											{{form.cn_name}}
										</div>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="10">
										<div class="buzhou-txt-left">
											片名编号
										</div>
									</el-col>
									<el-col :span="14">
										<div class="buzhou-txt-right">
											{{form.number}}
										</div>
									</el-col>
								</el-row>
							</div>
							<button class="btn-block margin-top-80" @click="back_dhp_list()" style="cursor:pointer;">重新选择</button>
						</div>
					</el-col>
					<el-col :xs="24" :sm="8">
						<div class="buzhou-list clearfix" style="background-color:#fff;padding-top:20px;margin-top:40px">
							<img src="../../assets/img/tb-bz02.jpg" alt="">
							<h4>
								<b>授权权利</b>
							</h4>
							<div class="shouquan-jj">
								<el-row class="">
									<el-col :span="12">
										<div class="buzhou-txt-left">
											授权权利
										</div>
									</el-col>
									<el-col :span="12">
										<div class="buzhou-txt-right">
											{{this.radio}}
										</div>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="12">
										<div class="buzhou-txt-left">
											是否转授权
										</div>
									</el-col>
									<el-col :span="12">
										<div class="buzhou-txt-right">
											{{this.radio_detail}}
										</div>
									</el-col>
								</el-row>
							</div>
							<button class="btn-block margin-top-80" @click="back_dhp_detail()" style="cursor:pointer;">重新选择</button>
						</div>
					</el-col>
					<el-col :xs="24" :sm="8">
						<div class="buzhou-list clearfix" style="background-color:#fff;padding-top:20px;margin-top:40px">
							<img src="../../assets/img/tb-bz03.jpg" alt="">
							<h4>
								<b>授权品类</b>
							</h4>
							<div class="shouquan-jj">
								<el-row class="padding-left-10 padding-right-10">
									<el-col>
										<span v-for="(item,index) in children" :key="index">
											<span v-if="check[index].arr.length != 0">
												<span v-for="j in children[index].data" :key="j.length">
													<span v-for="i in check[index].arr" :key="i" v-if="j.id == i" class="margin-bottom-5">
														{{j.title}}&nbsp;&nbsp;
													</span>
												</span>
											</span>
										</span>
									</el-col>
								</el-row>
							</div>
							<button class="btn-block margin-top-80" @click="back_dhp_detail()" style="cursor:pointer;">重新选择</button>
						</div>
					</el-col>
				</div>
				<div class="shouquan-bottom margin-top-50 padding-top-25">
					<div class="bz-fanhui">
						<el-button @click="back_dhp_detail()">重新选择</el-button>
					</div>
					<div class="bz-xiayibu">
						<el-button @click="to_wanshanxinxi()">下一步</el-button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import Steps from "./steps";
//导入vuex辅助函数
import { mapState } from "vuex";

export default {
  activated: function() {
    if (this.$route.params.id) {
      this.initData();
    }
  },
  data() {
    return {
      id: "",
      form: {
        cn_name: "",
        number: ""
      },
      radio: "",
      radio_detail: "",
      check: "", //选择的授权品类
      children: []
    };
  },
  methods: {
    initData() {
      //获取ID
      this.id = this.$route.params.id;
      //用户申请授权信息
      this.form = this.shouquan_data[this.id].donghua;
      //授权权利
      switch (this.shouquan_data[this.id].radio) {
        case "1":
          this.radio = "独家授权";
          break;
        case "2":
          this.radio = "非独家授权";
          break;
        default:
          this.radio = "其他";
      }
      //是否转授权
      if (this.shouquan_data[this.id].radio_detail == 1) {
        this.radio_detail = "含转授权";
      } else {
        this.radio_detail = "不含转授权";
      }
      //用户所选择的授权品类
      this.check = this.shouquan_data[this.id].check;
      //授权品类类名
      this.children = this.shouquan_data[this.id].shouquanpinlei;
    },
    //返回动画片列表
    back_dhp_list() {
      this.$router.push({
        name: "donghuapian"
      });
    },
    //返回动画片详情
    back_dhp_detail() {
      this.$router.push({
        name: "dhp-detail",
        params: {
          id: this.$route.params.id
        }
      });
    },
    //跳转
    to_wanshanxinxi() {
      this.$router.push({
        name: "wanshanxinxi",
        params: {
          id: this.$route.params.id
        }
      });
    }
  },
  computed: mapState({
    shouquan_data: state => state.shouquan_data
  }),
  components: {
    Steps
  }
};
</script>
<style scoped>
.beijing {
  background-color: #f5f5f5;
  margin-top: -50px;
  padding: 0 35px 25px;
}
</style>

