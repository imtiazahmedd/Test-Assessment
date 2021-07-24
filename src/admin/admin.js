import React, {useState} from 'react';
import { Layout, Menu, message } from 'antd';
import { useHistory } from 'react-router';
import UserList from "./userList"
import BookedList from "./bookedList"
import FeedBackList from "./feedbackList"
import {
  UserOutlined,
  BuildOutlined,
  CommentOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import "./admin.css"
import { firebase } from "../firebaseConfig";

const { Sider, Content } = Layout;

const UserListing = () => {

  const history = useHistory()

  const [nav, setNav] = useState("user")

  const handleMenuChange = (e) => {
    console.log(e,"euuuu")
    if(e.key === "logout"){
      firebase.auth().signOut().then(() => {
          history.replace("/")
          localStorage.clear();
        }).catch((error) => {
          message.success(error, 5)
        });
    }else{
        setNav(e.key)
    }
}

    return (
       <Layout  style={{ minHeight: '100vh' }}>
        <Sider trigger={null} >
          <div className="logo" />
          <Menu onClick={handleMenuChange} theme="dark" mode="inline" defaultSelectedKeys={nav}>
            <Menu.Item key="user" icon={<UserOutlined />}>
                Users
            </Menu.Item>
            <Menu.Item key="parking_booked" icon={<BuildOutlined/>}>
              Parking Booked
            </Menu.Item>
            <Menu.Item key="feed_back" icon={<CommentOutlined />}>
              Feedback
            </Menu.Item>
            <Menu.Item key="logout" icon={<LogoutOutlined />}>
              Logout
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
            {nav === "user" && <UserList />}

            {nav === "parking_booked" && <BookedList />}

            {nav === "feed_back" && <FeedBackList />}
          </Content>
        </Layout>
      </Layout>
    );
};

export default UserListing