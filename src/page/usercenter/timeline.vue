<template>
    <el-dialog :visible.sync="dialogStatus" width="750px" @close="closeDialog" :title='dhname' top="10vh">
        <div class="timeline">
            <div class="timeline-entry" v-for="(item,index) in tableData" :key="item.id">
                <div class="timeline-stat">
                    <div class="timeline-icon">
                        <img :src="item.info.head" alt="Image">
                    </div>
                </div>
                <div class="timeline-label">
                    <span class="text-primary">{{item.title}}</span>
                    <br>
                    <span>{{item.time}}</span>
                    <p v-if="(item.status == '93' || item.status == '95' || item.status == '97' || item.status == '98') && item.info.beizhu" class="bg">
                        <span class="text-danger">{{item.info.beizhu}}</span>
                    </p>
                    <div v-if="(item.status == '95' || item.status== '97') && item.status == tableData[0].status && index==0">
                        <el-row>
                            <Uploader style="display:inline-block" theme="btn-primary" :filters="filters" @Callback-UploadProgress="CB_UploadProgress" @Callback-GetFileInfo="CB_GetFileInfo" button_text="上传材料"></Uploader>
                        </el-row>
                        <div class="el-upload__tip" style="line-height: 25px;">
                            上传image图片、txt/pdf/doc 或rar/zip格式文件
                        </div>
                        <el-progress :text-inside="true" :stroke-width="18" :percentage="audio_percent" :status="audio_status" v-if="audio_percent>0"></el-progress>
                    </div>
                    <div v-if="item.status == '96'&&item.info.materials">
                        认证材料：
                        <a :href="item.info.materials" target="_blank" style="color:#128ef2;">
                            {{item.info.materials_name}}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </el-dialog>
</template>
<script>
import Uploader from "@/components/pl-upload.vue";
export default {
  props: ["dialogFormVisible", "sid", "aid", "dhname", "fuid"],

  data() {
    return {
      dialogStatus: false,
      tableData: [],
      //限制上传文件
      filters: {
        max_file_size: "20mb",
        mime_types: [
          { title: "Image files", extensions: "jpg,gif,png" },
          { title: "Zip files", extensions: "zip" },
          { title: "Rar files", extensions: "rar" },
          { title: "Document files", extensions: "pdf,doc,txt" }
        ]
      },
      audio_status: "", //进度状态
      audio_percent: 0, //上传进度
      name: "", //上传文件名
      urls: "" //文件路径拼接
    };
  },

  watch: {
    dialogFormVisible(newValue, oldValue) {
      this.dialogStatus = newValue;
      if (this.dialogStatus) {
        this.getData();
      } else {
        this.audio_status = "";
        this.audio_percent = 0;
        this.name = "";
        this.urls = "";
      }
    }
  },
  methods: {
    //获取主数据
    getData() {
      this.axios({
        method: "post",
        url: this.API_ROOT + "/home_api/apply_process/index",
        data: {
          pid: this.sid,
          listRows: 200
        },
        headers: this.$store.getters.Request_Head
      }).then(
        response => {
          if (this.getToken(response.data)) {
            this.tableData = response.data.data;
          }
        },
        error => {
          this.$emit("API-ERR");
        }
      );
    },
    closeDialog(id) {
      this.$emit("CB-dialogFormVisible", false);
    },
    //上传成功后的回调
    CB_GetFileInfo(res) {
      if (res && res.file) {
        this.name = res.name;
        this.urls = res.url + res.file;
        this.audio_percent = 0;
        this.onSubmit();
      } else {
        this.$message({
          message: "上传失败",
          type: "error"
        });
      }
    },
    //上传进度
    CB_UploadProgress(file) {
      this.audio_percent = file.percent;
      if (this.audio_percent == 100) {
        this.audio_status = "success";
      }
    },
    //删除上传材料
    audios_close() {
      this.name = "";
      this.urls = "";
      this.audios_percent = 0;
      this.audios_status = false;
    },
    //提交材料
    onSubmit() {
      this.axios({
        method: "post",
        url: this.API_ROOT + "/home_api/apply_authorize/update",
        data: {
          materials_name: this.name,
          materials: this.urls,
          id: this.sid, //授权信息ID
          aid: this.aid, //授权信息动画ID
          fuid: this.fuid, //专属项目经理id
          status: 96
        },
        headers: this.$store.getters.Request_Head
      }).then(
        response => {
          if (response.data.status.code == 1001) {
            this.$message({
              message: "提交成功",
              type: "success"
            });
            this.$emit("CB-dialogFormVisible", 1);
          } else {
            this.$message({
              message: "提交失败",
              type: "success"
            });
          }
        },
        error => {
          this.$emit("API-ERR");
        }
      );
    }
  },
  //注意别忘记挂载组件
  components: {
    Uploader
  }
};
</script>
<style scoped>
.panel {
  border-radius: 0;
  border: 0;
  margin-bottom: 15px;
}
.timeline {
  background: none;
}
.timeline-label {
  background-color: #fff;
  border: 1px solid #e7ecf3;
}
.bg {
  background-color: #fef2ca;
  padding: 15px;
}
</style>
