import request from '@/utils/request'

export function addTag(data) {
    return request({
        url: '/main/addTag',
        method: 'post',
        data
    })
}

export function updateTag(data) {
    return request({
        url: '/main/updateTag',
        method: 'post',
        data
    })
}