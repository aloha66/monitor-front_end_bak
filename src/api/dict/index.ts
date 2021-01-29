import request from '@/utils/request';

export function getDictList(params: any) {
  return request({
    url: '/api/getDictList',
    method: 'get',
    params,
  });
}

export function getSubDictList(code: string) {
  return request({
    url: '/api/getSubDictList/' + code,
    method: 'get',
  });
}

export type DictData = {
  code: string;
  name?: string;
  value?: string;
  creatTime?: string;
};

export function createDict(data: DictData) {
  return request({
    url: '/api/v1/createDict',
    method: 'post',
    data,
  });
}
