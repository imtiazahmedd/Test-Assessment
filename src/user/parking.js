import React, {useState} from 'react';
import { Layout, Menu } from 'antd';
import ParkingSlot from "./parkingSlot"

import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import "./user.css"

const { Sider, Content } = Layout;

const Parking = () => {

  const [nav, setNav] = useState([{key: "slot"}])

  const handleMenuChange = (e) => {
    setNav([e])
  }

  console.log(nav, "nnn")
    return (
       <Layout  style={{ minHeight: '100vh' }}>
        <Sider trigger={null} >
          <div className="logo" />
          <Menu onClick={handleMenuChange} theme="dark" mode="inline" defaultSelectedKeys={nav}>
            <Menu.Item key="slot" icon={<UserOutlined />}>
                Slot
            </Menu.Item>
            <Menu.Item key="parking_booked" icon={<VideoCameraOutlined />}>
              Available Slot
            </Menu.Item>
            <Menu.Item key="feed_back" icon={<UploadOutlined />}>
              Feedback
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            {nav[0].key === "slot" && <ParkingSlot />}
          </Content>
        </Layout>
      </Layout>
    );
};

export default Parking