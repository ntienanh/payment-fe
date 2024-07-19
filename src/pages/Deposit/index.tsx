import { Button, Form, InputNumber, Select } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNProgress } from '../../hooks/useNProgress'
import { useNavigate } from 'react-router-dom'

const DepositPage = () => {
  useNProgress()
  const [money, setMoney] = React.useState('VND')
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()

  const changeLanguageHandler = (value: string) => {
    localStorage.setItem('language', value)
    i18n.changeLanguage(value)
  }

  const onFinish = async () => {
    try {
      const values = await form.validateFields()
      navigate('/deposit/query-detail', { state: values })
      console.log('Success:', values)
    } catch (errorInfo) {
      console.log('Failed:', errorInfo)
    }
  }

  const currency = localStorage.getItem('currency')
  const language = localStorage.getItem('language')

  React.useEffect(() => {
    localStorage.setItem('currency', currency || 'VND')
    localStorage.setItem('language', language || 'vi')
    i18n.changeLanguage(`${language}`)
  }, [currency, language, i18n])

  return (
    <div className="flex h-screen bg-gradient-to-t from-cyan-100 to-blue-400 justify-center items-center px-8">
      <div className="shadow-xl rounded-md flex flex-col p-10 bg-white font-medium w-full max-w-[720px] gap-5 justify-center items-center">
        <div className="flex justify-between gap-4 w-full">
          <div className="flex flex-col gap-2">
            <Select
              defaultValue={currency}
              style={{ width: 120 }}
              onChange={(val) => {
                localStorage.setItem('currency', val)
                setMoney(val)
              }}
              options={[
                { value: 'VND', label: 'VND' },
                { value: 'JPY', label: 'JPY' }
              ]}
            />
            <p className="text-red-500 text-[14px] font-medium">*{t('currencyUnit')}</p>
          </div>

          <div className="flex flex-col gap-2">
            <Select
              defaultValue={language}
              style={{ width: 120 }}
              onChange={(val) => changeLanguageHandler(val)}
              options={[
                { value: 'vi', label: 'Tiếng Việt' },
                { value: 'eng', label: 'English' },
                { value: 'jp', label: 'Japanese' }
              ]}
            />
          </div>
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
          <Form.Item
            name="method"
            label={`${t('paymentMethod')}`}
            rules={[{ required: true, message: t('paymentMethod_err_message') }]}
          >
            <Select
              placeholder={`${t('paymentMethod_placeholder')}`}
              options={[
                { value: 'bank', label: 'Bank Transfer' },
                { value: 'go', label: 'Touch n go' }
              ]}
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="amount"
            label={`${t('amount')}`}
            rules={[{ required: true, message: t('amount_err_message') }]}
          >
            <InputNumber
              suffix={money === 'VND' ? 'VND' : 'JPY'}
              className="w-full"
              min={0}
              placeholder={`${t('amount_placeholder')}`}
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button className="w-full" size="large" htmlType="submit" type="primary">
              {t('btn_submit')}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default DepositPage
