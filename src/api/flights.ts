import request from '@/utils/request'
/**
 *
 * 航班管理
 *
 **/

export const getFlightsList = (params: any) => {
  return request({
    url: '/flights/page',
    method: 'get',
    params
  })
}

// 新增---添加航班
export const addFlights = (params: any) => {
  return request({
    url: '/flights',
    method: 'post',
    data: { ...params }
  })
}
export const deleteFlights = (Flightnum: string) => {
  return request({
    url: '/dish',
    method: 'delete',
    params: { Flightnum }
  })
}
// 修改---添加航班
export const editFlights = (params: any) => {
  return request({
    url: '/flights',
    method: 'put',
    data: { ...params }
  })
}

// 修改页面反查详情接口
export const queryFlightsById = (id: string | (string | null)[]) => {
  return request({
    url: `/flights/${id}`,
    method: 'get'
  })
}
