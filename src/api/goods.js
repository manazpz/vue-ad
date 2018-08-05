import request from '@/utils/request'

export function goodsList(query) {
  return request({
    url: '/goods/list',
    method: 'get',
    params: query
  })
}

