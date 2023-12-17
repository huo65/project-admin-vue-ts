import request from '@/utils/request';
/**
 *
 * 分类管理
 *
 **/

// 查询分类列表接口
export const getReservationsPage = (params: any) => {
  return request({
    url: '/reservations/page',
    method: 'get',
    params
  });
};

// 删除当前列的接口
export const deleReservations = (ids: string) => {
  return request({
    url: '/reservations',
    method: 'delete',
    params: { key:ids }
  });
};

// 修改接口
export const editReservations = (params: any) => {
  return request({
    url: '/reservations',
    method: 'put',
    data: { ...params }
  });
};

// 新增接口
export const addReservations = (params: any) => {
  return request({
    url: '/reservations',
    method: 'post',
    data: { ...params }
  });
};

// 修改---启用禁用接口
export const enableOrDisableEmployee = (params: any) => {
  return request({
    url: `/reservations/status/${params.status}`,
    method: 'post',
    params: { id:params.id }
  })
}
