<template>
    <header id="navbar">
        <div id="navbar-container" class="boxed">
            <!--Brand logo & name-->
            <!--================================-->
            <div class="navbar-header">
                <router-link :to="{name:'home'}" class="navbar-brand">
                    <img src="../../assets/img/logo.png" alt="央视动画授权管理后台" class="brand-icon">
                    <div class="brand-title">
                        <span class="brand-text">授权管理后台</span>
                    </div>
                </router-link>
            </div>
            <!--================================-->
            <!--End brand logo & name-->
            <!--Navbar Dropdown-->
            <!--================================-->
            <div class="navbar-content clearfix">
                <ul class="nav navbar-top-links pull-left">
                    <li class="tgl-menu-btn">
                        <a class="mainnav-toggle" href="#">
                            <i class="demo-pli-view-list"></i>
                        </a>
                    </li>
                    <!-- <Notify_head>顶部状态栏通知消息</Notify_head> -->
                </ul>
                <ul class="nav navbar-top-links pull-right list-unstyled">
                    <li id="dropdown-user">
                        <a :href="web_root" class="text-right" target="_blank">
                            <div class="username hidden-xs">
                                <i class="fa fa fa-send-o"></i> 前往网站主页
                            </div>
                        </a>
                    </li>
                    <li>
                        <a class="shortcut-grid " href="#" @click="logout">
                            <div class="username hidden-xs text-warning">
                                <i class="ti-power-off"></i> 注销登录
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
            <!--================================-->
            <!--End Navbar Dropdown-->
        </div>
    </header>
</template>
<script>
//导入vuex辅助函数
import {
    mapState
} from 'vuex'

export default {

    data() {
        return {
            web_root: this.WEB_ROOT
        }
    },
    methods: {
        //退出登录，逻辑处理完后，跳转至登录页面
        logout() {
            this.lockout()
        }
    },
    computed: mapState({
        userinfo: state => state.userinfo.userinfo
    })
}

</script>
