<template>
    <div>
        <el-tabs type="border-card" @tab-click="handleClick">
            <el-tab-pane label="剧照海报">
                <!-- 角色形象列表 -->
                <p v-if="!information_bottom1" align="center">暂无数据</p>
                <el-row :gutter="20" class="margin-bottom-30">
                    <el-col :xs="24" :sm="6" class="donghua-xq-list-box" v-for="(item,index) in information_bottom1" :key="item.id">
                        <div class="juese-xx-list margin-bottom-25">
                            <div class="jsxx-list-img" @click="haibaos(item)" style="cursor:pointer">
                                <img :src="item.file" alt="" v-if="item && item.file">
                                <img :src="item.img_s" alt="" v-else>
                            </div>
                            <div class="margin-top-20 font-110" @click="haibaos(item)" style="cursor:pointer">
                                {{item.title}}
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="场景道具">
                <p v-if="!information_bottom2" align="center">暂无数据</p>
                <el-row :gutter="20" class="margin-bottom-30">
                    <el-col :xs="24" :sm="6" class="donghua-xq-list-box" v-for="(item,index) in information_bottom2" :key="item.id">
                        <div class="juese-xx-list margin-bottom-25">
                            <div class="jsxx-list-img" @click="haibaos(item)" style="cursor:pointer">
                                <img :src="item.file" alt="" v-if="item && item.file">
                                <img :src="item.img_s" alt="" v-else>
                            </div>
                            <div class="margin-top-20 font-110" @click="haibaos(item)" style="cursor:pointer">
                                {{item.title}}
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="剧本选集" v-if="type == 3">
                <p v-if="!information_bottom3.screenplays" align="center">暂无数据</p>
                <div class="nav-card-txt" v-html="information_bottom3.screenplays">剧本选集</div>
            </el-tab-pane>
            <el-tab-pane label="音乐插曲">
                <el-table :data="information_bottom4" style="width: 100%">
                    <el-table-column label="音乐" width="310" prop="title" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="简介" width="200" prop="content" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="" align="right" width="200">
                        <template slot-scope="scope">
                            <i style="cursor:pointer" :class="audio_id==scope.row.id ?'fa fa-pause text-danger':'fa fa-play'" :id="scope.row.id" @click="au_player(scope.row.title,scope.row.audios,scope.row.id)" v-if="scope.row.audios">
                            </i>
                            <i style="cursor:pointer" :class="audio_id==scope.row.id ?'fa fa-pause text-danger':'fa fa-play'" :id="scope.row.id" @click="au_player(scope.row.title,scope.row.audio,scope.row.id)" v-else>
                            </i>
                        </template>
                    </el-table-column>
                    <el-table-column label="时长" width="145">
                        <template slot-scope="scope">
                            <span style="">{{ scope.row.duration }}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="精彩视频">
                <el-table :data="information_bottom5" style="width: 100%">
                    <el-table-column label="视频" width="310" prop="title" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="简介" width="200" prop="content" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="" width="200" align="right">
                        <template slot-scope="scope">
                            <i style="cursor:pointer" class="fa fa-play" @click="checkplayer(scope.row.title,scope.row.audios)" v-if="scope.row.audios">
                            </i>
                            <i style="cursor:pointer" class="fa fa-play" @click="checkplayer(scope.row.title,scope.row.audio)" v-else>
                            </i>
                        </template>
                    </el-table-column>
                    <el-table-column label="时长" width="145">
                        <template slot-scope="scope">
                            <span style="">{{scope.row.duration}}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="市场情报">
                <el-table :data="information_bottom6" style="width: 100%; cursor:pointer" @row-click="shichang">
                    <el-table-column label="文章标题" width="310">
                        <template slot-scope="scope">
                            <!-- <el-popover trigger="hover"  placement="top"> -->
                            <p>{{scope.row.title}}</p>
                            <!-- </el-popover> -->
                        </template>
                    </el-table-column>
                    <el-table-column label="作者" width="235">
                        <template slot-scope="scope">
                            <!-- <el-popover trigger="hover" placement="top"> -->
                            <p>{{scope.row.author}}</p>
                            <!-- </el-popover> -->
                        </template>
                    </el-table-column>
                    <el-table-column label="文章来源" width="310">
                        <template slot-scope="scope">
                            <!-- <el-popover trigger="hover" placement="top"> -->
                            <p>{{scope.row.origin}}</p>
                            <!-- </el-popover> -->
                        </template>
                    </el-table-column>

                </el-table>
            </el-tab-pane>
            <el-tab-pane label="授权流程">
                <div class="nav-card-txt">授权流程</div>
            </el-tab-pane>
        </el-tabs>
        <player :dialogFormVisible="dialogFormVisible" :url="url" :title="title" @CB-dialogFormVisible="CB_dialogFormVisible"></player>

        <audio autoplay id="audio_player" :src="audio_url">
            <source src="" type="audio/mpeg" />您的浏览器不支持音频播放
        </audio>

        <!-- 市场情报 -->
        <el-dialog :title="sc_data.title" :visible.sync="scqb" width="80%" center>
            <div :style="{'height': _PageHeight-100+'px', 'overflow-y': 'auto'}">
                <span style="fontSize:16px;">作者：
                    <span>{{sc_data.author}}</span>
                    <span class="margin-left-20">文章来源：</span>
                    <span>{{sc_data.origin}}</span>
                </span>
                <div v-html="sc_data.content"></div>
            </div>
        </el-dialog>
        <!-- 剧照海报 && 场景道具 -->
        <el-dialog :title="hb_data.title" :visible.sync="jzhb" width="20%">
            <img :src="hb_data.file" alt="" style="max-width:100%;" v-if="hb_data.file">
            <img :src="hb_data.img" alt="" style="max-width:100%;" v-else>
            <div v-html="hb_data.content"></div>
        </el-dialog>
    </div>
</template>
<script>
//导入vuex辅助函数
import { mapState } from "vuex";

import player from "../../components/player.vue";
var myPlayer; //实例化audio
var notice; //实例化notify
export default {
  props: ["type"],
  activated: function() {
    myPlayer = document.getElementById("audio_player");
    //详情页 底部选项卡数据请求
    this.get_bottom();
  },
  deactivated: function() {
    this.close_music();
  },
  data() {
    return {
      //底部选项卡
      audio_id: "", //music 播放id
      audio_url: "", //music 播放路径
      title: "", //audio 名称
      url: "", //audio 路径
      methodType: "", //!
      role: "", //!
      pick: "1",
      sc_data: "",
      scqb: false,
      hb_data: "",
      jzhb: false,
      dialogFormVisible: false,
      information_bottom1: [],
      information_bottom2: [],
      information_bottom3: "",
      information_bottom4: [],
      information_bottom5: [],
      information_bottom6: []
    };
  },
  methods: {
    //详情页 底部选项卡数据请求
    get_bottom() {
      this.loading = true;
      this.axios({
        method: "post",
        url: this.API_ROOT + "/home_api/animation/pick",
        data: {
          aid: this.$route.params.id,
          pick: this.pick
        },
        headers: this.$store.getters.Request_Head
      }).then(
        response => {
          if (this.getToken(response.data)) {
            if (this.pick == 1) {
              this.information_bottom1 = response.data.data;
            }
            if (this.pick == 2) {
              this.information_bottom2 = response.data.data;
            }
            if (this.pick == 3) {
              this.information_bottom3 = response.data.data;
            }
            if (this.pick == 4) {
              this.information_bottom4 = response.data.data;
            }
            if (this.pick == 5) {
              this.information_bottom5 = response.data.data;
            }
            if (this.pick == 6) {
              this.information_bottom6 = response.data.data;
            }
          }
          this.loading = false;
        },
        error => {
          this.$emit("API-ERR");
          this.loading = false;
        }
      );
    },
    //选项卡的点击数据请求事件
    handleClick(tab, event) {
      var index = parseInt(tab.index);
      this.pick = index += 1;
      this.get_bottom();
    },
    //市场情报弹窗
    shichang(row, event, column) {
      this.scqb = true;
      this.sc_data = row;
    },
    //剧场海报 && 场景道具弹窗
    haibaos(item) {
      this.jzhb = true;
      this.hb_data = item;
    },
    //播放或暂停音频试听
    au_player(title, audio, id) {
      this.notify_status = false;
      if (this.audio_id == id) {
        this.audio_id = "";
        myPlayer.pause();
        notice.close();
        return;
      }
      if (audio.play) {
        myPlayer.pause();
      } else {
        if (notice) {
          notice.close();
        }
        var demo = this;
        myPlayer.play();
        notice = this.$notify({
          title: "当前正在播放",
          message: title,
          duration: 0,
          iconClass: "fa fa-play-circle-o fa-3x text-pink",
          onClose: function() {
            //关闭后，停止播放
            myPlayer.pause();
            demo.audio_id = "";
          }
        });
      }
      this.audio_url = audio;
      this.audio_id = id;
    },
    close_music() {
      if (notice) {
        notice.close();
      }
    },
    //给子组件调用的函数
    CB_dialogFormVisible(val) {
      this.dialogFormVisible = false;
    },
    //audio 播放
    checkplayer(title, url) {
      this.title = title;
      this.url = url;
      this.dialogFormVisible = true;
    }
  },
  //计算属性
  computed: mapState({
    uinfo: state => state.uinfo
  }),
  components: {
    player
  }
};
</script>
<style scoped>
.el-dialog__body {
  padding: 0px 20px;
}
</style>