import axios from "axios";
import store from "../store/index"
export const RealBaseUrl="http://localhost:8088";
export function request(config){
  const instance=axios.create({
    // baseURL:'https://blackjun.cn/blackYun',
    baseURL:RealBaseUrl,//需要该文件下载
    method:'post'
  })

  instance.interceptors.request.use(config=>{
    const token = sessionStorage.getItem("token");
    if(config.responseType!=='blob'&&config.url!=='/filePath/upload_slice_file'){
      store.state.loading=true;
    }

    if (token) {
      config.headers['Authorization'] = "Bearer "+token;
      return config
    }
    return config;
  },error => {
    if(error.code==="ERR_NETWORK"){
      store.commit("tip",{code:500,message:"网络请求失败"})
    }else{
      store.commit("tip",{code:500,message:"请求异常"})
    }
    store.state.loading=false;
  })

  instance.interceptors.response.use(res=>{
    store.state.loading=false;
    return res.data;
  },error => {
    if(error.code==="ERR_NETWORK"){
      store.commit("tip",{code:500,message:"网络请求失败"})
    }else{
      store.commit("tip",{code:500,message:"请求异常"})
    }
    store.state.loading=false;
  })

  return instance(config);
}
