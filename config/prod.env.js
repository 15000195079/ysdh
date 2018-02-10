/**
 * WebPack生产环境配置
 * API_ROOT：生产环境下对接的接口URL
 * API_TMPTPOOT:生产环境下公共平台对接的接口URL
 * @author leo
 */
module.exports = {
    NODE_ENV: "\"production\"",
    API_ROOT: "\"http://authorize.cctvag.com/ysdh/data_api\"",
    WEB_ROOT: "\"http://authorize.cctvag.com/ysdh/web\"",
    APP_PATH: "\"/ysdh/web/\""
};