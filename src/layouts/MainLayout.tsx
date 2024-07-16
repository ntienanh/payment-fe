import {
  CaretDownOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PrinterOutlined,
  UserOutlined,
  SettingOutlined
} from '@ant-design/icons'
import { Avatar, Button, Dropdown, Layout, Menu, MenuProps, Space, Tooltip } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { Content, Header } from 'antd/es/layout/layout'
import clsx from 'clsx'
import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

const items: MenuProps['items'] = [{ label: <Link to={'/login'}>Logout</Link>, key: '0' }]

const itemsMenu = [
  { key: 'home', icon: <HomeOutlined />, label: <Link to={'/'}>Overview</Link> },
  {
    key: 'product',
    icon: <PrinterOutlined />,
    label: <Link to={'/product'}>Product</Link>
  },
  {
    key: 'report-query',
    label: 'Report query',
    icon: <SettingOutlined />,
    children: [
      { key: '11', label: 'Option 11' },
      { key: '12', label: 'Option 12' }
    ]
  },
  {
    key: 'customer-support',
    label: (
      <Tooltip placement="rightTop" title={'Customer support function'} arrow>
        Customer support function
      </Tooltip>
    ),
    icon: <SettingOutlined />,
    children: [
      { key: 'order-query', label: <Link to={'/customer-support/order-query'}>Order query</Link> },
      { key: 'register', label: <Link to={'/customer-support/register'}>Register new order</Link> }
    ]
  }
]

const MainLayout = () => {
  const [collapsed, setCollapsed] = React.useState(false)
  const selectedKey = useLocation().pathname

  const itemActive = () => {
    const pathList: any = {
      '/product': 'product',
      '/report-query/child1': 'child1',
      '/customer-support/order-query': 'order-query'
    }

    for (const path in pathList) {
      if (selectedKey.startsWith(path)) {
        return [pathList[path]]
      }
    }
    return ['home']
  }

  const defaultOpenKeys = selectedKey.split('/')?.[1]

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} className="!fixed !duration-300">
        <div className="flex h-[64px] items-center justify-center border-r border-gray-100 bg-white">
          <Link to={'/'}>
            <img
              src="https://png.pngtree.com/png-clipart/20230116/original/pngtree-online-shopping-logo-desing-png-image_8918925.png"
              alt="logo"
              width={200}
              height={64}
              className={clsx('h-[64px] w-[200px] object-contain', collapsed && 'p-1 transition delay-1000')}
            />
          </Link>
        </div>

        <Menu
          defaultOpenKeys={[defaultOpenKeys]}
          selectedKeys={itemActive()}
          className="!h-screen"
          mode="inline"
          items={itemsMenu}
        />
      </Sider>

      <Layout className={clsx('ml-[200px] h-auto !duration-300', collapsed && 'ml-[80px] !duration-300')}>
        <Header className="sticky top-0 z-20 flex items-center justify-between bg-gray-100 bg-opacity-70 p-0 shadow-md backdrop-blur-[9px]">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="h-[64px] !w-[64px] !rounded-none"
          />

          <div className="pr-4">
            <Dropdown menu={{ items }} trigger={['click']}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <Avatar icon={<UserOutlined />} />
                  <CaretDownOutlined className="!text-[#BDBDC0]" />
                </Space>
              </a>
            </Dropdown>
          </div>
        </Header>

        <Content className="bg-white p-4 !pb-[64px]">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout
