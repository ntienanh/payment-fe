import { PlusOutlined } from '@ant-design/icons'
import {
  Button,
  Col,
  Form,
  FormInstance,
  GetProp,
  Input,
  message,
  Modal,
  ModalProps,
  Row,
  Switch,
  Upload,
  UploadProps
} from 'antd'
import React from 'react'

interface IModalContainerProps extends ModalProps {
  isModalOpen: boolean | undefined
  form: FormInstance<any>
  onClose: any
  onFinish: any
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result as string))
  reader.readAsDataURL(img)
}

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG/JPG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }

  return isJpgOrPng && isLt2M
}

const ModalContainer = (props: IModalContainerProps) => {
  const { onClose, onFinish, isModalOpen, form, ...rest } = props || {}
  const [imageUrl, setImageUrl] = React.useState<string>()

  const handleChange: UploadProps['onChange'] = (info) => {
    getBase64(info.file.originFileObj as FileType, (url) => {
      setImageUrl(url)
    })
  }

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  )

  return (
    <Modal
      title="Basic Modal"
      open={isModalOpen}
      {...rest}
      onCancel={() => {
        onClose()
        setImageUrl('')
      }}
      footer={[]}
    >
      <Form
        form={form}
        layout="vertical"
        name="basic"
        style={{ maxWidth: 600 }}
        initialValues={{ active: false }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your username!' }]}>
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Age" name="age" rules={[{ required: true, message: 'Please input your username!' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Form.Item label="Active" name="active" valuePropName="checked">
            <Switch />
          </Form.Item>

          <Col span={24} className="flex">
            <Form.Item label="Image" name="image" valuePropName="avatar">
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader !overflow-hidden"
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
              </Upload>
            </Form.Item>

            {imageUrl && (
              <Button danger onClick={() => setImageUrl('')} className="!self-end mb-6 ml-4 gap-4">
                Clear
              </Button>
            )}
          </Col>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </Modal>
  )
}

export default ModalContainer
