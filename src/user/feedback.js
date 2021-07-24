import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, message } from 'antd';
const { TextArea } = Input;


const Feedback = () => {

    const onChange = e => {
        console.log('Change:', e.target.value);
    };

    const onFinish = () => {
        console.log("chal gy")
    }

    return (
        <Form
            name="login"
            layout="vertical"
            onFinish={onFinish}
        >
            <h1>Feedback</h1>
            <Row>
                <Col span={12}>
                    <Form.Item
                        label="Feedback"
                        name="feedback"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your feedback!',
                            },
                        ]}
                    >
                        <TextArea placeholder="Submit your feedback" autoSize={{ minRows: 8, maxRows: 5 }} showCount maxLength={100} onChange={onChange} />

                    </Form.Item>

                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item

                    >
                        <Button type="primary" htmlType="submit">
                            submit
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};

export default Feedback