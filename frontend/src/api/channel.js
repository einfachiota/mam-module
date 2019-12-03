
import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/channels',
    method: 'get',
    params
  })
}
