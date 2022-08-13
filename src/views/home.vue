<template>
  <div style="min-height:650px;position: relative;top:50px;" :style="boxStyle">
    <div style="text-align: center;font-size: 40px;letter-spacing: 15px;"><strong>黑盘不<strong
        style="color: white;background-color: black;letter-spacing: normal;padding:5px 10px;border-radius: .3em">黑</strong>&nbsp;&nbsp;只为初心</strong>
    </div>
    <div style="text-align: center;font-size: 16px;color: #a7adad;margin-top:2%"><strong>在线免费云盘,不限制网速,支持大部分文件在线预览,文件上传下载,1~5M/基本上传下载速度.</strong>
    </div>
    <div style="width:60%;height:70%;margin:2% auto 20px auto;box-shadow: 0 0 8px rgba(128,128,128,0.8);border-radius: 1.5em;z-index: 10;min-width: 750px">
      <div style="margin:0 auto;width:300px;height: 150px;position:relative;transform:translateY(-50%);top:50%">
        <el-button type="primary" style="width:300px;height: 150px;border-radius: 1em;font-size: 28px;font-weight: bold" @click="clickUpload()">
          <el-icon style="vertical-align: middle">
            <Promotion />
          </el-icon>
          <span style="vertical-align: middle">文件上传</span>
        </el-button>
        <div style="margin-top:20px;font-size: 16px;font-weight: bold;color: grey;text-align: center">
          <el-icon style="vertical-align: middle;width:20px;position: relative;top:-1px">
            <InfoFilled />
          </el-icon>
          文件会被放入临时文件夹
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {reactive, toRefs, watch} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {InfoFilled,Promotion} from "@element-plus/icons"

export default {
  name: "home",
  components:{
    InfoFilled,
    Promotion
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    let file = reactive({
      boxStyle: "",
    })

    //上传按钮流程管理器
    let clickUpload = () => {
      if (sessionStorage.getItem("token")) {//如果登录,直接上传
        router.push({path:"/more",query:{path:"/temp/"}})
      } else {//否则,进入登录界面
        store.commit("tip", {code: 500, message: "请先登录"})
        router.push("/login")
      }
    }

    //页面美化,防止元素重叠
    watch(() => store.state.clientHeight, (newData, oldData) => {
      file.boxStyle = "height:" + (newData - 230) + "px";
    })

    return {
      file,
      ...toRefs(file),
      clickUpload,
    }
  },
  mounted() {
    const store = useStore();
    this.boxStyle = "height:" + (store.state.clientHeight - 230) + "px";
  }
}
</script>

<style scoped>

</style>
