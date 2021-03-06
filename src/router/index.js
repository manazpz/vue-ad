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
      meta: { title: 'dashboard', img: process.env.RESOURCE_URL + '/favicon.jpg', noCache: true }
    }]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/contract',
    component: Layout,
    redirect: '/contract/list',
    meta: {
      title: 'contract',
      icon: 'contract',
      roles: ['AM', 'CN']
    },
    children: [{
      path: 'list',
      component: () => import('@/views/contract/contractList'),
      name: 'contractList',
      meta: { title: 'contractList' }
    },
    {
      path: 'saleList',
      component: () => import('@/views/contract/contractSaleList'),
      name: 'contractSaleList',
      meta: { title: 'contractSaleList', noCache: true }
    },
    {
      path: 'detail',
      component: () => import('@/views/contract/contractDetail'),
      hidden: true,
      name: 'contractDetail',
      meta: { title: 'contractDetail', noCache: true }
    },
    {
      path: 'detailSub',
      component: () => import('@/views/contract/contractSubDetail'),
      hidden: true,
      name: 'contractSubDetail',
      meta: { title: 'contractSubDetail', noCache: true }
    }]
  },

  {
    path: '/goods',
    component: Layout,
    redirect: '/goods/list',
    meta: { roles: ['AM', 'GM'] },
    children: [{
      path: 'list',
      component: () => import('@/views/goods/goodsList'),
      name: 'goodsList',
      meta: { title: 'goodsList', icon: 'goods', noCache: true }
    }]
  },

  {
    path: '/customer',
    component: Layout,
    redirect: '/customer/list',
    meta: {
      title: 'customer',
      icon: 'customer',
      roles: ['AM', 'CM']
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
    alwaysShow: true, // will always show the root menu
    meta: {
      title: 'user',
      icon: 'people',
      roles: ['AM', 'UM']
    },
    children: [{
      path: 'list',
      component: () => import('@/views/user/basic/userList'),
      name: 'userList',
      meta: { title: 'userList' }
    },
    {
      path: 'permissions',
      component: () => import('@/views/user/permission/permissionList'),
      name: 'permissionList',
      meta: { title: 'permissionList' }
    },
    {
      path: 'assignPermissions',
      component: () => import('@/views/user/permission/assignPermissions'),
      hidden: true,
      name: 'assignPermissions',
      meta: { title: 'assignPermissions' }
    },
    {
      path: 'changePwd',
      component: () => import('@/views/user/basic/changePwd'),
      hidden: true,
      name: 'changePwd',
      meta: { title: 'changePwd' }
    },
    {
      path: 'logoUpload',
      component: () => import('@/views/user/basic/logoUpload'),
      name: 'logoUpload',
      meta: { title: 'logoUpload' }
    },
    {
      path: 'delAuditList',
      component: () => import('@/views/user/basic/delAuditList'),
      name: 'delAuditList',
      meta: { title: 'delAuditList' }
    }]
  }
]

