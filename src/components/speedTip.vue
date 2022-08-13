<template>
  <div :class="{speedTipStyleMin:min,speedTipStyleMax:!min}" class="speedTipStyle" v-if="$store.state.uploadMd5!==''||fileInterrupt">
    <el-icon :size="20" style="width: 1em; height: 1em; position: absolute;right: 15px;cursor: pointer" @click="changeBorder" :title="min?'最大化':'最小化'">
      <SemiSelect v-if="!min"/>
      <Menu v-if="min"/>
    </el-icon>

    <div style="text-align: center;transition:all 1s;" :class="{hidden:min,show:!min}">
      <strong v-if="!fileInterrupt">正在上传文件:</strong>
      <strong v-else>上传中断:</strong>
      <div style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;width:80px;height:23px;line-height:23px;display: inline-block;background-color: #66c03a;color: white;padding:3px 6px;border-radius: .5em;position: relative;top:8px;left: 5px;cursor: pointer;" :title="$store.state.uploadFileName">
        <strong>{{$store.state.uploadFileName}}</strong>
      </div>
    </div>
    <el-progress :text-inside="true" :stroke-width="26" :percentage="parseFloat(percentage.toFixed(2))" :status="tipColor"/>
    <div style="text-align: center;margin-top:5px"><strong style="font-size:23px;color: darkorange">{{(speed).toFixed(2)}}</strong> Mbps/s</div>
    <div style="display: flex;justify-content: center;transition:all 1s"  :class="{hiddenBottom:min,showBottom:!min}">
        <el-button v-if="fileInterrupt" type="warning" title="点击「上传文件」,来重新上传" @click="$router.push({path:'/more',query:{path:$store.state.uploadPath}})" :disabled="$route.path==='/more'"><strong>重新上传</strong></el-button>
      <el-button type="info" title="取消上传" @click="$store.state.uploadCancel=true;fileInterrupt=false"><strong>取消上传</strong></el-button>
    </div>
  </div>
</template>

<script>
import {reactive, toRefs, watch} from "vue";
import {useStore} from "vuex";
import {SemiSelect,Menu} from '@element-plus/icons'
export default {
  name: "speedTip",
  components:{
    SemiSelect,
    Menu
  },
  setup(){
    const store=useStore();
    let uploadFile=reactive({
      indexMax:0,
      tipColor:"",
      percentage:0,
      fileInterrupt:false,
      speed:0,
      oldDate:0,
      min:false
    })
    watch(()=>store.state.uploadIndex,(newData,oldData)=>{
      if(newData!==0){
        uploadFile.speed=(8/(Date.now()-uploadFile.oldDate)*1000);
        uploadFile.fileInterrupt=false;//开始上传后标识改过来
      }
      uploadFile.indexMax=store.state.uploadIndexMax;
      uploadFile.oldDate=Date.now();
      uploadFile.percentage=newData/uploadFile.indexMax*100;
      if(uploadFile.percentage<20){
        uploadFile.tipColor="exception";
      }else if(uploadFile.percentage<50){
        uploadFile.tipColor="warning";
      }else if(uploadFile.percentage<80){
        uploadFile.tipColor=""
      }else{
        uploadFile.tipColor="success"
      }
    })

    watch(()=>store.state.uploadInterrupt,(newData,oldData)=>{
      if(newData){
        uploadFile.fileInterrupt=newData;
        store.state.uploadInterrupt=false;
      }

    })

    let changeBorder=()=>{
      uploadFile.min=!uploadFile.min;
    }


    return {
      ...toRefs(uploadFile),
      uploadFile,
      changeBorder
    }
  },
  created() {
    if(sessionStorage.getItem("uploadMd5")){
      this.$store.state.uploadIndexMax=sessionStorage.getItem("uploadIndexMax");
      this.$store.state.uploadIndex=sessionStorage.getItem("uploadIndex");
      this.$store.state.uploadFileName=sessionStorage.getItem("uploadFileName");
      this.$store.state.uploadPath=sessionStorage.getItem("uploadPath");
      this.$store.state.uploadMd5=sessionStorage.getItem("uploadMd5");
      this.fileInterrupt=true;
    }
  }
}
</script>

<style scoped>
.speedTipStyleMax{
  width: 200px;
  height: 150px;
}
.speedTipStyle{
  position: fixed;
  top: 20px;
  right: 30px;
  z-index: 100;
  background-color: white;
  box-shadow: 0 0 10px grey;
  padding: 10px 50px ;
  transition:all 1s;
  border-radius: 1em;
  overflow: hidden;
}
.speedTipStyleMin{
  width: 200px;
  height: 50px;
}
.hidden{
  opacity: 0;
  height: 1px;
  margin-bottom: 0;
}
.show{
  opacity: 1;
  height: 30px;
  margin-bottom: 20px;
}
.hiddenBottom{
  opacity: 0;
  height: 1px;
  margin-top:3px
}
.showBottom{
  opacity: 1;
  height: 30px;
  margin-top:10px
}
</style>