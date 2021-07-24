import React, { useState } from 'react';
import { Layout, Menu, message } from 'antd';
import { useHistory } from 'react-router';
import ParkingSlot from "./parkingSlot"
import Feedback from "./feedback"
import BookingSlot from "./bookingSlot"
import { firebase } from "../firebaseConfig";


import {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import "./user.css"

const { Sider, Content } = Layout;

const Parking = () => {

    const history = useHistory();
    const [nav, setNav] = useState("slot")
    const [userpayload, setUserPayload] = useState(null);

    const handleMenuChange = (e) => {
        if (e.key === "logout") {
            firebase.auth().signOut().then(() => {
                history.replace("/")
                localStorage.clear();
            }).catch((error) => {
                message.success(error, 5)
            });
        } else {
            setNav(e.key)
        }
    }


    const goToBooking = (params) => {
        setNav("parking_booked")
        setUserPayload(params);
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider trigger={null} >
                <div className="logo" />
                <Menu onClick={handleMenuChange} theme="dark" mode="inline" defaultSelectedKeys={nav}>
                    <Menu.Item key="slot" icon={<UserOutlined />}>
                        Available Slots
                    </Menu.Item>
                    {/* <Menu.Item key="parking_booked" icon={<VideoCameraOutlined />}>
              Book Slot
            </Menu.Item> */}
                    <Menu.Item key="feed_back" icon={<UploadOutlined />}>
                        Feedback
                    </Menu.Item>
                    <Menu.Item key="logout" icon={<UploadOutlined />}>
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
                    {nav === "slot" && <ParkingSlot goToBooking={(el) => { goToBooking(el) }} />}
                    {nav === "parking_booked" && <BookingSlot goBack={() => { setNav("slot") }} userData={userpayload} />}
                    {nav === "feed_back" && <Feedback />}
                </Content>
            </Layout>
        </Layout>
    );
};

export default Parking