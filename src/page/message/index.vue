<template>
	<div style="background-color: #fff;padding:15px;min-height:500px" v-loading="loading" element-loading-text="拼命加载中">
		<el-tabs v-model="show" @tab-click="tabclick">
			<!-- 通知公告 -->
			<el-tab-pane label="通知公告" name="notices">
				<el-row class="margin-bottom-15">
					<el-input placeholder="请输入内容" v-model="keys" class="pull-right" style="width:300px;" size="medium" @change="search" clearable>
						<el-button slot="append" @click="search(keys)">搜索</el-button>
					</el-input>
				</el-row>
				<!-- <h4 class="text-danger" align="center" v-if="tableData.length == 0">暂无相关通知公告</h4> -->
				<el-table :data="tableData" stripe style="width: 100%">
					<el-table-column type="index" label="序号">
					</el-table-column>
					<el-table-column prop="title" label="标题名称" width="500" show-overflow-tooltip>
						<template slot-scope="scope">
							<span v-if="scope.row.is_top == '2'" class="badge badge-danger">置顶</span>
							<span style="cursor:pointer" :class="scope.row.show ?'text-muted' :'color'" @click="openMessgge(scope.row.id)">{{scope.row.title}}</span>
						</template>
					</el-table-column>
					<el-table-column label="附件" show-overflow-tooltip>
						<template slot-scope="scope">
							<a :href="scope.row.annex_url" target="_blank" v-if="scope.row.annex">{{scope.row.annex}}</a>
							<span v-else>--</span>
						</template>
					</el-table-column>
					<el-table-column prop="update_time" label="发布时间" width="180">
					</el-table-column>
				</el-table>
			</el-tab-pane>
			<!-- 站内信 -->
			<el-tab-pane label="站内信" name="letters">
				<h4 class="text-danger" align="center" v-if="tableLetter.length == 0">暂无相关信息</h4>
				<div v-for="vo in tableLetter" :key="vo.id" class="text item padding-top-10">
					<el-col>
						<div>
							<span class="pull-left">
								<!-- 授权申请分配给项目经理  106 -->
								<span class="pull-left" v-if="vo.status == '106'">{{vo.user.name}}({{vo.user.phone}})将你关于
									<span class="text-primary">《{{vo.cn_name}}》</span>的申请分配给了
									<span class="text-success">{{vo.fuser.name}}({{vo.fuser.phone}})</span>
								</span>

								<!-- 授权归类为无效申请 93 -->
								<span class="pull-left overspan" v-if="vo.status == '93'">
									<span class="text-success">{{vo.user.name}}({{vo.user.phone}})</span>将你关于
									<span class="text-primary">《{{vo.cn_name}}》</span>的申请确认为
									<span class="text-danger">无效申请</span>！
									<span>备注:
										<el-popover placement="top" width="180px" trigger="hover">
											{{vo.beizhu}}
											<span class="text-warning" slot="reference">{{vo.beizhu}}</span>
										</el-popover>
									</span>
								</span>

								<!-- 授权需要提交认证材料 95 -->
								<span class="pull-left" v-if="vo.status == '95'">
									<span class="text-success">{{vo.user.name}}({{vo.user.phone}})</span>提醒你关于
									<span class="text-primary">《{{vo.cn_name}}》</span>的申请需要
									<span class="text-info">提交认证材料</span>！
								</span>

								<!-- 认证材料被退回 97 -->
								<span class="pull-left overspan" v-if="vo.status == '97'">
									<span class="text-success">{{vo.user.name}}({{vo.user.phone}})</span>提醒你关于
									<span class="text-primary">《{{vo.cn_name}}》</span>的
									<span class="text-danger">认证材料不符合要求</span>,请确认并重新提交!
									<span>备注:
										<el-popover placement="top" width="180px" trigger="hover">
											{{vo.beizhu}}
											<span class="text-warning" slot="reference">{{vo.beizhu}}</span>
										</el-popover>
									</span>
								</span>

								<!-- 认证材料已通过 98 -->
								<span class="pull-left" v-if="vo.status == '98'">
									<span class="text-success">{{vo.user.name}}({{vo.user.phone}})</span>提醒你关于
									<span class="text-primary">《{{vo.cn_name}}》</span>的认证材料已审核通过！
								</span>

								<!-- 电子合同发送至前台 119 -->
								<span class="pull-left" v-if="vo.status == '119'">
									<span class="text-primary">《{{vo.cn_name}}》</span>授权下的
									<span class="text-primary">《{{vo.hname}}》</span>电子合同已发送,可在
									<router-link :to="{name:'myHetong'}">
										<span class="text-warning">合同管理</span>
									</router-link>中查看！
								</span>

								<!-- 撤回电子合同的发送 182 -->
								<span class="pull-left" v-if="vo.status == '182'">
									<span class="text-success">{{vo.user.name}}({{vo.user.phone}})</span>
									将您
									<span class="text-primary">《{{vo.cn_name}}》</span>授权下的
									<span class="text-primary">《{{vo.hname}}》</span>电子合同撤回了！
								</span>

								<!-- 合同通过审核 121 -->
								<span class="pull-left" v-if="vo.status == '121'">
									<span class="text-success">{{vo.user.name}}({{vo.user.phone}})</span>
									通过了
									<span class="text-primary">《{{vo.cn_name}}》</span>
									合同的审核！
								</span>

								<!-- 已线下签约 117 -->
								<span class="pull-left" v-if="vo.status == '117'">
									<span class="text-success">{{vo.user.name}}({{vo.user.phone}})</span>
									将您
									<span class="text-primary">《{{vo.cn_name}}》</span>下的
									<span class="text-primary">《{{vo.hname}}》</span>
									合同状态更新为线下签约,
									<span class="text-warning">请您及时付款并上传付款凭证！</span>
								</span>

								<!-- 确认付款凭证 184 -->
								<span class="pull-left" v-if="vo.status == '184'">
									<span class="text-success">{{vo.user.name}}({{vo.user.phone}})</span>
									确认了您关于
									<span class="text-primary">《{{vo.hname}}》</span>合同下的一笔付款记录,快去
									<span>合同管理</span>中查看吧！
								</span>

								<!-- 产品初审退回 173 -->
								<span class="pull-left overspan" v-if="vo.status == '173'">
									<span class="text-success">{{vo.user.name}}({{vo.user.phone}})</span>
									初审退回了
									<span class="text-primary">《{{vo.dname}}》</span>产品申请！
									<span>备注:
										<el-popover placement="top" width="180px" trigger="hover">
											{{vo.beizhu}}
											<span class="text-warning" slot="reference">{{vo.beizhu}}</span>
										</el-popover>
									</span>
								</span>

								<!-- 产品初审通过 174 -->
								<span class="pull-left" v-if="vo.status == '174'">
									<span class="text-success">{{vo.user.name}}({{vo.user.phone}})</span>
									初审通过了
									<span class="text-primary">《{{vo.dname}}》</span>产品申请！
								</span>

								<!-- 产品二审退回 175 -->
								<span class="pull-left overspan" v-if="vo.status == '175'">
									<span class="text-success">{{vo.user.name}}({{vo.user.phone}})</span>
									二审退回了
									<span class="text-primary">《{{vo.dname}}》</span>产品申请！
									<span>备注:
										<el-popover placement="top" width="180px" trigger="hover">
											{{vo.beizhu}}
											<span class="text-warning" slot="reference">{{vo.beizhu}}</span>
										</el-popover>
									</span>
								</span>

								<!-- 产品二审通过 176 -->
								<span class="pull-left" v-if="vo.status == '176'">
									<span class="text-success">{{vo.user.name}}({{vo.user.phone}})</span>
									二审通过了
									<span class="text-primary">《{{vo.dname}}》</span>产品申请！
								</span>

								<!-- 产品终审通过 177 -->
								<span class="pull-left" v-if="vo.status == '177'">
									<span class="text-success">{{vo.user.name}}({{vo.user.phone}})</span>
									将您
									<span class="text-primary">《{{vo.dname}}》</span>产品申请状态更新为
									<span class="text-warning">已通过</span>！
								</span>

								<!-- 产品批次退回 179 -->
								<span class="pull-left overspan" v-if="vo.status == '179'">
									<span class="text-success">{{vo.user.name}}({{vo.user.phone}})</span>
									退回了您关于
									<span class="text-primary">《{{vo.dname}}》</span>产品下的
									<span class="text-primary">《{{vo.gname}}》</span>批次申请！
									<span>备注:
										<el-popover placement="top" width="180px" trigger="hover">
											{{vo.beizhu}}
											<span class="text-warning" slot="reference">{{vo.beizhu}}</span>
										</el-popover>
									</span>
								</span>

								<!-- 产品批次通过 180 -->
								<span class="pull-left" v-if="vo.status == '180'">
									<span class="text-success">{{vo.user.name}}({{vo.user.phone}})</span>
									通过了您关于
									<span class="text-primary">《{{vo.dname}}》</span>产品下的
									<span class="text-primary">《{{vo.gname}}》</span>批次申请！
								</span>

								<!-- 生成防伪码 181 -->
								<span class="pull-left" v-if="vo.status == '181'">
									<span class="text-primary">《{{vo.dname}}》</span>产品下的
									<span class="text-primary">《{{vo.gname}}》</span>已生成防伪码！
								</span>

								<!-- 删除动画片 234 -->
								<span class="pull-left" v-if="vo.status == '234'">
									<span class="text-success">{{vo.user.name}}({{vo.user.phone}})</span>删除了
									<span class="text-primary">{{vo.name}}</span>动画片！
								</span>
								<!-- 删除动画片 235 -->
								<span class="pull-left" v-if="vo.status == '235'">
									<span class="text-success">{{vo.user.name}}({{vo.user.phone}})</span>删除了
									<span class="text-primary">{{vo.name}}</span>授权！
								</span>
								<!-- 删除动画片 236 -->
								<span class="pull-left" v-if="vo.status == '236'">
									<span class="text-success">{{vo.user.name}}({{vo.user.phone}})</span>删除了
									<span class="text-primary">{{vo.name}}</span>动画片！
								</span>
							</span>

							<span class="pull-right">{{vo.time}}</span>
						</div>
					</el-col>
					<hr style="margin-top:25px">
				</div>
			</el-tab-pane>

			<!-- 分页 -->
			<div class="fenye margin-top-20" v-if="total> 0">
				<el-pagination layout="prev, pager, next" :total="total" prev-text="上一页" next-text="下一页" :page-size="15" @current-change="handleCurrentChange" :current-page="currentPage">
				</el-pagination>
			</div>
		</el-tabs>
	</div>
</template>
<script>
import { mapState } from "vuex";

export default {
  activated: function() {
    this.show = "notices";
    this.getData();
  },
  deactivated() {
    this.keys = "";
    this.show = "";
  },
  data() {
    return {
      tableData: [],
      tableLetter: [],
      keys: "",
      show: "", //选项卡初始显示
      num: 0,
      loading: false,
      //分页
      total: 0,
      currentPage: 1
    };
  },
  methods: {
    //通知公告
    getData() {
      this.loading = true;
      this.axios({
        method: "post",
        url: this.API_ROOT + "/home_api/notice/index",
        data: {
          keys: this.keys,
          listRows: 15,
          page: this.currentPage
        },
        headers: this.$store.getters.Request_Head
      }).then(
        response => {
          this.loading = false;
          if (this.getToken(response.data)) {
            this.tableData = response.data.data;
            this.total = response.data.count;
            $.each(this.tableData, (index, item) => {
              if (
                this.click_noticeid[this.uinfo.id] == undefined ||
                this.click_noticeid[this.uinfo.id].indexOf(item.id) == -1
              ) {
                item.show = false;
              } else {
                item.show = true;
              }
            });
          }
        },
        error => {
          this.loading = false;
          this.$emit("API-ERR");
        }
      );
    },
    //站内信
    getLetter() {
      this.axios({
        method: "post",
        url: this.API_ROOT + "/home_api/member/notice",
        data: {
          listRows: 15,
          page: this.currentPage
        },
        headers: this.$store.getters.Request_Head
      }).then(
        response => {
          if (this.getToken(response.data)) {
            this.tableLetter = response.data.data.data;
            this.total = response.data.data.count;
            this.$emit("read", 1);
          }
        },
        error => {
          this.$emit("API-ERR");
        }
      );
    },
    //搜索
    search(val) {
      this.keys = val.replace(/[\'\"]/g, "").trim();
      this.getData();
    },
    //查看通知详情
    openMessgge(id) {
      this.$router.push({
        name: "message_detail",
        params: {
          id: id
        }
      });
    },
    //选项卡点击切换
    tabclick(val) {
      this.num = Number(val.index);
      if (this.num) {
        this.getLetter();
      } else {
        this.getData();
      }
    },
    //页码
    handleCurrentChange(val) {
      this.currentPage = val;
      if (this.num) {
        this.getLetter();
      } else {
        this.getData();
      }
    }
  },
  computed: mapState({
    uinfo: state => state.uinfo,
    click_noticeid: state => state.click_noticeid
  })
};
</script>
<style scoped>
.overspan {
  width: 735px;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}
.badge {
  display: inline-block;
  min-width: 10px;
  padding: 3px 7px;
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  background-color: #777;
  border-radius: 10px;
  margin-bottom: 4px;
}
.badge-danger {
  background-color: #ef5350;
}
.color {
  color: #000;
}
</style>

