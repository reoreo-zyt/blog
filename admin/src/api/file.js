import request from '@/utils/request'

export function createBucket(bucketName) {
    return request({
        url: '/file/CreateBucket',
        method: 'post',
        params: bucketName,
    })
}

export function changePolice(bucketName) {
    return request({
        url: '/file/ChangePolice',
        method: 'post',
        params: bucketName,
    })
}

export function fileUpload(bucketName,path,title) {
    return request({
        url: '/file/fileUpload',
        method: 'post',
        params: bucketName, path, title,
        headers: { 'Content-Type': 'multipart/form-data' },
    })
}

// TODO: 本地上传
export function fileUploadLocal(data) {
    return request({
        url: 'http://localhost:5200/cors/file/fileUploadLocal',
        method: 'post',
        data,
        headers: { 'Content-Type': 'multipart/form-data' },
    })
}
