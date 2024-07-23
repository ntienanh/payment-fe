import { Button, Drawer, DrawerProps, Form, FormInstance, Image, Input, message, Switch } from 'antd'
import React from 'react'
import deepEqual from 'deep-equal'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from '../../../apis/axios-client'

interface IDrawerContainerProps extends DrawerProps {
  onClose: any
  open: any
  form: FormInstance<any>
  initValue: any
}

const DrawerContainer = (props: IDrawerContainerProps) => {
  const { onClose, open, form, initValue } = props || {}
  const [disabled, setDisabled] = React.useState(true)
  const queryClient = useQueryClient()

  // Update Mutations
  const updateMutation = useMutation({
    mutationFn: (body: any) => {
      const { id, ...data } = body
      return axios.put(`https://669bab76276e45187d3623e4.mockapi.io/order-query/${id}`, { data })
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['order-query'] })
      message.success(`Update Success ${data.data?.id}`)
    },
    onError: (err) => {
      message.error(`Update Fail - ${err}`)
    }
  })

  const onValuesChange = () => {
    const valueChange = form.getFieldsValue()
    const changeCheck = deepEqual(valueChange, initValue)
    setDisabled(changeCheck)
  }

  const closeAndDisabled = () => {
    onClose()
    setDisabled(true)
  }

  const onFinish = (val: any) => {
    const mergeID = { id: initValue.id, ...val }
    updateMutation.mutate(mergeID)
    closeAndDisabled()
    form.resetFields()
  }

  return (
    <Drawer {...props} onClose={closeAndDisabled} open={open} footer={[]}>
      <Form
        form={form}
        layout="vertical"
        name="basic2"
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onValuesChange={onValuesChange}
        autoComplete="off"
      >
        <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Age" name="age" rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Address" name="address" rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Image" name="image" rules={[{ required: true, message: 'Please input your username!' }]}>
          <Image width={120} src={initValue.image} alt="Image" />
        </Form.Item>

        <Form.Item label="Active" name="active">
          <Switch />
        </Form.Item>

        <Form.Item>
          <Button disabled={disabled} type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  )
}

export default DrawerContainer
