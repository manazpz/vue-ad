import request from '@/utils/request'

export function refreshToken(refreshToken) {
  return request({
    url: '/sys/refreshToken',
    method: 'post',
    data: { refreshToken }
  })
}

export function getConfig(query) {
  return request({
    url: '/config/list',
    method: 'get',
    params: query
  })
}

export function userList(query) {
  return request({
    url: '/user/list',
    method: 'get',
    params: query
  })
}

export function insertUser(params) {
  return request({
    url: '/user/insert',
    method: 'POST',
    data: params
  })
}

export function updateUser(params) {
  return request({
    url: '/user/update',
    method: 'POST',
    data: params
  })
}

export function deleteUser(params) {
  return request({
    url: '/user/delete',
    method: 'POST',
    data: params
  })
}

export function userCustomerList(query) {
  return request({
    url: '/user/customerlist',
    method: 'get',
    params: query
  })
}

export function updatePwd(data) {
  return request({
    url: '/password/update',
    method: 'post',
    data: data
  })
}

export function permissionList(query) {
  return request({
    url: '/user/permissions',
    method: 'get',
    params: query
  })
}

export function insertPermission(params) {
  params.isEnable = params.isEnable ? 'Y' : 'N'
  return request({
    url: '/user/permission/insert',
    method: 'POST',
    data: params
  })
}

export function updatePermission(params) {
  params.isEnable = params.isEnable ? 'Y' : 'N'
  return request({
    url: '/user/permission/update',
    method: 'POST',
    data: params
  })
}

export function userPermission(query) {
  if (!query) return null
  return request({
    url: '/user/permissions/' + query,
    method: 'get'
  })
}

export function allotUserPermission(params) {
  return request({
    url: '/user/permission/allot',
    method: 'POST',
    data: params
  })
}

export function changePwd(params, flag) {
  if (flag) {
    return request({
      url: '/sys/changePwd',
      method: 'POST',
      data: params
    })
  } else {
    return request({
      url: '/sys/resetPwd',
      method: 'POST',
      data: params
    })
  }
}

