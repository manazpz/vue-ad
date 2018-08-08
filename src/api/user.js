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
