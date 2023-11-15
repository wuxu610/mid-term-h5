import axios from './axios'
const login = (data) => {
    return axios.request({
        url: 'api/mobile/elogin',//api/mobile/elogin
        method: 'post',
        data
    })
}
const register = (data) => {
    return axios.request({
        url: 'api/mobile/eregister',
        method: 'post',
        data
    })
}
//导出请求方法
export {
    login, register
}
