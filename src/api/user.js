import request from '@/utils/request'

export function refreshToken(refreshToken) {
  return request({
    url: '/sys/refreshToken',
    method: 'post',
    data: { refreshToken }
  })
}
