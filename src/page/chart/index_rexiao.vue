<template>
    <div id="index_rexiao" style="width: 100%;height: 400px;"></div>
</template>
<script>
import Vue from "vue";

export default {
    data() {
        return {};
    },
    mounted() {
        var echarts = require("echarts");
        // 基于准备好的dom，初始化echarts实例
        var myChart_rexiao = echarts.init(document.getElementById('index_rexiao'));
        var option = {
            title: {
                text: '热销授权商品Top10',
                subtext: '根据已销售商品总数进行综合排名',
                left: '110'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01]
            },
            yAxis: {
                type: 'category',
                data: ['光头强玩具步枪', '小魔仙文具盒', '小猪佩奇儿童衣服', '小猪佩奇童鞋', '小猪佩奇背包', '小猪佩奇滑滑梯', '小猪佩奇童鞋', '小猪佩奇背包', '小猪佩奇滑滑梯', '小猪佩奇滑滑梯']
            },
            series: [{
                type: 'bar',
                data: [3000, 4879, 5895, 8984, 15841, 26457, 8984, 15841, 26457, 26457]
            }]
        };

        myChart_rexiao.setOption(option);

    },
    methods: {

    },
    computed: {}
};

</script>
