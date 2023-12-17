import request from '@/utils/request'
/**
 *
 * 公交管理
 *
 **/

export const getHotelList = (params: any) => {
  return request({
    url: '/hotels/page',
    method: 'get',
    params
  })
}

// 新增---添加公交
export const addHotel = (params: any) => {
  return request({
    url: '/hotels',
    method: 'post',
    data: { ...params }
  })
}
export const deleteHotel = (Location: string) => {
  return request({
    url: '/dish',
    method: 'delete',
    params: { Location }
  })
}
// 修改---添加公交
export const editHotel = (params: any) => {
  return request({
    url: '/hotels',
    method: 'put',
    data: { ...params }
  })
}

// 修改页面反查详情接口
export const queryHotelById = (id: string | (string | null)[]) => {
  return request({
    url: `/hotels/${id}`,
    method: 'get'
  })
}
