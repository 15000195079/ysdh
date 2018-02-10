<template>
    <!-- 列表页右侧广告位-->
    <div class="guanggao-box margin-bottom-20" v-if="form.length > 0">
        <a :href="form[0].url" target="_Blank">
            <img :src="form[0].img" :onerror="logo" alt="">
        </a>
        <div class="gg-txt font-14">
            <span class="padding-left-20">{{form[0].title}}</span>
        </div>
    </div>
</template>
<script>
export default {
    /**
     * bianhao 广告位编号，必须项，如不传，则默认为“1”，投放广告时根据此编号 自动生成对应的广告内容。
     */
    created:function(){
        
        this.getSrc()
    },
    props: ['bianhao'],
    data(){
        return {
            src: '',
            type:null,
            form:[],
            logo:'this.src="' + require('../assets/img/defalt.jpg') + '"'
        }
    },
    methods: {
        getSrc(){
            this.axios({
                method: "post",
                url: this.API_ROOT + "/home_api/guanggao",
                data: {
                   type:this.bianhao,
                   listRows:1
                },
                headers: this.$store.getters.Request_Head
            }).then(response => {
                if(this.getToken(response.data)){
                   this.form=response.data.data
                }
            },error => {
                this.loading = false;
                this.$emit("API-ERR");
                }
            );
        }
    }
};

</script>
