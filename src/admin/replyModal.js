import React from 'react';
import { Modal, Button, Input, Form, Row, Col } from 'antd';

const { TextArea } = Input;

const ReplyModal = (props) => {
    const [form] = Form.useForm();
    const { isModalVisible, handleOk, handleCancel, textAreaChange } = props

    const onFinish = () => {
        handleOk();
    }

    return (
        <Modal title="Feedback Reply" visible={isModalVisible} onCancel={handleCancel} footer={null}>
            <Form
                form={form}
                name="feedback"
                layout="vertical"
                onFinish={onFinish}
            >
                <Row>
                    <Col span={24}>
                        <Form.Item
                            label="Reply"
                            name="feedback"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your reply!',
                                },
                            ]}
                        >
                            <TextArea onChange={textAreaChange} placeholder="Reply to user feedback" autoSize={{ minRows: 8 }} showCount maxLength={100} />

                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} offset={20}>
                        <Form.Item
                        >
                            <Button type="primary" htmlType="submit">
                                submit
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

export default ReplyModal