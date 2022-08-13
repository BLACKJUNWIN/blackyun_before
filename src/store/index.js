import { createStore } from 'vuex'
import {ElNotification} from "element-plus";

export default createStore({
  state: {
    //页面是否加载
    loading:false,
    //页面高度,
    clientHeight:0,
    //文件上传进度
    uploadIndex:0,
    //文件上传总进度
    uploadIndexMax:1,
    //文件md5码
    uploadMd5:"",
    //文件名
    uploadFileName:"",
    //文件上传的路径
    uploadPath:"",
    uploadCancel:false,
    uploadInterrupt:false,
  },
  mutations: {
    tip(state,res) {
      if (res.code === "200") {
        ElNotification({
          title: "成功",
          message: "操作成功",
          type: 'success'
        });
      }else if(res.code ==="201"){
        ElNotification({
          title: "成功",
          message: res.message,
          type: 'success'
        });
      } else {
        ElNotification({
          title: "出现问题",
          message: res.message,
          type: 'warning'
        });
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
