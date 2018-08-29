import request from '@/utils/request'

export function customerList(query) {
  return request({
    url: '/customer/droplist',
    method: 'get',
    params: query
  })
}

export function insertCustomer(params) {
  return request({
    url: '/customer/insert',
    method: 'POST',
    data: params
  })
}

export function updateCustomer(params) {
  return request({
    url: '/customer/update',
    method: 'POST',
    data: params
  })
}

export function deleteCustomer(params) {
  return request({
    url: '/customer/delete',
    method: 'POST',
    data: params
  })
}

