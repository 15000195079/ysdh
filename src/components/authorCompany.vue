<template>
    <el-dialog :visible.sync="dialogStatus" width="750px" @close="closeDialog" title='授权公司'>
        <div :style="{'max-height': _PageHeight-100+'px', 'overflow-y': 'auto'}">
            <el-table :data="data" style="width: 100%">
                <el-table-column prop="company" label="公司" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="goods" label="授权商品" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span v-if="scope.row.goods&&scope.row.goods.length>0">共{{scope.row.goods.length}}项
                            <span style="cursor:pointer;" class="text-primary" @click="open(scope.row)">【查看】</span>
                        </span>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog width="50%" top="20vh" :title="title" :visible.sync="innerVisible" append-to-body>
                <el-table :data="cp_data" class="table-head" stripe style="width: 100%">
                    <el-table-column prop="title" label="商品名称" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="number" label="商品编号" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="商品图片">
                        <template slot-scope="scope">
                            <el-popover placement="right" width="420" trigger="click" v-for="(vo,index) in scope.row.img" :key="index" style="margin-right:5px">
                                <img :src="vo.original" alt="" style="width:420px;height:330px" />
                                <img slot="reference" :src="vo.img" style="width:40px;height:30px;cursor:pointer;">
                            </el-popover>
                        </template>
                    </el-table-column>
                </el-table>
            </el-dialog>
        </div>
    </el-dialog>
</template>
<script>
export default {
  props: ["dialogFormVisible", "data"],
  data() {
    return {
      dialogStatus: false,
      innerVisible: false,
      title: "",
      cp_data: []
    };
  },
  watch: {
    dialogFormVisible(newValue, oldValue) {
      this.dialogStatus = newValue;
    }
  },
  methods: {
    getData() {
      this.loading = true;
    },
    closeDialog(id) {
      this.$emit("CB-dialogFormVisible", false);
    },
    open(data) {
      this.innerVisible = true;
      this.title = data.company;
      this.cp_data = data.goods;
    }
  }
};
</script>
<style scoped>
.table-head {
  background-color: #fff !important;
}
</style>

