import { Button, Form, InputNumber, Select } from 'antd'
import { useNavigate } from 'react-router-dom'

const DepositPage = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const onFinish = async () => {
    try {
      const values = await form.validateFields()
      navigate('/deposit/query-detail', { state: values })
      console.log('Success:', values)
    } catch (errorInfo) {
      console.log('Failed:', errorInfo)
    }
  }

  return (
    <div className="flex h-screen bg-gradient-to-t from-cyan-100 to-blue-400 justify-center items-center px-8">
      <div className="shadow-xl rounded-md flex flex-col p-10 bg-white font-medium w-full max-w-[720px] gap-5 justify-center items-center">
        <div className="flex justify-between gap-4 w-full">
          <Select
            defaultValue="VND"
            style={{ width: 120 }}
            options={[
              { value: 'VND', label: 'VND' },
              { value: 'JPY', label: 'JPY' }
            ]}
          />

          <Select
            defaultValue="VN"
            style={{ width: 120 }}
            options={[
              { value: 'VN', label: 'Vietnamese' },
              { value: 'ENG', label: 'English' },
              { value: 'JP', label: 'Japanese' }
            ]}
          />
        </div>

        <img
          className="object-contain h-auto w-[100px] self-center"
          src="https://dpakpay1.com/images/logo-horizontal-color.png"
          alt="AKPAY-LOGO"
        />

        <Form
          form={form}
          name="form deposit"
          layout="vertical"
          autoComplete="off"
          className="w-full"
          onFinish={onFinish}
        >
          <Form.Item name="method" label="Payment Method:" rules={[{ required: true, message: 'Please pick method!' }]}>
            <Select
              placeholder="Select a method"
              options={[
                { value: 'bank', label: 'Bank Transfer' },
                { value: 'go', label: 'Touch n go' }
              ]}
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="amount"
            label="Amount:"
            rules={[{ required: true, message: 'Please enter amount with number' }]}
          >
            <InputNumber className="w-full" min={0} placeholder="Enter amount" size="large" />
          </Form.Item>

          <Form.Item>
            <Button className="w-full" size="large" htmlType="submit" type="primary">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default DepositPage
