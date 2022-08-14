import {request} from "@/net/request";

export function showPack(data){
    return request({
        url:"/filePath/show_pack",
        method:"post",
        data
    })
}

export function removeFilePath(id){
    return request({
        url:"/filePath/"+id,
        method:"delete"
    })
}

export function net_newMkdir(data){
    return request({
        url:'/filePath/new_mkdir',
        method:'post',
        data
    })
}

export function net_uploadSliceFile(data){
    return request({
        url:'/filePath/upload_slice_file',
        method:'post',
        data
    })
}

export function net_fileExist(data){
    return request({
        url:"/filePath/file_exist",
        method:"post",
        data
    })
}

export function net_fileCombined(data){
    return request({
        url:"/filePath/file_combined",
        method:"post",
        data
    })
}
export function net_uploadCancel(data){
    return request({
        url:"/filePath/upload_cancel?fileName="+data,
        method:"get",
    })
}

export function net_categoryList(){
    return request({
        url:"/category/",
        method:"get"
    })
}

export function net_shareFile(data){
    return request({
        url:"/software/",
        method:"post",
        data
    })
}
