<template>
    <div style="background-color: #fff;padding: 15px;">
        <el-row class="bord-btm ">
            <el-col :md="5" class="font-130 text-dark text-bold padding-top-10 padding-bottom-10">
                {{ $route.params.id && $route.params.id>0 ? '编辑授权产品':'新增授权产品'}}
            </el-col>
            <el-col :md="19" class="padding-top-5 text-right">
                <goBack class="pull-right"></goBack>
            </el-col>
        </el-row>
        <el-row class="margin-top-30 margin-left-10">
            <el-form :inline="true" :model="form" ref="form" class="demo-form-inline" id="form" :rules="rules">
                <el-row>
                    <el-col :md="12" style="padding-left:13px;">
                        <el-form-item label="产品名称：" prop="title">
                            <el-input v-model="form.title" placeholder="请填写产品名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :md="12">
                        <el-form-item label="产品类目：" prop="cate">
                            <div class="block">
                                <el-cascader :options="options" v-model="form.cate">
                                </el-cascader>
                            </div>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row class="margin-top-20">
                    <el-col :md="4" style="color:#000;width:120px;">
                        <el-form-item label="产品设计图：" required>
                        </el-form-item>
                    </el-col>
                    <el-col :md="20" style="">
                        <el-upload :limit="5" accept=".jpg,.png,.bmp,.jpeg" :action="API_ROOT + '/home_api/member/upload'" :headers="{'User-Token':uinfo.token}" list-type="picture-card" :on-success="success_img" :on-preview="preview_img" :on-remove="handleRemove_img" :before-upload="beforeAvatarUpload" :on-exceed="exceed" :file-list="fileList_img">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <div class="el-upload__tip" style="line-height:25px">
                            上传上传jpg/png/jpeg格式图片,最大不超过1MB
                        </div>
                        <el-dialog :visible.sync="dialogVisible_img">
                            <img :src="dialogImageUrl_img" alt="" style="width:100%;">
                        </el-dialog>
                    </el-col>
                </el-row>

                <el-row class="margin-top-20">
                    <el-col :md="4" style="color:#000;width:120px;">
                        <el-form-item label="实物样品图：" required>
                        </el-form-item>
                    </el-col>
                    <el-col :md="20">
                        <el-upload :limit="5" accept=".jpg,.png,.bmp,.jpeg" :action="API_ROOT + '/home_api/member/upload'" :headers="{'User-Token':uinfo.token}" list-type="picture-card" :on-success="success_design" :on-preview="preview_design" :on-remove="handleRemove_design" :before-upload="beforeAvatarUpload" :on-exceed="exceed" :file-list="fileList_design">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <div class="el-upload__tip" style="line-height:25px">
                            上传上传jpg/png/jpeg格式图片,最大不超过1MB
                        </div>
                        <el-dialog :visible.sync="dialogVisible_design">
                            <img :src="dialogImageUrl_design" alt="" style="width:100%;">
                        </el-dialog>
                    </el-col>
                </el-row>

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
    if (this.$route.params.pid) {
      this.getLeimu(); //获取当前授权下的产品类目
    }
    if (this.$route.params.id && this.$route.params.id > 0) {
      this.getData(); //编辑页面进来
    }
  },
  //离开组件时数据清空
  deactivated() {
    this.$refs["form"].resetFields(); //去除验证
    this.loading = false;
    this.form.title = "";
    this.dialogImageUrl_img = "";
    this.dialogImageUrl_design = "";
    this.dialogVisible_img = false;
    this.dialogVisible_design = false;
    this.fileList_img = [];
    this.fileList_design = [];
  },
  data() {
    return {
      loading: false,
      dialogImageUrl_img: "", //产品设计图点击大图显示
      dialogVisible_img: false,

      dialogImageUrl_design: "", //实物样品图点击大图显示
      dialogVisible_design: false,

      fileList_img: [],
      fileList_design: [], //实物样品图多张

      form: {
        title: "", //名称
        cate: [] //选中类目
      },

      //产品类目数据源
      options: [],
      //表单rules验证
      rules: {
        title: [
          {
            required: true,
            message: "请填写产品名称！",
            trigger: "blur"
          }
        ],
        cate: [
          {
            type: "array",
            required: true,
            message: "请选择产品类目！",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    //获取当前授权下的产品类目下拉列表
    getLeimu() {
      this.axios({
        method: "post",
        url: this.API_ROOT + "/home_api/derivative/getlist",
        data: {
          pid: this.$route.params.pid
        },
        headers: this.$store.getters.Request_Head
      }).then(
        response => {
          if (this.getToken(response.data)) {
            this.options = response.data.data;
          }
        },
        error => {
          this.$emit("API-ERR");
        }
      );
    },
    //编辑页面进来
    getData() {
      this.axios({
        method: "post",
        url: this.API_ROOT + "/home_api/derivative/read",
        data: {
          id: this.$route.params.id
        },
        headers: this.$store.getters.Request_Head
      }).then(
        response => {
          if (this.getToken(response.data)) {
            this.fileList_img = response.data.data.sign;
            this.fileList_design = response.data.data.design;
            this.form.title = response.data.data.title;
            this.form.cate = response.data.data.leixing;
          }
        },
        error => {
          this.$emit("API-ERR");
        }
      );
    },
    //图片上传前（公用）
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 1;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过1MB!");
      }
      return isLt2M;
    },
    //上传图片超出个数限制时的回调
    exceed() {
      this.$message.error("上传图片最多为5张!");
    },

    //产品设计图上传成功回调
    success_img(response, file, fileList) {
      this.fileList_img = fileList;
    },

    //点击查看产品设计图回调
    preview_img(file) {
      if (file.response) {
        this.dialogImageUrl_img =
          file.response.data.url + file.response.data.img_0;
      } else {
        this.dialogImageUrl_img = file.url;
      }

      this.dialogVisible_img = true;
    },

    //删除产品设计图回调
    handleRemove_img(file, fileList) {
      this.fileList_img = fileList;
    },

    //实物样品图上传成功回调
    success_design(response, file, fileList) {
      this.fileList_design = fileList;
    },
    //点击查看实物样品图回调
    preview_design(file) {
      if (file.response) {
        this.dialogImageUrl_design =
          file.response.data.url + file.response.data.img_0;
      } else {
        this.dialogImageUrl_design = file.url;
      }

      this.dialogVisible_design = true;
    },

    //删除实物样品图回调
    handleRemove_design(file, fileList) {
      this.fileList_design = fileList;
    },

    //提交产品申请
    onSubmit() {
      // return;
      this.$refs["form"].validate(valid => {
        if (!valid) {
          return false;
        } else {
          if (this.fileList_img.length == 0) {
            this.$message({
              message: "未上传产品设计图",
              type: "error"
            });
            return;
          }
          if (this.fileList_design == 0) {
            this.$message({
              message: "未上传实物样品图",
              type: "error"
            });
            return;
          }
          //产品设计 实物样品图 数据处理
          let newfileList_img = [];
          let newfileList_design = [];
          $.each(this.fileList_img, (index, item) => {
            if (item.response) {
              let url = item.response.data.url + item.response.data.img_0;
              let img_64 = item.response.data.url + item.response.data.img_64;
              newfileList_img.push({ url: url, img_64: img_64 });
            } else {
              let url = item.url;
              let img_64 = item.img_64;
              newfileList_img.push({ url: url, img_64: img_64 });
            }
          });
          $.each(this.fileList_design, (index, item) => {
            if (item.response) {
              let url = item.response.data.url + item.response.data.img_0;
              let img_64 = item.response.data.url + item.response.data.img_64;
              newfileList_design.push({ url: url, img_64: img_64 });
            } else {
              let url = item.url;
              let img_64 = item.img_64;
              newfileList_design.push({ url: url, img_64: img_64 });
            }
          });
          this.fileList_img = newfileList_img;
          this.fileList_design = newfileList_design;

          let url;
          if (this.$route.params.id && this.$route.params.id > 0) {
            url = this.API_ROOT + "/home_api/derivative/update";
          } else {
            url = this.API_ROOT + "/home_api/derivative/insert";
          }
          if (this.loading) return;
          //提交
          this.loading = true;
          this.axios({
            method: "post",
            url: url,
            data: {
              title: this.form.title,
              leixing: this.form.cate,
              sign: this.fileList_img,
              design: this.fileList_design,
              pid: this.$route.params.pid,
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
.el-upload__tip {
  color: #ccc;
  margin-top: 0;
}
.el-input {
  margin-left: 15px;
}
</style>
