import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/errorPage/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      name: 'dashboard',
      meta: { title: 'dashboard', img: 'favicon.ico', noCache: true }
    }]
  },

  {
    path: '/goods',
    component: Layout,
    redirect: '/goods/list',
    children: [{
      path: 'list',
      component: () => import('@/views/goods/goodsList'),
      name: 'goodsList',
      meta: { title: 'goodsList', icon: 'documentation', noCache: true }
    }]
  },

  {
    path: '/customer',
    component: Layout,
    redirect: '/customer/list',
    meta: {
      title: 'customer',
      icon: 'documentation'
    },
    children: [{
      path: 'list',
      component: () => import('@/views/customer/customerList'),
      name: 'customerList',
      meta: { title: 'customerList' }
    },
    {
      path: 'edit',
      component: () => import('@/views/customer/customerEdit'),
      name: 'customerEdit',
      meta: { title: 'customerEdit' }
    }]
  },

  {
    path: '/user',
    component: Layout,
    redirect: '/user/list',
    meta: {
      title: 'user',
      icon: 'documentation'
    },
    children: [{
      path: 'list',
      component: () => import('@/views/user/basic/userList'),
      name: 'userList',
      meta: { title: 'userList', icon: 'documentation' }
    }]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
