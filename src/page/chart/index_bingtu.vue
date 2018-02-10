<template>
  <div id="index_loudou" style="width: 100%;height: 280px;"></div>
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
    var myChart_loudou = echarts.init(document.getElementById("index_loudou"));
    var option = {
      title: {
        text: "各产品总产量对比图",
        left: 70
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: "vertical",
        left: "right",
        data: ["玩具", "文具", "礼品"],
        top: "middle"
      },
      series: [
        {
          name: "总产量",
          type: "pie",
          radius: "65%",
          center: ["40%", "60%"],
          data: [
            { value: 10, name: "玩具" },
            { value: 30, name: "文具" },
            { value: 200, name: "礼品" }
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      ]
    };

    myChart_loudou.setOption(option);
  },
  methods: {},
  computed: {}
};
</script>
