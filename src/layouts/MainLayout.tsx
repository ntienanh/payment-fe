import {
  CaretDownOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  OrderedListOutlined,
  PicLeftOutlined,
  PrinterOutlined,
  UserOutlined
} from '@ant-design/icons'
import { Avatar, Button, Dropdown, Layout, Menu, MenuProps, Space } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { Content, Header } from 'antd/es/layout/layout'
import clsx from 'clsx'
import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

const items: MenuProps['items'] = [{ label: <Link to={'/login'}>Logout</Link>, key: '0' }]

const itemsMenu = [
  { key: '1', icon: <HomeOutlined />, label: <Link to={'/'}>Trang chủ</Link> },
  {
    key: '2',
    icon: <PrinterOutlined />,
    label: <Link to={'/product'}>Product</Link>
  },
  {
    key: '4',
    icon: <PicLeftOutlined />,
    label: <Link to={'/kho'}>Phòng kho</Link>
  },
  {
    key: '5',
    icon: <OrderedListOutlined />,
    label: <Link to={'/grade'}>Khối lớp</Link>
  }
]

const MainLayout = () => {
  const [collapsed, setCollapsed] = React.useState(false)
  const selectedKey = useLocation().pathname

  const itemActive = () => {
    // const pathList: any = {
    //   '/admin/user': 'user',
    //   '/admin/media': 'media',
    //   '/admin/parent/child1': 'child1',
    //   '/admin/parent/child2': 'child2',
    // };

    const pathList: any = {
      '/product': '2',
      '/kho': '4',
      '/grade': '5'
    }

    for (const path in pathList) {
      if (selectedKey.startsWith(path)) {
        return [pathList[path]]
      }
    }
    return ['1']
  }

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

        <Menu selectedKeys={itemActive()} className="!h-screen" mode="inline" items={itemsMenu} />
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
