<template>
    <el-dialog :title="ptype=='1'? '修改密码': '忘记密码' " width="35%" :visible.sync="passwordStatus" @close="closeDialog">
        <el-row>
            <el-form :model="form" ref="form" :rules="rules" label-suffix='：' label-width="100px" @keyup.enter.native="onSubmit" autoComplete="off">
                <el-form-item class="margin-bottom-20" label="手机号" v-if="ptype=='1'">
                    {{uinfo.account}}
                </el-form-item>
                <el-form-item class="margin-bottom-20" label="手机号" prop="account" v-if="ptype=='2'">
                    <el-input v-model="form.account" auto-complete="off" size="medium" placeholder="请输入手机号码" prefix-icon="el-icon-mobile-phone"></el-input>
                </el-form-item>
                <el-form-item class="margin-bottom-20" prop="code" label="验证码">
                    <el-input placeholder="请输入验证码" v-model="form.code" size="medium" type="text" autoComplete="off">
                        <template slot="append">
                            <el-button type="text" @click="getPhone()" style="width:110px" class="font-10" :disabled="disableds">{{daoName}}</el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="新密码" required prop="newpassword" class="margin-bottom-20">
                    <el-input v-model="form.newpassword" placeholder="新密码，必填项" type="password" size="medium" autoComplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" required prop="qrnewpassword" class="margin-bottom-20">
                    <el-input v-model="form.qrnewpassword" placeholder="确认密码，必填项" type="password" size="medium" autoComplete="off"></el-input>
                </el-form-item>
            </el-form>
        </el-row>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" :loading="loadingBiao" @click="onSubmit">确定保存</el-button>
        </div>

    </el-dialog>
</template>
<script>
//引入辅助函数
import { mapState } from "vuex";
var count = 60;
var myCountDown;
//ptype 1 修改密码,2  忘记密码
export default {
  props: ["setPasswordStatus"],
  data() {
    var checkAccount = (rule, value, callback) => {
      let textCheck = /^1[3,4,5,7,8]\d{9}$/;
      if (!value) {
        this.disableds = true;
        callback(new Error("请输入手机号码"));
      } else if (textCheck.test(value) === false) {
        this.disableds = true;
        callback(new Error("手机号码格式不正确"));
      } else {
        this.disableds = false;
        callback();
      }
    };
    return {
      form: {
        account: "",
        qrnewpassword: "",
        newpassword: "",
        code: ""
      },
      ptype: "2",
      passwordStatus: false,
      loadingBiao: false,
      disableds: false,
      daoName: "获取验证码",
      rules: {
        account: [
          {
            validator: checkAccount,
            trigger: "blur"
          }
        ],
        code: [
          {
            required: true,
            message: "请输入手机验证码",
            trigger: "blur"
          }
        ],
        newpassword: [
          {
            validator: (rule, value, callback) => {
              if (value === "") {
                callback(new Error("请填写新密码"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          },
          {
            min: 6,
            max: 15,
            message: "密码长度为6~15位",
            trigger: "blur"
          },
          {
            pattern: /^(((?=.*[0-9])(?=.*[a-zA-Z])|(?=.*[0-9])(?=.*[^\s0-9a-zA-Z])|(?=.*[a-zA-Z])(?=.*[^\s0-9a-zA-Z]))[^\s]+)$/,
            message: "密码由数字、字母、特殊字符中两种及以上组成",
            trigger: "blur"
          }
        ],
        qrnewpassword: [
          {
            validator: (rule, value, callback) => {
              if (value === "") {
                callback(new Error("请填写确认密码！"));
              } else if (value !== this.form.newpassword) {
                callback(new Error("新密码与确认密码不一致！"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          },
          {
            min: 6,
            max: 15,
            message: "密码长度为6~15位",
            trigger: "blur"
          },
          {
            pattern: /^(((?=.*[0-9])(?=.*[a-zA-Z])|(?=.*[0-9])(?=.*[^\s0-9a-zA-Z])|(?=.*[a-zA-Z])(?=.*[^\s0-9a-zA-Z]))[^\s]+)$/,
            message: "密码由数字、字母、特殊字符中两种或两种以上组成",
            trigger: "blur"
          }
        ]
      }
    };
  },
  watch: {
    setPasswordStatus(newvalue, oldvalue) {
      if (this.uinfo && this.uinfo.account) {
        this.ptype = "1";
      } else {
        this.ptype = "2";
      }
      this.passwordStatus = newvalue;
      if (!newvalue) {
        if (this.ptype == "2") {
          this.form.account = "";
        }
        this.form.qrnewpassword = "";
        this.form.newpassword = "";
        this.form.code = "";
        this.passwordStatus = false;
        this.loadingBiao = false;
        this.$refs["form"].resetFields();
      }
    }
  },
  methods: {
    closeDialog() {
      this.$emit("CB-setPasswordStatus", false);
    },
    //倒计时
    countDown() {
      this.disableds = true;
      this.daoName = count + "s后再次获取";
      count--;
      if (count == 0) {
        this.disableds = false;
        this.daoName = "获取验证码";
        clearInterval(myCountDown);
        count = 60;
      }
    },
    //获取短信验证码
    getPhone() {
      let account;
      if (this.ptype == "1") {
        account = this.uinfo.account;
      } else {
        account = this.form.account;
      }

      this.daoName = "发送中…";
      this.disableds = true;
      this.axios({
        method: "post",
        url: this.API_ROOT + "/home_api/register/message",
        data: {
          account: account
        }
      }).then(
        response => {
          if (this.getToken(response.data)) {
            this.form.code = response.data.data.random;
            myCountDown = setInterval(this.countDown, 1000);
          } else {
            this.disableds = false;
            this.daoName = "获取验证码";
          }
        },
        error => {
          this.$emit("API-ERR");
        }
      );
    },
    //插入数据
    onSubmit() {
      let account;
      if (this.ptype == "1") {
        account = this.uinfo.account;
      } else {
        account = this.form.account;
      }
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loadingBiao = true;

          this.axios({
            method: "post",
            url: this.API_ROOT + "/home_api/register/change_password",
            data: {
              account: account,
              qrnewpassword: this.form.qrnewpassword,
              newpassword: this.form.newpassword,
              code: this.form.code
            },
            headers: this.$store.getters.Request_Head
          }).then(
            response => {
              if (this.getToken(response.data)) {
                this.$emit("CB-setPasswordStatus", 1);
                this.$message.success("改密成功，请重新登陆！");
                this.$store.commit("setUinfo", {});
              }
              this.loadingBiao = false;
            },
            error => {
              this.loadingBiao = false;
              this.$emit("API-ERR");
            }
          );
        }
      });
    }
  },
  computed: mapState({
    uinfo: state => state.uinfo
  })
};
</script>
