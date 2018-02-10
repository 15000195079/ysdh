<template>
  <div class="lianxiwomen">
    <!-- 百度地图 -->
    <baidu-map :center="center" :zoom="zoom" @ready="handler" style="width:600px;height:600px" :scroll-wheel-zoom="true" ak="LY4B3EWdSYLcIAep6q7K7sUGOCvGjfST">
      <bm-marker :position="{lng: 116.430676, lat: 39.954579}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
        <bm-label content="央视动画有限公司" :offset="{width: -55, height: 20}" />
      </bm-marker>
    </baidu-map>
  </div>
</template>

<script>
// 引入百度地图
import { BaiduMap } from "vue-baidu-map";
import { BmMarker } from "vue-baidu-map";
import { BmLabel } from "vue-baidu-map";
export default {
  activated: function() {},
  data() {
    return {
      center: { lng: 0, lat: 0 },
      zoom: 3
    };
  },

  methods: {
    //百度地图
    handler({ BMap, map }) {
      (this.center.lng = 116.430676), (this.center.lat = 39.954679);
      this.zoom = 20;
    }
  },
  components: {
    BaiduMap,
    BmMarker,
    BmLabel
  }
};
</script>

