import {request} from "@/net/request";

export function login(data){
    return request({
        url:"/user/login",
        method:"post",
        data
    })
}

export function net_userInfo(){
    return request({
        url:"/user/",
        method:"get"
    })
}
