import { BarChartOutlined } from '@ant-design/icons'
import DashboardCard from '../../components/sections/DashboardCard'
import { useNProgress } from '../../hooks/useNProgress'
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  BarChart,
  Legend,
  Bar
} from 'recharts'

const data = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 }
]

const getIntroOfPage = (label: string) => {
  if (label === 'Page A') {
    return "Page A is about men's clothing"
  }
  if (label === 'Page B') {
    return "Page B is about women's dress"
  }
  if (label === 'Page C') {
    return "Page C is about women's bag"
  }
  if (label === 'Page D') {
    return 'Page D is about household goods'
  }
  if (label === 'Page E') {
    return 'Page E is about food'
  }
  if (label === 'Page F') {
    return 'Page F is about baby food'
  }
  return ''
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label} : ${payload[0].value}`}</p>
        <p className="intro">{getIntroOfPage(label)}</p>
        <p className="desc">Anything you want can be displayed here.</p>
      </div>
    )
  }

  return null
}

const HomePage = () => {
  useNProgress()

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-12 gap-4">
        {['1', '2', '3', '4'].map((item) => (
          <div key={item} className="col-span-12 md:col-span-4">
            <DashboardCard icon={BarChartOutlined} count={500} title="Dashboard title" />
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4 rounded-xl bg-white p-5">
        <p className="text-[22px] font-semibold">Customer Grow</p>

        <ResponsiveContainer width="100%" height={200}>
          <LineChart
            width={500}
            height={200}
            data={data}
            syncId="anyId"
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="pv" stroke="#82ca9d" fill="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>

        <div className="pt-10">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="pv" barSize={20} fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default HomePage
