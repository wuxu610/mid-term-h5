import axios from './axios'
const getArticleCatAll = () => {
    return axios.request({
        url: 'api/articleCat/all',
        method: 'get',
    })
}
const getArticlesAll = (data) => {
    return axios.request({
        url: 'api/article/all',
        method: 'get',
        data
    })
}
const getArticleCatById = (userId) => {
    return axios.request({
        url: '/api/articleCat/one?id=' + userId,
        method: 'get',
    })
}

const getArticleCatByUserId = (userId) => {
    return axios.request({
        url: '/api/article/getArticles/' + userId,
        method: 'get',
    })
}
const getArticleOne = (data) => {
    return axios.request({
        url: '/api/article/one?id=' + data.id,
        method: 'get',
        data
    })
}
export {
    getArticleCatAll,
    getArticlesAll,
    getArticleCatByUserId,
    getArticleCatById,
    getArticleOne
}