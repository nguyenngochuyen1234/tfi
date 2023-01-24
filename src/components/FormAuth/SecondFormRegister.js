<<<<<<< HEAD
import React, { useState } from 'react'
import { Button, message, Steps, Form, Input, Checkbox, Upload } from 'antd';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import Uploadingimg from './compoment/UploadImg';
import imageApi from '../../api/imageApi';
=======
import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Upload } from 'antd';
import React, { useState } from 'react';
>>>>>>> dfa5c1c7a559a6dd2382fcd7c809c1918c9d7d23

import uploadApi from '../../api/uploadApi';
const config = {
    beforeUpload: () => {
        return false;
    },

}
const SecondFormRegister = ({ current, steps, prev }) => {
<<<<<<< HEAD
    const [avatar, setAvatar] = useState()
    const [fileList, setFileList] = useState([]);
    const handleChange = ({ file }) => {
        setAvatar(file)
    };
    const normFile = (e) => {
        console.log('Upload event:', e);
        setAvatar(e.file)
=======
    const [avatar, setAvatar] = useState(null)
    const normFile = (e) => {
        setAvatar(e?.fileList)
>>>>>>> dfa5c1c7a559a6dd2382fcd7c809c1918c9d7d23
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;

    };
<<<<<<< HEAD
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
=======
    const onFinish = (values) => {
        (async () => {
            let formData = new FormData();
            formData.append('file', data.avatar[0].originFileObj)
            const response = await uploadApi.upload(formData)
            console.log(response.link)
            let data = { avatar:response.link, ...values }
            //post ,..
        })()
        
>>>>>>> dfa5c1c7a559a6dd2382fcd7c809c1918c9d7d23
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
                rules={[
                    {
                        required: true,
                        message: 'Hãy tải lên ảnh đại diên!',
                    },
                ]}
            >
<<<<<<< HEAD
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
=======

                <Upload maxCount={1} accept="image/png, image/jpeg,image/jpg"  listType="picture"  {...config}>
                    <Button icon={<UploadOutlined />}>
                        Click to upload</Button>

>>>>>>> dfa5c1c7a559a6dd2382fcd7c809c1918c9d7d23
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
                        message: 'Nhập mã sinh viên!',
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
<<<<<<< HEAD
                        message: 'Nhập tên!',
=======
                        message: 'Nhập Trường!',
>>>>>>> dfa5c1c7a559a6dd2382fcd7c809c1918c9d7d23
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
                        <Button type="primary" htmlType="submit">
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