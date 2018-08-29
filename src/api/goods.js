import request from '@/utils/request'

export function goodsList(query) {
  return request({
    url: '/goods/goodslist',
    method: 'get',
    params: query
  })
}
export function createGoods(params) {
  return request({
    url: '/goods/insert',
    method: 'POST',
    data: params
  })
}

export function updateGoods(params) {
  return request({
    url: '/goods/update',
    method: 'POST',
    data: params
  })
}

export function deleteGoods(params) {
  return request({
    url: '/goods/delete',
    method: 'POST',
    data: params
  })
}

export function goodsContract(query) {
  return request({
    url: '/goods/goodslist',
    method: 'get',
    params: query
  })
}
