<template>
  <div>
    <div style="text-align: center;">
      <br/>
      <img :src="info.avatar" alt="头像" style="width:160px;"/>
      <br/>
      <br/>
      <div>
        <strong style="background-color: #61b3ec;padding:5px 10px;border-radius: .5em;color: white;position:relative;top:-3px">{{info.role==="admin"?"管理员":"用户"}}</strong>&nbsp
        <strong style="font-size:30px">{{info.name}}</strong>
      </div>
      <br/>
      <div style="width:80%;margin:0 auto">
        <hr/>
        <br/>
        <div style="display: flex;justify-content: space-between" v-if="info.name">
          <div style="flex:1;text-align: left">
            <div style="background-image: linear-gradient(to top, #48c6ef 0%, #6f86d6 100%);width: 100px;height: 50px;border-radius: 1.3em;margin:0 auto;text-align: center">
              <strong style="line-height: 50px;color: white;font-size: 20px;">基础信息</strong>
            </div>
            <div style="margin:25px 20%">
              <strong>当前容量:</strong> {{info.memory/1024/1024}}GB
              <el-progress :percentage="info.memory/1024/1024/50*100"/>
            </div>
            <div style="margin:25px 20%">
              <strong>当前最高速度:</strong> {{info.speed/1024}}Mbps/s
              <el-progress :percentage="info.speed/1024/5*100"/>
            </div>
            <div style="margin:25px 20%">
              <strong>当前最大类型文件:</strong> 500MB
              <el-progress :percentage="100"/>
            </div>
            <div style="margin:25px 20%">
              <strong>VIP等级:</strong> {{info.vip}}级
              <el-progress :percentage="info.vip*10"/>
            </div>
          </div>
          <div style="flex:1">
            <div style="background-image: linear-gradient(120deg, #f6d365 0%, #fda085 100%);width: 100px;height: 50px;border-radius: 1.3em;margin:0 auto">
              <strong style="line-height: 50px;color: white;font-size: 20px">VIP{{info.vip}}</strong>
            </div>
            <br/>
            <div style="margin-bottom: 10px"><strong>拥有以下权限</strong></div>
            <hr/>
            <br/>
            <div style="display: flex">
              <div class="userRole" title="1Mbps/s的下载速度">
                <div style="background-image: linear-gradient(120deg, #f6d365 0%, #fda085 100%);width: 50px;height: 50px;border-radius: 50%;margin:0 auto">
                  <strong style="line-height: 50px;color: white;font-size: 16px">{{info.speed/1024}} M</strong>
                </div>
                <div style="margin-top: 6px;font-weight: bold">{{info.speed/1024}}M速度</div>
              </div>
              <div class="userRole" title="部分文件秒传">
                <div style="background-image: linear-gradient(120deg, #f6d365 0%, #fda085 100%);width: 50px;height: 50px;border-radius: 50%;margin:0 auto">
                  <strong style="line-height: 50px;color: white;font-size: 16px">秒</strong>
                </div>
                <div style="margin-top: 6px;font-weight: bold">秒传</div>
              </div>
              <div class="userRole" title="1G的总容量">
                <div style="background-image: linear-gradient(120deg, #f6d365 0%, #fda085 100%);width: 50px;height: 50px;border-radius: 50%;margin:0 auto">
                  <strong style="line-height: 50px;color: white;font-size: 16px">{{info.memory/1024/1024}} G</strong>
                </div>
                <div style="margin-top: 6px;font-weight: bold">{{info.memory/1024/1024}}GB容量</div>
              </div>
              <div class="userRole" title="支持部分文件在线预览">
                <div style="background-image: linear-gradient(120deg, #f6d365 0%, #fda085 100%);width: 50px;height: 50px;border-radius: 50%;margin:0 auto">
                  <strong style="line-height: 50px;color: white;font-size: 16px">预</strong>
                </div>
                <div style="margin-top: 6px;font-weight: bold">在线预览</div>
              </div>
            </div>
            <br/>
            <div style="display: flex">
              <div class="userRole" title="支持500MB以内文件上传">
                <div style="background-image: linear-gradient(120deg, #f6d365 0%, #fda085 100%);width: 50px;height: 50px;border-radius: 50%;margin:0 auto">
                  <strong style="line-height: 50px;color: white;font-size: 16px">500M</strong>
                </div>
                <div style="margin-top: 6px;font-weight: bold">500MB上传</div>
              </div>
              <div class="userRole" title="删除文件预留30天">
                <div style="background-image: linear-gradient(120deg, #f6d365 0%, #fda085 100%);width: 50px;height: 50px;border-radius: 50%;margin:0 auto">
                  <strong style="line-height: 50px;color: white;font-size: 16px">回</strong>
                </div>
                <div style="margin-top: 6px;font-weight: bold">文件找回</div>
              </div>
              <div class="userRole" title="功能正在升级中...">
                <div style="background-image: linear-gradient(120deg, #f6d365 0%, #fda085 100%);width: 50px;height: 50px;border-radius: 50%;margin:0 auto">
                  <strong style="line-height: 50px;color: white;font-size: 16px">新</strong>
                </div>
                <div style="margin-top: 6px;font-weight: bold">未完待续</div>
              </div>
              <div class="userRole" :title="info.vip==='10'?'您已经是最高等级了!':'升级到vip'+(info.vip+1)">
                <el-button type="success" style="width: 50px;height: 50px;border-radius: 50%;font-weight: bold" :disabled="info.vip==='10'">升级</el-button>
                <div style="margin-top: 6px;font-weight: bold;">升级vip</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {net_userInfo} from "@/net/user";
import {reactive, toRefs} from "vue";

export default {
  name: "mine",
  setup(){
    let user=reactive({
      info:{}
    })

    let getInfo=async ()=>{
      user.info =(await net_userInfo()).data;
    }

    return {
      ...toRefs(user),
      user,
      getInfo
    }
  },
  async created(){
    this.getInfo();
  }
}
</script>

<style scoped>
.userRole{
  flex:1;
  cursor: pointer;
}
</style>