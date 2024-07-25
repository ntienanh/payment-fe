import { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon'
import { FC } from 'react'
import CountUp from 'react-countup'
import { useNavigate } from 'react-router-dom'

interface IDashboardCardProps {
  icon: FC<AntdIconProps>
  title: string
  count: number
}

const DashboardCard = (props: IDashboardCardProps) => {
  const { count, icon: ICon, title } = props || {}
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate('/customer-support/order-query')}
      className="flex min-w-[200px] cursor-pointer gap-3 rounded-xl bg-white p-4 shadow-md transition duration-300 ease-in-out hover:-translate-y-2 hover:bg-gray-50"
    >
      <div className="flex flex-1 flex-col gap-2">
        <CountUp start={0} end={count} delay={0}>
          {({ countUpRef }) => <span className="line-clamp-1 text-[38px] font-semibold" ref={countUpRef} />}
        </CountUp>

        <p className="line-clamp-1 text-[20px] text-gray-500">{title}</p>
      </div>

      <div className="flex size-9 min-w-9 items-center justify-center rounded-full bg-blue-300">
        <ICon className="font-semibold text-blue-700" />
      </div>
    </div>
  )
}

export default DashboardCard
