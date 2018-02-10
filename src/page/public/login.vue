<template>
    <div>
        <div id="bg-overlay" class="bg-img"></div>
        <div class="cls-content">
            <div class="text-center margin-bottom-40">
                <img src="../../assets/img/logo2.png">
            </div>
            <div class="cls-content-sm panel">
                <div class="panel-body">
                    <div class="mar-ver pad-btm">
                        <h3 class="h3 text-center text-2x">授权管理后台</h3>
                    </div>
                    <el-form :model="formData" :rules="rules" ref="formData" @keyup.enter.native="submitForm('formData')">
                        <div class="form-group">
                            <el-form-item prop="account">
                                <el-input placeholder="请输入登录账号" type="text" v-model="formData.account">
                                    <template slot="prepend">登录账号</template>
                                </el-input>
                            </el-form-item>
                        </div>
                        <div class="form-group margin-top-20">
                            <el-form-item prop="password">
                                <el-input placeholder="请输入登录密码" type="password" v-model="formData.password">
                                    <template slot="prepend">登录密码</template>
                                </el-input>
                            </el-form-item>
                        </div>

                        <el-button type="primary" @click="submitForm('formData')" class="btn-block margin-top-20" :loading="loadingLogin">{{title}}</el-button>
                        <div class="form-group text-right mar-top text-danger">
                            <el-form-item>
                                忘记密码？
                            </el-form-item>
                        </div>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data: function() {
        return {
            loadingLogin: false,
            bgImgUrl: '@/assets/img/bg-img.jpg',
            formData: {
                account: '',
                password: ''
            },
            title: '登录系统',
            rules: {
                account: [{
                    required: true,
                    message: '请输入登录账号',
                    trigger: 'blur'
                }],
                password: [{
                    required: true,
                    message: '请输入登录密码',
                    trigger: 'blur'
                }]
            }
        }
    },
    created: function() {
        //设置当前页面标题名称
        document.title = '管理员登录' + this._web_title
    },
    methods: {
        submitForm(formData) {
            this.loadingLogin = true
            this.title = '登录中...'
            this.$refs[formData].validate((valid) => {
                if (valid) {
                    //跨域请求，注意此处的跨域接口主域名在config/index.js配置
                    this.axios({
                        method: 'post',
                        url: this.API_ROOT + '/admin_api/login',
                        data: this.formData
                    }).then((ret) => {
                        if (ret.data.status.code !== 1001) {
                            this.$message.error(ret.data.data ? ret.data.data : ret.data.status.title);
                            if (response.data.status.code == 1004 || response.data.status.code == 1006) {
                                this.lockout()
                            }
                        } else {
                            this.$store.commit('setUserinfo', ret.data.data);
                            this.getSliderNav();
                        };
                    }, (error) => {
                        this.loadingLogin = false
                        this.$notify.error({
                            title: '操作提示！',
                            message: '服务器请求失败！',
                            duration: 3000
                        });
                    });
                } else {
                    this.loadingLogin = false
                    this.$message({
                        message: '请检查是否填写账号信息！',
                        type: "dagner"
                    });
                    return false;
                };
            })
        },
        //生成左侧导航数据
        getSliderNav() {
            this.axios({
                method: 'post',
                url: this.API_ROOT + '/admin_api/node/treemenu',
                headers: this.$store.getters.Request_Head
            }).then((response) => {
                if (this.getToken(response.data)) {
                    if (response.data.data) {
                        this.$store.commit('setSliderNav', response.data.data);
                    } else {
                        this.$store.commit('setSliderNav', []);
                    }
                    if (response.data.userinfo) {
                        this.$store.commit('setUserinfo', response.data.userinfo)
                    }
                    this.loadingLogin = false
                    this.title = "登录系统"
                    this.$router.push({
                        name: "home"
                    });
                }
            }, (error) => {
                this.loadingLogin = false
                this.$emit('API-ERR')
            })
        }
    }
}

</script>
