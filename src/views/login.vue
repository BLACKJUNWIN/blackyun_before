<template>
  <div style="width: 100%;">
    <div style="width:530px;height: 360px;border-radius: 1.5em;position: absolute;margin:auto;left: 0;right: 0;top:0;bottom: 0;cursor: pointer;transition: all .8s" class="file">
      <div style="text-align: center">
        <div style="margin-top: 20px"><img src="@/assets/images/logo.png" style="width:60%"> </div>
      </div>
      <div style="width:75%;margin:30px auto 0 auto">
        <el-form  label-width="80px">
          <el-form-item label="用户名" style="font-weight: bold">
            <el-input name='blackYunName' v-model="name" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密黑码" style="font-weight: bold;margin-top: 30px">
            <el-input type="password" name="blackYunPassword" v-model="password" show-password placeholder="请输入密码"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div style="width:75%;margin:0 auto;display: flex;justify-content: right">
        <el-button type="success" @click="isLogin()" >登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {reactive, toRefs} from "vue";
import {login} from "@/net/user";
import {useStore} from "vuex";
import {useRouter} from "vue-router"
export default {
  name: "login",
  setup(){
    const store=useStore();
    const router=useRouter();
    let user=reactive(
        {
        name: '',
        password: ''
      }
    )
    let isLogin=async ()=>{
      let res='';
      if(user.name===''||user.name===null){
        res={
          code:500,
          message:"未填写云盘名"
        }
      }else if(user.password===''||user.password===null){
        res={
          code:500,
          message:"未填写密黑码"
        }
      }else{
        res=await login({
          name:user.name,
          password:user.password
        })
        if(res.code==="200"){
          sessionStorage.setItem("token",res.data.token);
          await router.push({path: "/more", query: {path: "/"}})
        }else{
          user.name='';
          user.password='';
        }
      }
      store.commit("tip",res);
    }

    return {
      ...toRefs(user),
      isLogin
    }
  }
}
</script>

<style scoped>
.file:hover{
  box-shadow: 0 0 10px rgba(128,128,128,0.8);
}
</style>
