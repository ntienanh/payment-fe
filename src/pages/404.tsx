import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { LeftOutlined } from '@ant-design/icons'

const NotFoundPage = () => {
  return (
    <section className="mx-auto w-full">
      <div className="flex h-full items-center justify-center pt-20 flex-col gap-5">
        <Link to={'/'} className=" transition-colors hover:text-blue-500">
          <Button icon={<LeftOutlined />}>Back</Button>
        </Link>

        <h1 className="text-center text-[30px] font-bold text-primary-main text-red-500">Opps! Can't find this page</h1>
        <img src="../images/404.gif" alt="Page not found" />
      </div>
    </section>
  )
}

export default NotFoundPage
