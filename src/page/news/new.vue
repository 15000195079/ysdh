<template>
    <div v-loading="loading" element-loading-text="拼命加载中">
        <div class="margin-bottom-10 text-aligh-right" v-if="$route.name=='news-search'">搜索结果：共{{total}}条</div>
        <div v-if="tableData.length>0">
            <div v-for="(item,index) in tableData" :key="index">
                <el-row :gutter="20" class="margin-bottom-20">
                    <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                        <div class="dhp-list-img">
                            <router-link :to="{name:'sqfb-details',params:{id:item.id}}">
                                <img :src="item.img_s" width="240" height="150" alt="" :onerror="logo">
                            </router-link>
                        </div>
                    </el-col>
                    <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16">
                        <div class="dhp-list-main">
                            <h2 class="aui-ellipsis-2 font-20 margin-top-5">
                                <router-link :to="{name:'sqfb-details',params:{id:item.id}}">
                                    <b class=" wenzhang">{{item.title}}</b>
                                </router-link>
                            </h2>
                            <div class="dhp-list-txt aui-ellipsis-2 margin-top-15 margin-bottom-20">
                                {{item.daodu}}
                            </div>
                            <div class="dhp-list-bq">
                                <el-tag type="default" size="small">{{item.type=='1'?'授权发布':'热点资讯'}}</el-tag>
                                &nbsp;&nbsp;&nbsp;&nbsp;{{item.author}}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;{{item.update_time}}
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <hr class="margin-bottom-20" v-if="tableData.length>1">
            </div>
        </div>
        <el-row v-if="tableData.length==0">
            <div class="font-16 margin-top-20 margin-bottom-20" align="center">未查询到相关数据~~</div>
        </el-row>
        <div class="fenye margin-top-20">
            <el-pagination layout="prev, pager, next" :total="total" :current-page="currentPage" @current-change="handleCurrentChange" prev-text="上一页" next-text="下一页">
            </el-pagination>
        </div>
    </div>
</template>
<script>
//导入vuex辅助函数
import { mapState } from "vuex";
export default {
  activated: function() {
    this.getData();
  },
  data() {
    return {
      loading: false,
      total: 0,
      currentPage: 1,
      tableData: [],
      type: "",
      logo: 'this.src="' + require("../../assets/img/defalt.jpg") + '"'
    };
  },
  methods: {
    //获取数据
    getData(keys,type) {
      this.loading = true;
      this.axios({
        method: "post",
        url: this.API_ROOT + "/home_api/news",
        data: {
          keys: keys||this.$route.params.keys,
          type: type||this.$route.meta.type,
          listRows: 8,
          page: this.currentPage
        },
        headers: this.$store.getters.Request_Head
      }).then(
        response => {
          if (this.getToken(response.data)) {
            this.tableData = response.data.data;
            this.total = response.data.count;
          }
          this.loading = false;
        },
        error => {
          this.loading = false;
          this.$emit("API-ERR");
        }
      );
    },
    //监听当前页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getData();
    }
  },
  computed: mapState({
    _pageSize: state => state.pageSize,
    _pageSizes: state => state.pageSizes
  })
};
</script>
<style scoped>
.dhp-list-img {
  width: 240px;
  height: 150px;
}

.wenzhang {
  color: black;
}

.wenzhang:hover {
  color: #9999cc;
}
</style>
