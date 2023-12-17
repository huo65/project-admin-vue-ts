import request from '@/utils/request'
/**
 *
 * 用户管理
 *
 **/

export const getCustomersList = (params: any) => {
  return request({
    url: '/customers/page',
    method: 'get',
    params
  })
}

// 新增---添加用户
export const addCustomers = (params: any) => {
  return request({
    url: '/customers',
    method: 'post',
    data: { ...params }
  })
}
export const deleteCustomers = (custname: string) => {
  return request({
    url: '/customers',
    method: 'delete',
    params: { custname }
  })
}
// 修改---添加用户
export const editCustomers = (params: any) => {
  return request({
    url: '/customers',
    method: 'put',
    data: { ...params }
  })
}

// 修改页面反查详情接口
export const queryCustomersById = (id: string | (string | null)[]) => {
  return request({
    url: `/customers/${id}`,
    method: 'get'
  })
}
