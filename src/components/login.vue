<template>
    <div class="log-zc-modal">
        <el-dialog :visible.sync="dialogStatus" width="400px" @close="closeDialog">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="登录" name="login">
                    <el-form :model="form" @keyup.enter.native="handleLogin">
                        <el-form-item class="margin-bottom-20" prop="account">
                            <el-input v-model="form.account" auto-complete="off" size="medium" placeholder="请输入手机号码" prefix-icon="el-icon-mobile-phone"></el-input>
                        </el-form-item>
                        <el-form-item class="margin-bottom-5">
                            <el-input v-model="form.password" type="password" auto-complete="off" size="medium" placeholder="请输入密码" prefix-icon="fa fa-key"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-row :gutter="10">
                                <el-col :span="24">
                                    <div style="text-align: right;">
                                        <span @click="setPassword" class="text-danger" style="cursor:pointer;">忘记密码？</span>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-form-item>
                        <el-button type="primary" @click="handleLogin" class="btn-click margin-top-20 margin-bottom-20">登 录</el-button>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="注册" name="region">
                    <el-form :model="form" :rules="rules" ref="form" @keyup.enter.native="handelConfirm('form')">
                        <el-form-item class="margin-bottom-20" prop="account">
                            <el-input v-model="form.account" size="medium" placeholder="请输入手机号码" prefix-icon="el-icon-mobile-phone"></el-input>
                        </el-form-item>
                        <el-form-item class="margin-bottom-20" prop="password">
                            <el-input v-model="form.password" :type="pwd?'password':''" size="medium" placeholder="请输入密码" prefix-icon="fa fa-key">
                                <template slot="append">
                                    <i class="el-icon-view gaoliang" @click="handlePwd" style="cursor: pointer"></i>
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item class="margin-bottom-20" prop="code">
                            <el-input placeholder="请输入验证码" v-model="form.code" size="medium" :disabled="disabled">
                                <template slot="append">
                                    <el-button :disabled="disableds" type="text" @click="handleDao('')" style="width:110px" class="font-10">{{daoName}}</el-button>
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-button type="primary" @click="handelConfirm('form')" class="btn-click margin-top-20 margin-bottom-20">注 册</el-button>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </el-dialog>
    </div>
</template>
<script>
export default {
  props: ["dialogFormVisible", "type"],
  data() {
    var checkAccount = (rule, value, callback) => {
      let textCheck = /^1[3,4,5,7,8]\d{9}$/;
      if (!value) {
        this.disabled = true;
        this.disableds = true;
        callback(new Error("请输入手机号码"));
      } else if (textCheck.test(value) === false) {
        this.disabled = true;
        this.disableds = true;
        callback(new Error("手机号码格式不正确"));
      } else {
        this.disabled = false;
        this.disableds = false;
        callback();
      }
    };
    return {
      dialogStatus: false,
      tabPosition: "",
      form: {
        account: "",
        password: "",
        code: ""
      },
      rules: {
        account: [
          {
            validator: checkAccount,
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            min: 6,
            pattern: /^\w{6,}$/,
            message: "密码由数字、字母、特殊字符中两种及以上组成",
            trigger: "blur"
          }
        ],
        code: [
          {
            required: true,
            message: "请输入手机验证码",
            trigger: "blur"
          }
        ]
      },
      input4: "",
      disable: false,
      daoName: "获取验证码",
      pwd: true,
      yzImg: "",
      disabled: true,
      disableds: true,
      activeName: "login",
      //注册样式
      activeg: false,
      //登录按钮样式
      activel: false
    };
  },

  watch: {
    dialogFormVisible(newValue, oldValue) {
      this.dialogStatus = newValue;
    },
    type(newValue, oldValue) {
      this.activeName = newValue;
    }
  },
  methods: {
    //保存数据
    handelConfirm(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.axios({
            method: "post",
            url: this.API_ROOT + "/home_api/register",
            data: this.form
          }).then(
            response => {
              if (this.getToken(response.data)) {
                this.$message.success("注册成功");
                this.activeName = "login";
                this.form.password = "";
                this.form.code = "";
                this.disable = false;
                this.disabled = true;
                this.disableds = true;
                this.$ref[form].resetFields();
              }
            },
            error => {
              this.$emit("API-ERR");
            }
          );
        } else {
        }
      });
    },
    //忘记密码
    setPassword() {
      this.$emit("CB-dialogFormVisible", "set_password");
    },
    //倒计时
    handleDao(shu) {
      let val = 60;
      this.disableds = true;
      this.disable = false;
      var data = setInterval(() => {
        val--;
        this.daoName = val + "s后再次获取";
        if (val == 0) {
          clearInterval(data);
          this.disableds = false;
          this.daoName = "获取验证码";
        } else if (val != 0 && this.disable) {
          clearInterval(data);
          this.disableds = false;
          this.daoName = "获取验证码";
        } else {
          if (val == 55 && !this.disable) {
            this.getPhone();
          }
        }
      }, 1000);
    },
    //查看密码
    handlePwd() {
      this.pwd = !this.pwd;
    },
    //获取短信验证码
    getPhone() {
      this.axios({
        method: "post",
        url: this.API_ROOT + "/home_api/register/rand",
        data: {
          account: this.form.account
        }
      }).then(
        response => {
          if (this.getToken(response.data)) {
            this.form.code = response.data.data.random;
          }
        },
        error => {
          this.$emit("API-ERR");
        }
      );
    },
    //登录
    handleLogin() {
      this.axios({
        method: "post",
        url: this.API_ROOT + "/home_api/login",
        data: this.form
      }).then(
        response => {
          if (this.getToken(response.data)) {
            this.$store.commit("setUinfo", response.data.data.uinfo);
            //判断是导航条登陆跳转
            if (this.type == "login") {
              this.$router.push({
                name: "ucenter_home"
              });
              this.$store.commit("setNavmenu", "");
              this.$store.commit("setUserUrl", "ucenter_home");
            }
            this.$emit("CB-dialogFormVisible", 1);
          }
        },
        error => {
          this.$emit("API-ERR");
        }
      );
    },
    //切换标签
    handleClick(tab, event) {
      this.form = {
        account: "",
        password: "",
        code: ""
      };
    },
    closeDialog() {
      this.disable = true;
      this.disabled = true;
      this.disableds = true;
      this.$emit("CB-dialogFormVisible", false);
      this.$refs["form"].resetFields();
      this.form = {
        account: "",
        password: "",
        code: ""
      };
    }
  }
};
</script>
<style>
.log-zc {
  font-size: 12px;
  line-height: 60px;
  text-align: right;
}

.log-zc a {
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid transparent;
}

.log-zc a.active {
  border-color: #fff;
  cursor: pointer;
}

.gaoliang:hover {
  color: black;
}
</style>

