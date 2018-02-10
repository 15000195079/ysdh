<template>
    <div id="index_shenqing_top10" style="width: 100%;height: 400px;"></div>
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
        var myChart_shenqing_top10 = echarts.init(document.getElementById('index_shenqing_top10'));
        var option = {
            color: ['#00bcd4'],
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: 30,
                right: 30
            },
            xAxis: [{
                data: ['大头儿子与小头爸爸', '棉花糖和云朵妈妈', '熊出没', '汪汪队立大功', '巴啦啦小魔仙', '葫芦兄弟', '铠甲勇士刑天', '海绵宝宝', '托马斯和朋友', '大耳朵图图'],
                axisTick: {
                    alignWithLabel: true
                },
                axisLabel: {
                    interval: 0, //横轴信息全部显示  
                    rotate: -20, //-30度角倾斜显示  
                },
                nameTextStyle:{
                    color:"#FF9933"
                }
            }],
            yAxis: [{
                type: 'value'
            }],
            series: [{
                name: '累计申请',
                type: 'bar',
                barWidth: '50%',
                data: [40, 38, 32, 29, 25, 20, 19, 16, 12, 8]
            }]
        };

        myChart_shenqing_top10.setOption(option);

    },
    methods: {

    },
    computed: {}
};

</script>
