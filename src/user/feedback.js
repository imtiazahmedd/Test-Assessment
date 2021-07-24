import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, message } from 'antd';
import { firebase } from "../firebaseConfig";
const { TextArea } = Input;


const Feedback = () => {

    const [form] = Form.useForm();
    const [feedbackLoader, setFeedbackLoader] = useState(false);

    const onFinish = (values) => {
        setFeedbackLoader(true)
        return new Promise((resolve, reject) => {
            const userEmail = firebase.auth().currentUser.email;
            let feedbackRef = firebase.database().ref('feedback');
            let userId = localStorage.getItem("userId")
            feedbackRef.push({ email: userEmail, "feed_back": values.feedback, uid: userId })
                .then((res) => {
                    resolve(res)
                    setFeedbackLoader(false)
                    message.success('Your feedback has been submitted Successfully', 5);
                    form.resetFields();
                }).catch((err) => {
                    reject(err)
                    setFeedbackLoader(false)
                })
        })
    }

    return (
        <Form
            form={form}
            name="feedback"
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
                        <TextArea placeholder="Submit your feedback" autoSize={{ minRows: 8, maxRows: 5 }} showCount maxLength={100} />

                    </Form.Item>

                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item

                    >
                        <Button loading={feedbackLoader} type="primary" htmlType="submit">
                            submit
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};

export default Feedback