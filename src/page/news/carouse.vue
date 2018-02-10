<template>
    <div>
        <h1 class="dhp-h1 no-margin-top margin-bottom-20">授权发布</h1>
        <!-- banner -->
        <el-carousel indicator-position="none" :interval="5000" v-if="form.length > 0" :arrow="form.length>1?'hover':'never'" height="320px">
            <el-carousel-item v-for="(item,index) in form" :key="index">
                <div class="sqfb-banner-img">
                    <a :href="item.url" target="_Blank">
                        <img :src="item.imgx" alt="" :onerror="logo" style="height:100%">
                    </a>
                    <div class="sqfb-banner-bg"></div>
                    <div class="sqfb-banner-txt font-18">
                        {{item.title}}
                    </div>
                </div>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>
<script>
export default {
  activated() {
    this.getCarousel();
  },
  props: ["bianhao"],
  data() {
    return {
      logo: 'this.src="' + require("../../assets/img/defalt.jpg") + '"',
      form: []
    };
  },
  methods: {
    getCarousel() {
      this.axios({
        method: "post",
        url: this.API_ROOT + "/home_api/guanggao",
        data: {
          type: this.bianhao,
          listRows: 2
        },
        headers: this.$store.getters.Request_Head
      }).then(
        response => {
          if (this.getToken(response.data)) {
            this.form = response.data.data;
          }
        },
        error => {
          this.loading = false;
          this.$emit("API-ERR");
        }
      );
    }
  }
};
</script>