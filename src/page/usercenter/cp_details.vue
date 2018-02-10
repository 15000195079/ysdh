<template>
    <el-dialog :title="xqtitle" :visible.sync="dialogStatus" @close="close" width="65%" append-to-body>
        <div style="width:100%;height:20px;border-top:1px solid #E1E1E1"></div>
        <el-form label-width="110px" class="padding-10">
            <el-row>
                <el-col :sm="12" :md="8" class="margin-bottom-10">
                    <el-form-item label="产品名称：">
                        {{tableData.title}}
                    </el-form-item>
                </el-col>

                <el-col :sm="12" :md="8" class="margin-bottom-10">
                    <el-form-item label="产品类目：">
                        <el-tooltip class="item" effect="dark" :content="content" placement="top" v-if="content.length>2">
                            <span>
                                <span v-for="(cate,index) in tableData.leixing" :key="cate.index">
                                    <span v-if="index >0 && index<2">/</span>
                                    <span v-if="index<2">{{cate}}</span>
                                    <span v-if="index>1">...</span>
                                </span>
                            </span>
                        </el-tooltip>

                        <span v-for="(cate,index) in tableData.leixing" :key="cate.index" v-else>
                            <span v-if="index >0 && index<2">/</span>
                            <span v-if="index<2">{{cate}}</span>
                            <span v-if="index>1">...</span>
                        </span>
                    </el-form-item>
                </el-col>

                <el-col :sm="12" :md="8" class="margin-bottom-10">
                    <el-form-item label="产品状态：">
                        <span class="text-primary">{{tableData.type}}</span>
                    </el-form-item>
                </el-col>

                <el-col :sm="12" :md="8" class="margin-bottom-10">
                    <el-form-item label="总产量：">
                        {{tableData.total||'--'}}
                    </el-form-item>
                </el-col>
                <el-col :sm="12" :md="8" class="margin-bottom-10">
                    <el-form-item label="已售出数量：">
                        {{tableData.sell||'--'}}
                    </el-form-item>
                </el-col>
                <el-col :sm="12" :md="8" class="margin-bottom-10">
                    <el-form-item label="剩余库存数量：">
                        {{tableData.lave||'--'}}
                    </el-form-item>
                </el-col>

                <el-col :sm="12" :md="8" class="margin-bottom-10" v-if="tableData.count">
                    <el-form-item label="生产批次：">
                        共{{tableData.count}}个批次
                    </el-form-item>
                </el-col>
                
                <el-col :sm="12" :md="8" class="margin-bottom-10">
                    <el-form-item label="关联授权编号：">
                        <span v-if="tableData.pid && tableData.pid.number">{{tableData.pid.number}}</span>
                    </el-form-item>
                </el-col>

                <el-col :sm="12" :md="8" class="margin-bottom-10">
                    <el-form-item label="授权到期时间：">
                        {{tableData.pid && tableData.pid.end_time || '--'}}
                    </el-form-item>
                </el-col>

                <el-col style="margin-top:20px;" class="margin-bottom-10">
                    <el-form-item label="产品设计图：">
                        <span v-for="item in tableData.sign" :key="item.id">
                            <a :href="item.original" target="_blank"><img :src="item.original" alt="" style="padding-left:20px;width:120px;height:120px;"></a>
                        </span>
                    </el-form-item>
                </el-col>

                <el-col>
                    <el-form-item label="实物样品图：">
                        <span v-for="item in tableData.design" :key="item.id">
                            <a :href="item.original" target="_blank"><img :src="item.original" alt="" style="padding-left:20px;width:120px;height:120px;"></a>
                        </span>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </el-dialog>
</template>
<script>
import { mapState } from "vuex";
export default {
  props: ["dialogFormVisiblexq", "xqid", "xqtitle"],
  data() {
    return {
      loading: false,
      dialogStatus: false,
      tableData: "",
      content: "" //产品类目显示处理
    };
  },
  watch: {
    //dialog显示隐藏监听事件
    dialogFormVisiblexq: function(newValue, oldValue) {
      this.dialogStatus = newValue;
      if (newValue) {
        this.getData();
      } else {
        this.tableData = "";
      }
    }
  },
  methods: {
    //dialog被关闭
    close() {
      this.$emit("CB-dialogFormVisiblexq", false);
    },

    //拉取进行中的授权信息
    getData() {
      this.loading = true;
      this.axios({
        method: "post",
        url: this.API_ROOT + "/home_api/derivative/viewread",
        data: {
          id: this.xqid
        },
        headers: this.$store.getters.Request_Head
      }).then(
        response => {
          if (this.getToken(response.data)) {
            this.tableData = response.data.data;
            // 产品类目页面展示处理
            if (this.tableData.leixing.length > 2) {
              var items = this.tableData.leixing.join("/");
              this.content = items;
            }
          }
          this.loading = false;
        },
        error => {
          this.$emit("API-ERR");
          this.loading = false;
        }
      );
    }
  },
  //计算属性
  computed: mapState({
    uinfo: state => state.uinfo
  })
};
</script>
