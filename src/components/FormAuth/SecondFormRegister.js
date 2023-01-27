import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Upload } from 'antd';
import React, { useState } from 'react';
import uploadApi from '../../api/uploadApi';
import imageApi from '../../api/imageApi';
import userApi from '../../api/userApi';
const config = {
    beforeUpload: () => {
        return false;
    },

}
const SecondFormRegister = ({ current, steps, prev, dataFirstForm }) => {
    const [avatar, setAvatar] = useState(null)
    const normFile = (e) => {
        setAvatar(e?.fileList)
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;

    };
    const onFinish = async (values) => {
        try {
            let formData = new FormData();
            formData.append('file', avatar[0].originFileObj)
            const response = await uploadApi.upload(formData)
            const linkAvatar = response.link;
            let data = {
                username: dataFirstForm.username,
                password: dataFirstForm.password,
                avatarImg: linkAvatar,
                ...values
            }
            const result = await userApi.updateAccount(data)
            alert(result.message)
        } catch (err) {
            console.log(err.message)
            alert("Đăng ký không thành công")
        }
        //post ,..

    };
    const onFinishFailed = (err) => {



        console.log(err)
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

                <Upload maxCount={1} accept="image/png, image/jpeg,image/jpg" listType="picture"  {...config}>
                    <Button icon={<UploadOutlined />}>
                        Click to upload</Button>

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
                        message: 'Nhập Trường!',
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