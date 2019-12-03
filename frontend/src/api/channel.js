
import request from '@/utils/request'

export function getChannels(params) {
  return request({
    url: '/channels',
    method: 'get',
    params
  })
}

export function createChannel(params) {
  return request({
    url: '/channels',
    method: 'post',
    params
  })
}

export function createMessage(id, params) {
  return request({
    url: '/channels/' + id,
    method: 'post',
    params
  })
}

