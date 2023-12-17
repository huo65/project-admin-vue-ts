import request from '@/utils/request'
/**
 *
 * 公交管理
 *
 **/

export const getBusList = (params: any) => {
  return request({
    url: '/bus/page',
    method: 'get',
    params
  })
}

// 新增---添加公交
export const addBus = (params: any) => {
  return request({
    url: '/bus',
    method: 'post',
    data: { ...params }
  })
}
export const deleteBus = (Location: string) => {
  return request({
    url: '/bus',
    method: 'delete',
    params: { Location }
  })
}
// 修改---添加公交
export const editBus = (params: any) => {
  return request({
    url: '/bus',
    method: 'put',
    data: { ...params }
  })
}

// 修改页面反查详情接口
export const queryBusById = (id: string | (string | null)[]) => {
  return request({
    url: `/bus/${id}`,
    method: 'get'
  })
}
