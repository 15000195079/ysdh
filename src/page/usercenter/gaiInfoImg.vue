<template>
    <el-dialog title="设置用户头像" width="40%" top="5vh" :visible.sync="dialogVisible" @close="handleClose">
        <el-row>
            <el-col>已设置头像</el-col>
            <el-col class="Info-Img margin-top-5"><img :src="img_data" alt="" class="img-md img-circle" style="border-radius:50%;cursor:pointer;" /></el-col>
            <el-col class="mar-top">选择系统内置头像</el-col>
            <el-col class="morenF">
                <img :src="url+item" class="img-md" @click="xuanzeImg(index+1)" v-for="(item,index) in InfoImgArr" :key="index" alt="" style="border-radius:50%;cursor:pointer;">
            </el-col>
        </el-row>

        <el-row class="margin-top-10">
            <el-col>上传自定义头像 </el-col>
            <el-col class="margin-top-5">
                <el-upload class="upload-demo" accept=".jpg,.png,.jpeg" :action="API_ROOT + '/home_api/member/upload'" :headers="{'User-Token':uinfo.token}" :show-file-list="false" :on-success="handleAvatarSuccess" :on-error="handleAvatarError" :before-upload="beforeAvatarUpload">
                    <el-button size="small" type="info" plain>上传头像</el-button>
                    <div class="el-upload__tip" slot="tip">只能上传jpg/png/jpeg格式文件，且大小不超过500KB</div>
                </el-upload>
            </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="handleConfirm" :loading="loadingstate"> 保存头像</el-button>
        </div>
    </el-dialog>
</template>
<script>
import { mapState } from "vuex";
export default {
  activated: function() {},
  props: ["dialogVisibles"],
  data() {
    return {
      loadingstate: false,
      dialogVisible: false,
      //上传格式
      filters: {
        mime_types: [
          {
            title: "Image Files",
            extensions: "jpg,png,jpeg"
          }
        ]
      },
      img: "",
      img_data: "",
      img_name: "",
      InfoImgArr: [],
      url: ""
    };
  },
  watch: {
    dialogVisibles(newValue, oldValue) {
      if (newValue == oldValue) return;
      this.dialogVisible = newValue;
      this.img_data = this.uinfo.head;
      if (newValue) {
        this.loadingstate = false;
        this.getInfoimage();
      }
    }
  },
  methods: {
    //离开此页面
    handleClose(val) {
      this.$emit("Cb-ImgDialog", false);
    },
    //保存头像
    handleConfirm() {
      if (this.loadingstate) return;
      this.loadingstate = true;
      this.axios({
        method: "post",
        url: this.API_ROOT + "/home_api/member/picture",
        data: {
          id: this.uinfo.id,
          head: this.img_data
        },
        headers: this.$store.getters.Request_Head
      }).then(
        response => {
          if (this.getToken(response.data)) {
            this.$message.success("保存成功");
            this.uinfo.head = this.img_data;
            this.$store.commit("setUinfo", this.uinfo);
            this.$emit("Cb-ImgDialog", false);
          } else {
            this.loadingstate = false;
          }
        },
        error => {
          this.loadingstate = false;
          this.$emit("API-ERR");
        }
      );
    },
    //设置默认图片
    xuanzeImg(val) {
      this.img_data = this.url + this.InfoImgArr[val - 1];
      this.img_name = "";
    },
    //上传成功
    handleAvatarSuccess(res, file) {
      if (this.getToken(res)) {
        this.img_name = res.data.img_64;
        this.img_data = res.data.url + res.data.img_64;
        this.url = res.data.url;
        this.$message({
          message: "图片上传成功",
          type: "success"
        });
        if (res.data.uinfo) {
          this.$store.commit("setUinfo", res.data.uinfo);
        }
      }
    },
    handleAvatarError(err) {
      this.$message({
        message: "服务器请求失败，赶紧联系工程师抢修吧~",
        type: "error"
      });
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 0.5;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 500KB!");
      }
      return isLt2M;
    },

    //默认系统自定义头像
    getInfoimage() {
      this.axios({
        method: "post",
        url: this.API_ROOT + "/home_api/member/info",
        headers: this.$store.getters.Request_Head
      }).then(
        response => {
          if (this.getToken(response.data)) {
            this.InfoImgArr = response.data.data.img;
            this.url = response.data.data.url;
          }
        },
        error => {
          this.$emit("API-ERR");
        }
      );
    }
  },

  computed: mapState({
    uinfo: state => state.uinfo
  })
};
</script>
<style scoped>
.morenF > img:hover {
  cursor: pointer;
  box-shadow: 0px 0px 3px #1d8ce0;
}

.morenF > img,
.Info-Img img {
  background: #e5e5e5;
  padding: 4px;
}

.Info-Img > div img:hover {
  box-shadow: 0px 0px 3px #1d8ce0;
}

.Info-Img > div span {
  position: absolute;
  right: 0px;
  top: 0px;
}

.Info-Img > div span:hover {
  color: #ff4949;
  cursor: pointer;
}

.morenF > img {
  margin: 5px 5px;
}
</style>
