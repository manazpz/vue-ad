import request from '@/utils/request'

export function contractList(query) {
  return request({
    url: '/contract/list',
    method: 'get',
    params: query
  })
}

export function createContract(params) {
  return request({
    url: '/contract/insert',
    method: 'POST',
    data: params
  })
}

export function updateContract(params) {
  return request({
    url: '/contract/update',
    method: 'POST',
    data: params
  })
}

export function deleteContract(params) {
  return request({
    url: '/contract/delete',
    method: 'POST',
    data: params
  })
}

export function getContract(params) {
  return request({
    url: '/contract/queryPartner',
    method: 'POST',
    data: params
  })
}

export function createContractPartner(params) {
  return request({
    url: '/contract/insertPartner',
    method: 'POST',
    data: params
  })
}
