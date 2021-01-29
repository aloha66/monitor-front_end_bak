import React, { useRef, useState } from 'react';
import { PlusOutlined, EllipsisOutlined } from '@ant-design/icons';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { Button, Tag, Space, Menu, Dropdown } from 'antd';
import { useRequest } from 'ahooks';

import request from '@/utils/request';

type GithubIssueItem = {
  url: string;
  id: number;
  isUse: number;
  appName: string;
  labels: {
    name: string;
    color: string;
  }[];
  envType: string;
  creatTime: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
};

const columns: ProColumns<GithubIssueItem>[] = [
  {
    title: '应用名',
    dataIndex: 'appName',
    ellipsis: true,
  },
  {
    title: 'appid',
    dataIndex: 'appid',
    copyable: true,
  },
  {
    title: '环境类型',
    dataIndex: 'envType',
    valueType: 'select',
    valueEnum: {},
    // valueEnum: {
    //   '': { text: '全部', status: 'Default' },
    //   dev: {
    //     text: '开发环境',
    //     // status: 'Error',
    //   },
    //   prod: {
    //     text: '生产环境',
    //     // status: 'Success',
    //     disabled: true,
    //   },
    //   test: {
    //     text: '测试环境',
    //     // status: 'Processing',
    //   },
    // },
  },
  {
    title: '是否启用',
    dataIndex: 'isUse',
    valueType: 'select',

    valueEnum: {
      all: { text: '全部', status: 'Default' },
      0: {
        text: '禁用',
        status: 'Error',
      },
      1: {
        text: '启用',
        status: 'Success',
      },
    },
    render: (_, record) => {
      const isUse = record.isUse === 1;
      return (
        <Space>
          <Tag color={isUse ? 'green' : 'magenta'} key={record.id}>
            {isUse ? '启用' : '禁用'}
          </Tag>
        </Space>
      );
    },
  },
  {
    title: '创建时间',
    key: 'showTime', // 只在table显示,table和form展示的内容不一样,所以需要额外用key确定唯一
    dataIndex: 'creatTime',
    valueType: 'date',
    hideInSearch: true,
  },
  {
    title: '创建时间',
    dataIndex: 'creatTime',
    valueType: 'dateRange',
    hideInTable: true, // 只在form显示
    search: {
      transform: (value) => {
        if (!value) return {};
        return {
          startTime: value[0],
          endTime: value[1],
        };
      },
    },
  },
  {
    title: '操作',
    valueType: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action.reload()}
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' },
        ]}
      />,
    ],
  },
];

const menu = (
  <Menu>
    <Menu.Item key="1">1st item</Menu.Item>
    <Menu.Item key="2">2nd item</Menu.Item>
    <Menu.Item key="3">3rd item</Menu.Item>
  </Menu>
);

interface Obj {
  [key: string]: { [key: string]: any };
}

interface Item {
  label: string;
  value: string | number;
}

function transformOptions(data: Item[]) {
  const obj: Obj = { '': { text: '全部' } };
  data.map((item: Item) => {
    obj[item.value] = { text: item.label };
  });
  return obj;
}

const fetchData = async (params, sort, filter) => {
  console.log('params, sort, filter', params, sort, filter);

  return request({
    url: '/api/getSystemList',
    method: 'get',
    params,
  });
};

function useDynamicColumn(data: any[], flag: string) {
  const [column, setColumn] = useState(data);

  const merge = (newData: Item[]) => {
    setColumn((prev) => {
      const tmp = [...prev];
      const index = tmp.findIndex((item) => item.dataIndex === flag);
      tmp[index].valueEnum = transformOptions(newData);
      return tmp;
    });
  };
  return [column, merge] as const;

  //   const setColumnsState: any[] | ((newData: Item[]) => void)
  // 此表达式不可调用。
  //   "any[] | ((newData: Item[]) => void)" 类型的部分要素不可调用。
  //     类型 "any[]" 没有调用签名。ts(2349)

  // return [column, merge];
}

export default () => {
  console.log(222222222222);
  const actionRef = useRef<ActionType>();
  const [columnsState, setColumnsState] = useDynamicColumn(columns, 'envType');
  const envTypeReq = useRequest('/api/getEnvType', {
    onSuccess({ data }) {
      setColumnsState(data);
    },
  });
  return (
    <>
      <div>
        <h1> config system</h1>
      </div>
      <ProTable<GithubIssueItem>
        columns={columnsState}
        actionRef={actionRef}
        request={fetchData}
        editable={{
          type: 'multiple',
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        form={{
          // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
          syncToUrl: (values, type) => {
            console.log('values, type', values, type);
            if (type === 'get') {
              return {
                ...values,
                created_at: [values.startTime, values.endTime],
              };
            }
            return values;
          },
        }}
        pagination={{
          defaultPageSize: 10,
        }}
        dateFormatter="string"
        headerTitle="高级表格"
        toolBarRender={() => [
          <Button key="button" icon={<PlusOutlined />} type="primary">
            新建
          </Button>,
          <Dropdown key="menu" overlay={menu}>
            <Button>
              <EllipsisOutlined />
            </Button>
          </Dropdown>,
        ]}
      />
    </>
  );
};
