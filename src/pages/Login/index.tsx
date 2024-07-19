import { Button, Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useNProgress } from '../../hooks/useNProgress'

const LoginPage = () => {
  useNProgress()

  const navigate = useNavigate()
  const onFinish = (val: any) => {
    console.log('val', val)
    navigate('/')
  }

  return (
    <section className="flex h-screen w-screen">
      <div className="hidden h-screen flex-[4] bg-[#000] md:flex">
        <img src="../images/login-cover.jpg" alt="Welcome" className="h-screen object-cover opacity-85" />
      </div>

      <div className="flex h-full flex-[6] flex-col items-center justify-center gap-3 px-6 bg-gradient-to-r from-cyan-50 to-blue-100">
        <div className="w-full flex flex-col items-center bg-white rounded-xl py-4 shadow-xl bg-loginForm bg-cover bg-right-bottom bg-opacity-40 max-w-[720px]">
          <p className="text-[36px] font-semibold uppercase">Login form</p>

          <Form
            name="basic"
            initialValues={{ remember: true }}
            autoComplete="off"
            layout="vertical"
            onFinish={onFinish}
            className="flex w-3/4 flex-col pt-3 max-w-[520px]"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password size="large" />
            </Form.Item>

            <Form.Item>
              <Button className="w-full" size="large" type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </section>
  )
}

export default LoginPage
