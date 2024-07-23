import { PlusCircleOutlined } from '@ant-design/icons'
import { Button, ButtonProps } from 'antd'

interface INewCreateButton extends ButtonProps {}

const NewCreateButton = (props: INewCreateButton) => {
  return <Button type="primary" icon={<PlusCircleOutlined />} {...props} />
}

export default NewCreateButton
