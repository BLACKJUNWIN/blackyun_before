<template>
  <div>
    <div style="width:70%;margin:30px auto 0 auto">
      <div style="text-align: center">
        <strong style="font-size: 40px;letter-spacing: 10px;">轻轻松松<span style="color: #3a8ee6;font-size: 60px">下</span>,简简单单<span
          style="color: #61b3ec;font-size: 50px">用</span></strong>
        <div style="text-align: center;font-size: 16px;color: #a7adad;margin-top:25px"><strong>在错综复杂的web环境下,致力于轻轻松松下载minimalist软件,软件持续更新中...欢迎大家留言推荐</strong>
        </div>
      </div>
    <div style="margin-top:30px;">
      <div v-for="(item,index) in software" :key="index" style="margin-bottom: 30px;">
        <div style="margin-bottom: 12px;"><strong style="padding:5px 8px;border-radius: .5em;color: white" :style="setBackColor(item.themeColor)">{{item.category}}</strong></div>
        <hr/>
        <div style="display: flex;width: 100%;height: auto;flex-wrap: wrap;">
          <div v-for="(item2,index2) in item.software" :key="index2" class="file"
               :title="clearType(item2.name)" @click="currentFile=item2;fileManage=true;"
               @contextmenu.prevent="currentFile=item2;fileManage=true;" >
            <img :src="getImage(item2)" style="width:75%" alt="图标"/>
            <span class="fileTitle">{{ clearType(item2.name) }}</span>
          </div>
        </div>
      </div>
    </div>
    <!--    文件操作弹窗-->
    <el-dialog
      title="文件管理"
      v-model="fileManage"
      width="36%"
      center>
      <div style="flex: none;margin-bottom: 15px">
        <div style="height: 100%;display: table;margin:0 auto" :title="currentFile.name">
          <div
            style="align-items: center;display: table-cell;vertical-align: middle;height: auto;flex:none;text-align: center">
            <img :src="getImage(currentFile)" style="width:106px;border-radius: 1em;" alt="图标"/>
            <div style="margin-top: 5px">
              <span
                style="font-size:16px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;width:100%;display: inline-block;margin-top:8px;font-weight: bold">{{ currentFile.name }}</span>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer" style="display: flex;justify-content: center">
        <el-button type="info" @click="fileManage = false">取 消</el-button>
        <el-button type="primary" @click="fileManage = false;goHome()" :disabled="currentFile.url===''"
                   title="部分软件没有找到官网">官网下载</el-button>
        <el-button type="success" @click="fileManage = false;downFile()" :disabled="currentFile.md5==='null'"
                   title="软件官网下载更快">直接下载</el-button>
       </span>
    </el-dialog>
    <!--    文件操作弹窗-->
  </div>
</div>
</template>


<script>
import {reactive, toRefs} from "vue";
import {net_softwareList} from "@/net/software";
import {RealBaseUrl} from "@/net/request";

export default {
  name: "simple",
  setup(){
    let data=reactive({
      software:[],
      currentFile:"",
      fileManage:false,
    });

    let getImage=(item)=>{
      if(item.image===null||item.image===""){
        try {
          return require("@/assets/images/fileType/" + item.type + ".svg");
        } catch (e) {
          return require("@/assets/images/fileType/null.svg");
        }
      }
      return item.image;

    }
    //到达文件官网
    let goHome=()=>{
      window.open(currentFile.url, '_blank');
    }

    //清除文件后缀样式
    let clearType = (fileName) => {
      let index = fileName.lastIndexOf(".");
      if (index === -1) {
        return fileName;
      }
      return fileName.substring(0, index);
    }

    let setBackColor=(color)=>{
      return "background-color:"+color;
    }

    //下载文件
    let downFile = () => {
      window.open(RealBaseUrl + "/v1/down?md5=" + data.currentFile.md5, '_blank');
    }
    return {
      ...toRefs(data),
      data,
      goHome,
      downFile,
      clearType,
      getImage,
      setBackColor
    }
  },
  async created() {
    this.software=(await net_softwareList()).data;
  }
}
</script>

<style scoped>
.file:hover {
  box-shadow: 0 0 10px grey;
}

.file {
  width: 10%;
  height: auto;
  text-align: center;
  margin: 30px;
  padding: 15px 20px;
  border-radius: 1em;
  cursor: pointer;
  transition: all 600ms
}

.fileTitle {
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  display: inline-block;
  margin-top: 8px
}

</style>
