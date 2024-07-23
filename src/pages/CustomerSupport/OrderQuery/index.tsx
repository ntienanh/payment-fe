import { DeleteOutlined, EyeOutlined, SearchOutlined, SettingOutlined } from '@ant-design/icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  Button,
  Checkbox,
  Divider,
  Form,
  FormProps,
  Image,
  message,
  Popconfirm,
  Popover,
  Space,
  Switch,
  TableColumnsType,
  Tooltip
} from 'antd'
import axios from 'axios'
import React from 'react'
import ExcelButton from '../../../components/elements/Buttons/ExcelButton'
import NewCreateButton from '../../../components/elements/Buttons/NewCreateButton'
import DrawerContainer from '../../../components/sections/DrawerContainer'
import ModalContainer from '../../../components/sections/ModalContainer'
import TableContainer from '../../../components/sections/TableContainer'
import { useSearchTable } from '../../../hooks/useSearchTable'

const OrderQueryPage = () => {
  const [form] = Form.useForm()
  const queryClient = useQueryClient()
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [filteredInfo, setFilteredInfo] = React.useState<any>({})
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([])
  const [open, setOpen] = React.useState(false)
  const [initValue, setInitValue] = React.useState({}) as any

  const hasFilter = Object.values(filteredInfo).some((value) => value !== null && value !== undefined)
  const { getColumnSearchProps, searchedColumn } = useSearchTable(hasFilter)

  const columns: TableColumnsType<any> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
      filteredValue: filteredInfo.name || null
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      width: 80,
      ...getColumnSearchProps('age'),
      filteredValue: filteredInfo.age || null
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      ...getColumnSearchProps('address'),
      filteredValue: filteredInfo.address || null
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      width: 160,
      render: (_, record) => <Image width={120} height={40} src={record.image} alt="Image" />
    },
    {
      title: 'Active',
      dataIndex: 'active',
      key: 'active',
      width: 90,
      filterIcon: <SearchOutlined />,
      ...getColumnSearchProps('active'),
      filteredValue: filteredInfo.active || null,
      render: (record) => <Switch disabled value={record?.active} />
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      width: 90,
      align: 'center',
      render: (_: any, record: any) => {
        const { name, age, address, id, image, active } = record

        return (
          <Space size="middle">
            <Button
              onClick={async () => {
                form.setFieldsValue({ name, age, address, image, active })
                setInitValue({ name, age, address, id, image, active })
                showDrawer()
              }}
              size="small"
              type="default"
              icon={<EyeOutlined />}
            />

            <Popconfirm
              title="Are you sure!"
              description={`Delete user ${record?.id}`}
              onCancel={() => null}
              okText="Delete"
              okType="danger"
              cancelText="Cancel"
              onConfirm={() => deleteMutation.mutate(record.id)}
            >
              <Button danger icon={<DeleteOutlined />} size="small" />
            </Popconfirm>
          </Space>
        )
      }
    }
  ]

  //Data query
  const result = useQuery({
    queryKey: ['order-query'],
    queryFn: () => axios.get('https://669bab76276e45187d3623e4.mockapi.io/order-query').then((res) => res.data), // call api
    staleTime: 60,
    gcTime: 120,
    refetchOnWindowFocus: false
  })

  // Create Mutations
  const createMutation = useMutation({
    mutationFn: (data: any) => {
      return axios.post(`https://669bab76276e45187d3623e4.mockapi.io/order-query`, { data })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['order-query'] })
      message.success(`Create Success`)
    },

    onError: (err) => {
      message.error(`Create Fail - ${err}`)
    }
  })

  // Delete Mutations
  const deleteMutation = useMutation({
    mutationFn: (id: any) => {
      return axios.delete(`https://669bab76276e45187d3623e4.mockapi.io/order-query/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['order-query'] })
      message.success(`Delete Success`)
    },
    onError: (err) => {
      message.error(`Delete Fail - ${err}`)
    }
  })

  const showModal = () => {
    form.resetFields()
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    form.resetFields()
  }

  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
    setInitValue({})
  }

  const onFinish: FormProps['onFinish'] = async (data: any) => {
    console.log('daa', data)
    createMutation.mutate(data)
    setIsModalOpen(false)
    form.resetFields()
  }

  const defaultCheckedList = columns.map((item: any) => item.key as string)
  const [checkedList, setCheckedList] = React.useState(defaultCheckedList)

  const newColumns = columns.map((item: any) => ({
    ...item,
    hidden: !checkedList.includes(item.key as string)
  }))

  return (
    <div className="flex flex-col gap-4 !overflow-hidden !w-full">
      <ModalContainer
        form={form}
        title="Create new order query"
        onClose={handleCancel}
        onFinish={onFinish}
        isModalOpen={isModalOpen}
        key={'modal'}
      />

      <DrawerContainer
        title="Detail Order"
        key={'drawer'}
        initValue={initValue}
        form={form}
        onClose={onClose}
        open={open}
      />
      <p className="text-[26px] font-medium">OrderQueryPage</p>

      <div className="flex pb-2 flex-col gap-4 md:flex-row sm:justify-between">
        <div className="flex gap-4">
          <NewCreateButton onClick={showModal}>Add new User</NewCreateButton>

          {selectedRowKeys.length > 0 && (
            <Popconfirm
              placement="rightBottom"
              title="Are you sure!"
              description={`Delete ${selectedRowKeys.length} item`}
              onConfirm={async () => {
                try {
                  const deletePromises = selectedRowKeys.map((key: any) => deleteMutation.mutate(key))
                  await Promise.all(deletePromises)
                } catch (error) {
                  message.error(`Cannot delete: ${error}`)
                }

                setSelectedRowKeys([])
              }}
              onCancel={() => null}
              okText="Delete"
              okType="danger"
              cancelText="Cancel"
            >
              <Button danger>Delele {selectedRowKeys.length} item</Button>
            </Popconfirm>
          )}

          {hasFilter && (
            <Button danger onClick={() => setFilteredInfo({})}>
              <span className="font-medium">CLEAR</span>- by {searchedColumn}
            </Button>
          )}
        </div>

        <div className="flex gap-4">
          <ExcelButton>Excel</ExcelButton>
          <ExcelButton>SVN</ExcelButton>

          <Tooltip title="Display settings">
            <Popover
              content={
                <>
                  <Divider className="!mb-2 !mt-2" />
                  {columns.map((item: any) => (
                    <div key={item.title} className="flex gap-2">
                      <Checkbox
                        key={item.title}
                        name={item.label}
                        disabled={['Action', 'ID', 'Name'].includes(item.title)}
                        onChange={() => {
                          if (checkedList.includes(item.key)) {
                            setCheckedList(checkedList.filter((key: any) => key !== item.key))
                          } else {
                            setCheckedList([...checkedList, item.key])
                          }
                        }}
                      />

                      <p>{item.title}</p>
                    </div>
                  ))}
                </>
              }
              arrowContent
              placement="bottomRight"
              title="Hidden fields"
              trigger="click"
            >
              <Button shape="round" icon={<SettingOutlined />} className="!h-[32px] !w-[32px] !rounded" />
            </Popover>
          </Tooltip>
        </div>
      </div>

      <TableContainer
        loading={result.isLoading || result.isFetching || result.isRefetching}
        dataSource={result.data}
        columns={newColumns}
        rowKey={(item: any) => item?.id}
        onChange={(_pagination: any, filters: any) => setFilteredInfo(filters)}
        rowSelection={{
          type: 'checkbox',
          onChange: (selectedRowKeys) => setSelectedRowKeys(selectedRowKeys),
          selectedRowKeys: selectedRowKeys
        }}
        scroll={{ x: 1000, y: 320 }}
        expandable={{
          expandedRowRender: (record) => (
            <div className="flex gap-6">
              <div className="flex flex-col gap-2 *:line-clamp-1">
                <p>{record.name}</p>
                <p>{record.age}</p>
                <p>{record.address}</p>
                <Switch value={record.active} disabled className="self-baseline" />
              </div>

              <Image width={200} src={record.image} />
            </div>
          ),
          rowExpandable: (record) => record.name !== 'Not Expandable',
          fixed: 'left'
        }}
      />
    </div>
  )
}

export default OrderQueryPage
