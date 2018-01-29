import Vue from 'vue'
import Router from 'vue-router'
import MainLayout from '@/views/MainLayout'
import Dashboard from '@/views/Dashboard'
import Terminal from '@/views/Terminal'
import Desktop from '@/views/Desktop'
import Log from '@/views/Log'
import TerminalDetail from '@/views/TerminalDetail'
import DesktopDetail from '@/views/DesktopDetail'
import Login from '@/views/Login'
import Error from '@/views/error'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/monitor/',
  routes: [
    {
      path: '/index.html',
      hidden: true,
      redirect: '/login'
    },
    {
      path: '/',
      name: '全部',
      component: MainLayout,
      iconCls: 'fa fa-cloud',
      leaf: true,
      meta: {
        requireAuth: true
      },
      redirect: '/login',
      children: [
        {path: '/login', component: Login, name: '登录'},
        {path: '/dashboard', component: Dashboard, name: '总览'},
        {path: '/terminal', component: Terminal, name: '终端'},
        {path: '/desktop', component: Desktop, name: '桌面'},
        {path: '/log', component: Log, name: '日志'},
        {path: '/terminal/detail/:id', component: TerminalDetail, name: '终端详情'},
        {path: '/desktop/detail/:id', component: DesktopDetail, name: '桌面详情'}
      ]
    },
    {
      path: '/error/:code',
      name: 'error',
      hidden: true,
      component: Error
    },
    {
      path: '*',
      hidden: true,
      redirect: {path: '/error/404'}
    }
  ]
})
