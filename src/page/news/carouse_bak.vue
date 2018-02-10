<template>
	<div>
		<h1 class="dhp-h1 no-margin-top margin-bottom-20">授权发布</h1>
        <!-- banner -->
        <el-carousel indicator-position="none" height="320px">
            <el-carousel-item v-for="item in 4" :key="item">
              <div class="sqfb-banner-img">
                  <img src="../../assets/img/sqfb-banner.jpg" alt="">
                  <div class="sqfb-banner-bg"></div>
                  <div class="sqfb-banner-txt font-18">
                      明星大集结，欢乐一夏
                  </div>
              </div>
            </el-carousel-item>
        </el-carousel>
	</div>
</template>
<script>
export default{
	activated:function() {
		
	},
	data(){
		return{
				
		}
	}
}
</script>