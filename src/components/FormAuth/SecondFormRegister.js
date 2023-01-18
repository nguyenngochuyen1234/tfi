import React, { useState } from 'react'
import { Button, message, Steps, Form, Input, Checkbox, Upload } from 'antd';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import Uploadingimg from './compoment/UploadImg';

const SecondFormRegister = ({ current, steps, prev }) => {
    const [avatar, setAvatar] = useState()
    const normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };
    const onFinish = (values) => {
        let data = { avatar: avatar, ...values }
        console.log('Success:', data);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Tên"
                name="name"
                rules={[
                    {
                        required: true,
                        message: 'Nhập tên!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="avatar"
                label="Ảnh đại diện"
                valuePropName="fileList"
                getValueFromEvent={normFile}
            >
                <Upload name="logo" action="/upload.do" listType="picture">
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                </Upload>
            </Form.Item>

            <Form.Item
                label="Ngành"
                name="major"
                rules={[
                    {
                        required: true,
                        message: 'Nhập ngành tên!',
                    },
                ]}
            >

                <Input />
            </Form.Item>

            <Form.Item
                label="Mã sinh viên"
                name="studentNumber"
                rules={[
                    {
                        required: true,
                        message: 'Nhập mã sinh vtên!',
                    },
                ]}
            >

                <Input />
            </Form.Item>

            <Form.Item
                label="Trường"
                name="school"
                rules={[
                    {
                        required: true,
                        message: 'Nhập Trưtên!',
                    },
                ]}
            >

                <Input />
            </Form.Item>

            <Form.Item
                label="Gmail"
                name="gmail"
                rules={[
                    {
                        required: true,
                        message: 'Nhập gmtên!',
                    },
                ]}
            >

                <Input />
            </Form.Item>

            <Form.Item
                label="Số điện thoại"
                name="phoneNumber"
                rules={[
                    {
                        required: true,
                        message: 'Nhập số điện thtên!',
                    },
                ]}
            >

                <Input />
            </Form.Item>
            <Form.Item>
                <div className="steps-action" style={{ margin: "20px 0" }}>
                    {current === steps.length - 1 && (
                        <Button type="primary" onClick={() => message.success('Processing complete!')} htmlType="submit">
                            Done
                        </Button>
                    )}
                    {current > 0 && (
                        <Button
                            style={{
                                margin: '0 8px',
                            }}
                            onClick={() => prev()}
                        >
                            Previous
                        </Button>
                    )}
                </div>
            </Form.Item>
        </Form>
    );
}

export default SecondFormRegister