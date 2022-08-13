<template>
  <div v-loading="$store.state.loading">
    <tab/>
    <div :style="fullHeight" style="position: relative">
      <router-view/>
    </div>
    <bottom/>
    <speed-tip/>
  </div>
</template>

<script>
import tab from "@/components/tab";
import bottom from "@/components/bottom";
import {ref} from "vue";
import {useStore} from "vuex";
import speedTip from "@/components/speedTip";

export default {
  name: "app",
  components:{
    tab,
    bottom,
    speedTip
  },
  setup(){
    let fullHeight=ref("min-height:0");
    return {
      fullHeight
    }
  },
  mounted() {
    const store=useStore();
    store.state.clientHeight=document.documentElement.clientHeight;
    this.fullHeight="min-height:"+(store.state.clientHeight-181)+"px";
    //监听页面变化
    window.onresize=()=>{
      store.state.clientHeight=document.documentElement.clientHeight;
      //让bottom保持在页面最下端
      this.fullHeight="min-height:"+(store.state.clientHeight-181)+"px";
    }
  }
}
</script>

<style>
@import "assets/css/base.css";
</style>
