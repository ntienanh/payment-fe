import { ClockCircleOutlined, ShareAltOutlined, CloudDownloadOutlined } from '@ant-design/icons'
import { Button, Divider, Form, Input, Select } from 'antd'
import { useLocation } from 'react-router-dom'
import React from 'react'

const QueryDeposit = () => {
  const { state } = useLocation()
  const [form] = Form.useForm()

  React.useEffect(() => {
    console.log('state', state)
  }, [state])

  if (!state) return <p>Nothing...</p>

  return (
    <div className="flex bg-gradient-to-t from-cyan-100 to-blue-400 justify-center items-center p-5">
      <div className="shadow-xl rounded-md flex flex-col p-6 bg-white font-medium w-full max-w-[720px] gap-3 justify-center items-center">
        <div className="flex justify-between w-full items-center">
          <div className="self-start items-center bg-red-400 pl-0 w-[200px] rounded-tr-full rounded-br-full justify-center flex gap-3">
            <p className="text-white text-[32px]">9:59</p>
            <ClockCircleOutlined className="text-[32px] text-white" />
          </div>

          <Select
            defaultValue="VN"
            style={{ width: 120 }}
            options={[
              { value: 'VN', label: 'Vietnamese' },
              { value: 'ENG', label: 'English' }
            ]}
          />
        </div>

        <div className="self-start text-red-600 text-[17px]">*Vui lòng thanh toán trong thời gian</div>

        <div className="flex gap-5 items-center flex-col">
          <div className="border-4 border-gray-300 max-w-[320px] max-h-[320px] p-2 min-w-[200px] min-h-[200px]">
            <img className="w-full h-full" src="../images/qr.png" alt="QR Code" />
          </div>

          <div className="flex gap-5 justify-between">
            <button className="flex gap-1 items-center p-4 rounded-md hover:bg-slate-100 transition-colors hover:cursor-pointer">
              <CloudDownloadOutlined />
              <p className="text-gray-600 min-w-[54px]">Tải ảnh về</p>
            </button>

            <button className="flex gap-1 items-center p-4 rounded-md hover:bg-slate-100 transition-colors hover:cursor-pointer">
              <ShareAltOutlined />
              <p className="text-gray-600 min-w-[54px]">Chia sẻ</p>
            </button>
          </div>
        </div>

        <Divider className="border-4 border-t-0 m-0 mb-2" />

        <p className="text-[20px] pb-3">Thông tin chi tiết</p>

        <Form form={form} name="form deposit" layout="vertical" autoComplete="off" className="w-full !p-0">
          <div className="flex gap-5 items-center !w-full">
            <img
              src="https://www.abbank.vn/uploads/images/2021/07/30/thumbnail-logo-abbank.png"
              className="w-[52px] h-[52px] bg-slate-400 rounded-full shadow-md"
              alt="Ngân hàng"
            />
            <Form.Item
              name="bank"
              label="Ngân hàng"
              style={{
                width: 'inherit'
              }}
            >
              <Input defaultValue={'Ngân hàng TMCP An Bình'} />
            </Form.Item>
          </div>

          <Form.Item name="name" label="Tên tài khoản">
            <div className="flex gap-4">
              <Input className="!w-full" defaultValue={'CTY TNHH CASSO'} />
              <Button type="primary" className="bg-[#c2e5d0] text-black font-medium">
                Sao chép
              </Button>
            </div>
          </Form.Item>

          <Form.Item name="stk" label="Số tài khoản">
            <div className="flex gap-4">
              <Input defaultValue={'123 456 78XX'} />
              <Button type="primary" className="bg-[#c2e5d0] text-black font-medium">
                Sao chép
              </Button>
            </div>
          </Form.Item>

          <Form.Item name="amount" label="Số tiền">
            <div className="flex gap-4">
              <Input defaultValue={'123,345 VND'} />
              <Button type="primary" className="bg-[#c2e5d0] text-black font-medium">
                Sao chép
              </Button>
            </div>
          </Form.Item>

          <Form.Item name="content" label="Nội dung">
            <div className="flex gap-4">
              <Input defaultValue={'CASSO12345'} />
              <Button type="primary" className="bg-[#c2e5d0] text-black font-medium">
                Sao chép
              </Button>
            </div>
          </Form.Item>

          <Form.Item>
            <div className="flex gap-4">
              <Button size="large" htmlType="button" danger>
                Hủy bỏ
              </Button>
              <Button size="large" className="w-full bg-[#17AA64]" type="primary" htmlType="submit">
                Tôi đã chuyển khoản
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  )

  return (
    <div className="mx-auto justify-center items-center max-w-[768px] px-10 md:px-0 flex h-screen flex-col gap-10 shadow-md">
      <div className="flex gap-4">
        <div>1</div>
        <img className="w-[200px] h-[200px]" src="../images/qr.png" alt="QR Code" />
        <div>3</div>
      </div>
      <div>Ngân hàng</div>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
    </div>
  )

  return <div>QueryDeposit {state.method}</div>
}

export default QueryDeposit
