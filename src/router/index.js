//route 访问路径，路由
//router 路由管理者
import { createRouter, createWebHashHistory } from 'vue-router';// 创建路由实例并传递 `routes` 配置const router = createRouter({// 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
//创建路由 route

import Login from "@/views/lyl-login.vue"
import Register from "@/views/lyl-register.vue"
import Index from "@/views/lyl-users/lyl-index.vue"
import ArticleList from "@/views/lyl-article/lyl-article-list.vue"
import ArticleIndex from "@/views/lyl-article/lyl-article-index.vue"

const routes = [
  { path: '/', component: Login },
  { path: '/login', name: "login", component: Login },
  { path: '/register', name: "register", component: Register },
  { path: '/index', name: "index", component: Index },
  { path: '/article/list', name: "article-list", component: ArticleList },
  { path: '/article/index', name: "article-index", component: ArticleIndex },
]
//创建路由管理 router
const router = createRouter({// 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes,
}
);

//路由全局守卫
//授权
//权限
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('auth_token'); // 从本地存储中获取令牌

  if (to.name !== 'login' && to.name !== 'register' && to.name !== 'retrieve' && !token) {
    next({ name: 'login' });
  } else {
    next();
  }
});
//导出路由
export default router