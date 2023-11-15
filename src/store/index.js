// store/index.js

import { createStore } from 'vuex';

export default createStore({
    state: {
        token: null, // 初始时令牌为空
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
        },
        clearToken(state) {
            state.token = null;
        },
    },
    actions: {
        // 在这里添加发送请求验证令牌的逻辑
    },
    getters: {
        isAuthenticated: (state) => !!state.token, // 用于检查用户是否已认证
    }
});
