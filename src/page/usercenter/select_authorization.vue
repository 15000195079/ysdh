<template>
	<el-dialog title="请选择在哪条授权下新增产品" :visible.sync="dialogStatus" @close="close">
		<div v-loading="loading" element-loading-text="拼命加载中">
			<el-table :data="tableData" class="table-head" stripe>
				<el-table-column prop="number" label="授权编号" fixed min-width="150" show-overflow-tooltip>
				</el-table-column>
				<el-table-column label="授权动画片名" min-width="150" show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-if="scope.row.cn_name">{{scope.row.cn_name}}</span>
            <span style="color:red;" v-else>该动画片已被删除</span>
          </template>
				</el-table-column>
				<el-table-column label="操作" show-overflow-tooltip>
					<template slot-scope="scope">
						<el-button slot="reference" type="text" @click="select(scope.row.id)">选择</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</el-dialog>
</template>
<script>
import { mapState } from "vuex";
export default {
  props: ["dialogFormVisible"],
  data() {
    return {
      loading: false,
      dialogStatus: false,
      tableData: []
    };
  },
  watch: {
    //dialog显示隐藏监听
    dialogFormVisible: function(newValue, oldValue) {
      this.dialogStatus = newValue;
      if (newValue) {
        this.getData();
      }
    }
  },
  methods: {
    //dialog被关闭
    close() {
      this.$emit("CB-dialogFormVisible", false);
    },

    //拉取进行中的授权信息
    getData() {
      this.loading = true;
      this.axios({
        method: "post",
        url: this.API_ROOT + "/home_api/apply_authorize/index",
        data: {
          info: "",
          type:4
        },
        headers: this.$store.getters.Request_Head
      }).then(
        response => {
          if (this.getToken(response.data)) {
            this.tableData = response.data.data;
          }
          this.loading = false;
        },
        error => {
          this.$emit("API-ERR");
          this.loading = false;
        }
      );
    },
    //选择授权 跳转至产品新增页面
    select(pid) {
      this.$emit("CB-dialogFormVisible", false);
      this.$router.push({
        name: "shouquanchanpin_detail",
        params: {
          pid: pid,
          id: 0
        }
      });
    }
  },
  //计算属性
  computed: mapState({
    uinfo: state => state.uinfo
  })
};
</script>
