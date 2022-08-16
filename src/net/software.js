import {request} from "@/net/request";

export function net_softwareList(){
    return request({
        url:"/software/",
        method:"get",

    })

}