import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, message } from 'antd';
import { useHistory, Link } from "react-router-dom"
import register from "./handler"
import "./signup.css"
const Signup = () => {

    const history = useHistory();

    const [signupLoader, setSignupLoader] = useState(false);

    const onFinish = (values) => {
        setSignupLoader(true)
        const res = register(values)
        res.then((success) => {
            setSignupLoader(false)
            message.success('User Registration Successfully', 5, onclose).then(() => {
                history.push("/")
            });
        }).catch((err) => {
            setSignupLoader(false)
            message.error(err.message, 5)
        })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            name="singup"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Row>
                <Col span={12} offset={6}>
                    <h1 className="heading">User Registration</h1>
                    <Form.Item
                        label="First Name"
                        name="first_name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your first name!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12} offset={6}>
                    <Form.Item
                        label="Last Name"
                        name="last_name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your last name!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12} offset={6}>
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
                <Col span={12} offset={6}>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12} offset={6}>
                    <Link to="/">Already have an account ?</Link>

                </Col>
            </Row>
            <Row>
                <Col span={12} offset={16}>
                    <Form.Item

                    >
                        <Button loading={signupLoader} type="primary" htmlType="submit">
                            Signup
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};

export default Signup