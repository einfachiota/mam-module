
import request from '@/utils/request'

export function getChannels(params) {
  return request({
    url: '/channels',
    method: 'get',
    params
  })
}

export function createChannel(data) {
  return request({
    url: '/channels',
    method: 'post',
    data
  })
}

export function createMessage(id, data) {
  return request({
    url: '/channels/' + id,
    method: 'post',
    data
  })
}

