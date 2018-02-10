<template>
    <!-- 列表页右侧新闻列表 -->
    <div class="xinwen-zx">
        <div class="xwzx-title font-18">
            <span class="padding-top-10"><b>新闻资讯</b></span>
        </div>
        <ul>
            <li class="aui-ellipsis-2 margin-bottom-10 padding-left-10 font-14" style="cursor:pointer" :key="item.id" v-for="(item,index) in xinwenData" @click="handleEdit(item.id)">{{item.title}}</li>
        </ul>
    </div>
</template>
<script>
export default {
  activated: function() {
    //新闻&热点资讯
    this.getXinwen();
  },

  data() {
    return {
      xinwenData: []
    };
  },
  methods: {
    //新闻资讯的请求
    getXinwen() {
      this.loading = true;
      this.axios({
        method: "post",
        url: this.API_ROOT + "/home_api/news",
        data: {
          listRows: 5,
          type:6
        },
        headers: this.$store.getters.Request_Head
      }).then(
        response => {
          if (this.getToken(response.data)) {
            this.xinwenData = response.data.data;
          }
          this.loading = false;
        },
        error => {
          this.loading = false;
          this.$emit("API-ERR");
        }
      );
    },
    handleEdit(id) {
      this.$router.push({
        name: "sqfb-details",
        params: {
          id: id
        }
      });
    }
  }
};
</script>
