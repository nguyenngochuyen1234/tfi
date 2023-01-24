import React, { useState } from 'react'
import { Button, message, Steps, Form, Input, Checkbox, Upload } from 'antd';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import Uploadingimg from './compoment/UploadImg';
import imageApi from '../../api/imageApi';

const SecondFormRegister = ({ current, steps, prev }) => {
    const [avatar, setAvatar] = useState()
    const [fileList, setFileList] = useState([]);
    const handleChange = ({ file }) => {
        setAvatar(file)
    };
    const normFile = (e) => {
        console.log('Upload event:', e);
        setAvatar(e.file)
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };
    const onFinish = async (values) => {
        let data = { avatar: avatar, ...values }
        console.log('Success:', data);
        try {
            await imageApi.uploadImg({
                "testImage": avatar,
                "name": values.name
            })
        } catch (err) {
            console.log(err.message)
        }
    };
    const onFinishFailed = async (errorInfo) => {


        try {
            const formData = new FormData();
            formData.append("testImage", avatar);
            console.log(avatar)
            await imageApi.uploadImg(formData)
        } catch (err) {
            console.log(err.message)
        }
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
                <Upload
                    // action="http://localhost:8000/api/image"
                    listType="picture"
                    maxCount={1}
                    status="done"
                    onChange={handleChange}
                    beforeUpload={() => false}
                    name="testImage"
                >
                    <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
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
                        message: 'Nhập tên!',
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
                        message: 'Nhập gmail!',
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
                        message: 'Nhập số điện thoại!',
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