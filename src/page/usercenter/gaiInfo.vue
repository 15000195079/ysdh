<template>
    <el-dialog :visible.sync="dialogState" close-on-press-escape @close="closeDialog">
        <el-form :model="form" ref="form" :rules="rules" label-suffix='：' label-width="100px">
            <el-row :gutter="20">
                <el-col :md="12" style="height:70px">
                    <el-form-item label="姓名" prop="name">
                        <el-input size="medium" placeholder="请填写您的姓名" v-model="form.name" :maxlength='20'></el-input>
                    </el-form-item>
                </el-col>
                <el-col :md="12" style="height:70px">
                    <el-form-item label="公司" prop="company">
                        <el-input size="medium" placeholder="请填写公司名称" v-model="form.company" :maxlength='50'></el-input>
                    </el-form-item>
                </el-col>
                <el-col :md="12">
                    <el-form-item label="邮箱" prop="email">
                        <el-input size="medium" v-model="form.email" placeholder="请填写您的邮箱" :maxlength='50'></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" :loading="loadingBiao" @click="onSubmit">保存信息</el-button>
        </div>
    </el-dialog>
</template>
<script type="text/javascript">
//导入vuex辅助函数
import { mapState } from "vuex";
export default {
  props: ["dialogStatus"],
  data() {
    return {
      loadingBiao: false,
      dialogState: false,
      formLabelWidth: "120px",
      form: {
        company: "",
        name: "",
        email: "",
        phone: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "姓名不能为空",
            trigger: "blur"
          }
        ],
        phone: [
          {
            required: true,
            message: "手机号码不能为空",
            trigger: "blur"
          },
          {
            pattern: /^1[3,4,5,7,8]\d{9}$/,
            message: "请输入正确的手机号码",
            trigger: "blur"
          }
        ],
        email: [
          {
            pattern: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
            message: "邮箱格式不正确",
            trigger: "blur"
          }
        ]
      }
    };
  },
  watch: {
    dialogStatus(newValue, oldValue) {
      this.dialogState = newValue;
      this.form = JSON.parse(JSON.stringify(this.uinfo));
      //打开弹窗重置loading状态
      if (newValue) {
        this.loadingBiao = false;
      }
    }
  },
  methods: {
    //插入数据
    onSubmit() {
      if (this.loadingBiao) return;
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loadingBiao = true;
          this.axios({
            method: "post",
            url: this.API_ROOT + "/home_api/member/update",
            data: {
              id: this.uinfo.id,
              company: this.form.company,
              phone: this.form.phone,
              name: this.form.name,
              email: this.form.email
            },
            headers: this.$store.getters.Request_Head
          }).then(
            response => {
              if (this.getToken(response.data)) {
                this.$store.commit("setUinfo", this.form);
                this.$emit("CB-dialogStatus", false);
                this.$message.success("保存成功");
              } else {
                this.loadingBiao = false;
              }
            },
            error => {
              this.loadingBiao = false;
              this.$emit("API-ERR");
            }
          );
        }
      });
    },
    closeDialog() {
      this.$emit("CB-dialogStatus", false);
    }
  },
  computed: mapState({
    rules_juesezu: state => state.rules_juesezu,
    uinfo: state => state.uinfo
  })
};
</script>
