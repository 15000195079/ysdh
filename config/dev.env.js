/**
 * WebPack开发环境配置
 * API_ROOT：开发环境下对接的接口URL
 * @author leo
 */
var merge = require("webpack-merge");
var prodEnv = require("./prod.env");

module.exports = merge(prodEnv, {
    NODE_ENV: "\"development\"",
    API_ROOT: "\"\"",
    WEB_ROOT: "\"http://a.ez-tech.cn/ysdh/web\"",
    APP_PATH: "\"/\"",
});