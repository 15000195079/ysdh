<template>
  <div>
    <div id="index_chanliang" style="width: 100%;height: 420px;"></div>
  </div>
  
</template>
<script>
import Vue from "vue";

export default {
  props:["chanliangStatus","chanliang","chanliangData"],
  data() {
    return {
      title:[],
      title_bin:[]
    };
  },
  watch:{
    chanliangStatus: function(newValue,oldValue) {
      if(newValue) {
        this.title = this.chanliang;
        this.title_bin = this.chanliangData;
        this.getData()
      }
    }
  },
  mounted() {
    if(this.chanliangStatus) {
      this.title = this.chanliang;
      this.title_bin = this.chanliangData;
      this.getData()
    }
  },
  methods: {
    getData() {
      var echarts = require("echarts");
      // 基于准备好的dom，初始化echarts实例
      var myChart_loudou = echarts.init(document.getElementById("index_chanliang"));
      var title = this.title;
      var title_bin = this.title_bin;
      var option = {
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "74%",
          data: title,
          top: "12%",
          itemWidth:8,
          itemHeight:8,
          itemGap:30,
          textStyle:{
            fontSize: 16,
          },
          align:"left",
          formatter: function(name) {
            // 百分比显示处理
            let index = 0;
            title.forEach(function(value,i){
                if(value.name == name){
                    index = i;
                }
            });
            //当位数不一致时的样式处理
            switch(title[index].value.length) {
              case 2:
                title[index].value="       "+title[index].value;
                break;
              case 3:
                title[index].value="     "+title[index].value;
                break;
              case 4:
                title[index].value="    "+title[index].value;
                break;
              case 5:
                title[index].value="  "+title[index].value;
                break;
              default:
                title[index].value=title[index].value;
            }
            return "  "+title[index].value+"  "+name;
          }
        },
        series: [
          {
            name: "总产量",
            type: "pie",
            radius: "65%",
            center: ["30%", "40%"],
            data: title_bin,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              },
            },
            // label: {
            //   normal: {
            //     formatter: "{b}:{c}\n ({d}%)",
            //     textStyle: {
            //       fontWeight: "normal",
            //       fontSize: 15
            //     }
            //   }
            // }
          }
        ],
        color:['#EE182F', '#D4C13A','#2A9BF2','#00A633','#EE228E',"#B5B5B5"]
      };
      myChart_loudou.setOption(option);
      this.$emit("CB-chanliangTu",1)
    }
  },
  computed: {
    uinfo: state => state.uinfo
  }
};
</script>
