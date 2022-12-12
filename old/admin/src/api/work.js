import request from '@/utils/request'

export function getWork(title,sort,page,limit) {
    return request({
        url: '/main/homeworkList',
        method: 'get',
        params: title,sort,page,limit
    })
}

export function getWorkById(id) {
    return request({
        url: '/main/homeworkListById',
        method: 'get',
        params: id
    })
}

export function addWork(data) {
    return request({
        url: '/main/addHomeworkList',
        method: 'post',
        data
    })
}

export function updateWork(data) {
    return request({
        url: '/main/updateHomeworkList',
        method: 'post',
        data
    })
}

export function updateArticleWithContent(data) {
    return request({
        url: '/mian/updateArticleWithContent',
        method: 'post',
        data
    })
}

export function deleteWork(data) {
    return request({
        url: '/main/deleteHomeworkList',
        method: 'post',
        data
    })
}