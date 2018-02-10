<template>
    <div style="background-color: #fff;padding: 15px;min-height:500px">
        <el-row class="bord-btm ">
            <el-col :md="5" class="font-130 text-dark text-bold padding-top-10 padding-bottom-10">
              {{ $route.params.id && $route.params.id>0 ? '编辑批次':'创建批次'}}
            </el-col>
            <el-col :md="19" class="padding-top-5 text-right">
                <goBack class="pull-right"></goBack>
            </el-col>
        </el-row>
        <el-row class="margin-top-30 margin-left-10">
            <el-form :inline="true" :model="form" ref="form" class="demo-form-inline" id="form" :rules="rules">
                <el-col :md="12">
                    <el-form-item label="批次名称：" prop="title">
                        <el-input v-model="form.title" placeholder="请填写批次名称" :maxlength="50"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :md="12">
                    <el-form-item label="生产数量：" prop="total">
                        <el-input v-model="form.total" placeholder="请填写生产数量" type="number"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :md="12" style="margin-top:20px;">
                    <el-form-item label="计量单位：" prop="unit">
                        <el-input v-model="form.unit" placeholder="请填写计量单位" :maxlength="20"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :md="12" style="margin-top:20px;">
                    <el-form-item label="产品规格：" prop="norm">
                        <el-input v-model="form.norm" placeholder="请填写产品规格" :maxlength="20"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :md="12" style="margin-top:20px;">
                    <el-form-item label="产品型号：" prop="type">
                        <el-input v-model="form.type" placeholder="请填写产品型号" :maxlength="20"></el-input>
                    </el-form-item>
                </el-col>

                <el-col style="margin-top:20px;">
                    <el-form-item>
                        <el-button type="primary" :loading='loading' @click="onSubmit" style="background:#419EFF;border:0px;">提交申请</el-button>
                    </el-form-item>
                </el-col>
            </el-form>
        </el-row>

    </div>
</template>
<script>
import { mapState } from "vuex";
//返回组件
import goBack from "@/components/goBack";
export default {
  activated() {
    if (this.$route.params.id && this.$route.params.id > 0) {
      this.getData();
    }
  },
  //离开组件时数据清空
  deactivated() {
    this.$refs["form"].resetFields(); //去除验证
    this.form.title = "";
    this.form.norm = "";
    this.form.total = "";
    this.form.unit = "";
    this.form.type = "";
  },
  data() {
    return {
      loading: false,

      form: {
        title: "", //批次名称
        norm: "", //产品规格
        total: "", //生产数量
        unit: "", //计量单位
        type: "" //产品型号
      },

      //表单rules验证
      rules: {
        title: [
          {
            required: true,
            message: "请填写批次名称！",
            trigger: "blur"
          }
        ],
        norm: [
          {
            required: true,
            message: "请填写产品规格！",
            trigger: "blur"
          }
        ],
        type: [
          {
            required: true,
            message: "请填写产品型号！",
            trigger: "blur"
          }
        ],
        total: [
          {
            required: true,
            message: "请填写生产数量！",
            trigger: "blur"
          }
        ],
        unit: [
          {
            required: true,
            message: "请填写计量单位！",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    //编辑页面进来
    getData() {
      this.axios({
        method: "post",
        url: this.API_ROOT + "/home_api/goods/read",
        data: {
          id: this.$route.params.id
        },
        headers: this.$store.getters.Request_Head
      }).then(
        response => {
          if (this.getToken(response.data)) {
            this.form.title = response.data.data.batch;
            this.form.norm = response.data.data.norm;
            this.form.total = response.data.data.total;
            this.form.unit = response.data.data.unit;
            this.form.type = response.data.data.type;
          }
        },
        error => {
          this.$emit("API-ERR");
        }
      );
    },
    //提交批次申请
    onSubmit() {
      this.$refs["form"].validate(valid => {
        if (!valid) {
          return false;
        } else {
          //提交
          if (this.loading) return;
          this.loading = true;
          let url;
          if (this.$route.params.id && this.$route.params.id > 0) {
            url = this.API_ROOT + "/home_api/goods/update";
          } else {
            url = this.API_ROOT + "/home_api/goods/insert";
          }
          this.axios({
            method: "post",
            url: url,
            data: {
              batch: this.form.title,
              total: this.form.total,
              norm: this.form.norm,
              type: this.form.type,
              unit: this.form.unit,
              did: this.$route.params.did,
              id: this.$route.params.id
            },
            headers: this.$store.getters.Request_Head
          }).then(
            response => {
              if (this.getToken(response.data)) {
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                this.$router.push({
                  name: "sq_chanpin"
                });
              }
              this.loading = false;
            },
            error => {
              this.$message({
                message: "提交失败",
                type: "error"
              });
              this.loading = false;
              this.$emit("API-ERR");
            }
          );
        }
      });
    }
  },
  //计算属性
  computed: mapState({
    uinfo: state => state.uinfo
  }),
  //挂载组件
  components: {
    goBack
  }
};
</script>
<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
