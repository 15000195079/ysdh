<template>
    <!-- 列表页右侧广告位-->
    <div class="guanggao-box margin-bottom-20">
        <img src="../assets/img/guanggao.jpg" alt="">
        <div class="gg-txt font-14">
            <span class="padding-left-20">广告位{{bianhao}}</span>
        </div>
    </div>
</template>
<script>
export default {
    /**
     * bianhao 广告位编号，必须项，如不传，则默认为“1”，投放广告时根据此编号 自动生成对应的广告内容。
     */

    props: ['bianhao'],
    data() {
        return {}
    },
    methods: {

    }
};

</script>
