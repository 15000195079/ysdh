<template>
    <el-dialog title="上传付款凭证" :visible.sync="dialogStatus" @close="close">
        <hr style="border-color: #dfe4ed !important;">
        <el-form :model="form" ref="form" :rules="rules">
            <el-form-item label="合同名称：" :label-width="formLabelWidth" style="margin-bottom:20px !important;">
                {{title}}
            </el-form-item>
            <el-form-item label="付款银行：" :label-width="formLabelWidth" style="width:90%;margin-bottom:20px !important;">
                <el-input v-model="form.bank" auto-complete="off" placeholder="请填写您付款时的银行名称" :maxlength="20"></el-input>
            </el-form-item>
            <el-form-item label="付款账号：" :label-width="formLabelWidth" prop="number" style="width:90%;margin-bottom:20px !important;">
                <el-input v-model="form.number" auto-complete="off" placeholder="请填写付款时,您使用的银行账号" :maxlength="20"></el-input>
            </el-form-item>
            <el-form-item label="付款金额：" :label-width="formLabelWidth" prop="money" style="width:90%;margin-bottom:20px !important;">
                <el-input v-model="form.money" auto-complete="off" style="display:inline-block !impotant;" :maxlength="20">
                    <template slot="append">元</template>
                </el-input>
            </el-form-item>
            <el-form-item label="付款时间：" :label-width="formLabelWidth" style="width:100%;margin-bottom:20px !important;">
                <div class="block">
                  <!-- <span class="demonstration">默认</span> -->
                  <el-date-picker
                    v-model="form.time"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
            </el-form-item>
            <el-form-item label="付款凭证：" required :label-width="formLabelWidth" style="width:90%;margin-bottom:20px !important;">
                <el-upload class="upload-demo" :action="API_ROOT + '/home_api/apply_authorize/upload'" :headers="{'User-Token':uinfo.token}" :on-success="handleChange" :show-file-list="false" :before-upload="beforeAvatarUpload" accept=".jpg,.png,.jpeg">
                    <el-button size="small" type="info">上传凭证</el-button>
                    <div slot="tip" class="el-upload__tip">可以将您付款时网银转账截图、汇款单拍照等以图片形式上传,支持jpg、png、jpeg等格式,大小不超过1MB。</div>
                </el-upload>
                <div style="marginTop:20px;" v-if="imgs">
                    <a :href="imgs" target="_blank"><img :src="imgs" alt="" style="max-width:150px;max-height:150px"></a>
                </div>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="onSubmit" :loading="loading">确认提交</el-button>
        </div>
    </el-dialog>
</template>
<script>
import { mapState } from "vuex";
export default {
  props: ["dialogFormVisible", "title", "pid", "id"],
  data() {
    return {
      form: {
        bank: "",
        money: "",
        number: "",
        time:"",
      },
      formLabelWidth: "100px",
      dialogStatus: false,
      loading: false,
      imgs: "", //图片路径拼接
      rules: {
        money: [
          {
            required: true,
            message: "付款金额不能为空",
            trigger: "change"
          },
          {
            pattern: /^[0-9]*$/,
            message: "付款金额必须为数字",
            trigger: "change"
          }
        ],
        number: [
          {
            pattern: /^[0-9]*$/,
            message: "银行账号必须为数字",
            trigger: "change"
          }
        ]
      }
    };
  },

  watch: {
    dialogFormVisible: function(newValue, oldValue) {
      this.dialogStatus = newValue;
      if (!newValue) {
        this.$refs["form"].resetFields();
        this.form.bank = "";
        this.form.money = "";
        this.form.number = "";
        this.form.time = "";
        this.imgs = "";
      } else {
        this.loading = false;
      }
    }
  },
  methods: {
    close() {
      this.$emit("CB-dialogFormVisible", false);
    },
    //上传之前大小限制
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 1;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不npm能超过 1MB!");
      }
      return isLt2M;
    },
    //上传成功
    handleChange(res, file) {
      this.imgs = res.data.url + res.data.img;
    },
    //提交
    onSubmit(id) {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.imgs) {
            this.$confirm("确认要提交吗?", "操作提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
              .then(() => {
                if (this.loading) return;
                this.loading = true;
                this.axios({
                  method: "post",
                  url: this.API_ROOT + "/home_api/pay/insert",
                  data: {
                    hid: this.id,
                    pid: this.pid,
                    bank: this.form.bank,
                    money: this.form.money,
                    img: this.imgs,
                    number: this.form.number,
                    pay_time: this.form.time
                  },
                  headers: this.$store.getters.Request_Head
                }).then(
                  response => {
                    if (this.getToken(response.data)) {
                      this.$message({
                        message: "提交成功",
                        type: "success"
                      });
                      this.$emit("CB-dialogFormVisible", 1);
                    } else {
                      this.loading = false;
                    }
                  },
                  error => {
                    this.loading = false;
                    this.$emit("API-ERR");
                  }
                );
              })
              .catch(() => {});
          } else {
            this.$message({
              message: "请先上传付款凭证",
              type: "error"
            });
          }
        }
      });
    }
  },
  computed: mapState({
    uinfo: state => state.uinfo
  })
};
</script>
