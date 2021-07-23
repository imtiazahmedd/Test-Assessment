import React, {useState} from 'react';
import { Layout, Menu } from 'antd';
import UserList from "./userList"
import BookedList from "./bookedList"
import FeedBackList from "./feedbackList"
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import "./admin.css"

const { Sider, Content } = Layout;

const UserListing = () => {

  const [nav, setNav] = useState(["user"])

  const handleMenuChange = (e) => {
    setNav([e])
  }
    return (
       <Layout  style={{ minHeight: '100vh' }}>
        <Sider trigger={null} >
          <div className="logo" />
          <Menu onClick={handleMenuChange} theme="dark" mode="inline" defaultSelectedKeys={nav}>
            <Menu.Item key="user" icon={<UserOutlined />}>
                Users
            </Menu.Item>
            <Menu.Item key="parking_booked" icon={<VideoCameraOutlined />}>
              Parking Booked
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
            {nav[0].key === "user" && <UserList />}

            {nav[0].key === "parking_booked" && <BookedList />}

            {nav[0].key === "feed_back" && <FeedBackList />}
          </Content>
        </Layout>
      </Layout>
    );
};

export default UserListing