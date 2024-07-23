import { VerticalAlignBottomOutlined } from '@ant-design/icons'
import { Button, ButtonProps } from 'antd'

interface IExcelButtonProps extends ButtonProps {}

const ExcelButton = (props: IExcelButtonProps) => {
  return (
    <Button
      type="primary"
      icon={<VerticalAlignBottomOutlined />}
      {...props}
      className="bg-green-600 hover:!bg-green-700"
    />
  )
}

export default ExcelButton
