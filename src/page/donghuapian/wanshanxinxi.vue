<template>
    <div class="shouquan-main">
        <div class="warp">
            <h1 class="dhp-h1 margin-top-25 margin-bottom-20">申请授权</h1>
            <Steps :steps="2">步骤条</Steps>
            <el-row>
                <el-col :md="16" :push="4">
                    <div class="wanshan-form">
                        <h3 class="margin-top-80 margin-bottom-15">
                            <b>完善基本信息</b>
                        </h3>
                        <el-form :model="form" :rules="rules" ref="form" class="demo-ruleForm">
                            <el-form-item prop="company">
                                <el-input type="text" placeholder="公司名称" class="ws-bitian margin-top-20" v-model="form.company">
                                    <template slot="append">必填</template>
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="business_name">
                                <el-input type="text" placeholder="业务负责人姓名" class="ws-bitian margin-top-20" v-model="form.business_name">
                                    <template slot="append">必填</template>
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="business_phone">
                                <el-input type="text" placeholder="业务负责人手机号" class="ws-bitian margin-top-20" v-model="form.business_phone">
                                    <template slot="append">必填</template>
                                </el-input>
                            </el-form-item>
                            <el-upload v-loading="yyzz_loading" element-loading-text="图片上传中" element-loading-spinner="el-icon-loading" class="upload-demo" :action="API_ROOT + '/home_api/apply_authorize/upload'" :headers="{'User-Token':uinfo.token}" :on-success="handlePictureSuccess_yyzz" :on-error="handlePictureError" :on-progress="handlePictureProgress_yyzz" :show-file-list="false" accept=".jpg,.png,.jpeg">
                                <el-input type="text" placeholder="公司营业执照 " class="ws-bitian margin-top-20" :readonly="true">
                                    <el-button slot="append" icon="el-icon-upload" class="ws-tb-upload"></el-button>
                                </el-input>
                            </el-upload>

                            <el-upload v-loading="hyzz_loading" element-loading-text="图片上传中" element-loading-spinner="el-icon-loading" class="upload-demo" :action="API_ROOT + '/home_api/apply_authorize/upload'" :headers="{'User-Token':uinfo.token}" :on-success="handlePictureSuccess_hyzz" :on-error="handlePictureError" :on-progress="handlePictureProgress_hyzz" :show-file-list="false" accept=".jpg,.png,.jpeg">
                                <el-input type="text" placeholder="公司相关业务行业资质 " class="ws-bitian margin-top-20" :readonly="true">
                                    <el-button slot="append" icon="el-icon-upload" class="ws-tb-upload"></el-button>
                                </el-input>
                            </el-upload>
                        </el-form>
                    </div>
                </el-col>
                <el-col :md="8" :push="1">
                    <div>

                        <div v-if="form.company_img.length > 0" style="width:200px;height:200px;" class="padding-bottom-30">
                            <span>公司营业执照</span>
                            <img :src="form.company_img" width="180" height="180" class="margin-top-20" />
                        </div>

                        <div v-if="form.company_business.length > 0" style="width:200px;height:200px">
                            <span>公司相关业务行业资质</span>
                            <img :src="form.company_business" width="180" height="180" class="margin-top-20" />
                        </div>

                    </div>
                </el-col>
            </el-row>
            <div class="shouquan-bottom margin-top-50 padding-top-25">
                <div class="bz-fanhui">
                    <el-button @click="to_back">返回更改</el-button>
                </div>
                <div class="bz-xiayibu">
                    <a @click="submitForm('form')" style="cursor:pointer">提交</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
//导入vuex辅助函数
import { mapState } from "vuex";

import Steps from "./steps";
export default {
  activated: function() {
    if (this.$route.params.id && this.shouquan_data[this.$route.params.id]) {
      this.id = this.$route.params.id;
      this.form.cn_name = this.shouquan_data[this.id].donghua.cn_name;
      this.form.aid = this.shouquan_data[this.id].donghua.id;
      this.form.apply = parseInt(this.shouquan_data[this.id].radio);
      this.form.transfer = parseInt(this.shouquan_data[this.id].radio_detail);
      let arr = this.shouquan_data[this.id].check;
      for (let i in arr) {
        for (let j in arr[i].arr) {
          this.form.authorize.push(arr[i].arr[j]);
        }
      }
    }
    //拿取用户填写完善信息的数据
    this.form.company=this.uinfo.company;//公司(company)保存在uinfo中 单独赋值
    if(this.Perfect_information[this.uinfo.id]) {
      this.getPerfect_information()
    }
  },
  deactivated() {
    this.$refs["form"].resetFields(); //去除表单验证
    this.form.authorize = [];
    this.form.company="";
    this.form.business_name="";
    this.form.business_phone="";
    this.form.company_img="";
    this.form.company_business="";
  },
  data() {
    return {
      id: "",
      yyzz_loading: false,
      hyzz_loading: false,
      form: {
        cn_name: "",
        aid: "",
        apply: "",
        transfer: "",
        authorize: [],
        company: "",
        business_name: "",
        business_phone: "",
        company_img: "",
        company_business: ""
      },
      rules: {
        company: [{ required: true, message: "请输入公司名称", trigger: "blur" }],
        business_name: [
          { required: true, message: "请输入业务负责人姓名", trigger: "blur" }
        ],
        business_phone: [
          { required: true, message: "请输入业务负责人手机号", trigger: "blur" },
          {
            pattern: /^1[3,4,5,7,8]\d{9}$/,
            message: "请输入正确的手机号码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    //营业执照图片上传时
    handlePictureProgress_yyzz() {
      this.yyzz_loading = true;
    },
    //行业执照图片上传时
    handlePictureProgress_hyzz() {
      this.hyzz_loading = true;
    },

    //营业执照图片上传成功
    handlePictureSuccess_yyzz(res, file) {
      this.$message({
        message: "上传图片成功",
        type: "success"
      });
      this.yyzz_loading = false;
      let img = "";
      img = file.response.data.url + file.response.data.img;
      this.form.company_img = img;
    },
    //行业资质图片上传成功
    handlePictureSuccess_hyzz(res, file) {
      this.$message({
        message: "上传图片成功",
        type: "success"
      });
      this.hyzz_loading = false;
      let img = "";
      img = file.response.data.url + file.response.data.img;
      this.form.company_business = img;
    },
    //图片上传失败
    handlePictureError(err) {
      this.$message({
        message: "上传图片失败",
        type: "error"
      });
      this.yyzz_loading = false;
      this.hyzz_loading = false;
    },
    //提交
    submitForm(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          if (!this.form.company_img) {
            this.$message({
              message: "营业执照必传",
              type: "error"
            });
            return;
          }
          if (!this.form.company_business) {
            this.$message({
              message: "业务资质材料必传",
              type: "error"
            });
            return;
          }
          this.$confirm("成功提交后我们的授权专员将会尽快与您联系,您也可以通过在线客服或400电话联系我们！", "确定提交", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.setData();
            })
            .catch(() => {});
        }
      });
    },
    //提交数据
    setData() {
      this.axios({
        method: "post",
        url: this.API_ROOT + "/home_api/apply_authorize/insert",
        data: this.form,
        headers: this.$store.getters.Request_Head
      }).then(response => {
        if (this.getToken(response.data)) {
          //授权提交后清除用户选中授权的缓存
          let data=this.shouquan_data;
          data[this.$route.params.id]=null;
          this.$store.commit("setshouquan_data", data);
          
          //存储用户填写完善信息的数据
          this.setPerfect_information()

          //跳转个人中心
          this.$router.push({
            name: "myShouquan"
          });
          //清除导航缓存
          this.$store.commit("setNavmenu", "");
          this.$store.commit("setUserUrl", "myShouquan");
        }
      });
    },
    to_back() {
      this.$router.push({
        name: "shenqingshouquan",
        params: {
          id: this.$route.params.id
        }
      });
    },
    //存储用户填写完善信息的数据
    setPerfect_information() {
      let Perfect_information=this.Perfect_information

      //获取用户填写数据
      let data_information=new Object;
      data_information.company=this.form.company;
      data_information.business_name=this.form.business_name;
      data_information.business_phone=this.form.business_phone;
      data_information.company_img=this.form.company_img;
      data_information.company_business=this.form.company_business;

      //赋值&&保存到缓存中
      Perfect_information[this.uinfo.id]=data_information
      this.$store.commit("setPerfect_information",Perfect_information)

      //提交数据走接口保存用户资料信息 确保 公司(company) 信息同步
      if(this.form.company != this.uinfo.company) {
         this.axios({
          method: "post",
          url: this.API_ROOT + "/home_api/member/update",
          data: {
            id: this.uinfo.id,
            company: this.form.company,
            phone: this.uinfo.phone,
            name: this.uinfo.name,
            email: this.uinfo.email
          },
          headers: this.$store.getters.Request_Head
        }).then(
          response => {
          },
          error => {
          }
        );
      }
     

      //提交缓存到uinfo中
      let uinfo_data=this.uinfo;
      uinfo_data.company=this.form.company;
      this.$store.commit("setUinfo",uinfo_data)
    },
    //拿取用户填写完善信息的数据
    getPerfect_information() {
      let information=this.Perfect_information[this.uinfo.id]
      this.form.company=this.uinfo.company;
      this.form.business_name=information.business_name;
      this.form.business_phone=information.business_phone;
      this.form.company_img=information.company_img;
      this.form.company_business=information.company_business;
    }
  },
  computed: mapState({
    uinfo: state => state.uinfo,
    shouquan_data: state => state.shouquan_data,
    Perfect_information: state => state.Perfect_information
  }),
  components: {
    Steps
  }
};
</script>

