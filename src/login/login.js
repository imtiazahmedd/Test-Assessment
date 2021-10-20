import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom"
import { useHistory } from "react-router-dom"
import { Form, Input, Button, Row, Col, message, Alert } from 'antd';
import "./login.css"
const axios = require('axios');

const Login = () => {

    const history = useHistory();
    const location = useLocation()

    const [loginLoader, setLoginLoader] = useState(false);
    const [error, setError] = useState("");


    const onFinish = (values) => {
      setLoginLoader(true)
      axios.post('https://xfoil-technical-interview.herokuapp.com/login', {
        username: values.email,
        password: Number(values.password)
      })
      .then(function (response) {
        if(response.status == 200){
          history.push({
            pathname: '/home',
            state: { data: response.data }
        });
        }
        setLoginLoader(false)
      })
      .catch(function (error) {
        console.log(error);
        setError("something went wrong")
        setLoginLoader(false)
      });
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
         {error && <Alert message={error} type="error" />}
            <Row>
                <Col span={12} offset={6}>
                    <h1 className="heading">Login</h1>
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
                            }
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12} offset={6}>
                    <Link to="/signup">Don't have an account?</Link>
                </Col>
            </Row>
            <Row>
                <Col span={12} offset={16}>
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