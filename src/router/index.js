import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'
import changePassword from '@/pages/changePassword'
import index from '@/pages/index'

Vue.use(Router)

export default new Router({
  routes: [
      {
          path: '/',
          redirect: '/login'
      },
      {
        path: '/login',
        name: '登陆',
        component: Login
      },
      {
          path: '/changePassword',
          name: '修改密码',
          component: changePassword
      },
      {
          path: '/index',
          name: '首页',
          component: index
      },
  ]
})
