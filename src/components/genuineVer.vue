<template>
	<el-dialog :visible.sync="dialogStatus" width="750px" @close="closeDialog" title='商品信息'>
		<el-form ref="data" :model="data" label-width="120px" label-suffix='：'>
			<el-row :gutter="20">
				<el-col :md="12" style="height:70px">
					<el-form-item label="商品名称">
						{{data.title}}
					</el-form-item>
				</el-col>
				<el-col :md="12" style="height:70px">
					<el-form-item label="商品编号">
						{{data.number}}
					</el-form-item>
				</el-col>
				<el-col :md="12" style="height:70px">
					<el-form-item label="商品批次">
						{{data.batch}}
					</el-form-item>
				</el-col>
				<el-col :md="12" style="height:70px">
					<el-form-item label="授权公司">
						{{data.company}}
					</el-form-item>
				</el-col>
				<el-col :md="24" style="height:110px" v-if="data.img&&data.img.length>0">
					<el-form-item label="商品图片">
						<el-col :md="4" v-for="(vo,index) in data.img" :key="index">
							<el-popover placement="right" width="420" trigger="click">
								<img :src="vo.original" alt="" style="width:420px;height:330px" />
								<img slot="reference" :src="vo.img" style="width:80px;height:60px;cursor:pointer;">
							</el-popover>
						</el-col>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
	</el-dialog>
</template>
<script>
export default {
  props: ["dialogVisible", "data"],
  data() {
    return {
      dialogStatus: false
    };
  },
  watch: {
    dialogVisible(newValue, oldValue) {
      this.dialogStatus = newValue;
    }
  },
  methods: {
    closeDialog(id) {
      this.$emit("CB-dialogVisible", false);
    }
  }
};
</script>
