import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const routes = [
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/Home',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: '/welcome',
        name: 'Welcome',
        component: () => import('../views/Welcome.vue'), //系统欢迎页
      },
      {
        path: '/Stumain',
        name: 'Stumain',
        component: () => import('../views/stuinfo/Stumain.vue'), //系统欢迎页
      },

    ]
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  //to将要访问的路径
  NProgress.start()
  //from代表从那个路径来
  
  //next是一个函数表示放行
  if (to.path == '/Login') return next()
  //获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/Login')
  next()
})
router.afterEach(() => {
  NProgress.done()
})
export default router
