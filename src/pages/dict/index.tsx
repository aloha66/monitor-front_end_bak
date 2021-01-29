import React, { useRef, useState } from 'react';
import { Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable, { EditableProTable } from '@ant-design/pro-table';
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormDateRangePicker,
  ProFormSelect,
} from '@ant-design/pro-form';
import { getDictList, getSubDictList, DictData, createDict } from '@/api/dict';
import { useRequest } from 'ahooks';

const columns: ProColumns<DictData>[] = [
  {
    title: '字典code',
    dataIndex: 'code',
    editable: false,
  },
  {
    title: '字典名称',
    dataIndex: 'name',
  },
  {
    title: '字典值',
    dataIndex: 'value',
  },
  {
    title: '创建时间',
    key: 'showTime', // 只在table显示,table和form展示的内容不一样,所以需要额外用key确定唯一
    dataIndex: 'creatTime',
    valueType: 'date',
    hideInSearch: true,
    editable: false,
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
    width: 164,
    key: 'option',
    valueType: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action.startEditable?.(record.code);
        }}
      >
        编辑
      </a>,
    ],
  },
];

const expandedRowRender = ({ code }: any) => {
  console.log('props', code);

  return (
    <EditableProTable
      request={() => getSubDictList(code)}
      columns={columns}
      rowKey="code"
      recordCreatorProps={{
        record: () => ({ code: ' ' }),
      }}
    />
  );
};

export default () => {
  const actionRef = useRef<ActionType>();
  const addRequest = useRequest((data) => createDict(data), { manual: true });

  const AddForm = () => (
    <ModalForm<{
      name: string;
      company: string;
    }>
      title="新建父字典"
      trigger={
        <Button type="primary">
          <PlusOutlined />
          新建父字典
        </Button>
      }
      modalProps={{
        onCancel: () => console.log('onCancel'),
      }}
      onFinish={async (values) => {
        const result = await addRequest.run(values);
        message.success('提交成功');
        return true;
      }}
    >
      <ProForm.Group>
        <ProFormText
          width="md"
          name="name"
          label="	字典名称"
          tooltip="最长为 24 位"
          placeholder="请输入字典名称"
        />
        <ProFormText
          width="md"
          name="value"
          label="字典值"
          placeholder="请输入字典值"
        />
      </ProForm.Group>
    </ModalForm>
  );
  return (
    <ProTable<DictData>
      actionRef={actionRef}
      columns={columns}
      request={getDictList}
      rowKey="code"
      pagination={{
        defaultPageSize: 10,
      }}
      expandable={{ expandedRowRender }}
      dateFormatter="string"
      headerTitle="字典管理"
      toolBarRender={() => [<AddForm />]}
    />
  );
};
