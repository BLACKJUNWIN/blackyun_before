<template>
  <div style="width:100%;height:80px;box-shadow: 0 2px 5px rgba(128,128,128,0.5);text-align: center">
    <div style="display: inline-block;width: auto;height: 80px;">
      <div style="display: flex;">
        <div @click="$router.push('/home');index=0" style="cursor: pointer">
          <img src="@/assets/images/logo.png" style="height: 60px;margin-top:8px" title="BlackYun">
        </div>
        <div style="margin-left: 100px;font-size: 20px">
          <ul id="headers" style="display: flex;list-style: none;line-height: 80px">
            <li :class="{isActive:index===1}" title="黑盘" @click="recordingIndex(1,{path:'/more',query:{path:'/'}})">黑盘</li>
            <li :class="{isActive:index===2}" title="极简" @click="recordingIndex(2,'/simple')">极简</li>
            <li :class="{isActive:index===3}" title="BlackJun" @click="toBlackJun">BlackJun</li>
            <li :class="{isActive:index===4}" title="我的" @click="recordingIndex(4,'/mine')">我的</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";
import {useRouter} from "vue-router";

export default {
  name: "tab",
  setup(){
    const router=useRouter();
    let index=ref(0);

    let recordingIndex=(changeIndex,route)=>{
      index.value=changeIndex;
      router.push(route);
      sessionStorage.setItem("tabIndex",index.value+"");
    }

    let toBlackJun=()=>{
      window.open('https://blackjun.cn');
    }

    return {
      index,
      toBlackJun,
      recordingIndex
    }
  },
  created(){
    let oldIndex = sessionStorage.getItem("tabIndex");
    if(oldIndex){
      this.index=parseInt(oldIndex);
    }
  }
}
</script>

<style>
#headers li{
  display: inline-block;
  padding: 0 20px;
  font-weight: bold;
  cursor: pointer;
  transition: all .6s;
  font-size: 23px;
}
#headers li:hover{
  color: #83c5f3;
}
.isActive{
  color: #83c5f3;
}
</style>