import request from '@/utils/request'

export function getDemo() {
    return request({
        url: '/main/getDemo',
        method: 'get',
    })
}

export function addDemo(data) {
    return request({
        url: '/main/addDemo',
        method: 'post',
        data
    })
}

export function updateDemo(data) {
    return request({
        url: '/main/updateDemo',
        method: 'post',
        data
    })
}

export function deleteDemo(data) {
    return request({
        url: '/main/deleteDemo',
        method: 'post',
        data
    })
}