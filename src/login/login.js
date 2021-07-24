import React, {useState} from 'react';
import {Link} from "react-router-dom"
import {useHistory} from "react-router-dom"
import { Form, Input, Button, Row, Col, message } from 'antd';
import login from "./loginHandler"

const Login = () => {

    const history = useHistory();

    const [loginLoader, setLoginLoader] = useState(false);

    const onFinish = (values) => {
        setLoginLoader(true)
        const res = login(values)
        res.then((success)=>{
            console.log(success, "ssss")
            localStorage.setItem("userId", success.user.uid)
            setLoginLoader(false)
            message.success('Login Successfully', 1, onclose).then(()=>{
                if(values.email === "admin@gmail.com"){
                    history.replace("/admin/user-listing")
                }else{
                    history.replace("/user/parking-slots")
                }
            });
        }).catch((err)=>{
            setLoginLoader(false)
            message.error(err.message, 5)
        })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            name="login"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <h1>Login</h1>
            <Row>
                <Col span={12}>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },

                            {
                                type: "email",
                                message: "Invalid email"
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            }
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                </Col>
            </Row>
            <Link href="/signup">Signup</Link>
            <Row>
                <Col span={12}>
                    <Form.Item

                    >
                        <Button loading={loginLoader} type="primary" htmlType="submit">
                            Login
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};

export default Login