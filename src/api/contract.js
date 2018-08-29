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

export function contractSubList(query) {
  return request({
    url: '/contract/subList',
    method: 'get',
    params: query
  })
}

export function createcontractSub(query) {
  return request({
    url: '/contract/insertSub',
    method: 'POST',
    params: query
  })
}

export function createcontractExpnses(params) {
  return request({
    url: '/contract/insertExpnses',
    method: 'POST',
    data: params
  })
}

export function cancleExpnses(params) {
  return request({
    url: '/contract/deleteAttachment',
    method: 'POST',
    data: params
  })
}

export function updateExpnss(params) {
  return request({
    url: '/contract/updateExpnss',
    method: 'POST',
    data: params
  })
}

export function expnsesList(query) {
  return request({
    url: '/contract/queryExpnses',
    method: 'get',
    params: query
  })
}

export function contractAttaList(params) {
  return request({
    url: '/contract/queryAtta',
    method: 'POST',
    data: params
  })
}

export function attaList(query) {
  return request({
    url: '/contract/getReasourse',
    method: 'get',
    params: query
  })
}

export function contractGoodsList(params) {
  return request({
    url: '/contract/contractGoodList',
    method: 'POST',
    data: params
  })
}

export function deleteAtta(params) {
  return request({
    url: '/contract/deleteAtta',
    method: 'POST',
    data: params
  })
}

export function deleteGoods(params) {
  return request({
    url: '/contract/deleteGoods',
    method: 'POST',
    data: params
  })
}

export function deleteContractPay(params) {
  return request({
    url: '/contract/deletePay',
    method: 'POST',
    data: params
  })
}

export function updatePartner(params) {
  return request({
    url: '/contract/updatePartner',
    method: 'POST',
    data: params
  })
}

export function deleteContractPaetenr(params) {
  return request({
    url: '/contract/deletePartner',
    method: 'POST',
    data: params
  })
}

export function contractParList(query) {
  return request({
    url: '/contract/parlist',
    method: 'get',
    params: query
  })
}
