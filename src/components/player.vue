<template>
    <el-dialog top="8vh" :title="'正在播放： ' +title + '的精彩视频'" width="60%" :visible.sync="dialogStatus" @close="closeDialog">
       
         <videoPlayer class="vjs-custom-skin" ref="videoPlayer" :options="playerOptions" customEventName="customstatechangedeventname" @ready="playerReadied">
        </videoPlayer>
    </el-dialog>
</template>

<script>
var o_player;

require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')

import { videoPlayer } from 'vue-video-player'

export default {
    data() {
        return {
            dialogStatus: false,
            playerOptions: {
                // component options
                start: 0,
                playsinline: false,
                muted: true,
                language: 'zh-CN',
                height: '480px',
                playbackRates: [0.7, 1.0, 1.5, 2.0],
                sources: [{
                    type: "video/mp4",
                    src: '',
                    name: ''
                }]
            }
        }
    },
    props: ['dialogFormVisible', 'url', 'title'],
    watch: {
        dialogFormVisible(newVlue, oldValue) {
            this.dialogStatus = newVlue;
        },
        url(newVlue,oldValue){
            this.playerOptions.sources[0].src=newVlue
        }
    },
    methods: {
        //准备播放组件 
        playerReadied(player) {
            o_player = player;
        },
        closeDialog() {
            //关闭视频
            o_player.pause();
            this.$emit('CB-dialogFormVisible', false)
        }
    },
    components: {
        videoPlayer
    }
}

</script>
