<template>
  <div style="width:80%;margin:0 auto;">
    <div>
      <el-button type="primary" style="margin-top: 20px;height: 36px;" @click="backLevel()"
                 :disabled="$route.query.path==='/'">
        <Back style="width: 1em; height: 1em; margin-right: 8px"/>
        返回
      </el-button>
    </div>
    <div style="margin-top:20px">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{path:'/more',query:{path:'/'}}">黑盘</el-breadcrumb-item>
        <el-breadcrumb-item v-for="(item,index) in records" :key="index">{{ item }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div
        style="display: flex;width: 100%;height: auto;flex-wrap: wrap;box-shadow: 0 0 8px rgba(128,128,128,0.8);background-color:#fafafa;border-radius: 1.5em;margin-top:20px;padding:50px 0">
      <div class="file" @click="enterFile({name:'temp',level:'/',type:'pack'})" v-if="$route.query.path==='/'">
        <img :src="getType('pack')" style="width:75%" alt="类型图片"/>
        <span class="fileTitle">temp</span>
      </div>
      <div v-for="(item,index) in currentPack" :key="index" style="" class="file"
           :title="clearType(item.name)+'.'+item.type"
           @contextmenu.prevent="currentFile=item;fileManage=true;" @click="enterFile(item)">
        <img :src="getType(item.type)" style="width:75%" alt="类型图片"/>
        <span class="fileTitle">{{ clearType(item.name) }}</span>
      </div>
      <div v-if="currentPack===null||currentPack.length<=0&&$route.query.path!=='/'"
           style="text-align: center;width: 100%">
        <img src="@/assets/images/none.svg" alt="啥也没有"/>
        <div style="font-weight: bold;font-size: 20px;color: #61b3ec"><span style="color: black">黑</span>盘里什么也没有</div>
      </div>
    </div>

    <div style="display: flex;justify-content: right;margin:30px 0;width: 100%;">
      <input type="file" style="display: none" id="upload" @change="fileParse()">
      <el-button type="primary" plain style="font-weight: bold;height: 36px" @click="clickUpload()">上传文件</el-button>
      <el-button type="success" plain style="font-weight: bold;height: 36px" @click="addMkdir=true;">新建文件夹</el-button>
    </div>
    <!--    文件操作弹窗-->
    <el-dialog
        title="文件管理"
        v-model="fileManage"
        width="41%"
        center>
      <div style="display:flex;width:80%;height: 200px;text-align: center;margin:10px auto 0 auto;"
           v-if="currentFile!=null||currentFile!=={}">
        <div>
          <img :src="getType(currentFile.type)" style="height:100%" alt="样式"/>
        </div>
        <div
            style="text-align: left;display: flex;flex-flow: column;justify-content: space-between;height: 160px;margin-top:10px">
          <div class="fileStyle"><strong>文件名:</strong>&nbsp;{{ clearType(currentFile.name) }}</div>
          <div class="fileStyle"><strong>类型:</strong>&nbsp;{{ currentFile.type }}</div>
          <div class="fileStyle">
            <strong>路径<br></strong>黑盘{{ currentFile.level }}{{ clearType(currentFile.name) }}.{{ currentFile.type }}
          </div>
          <div class="fileStyle">
            <strong>大小<br></strong>{{
              (currentFile.size / 1024).toFixed(3)
            }}KB&nbsp,&nbsp约{{ (parseFloat(currentFile.size) / 1024 / 1024).toFixed(2) }}MB
          </div>
        </div>
      </div>
      <el-dialog
          v-model="fileManageInner"
          width="30%"
          title="软件分享"
          append-to-body>
          <el-form  label-width="80px">
            <el-form-item label="软件名" style="font-weight: bold">
              <el-input name='fileName' v-model="shareFile.name" placeholder="请输入软件名"></el-input>
            </el-form-item>
            <el-form-item label="分类名" style="font-weight: bold">
              <el-select v-model="shareFile.categoryId">
                <el-option
                    v-for="item in category"
                    :key="item.id"
                    :label="item.category"
                    :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-form>
        <span slot="footer" class="dialog-footer" style="display: flex;justify-content: center;margin-top: 25px">
        <el-button type="info" @click="fileManageInner = false">取 消</el-button>
        <el-button type="warning" @click="fileManageInner=false;uploadShareFile()">分享</el-button>
       </span>
      </el-dialog>
      <span slot="footer" class="dialog-footer" style="display: flex;justify-content: center;margin-top: 25px">
        <el-button type="info" @click="fileManage = false">取 消</el-button>
        <el-button type="danger" @click="fileManage = false;deleteFile()">删除</el-button>
        <el-button type="success" @click="fileManage = false;onlineFile()"
                   :disabled="!(currentFile.type==='txt'||currentFile.type==='jpg'||currentFile.type==='png'||currentFile.type==='xml')"
                   title="仅支持txt,jpg,png格式">预览</el-button>
        <el-button type="primary" @click="fileManage = false;downFile(currentFile)">下载</el-button>
        <el-button type="warning" @click="fileManageInner=true;shareFile.name=clearType(currentFile.name);shareFile.fileId=currentFile.id">分享</el-button>
       </span>
    </el-dialog>
    <!--    文件操作弹窗-->
    <el-dialog title="新增文件夹"
               v-model="addMkdir"
               width="30%"
               center>
      <el-form-item label="文件名" style="font-weight: bold">
        <el-input name='fileName' v-model="mkdirName" placeholder="请输入文件名"></el-input>
      </el-form-item>
      <span slot="footer" class="dialog-footer" style="display: flex;justify-content: center;margin-top: 25px;">
        <el-button type="info" @click="addMkdir = false" style="width:60px;height: 36px;">取 消</el-button>
        <el-button type="success" style="width:60px;height: 36px" @click="newMkdir()">新增</el-button>
       </span>
    </el-dialog>
  </div>
</template>

<script>
import {Back} from "@element-plus/icons";
import {
  showPack,
  removeFilePath,
  net_newMkdir,
  net_fileExist,
  net_uploadSliceFile,
  net_fileCombined,
  net_uploadCancel, net_categoryList, net_shareFile,
} from "@/net/file";
import {useRoute, useRouter} from "vue-router";
import {reactive, toRefs, watch} from "vue";
import {useStore} from "vuex";
import {RealBaseUrl} from "@/net/request";
import SparkMD5 from "spark-md5";

export default {
  name: "more",
  components: {
    Back
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    watch(route, (newValue, oldValue) => {
      if (newValue.path === "/more") {
        enterPack();
      }
    })

    //基础属性
    let fileData = reactive({
      currentPack: [],
      currentFile: {},
      fileManage: false,
      fileManageInner: false,
      addMkdir: false,
      mkdirName: "",
      records: [],
      abortController: new AbortController()
    })

    let file = reactive({
      sliceTotal: 0,
      hash: "",
      uploadList: [],
      uploadFileName: "",
      uploadFileRealName: "",
      fileUploaded: 0,
      category:[],
      shareFile:{
        name:"",
        categoryId:"1534448966809767937",
        fileId:0,
      }
    })

    //文件分享
    let uploadShareFile=async ()=>{
      let res=await net_shareFile(file.shareFile);
      if(res.code==="200"){
        let res={
          code:"201",
          message:"分享成功,等待管理员审核!"
        }
        store.commit("tip",res);
      }else{
        store.commit("tip",res);
      }
    }

    //进入对应文件夹
    let enterPack = async () => {
      fileData.currentPack = (await showPack({
        "level": route.query.path
      })).data;
      fileData.records = route.query.path.substring(1).split("/");
    }
    //进入文件时
    let enterFile = (file) => {
      if (file.type === "pack") {
        router.push({path: "/more", query: {path: file.level + file.name + "/"}})
        enterPack();
      } else {
        fileData.currentFile = file;
        fileData.fileManage = true;
      }
    }

    //获取文件样式并展示对应样式图片
    let getType = (type) => {
      try {
        return require("@/assets/images/fileType/" + type + ".svg");
      } catch (e) {
        return require("@/assets/images/fileType/null.svg");
      }
    }

    //返回上一级
    let backLevel = () => {
      let level = route.query.path.substring(0, route.query.path.length - 1);
      let oldLevel = level.substring(0, level.lastIndexOf("/") + 1)
      if (oldLevel.length <= 0) {
        oldLevel = "/";
      }
      router.push({path: "/more", query: {path: oldLevel}});
      enterPack();
    }

    //删除文件路径
    let deleteFile = async () => {
      let res = await removeFilePath(fileData.currentFile.id);
      store.commit("tip", res);
      await enterPack();
    }

    //在线浏览文件
    let onlineFile = () => {
      window.open(RealBaseUrl + "/upload/temp/" + fileData.currentFile.realName, '_blank');
    }

    //下载文件
    let downFile = () => {
      window.open(RealBaseUrl + "/v1/down?md5=" + fileData.currentFile.md5, '_blank');
    }

    //新增文件夹
    let newMkdir = async () => {
      if (fileData.mkdirName === "") {
        let res = {
          code: "500",
          message: "请先输入文件名"
        }
        store.commit("tip", res);
      } else {
        let res = await net_newMkdir({
          fileName: fileData.mkdirName,
          level: route.query.path
        })
        await enterPack();
        fileData.mkdirName = "";
        store.commit("tip", res);
        fileData.addMkdir = false;
      }
    }

    //清除文件后缀样式
    let clearType = (fileName) => {
      let index = fileName.lastIndexOf(".");
      if (index === -1) {
        return fileName;
      }
      return fileName.substring(0, index);
    }

    watch(() => store.state.uploadCancel, async (newData, oldData) => {
      if (newData) {
        await net_uploadCancel(store.state.uploadMd5 + store.state.uploadFileName.substring(store.state.uploadFileName.lastIndexOf(".")))
        document.querySelector('#upload').value = "";
        sessionStorage.removeItem("uploadIndexMax")
        sessionStorage.removeItem("uploadPath");
        sessionStorage.removeItem("uploadFileName");
        sessionStorage.removeItem("uploadMd5");
        store.state.uploadIndexMax = 1;
        store.state.uploadPath = "";
        store.state.uploadFileName = "";
        store.state.uploadMd5 = "";
        let res = {
          code: "201",
          message: "文件取消上传!"
        }
        store.commit("tip", res);
      }
    })

    //调用原生上传按钮
    let clickUpload = () => {
      document.querySelector('#upload').click();
    }
    //文件上传开始,分流
    let uploadFile = async function () {
      //获取文件并创建传递data数组
      store.state.loading = false;
      let fileData = document.querySelector('#upload').files[0];
      let res = (await net_fileExist({md5: file.hash, path: route.query.path, name: fileData.name}));
      if (res.code !== "200") {
        file.sliceTotal = Math.ceil(fileData.size / (1024 * 1024));
        file.uploadFileName = fileData.name;
        file.uploadFileRealName = file.hash + fileData.name.substring(fileData.name.lastIndexOf("."));
        await fileSlice(fileData);
      } else {
        let res = {
          code: "201",
          message: "达到秒传条件,上传成功!"
        }
        await enterPack();
        store.commit("tip", res);
        //清空文件
        document.querySelector('#upload').value = "";
      }
    }
    //文件解析完后开始上传
    let fileParse = async () => {
      store.state.loading = true;
      //获取文件并创建传递data数组
      let fileData = document.querySelector('#upload').files[0];
      //获取buffer模式文件,并创建md5码
      let sparkMD5 = new SparkMD5.ArrayBuffer();
      let fileReader = new FileReader();
      fileReader.readAsArrayBuffer(fileData);//将文件转为buffer模式
      fileReader.onload = async (e) => {
        sparkMD5.append(e.target.result);
        file.hash = sparkMD5.end(false);
        await uploadFile();
      }
    }

    //文件拆分
    let fileSlice = async (fileData) => {
      let cur = 0;
      for (let i = 0; i < file.sliceTotal; i++) {
        let item = {
          raw: fileData.slice(cur * 1024 * 1024, (cur + 1) * 1024 * 1024),
          index: i,
          name: file.uploadFileName,
          total: file.sliceTotal
        }
        file.uploadList.push(item);
        cur++;
      }
      if (store.state.uploadMd5) {
        if (sessionStorage.getItem("uploadMd5") === file.hash) {
          let res = {
            code: "201",
            message: "文件完成验证,正在继续上传!"
          }
          store.commit("tip", res);
          await responseFiles(parseInt(sessionStorage.getItem("uploadIndex")));
        } else {
          let res = {
            code: "500",
            message: "与原文件不符,正在上传新文件!"
          }
          store.commit("tip", res);
          sessionStorage.removeItem("uploadIndexMax")
          sessionStorage.removeItem("uploadIndex")
          sessionStorage.removeItem("uploadPath");
          sessionStorage.removeItem("uploadFileName");
          sessionStorage.removeItem("uploadMd5");
          store.state.uploadIndexMax = 1;
          store.state.uploadPath = "";
          store.state.uploadFileName = "";
          store.state.uploadMd5 = "";
          await responseFiles();
        }
      }
      await responseFiles();
      file.uploadList = [];
      file.sliceTotal = 0;
    }

    //文件分段上传
    let responseFiles = async (index = 0) => {
      store.state.uploadIndexMax = file.uploadList.length;
      store.state.uploadPath = route.query.path;
      store.state.uploadFileName = file.uploadFileName;
      store.state.uploadMd5 = file.hash;
      sessionStorage.setItem("uploadIndexMax", file.uploadList.length + "");
      sessionStorage.setItem("uploadPath", route.query.path + "");
      sessionStorage.setItem("uploadFileName", file.uploadFileName);
      sessionStorage.setItem("uploadMd5", file.hash);
      await uploadFileUpload();
      if (file.fileUploaded === 1) {
        let res = await net_fileCombined({
          md5: file.hash,
          realName: file.uploadFileRealName,
          name: file.uploadFileName,
          path: route.query.path
        });
        await enterPack();
        store.commit("tip", res);
        file.fileUploaded = 0;
      }
      //清空文件
      document.querySelector('#upload').value = "";
      sessionStorage.removeItem("uploadIndex")
      sessionStorage.removeItem("uploadIndexMax")
      sessionStorage.removeItem("uploadPath");
      sessionStorage.removeItem("uploadFileName");
      sessionStorage.removeItem("uploadMd5");
      store.state.uploadCancel = false;
      store.state.uploadIndexMax = 1;
      store.state.uploadPath = "";
      store.state.uploadFileName = "";
      store.state.uploadMd5 = "";
    }

    let uploadFileUpload = async (index = -1) => {
      index += 1;
      if (index === store.state.uploadIndexMax) {
        file.fileUploaded = 1;
        return 0;
      }
      store.state.uploadIndex = index;
      sessionStorage.setItem("uploadIndex", index + "");
      let uploadData = new FormData();
      uploadData.append("fileName", file.uploadFileRealName);
      uploadData.append("file", file.uploadList[index].raw);
      uploadData.append("index", file.uploadList[index].index);
      uploadData.append("total", file.sliceTotal);
      uploadData.append("md5", file.hash);
      uploadData.append("path", route.query.path + "");
      uploadData.append("name", file.uploadFileName);
      let res = await net_uploadSliceFile(uploadData);
      if (res.code === "200") {
        if (store.state.uploadCancel) {
          return 0;
        }
        await uploadFileUpload(parseInt(res.data))
      } else {
        let res = {
          code: "500",
          message: "上传中断!"
        }
        store.commit("tip", res);
        store.state.uploadInterrupt = true;
      }
    }

    return {
      ...toRefs(fileData),
      ...toRefs(file),
      getType,
      enterPack,
      enterFile,
      backLevel,
      deleteFile,
      onlineFile,
      downFile,
      newMkdir,
      clearType,
      fileParse,
      fileSlice,
      responseFiles,
      clickUpload,
      uploadShareFile
    }
  },
  async created() {
    this.enterPack();
    this.category=(await net_categoryList()).data;
  },
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

.fileStyle {
  font-size: 16px;
  margin-top: 13px;
}
</style>
