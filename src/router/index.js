import { createRouter, createWebHistory } from 'vue-router'
import store from "../store"
const routes = [
  {
    path: '/',
    redirect:"/home",
  },
  {
    path: '',
    redirect:"/home",
  },
  {
    path: '/home',
    name: '首页',
    meta:{
      needToken:false
    },
    component: ()=>import("@/views/home")
  },
  {
    path:'/more',
    name:'网盘',
    meta:{
      needToken: true
    },
    component:()=>import("@/views/more")
  },
  {
    path:'/login',
    meta:{
      needToken:false
    },
    component: ()=>import("@/views/login")
  },
  {
    path:'/simple',
    meta:{
      needToken: false
    },
    component: ()=>import("@/views/simple")
  },
  {
    path:'/mine',
    meta:{
      needToken: true
    },
    component: ()=>import("@/views/mine")
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,from,next)=>{
  if(to.meta.needToken){
    if(sessionStorage.getItem("token")){
      return next();
    }else{
      store.commit("tip",{code:500,message:"请先登录"})
      return next({path:"/login"})
    }
  }else{
    return next();
  }
})

export default router
