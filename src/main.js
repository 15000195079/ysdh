// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router/index.js";


//数据资源请求
import axios from "axios";
import VueAxios from "vue-axios";

//视频播放
import VueVideoPlayer from "vue-video-player";
Vue.use(VueVideoPlayer);


Vue.prototype.LS = require("storejs");

import store from "./store.js";

Vue.use(VueAxios, axios);

//配置API请求主网址
Vue.prototype.API_ROOT = process.env.API_ROOT;

Vue.prototype.WEB_ROOT = process.env.WEB_ROOT;

//配置页面主体内容 容器的默认高度
Vue.prototype._PageHeight = document.documentElement.clientHeight - 265;

Vue.prototype.layout = false;

Vue.config.productionTip = false;

//配置系统名称
Vue.prototype._web_title = " - 央视动画授权平台";

Vue.prototype.getToken = function(data) {
    if (data.status.code !== 1001) {
        this.$message.error(data.data ? data.data : data.status.title);
        Vue.prototype.yzToken(data.status.code);
        return false;
    }
    return true;

};

//token验证失败的执行方法
Vue.prototype.yzToken = function(status) {
    if (status == 1014 || status == 1004 || status == 1006) {
        Vue.prototype.lockout();
        router.push({
            name: "home"
        });
    }
    if (status == 1005) {
        router.push({
            name: "home"
        });
    }
};

//退出登录
Vue.prototype.lockout = function() {
    store.commit("setshouquan_data", []);
    store.commit("setUinfo", {});
};

/* eslint-disable no-new */
new Vue({
    el: "#app",
    router,
    store,
    template: "<App/>",
    components: {
        App
    }
});