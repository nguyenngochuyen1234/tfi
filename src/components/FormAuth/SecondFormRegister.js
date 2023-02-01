import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, notification, Spin, Upload } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import uploadApi from '../../api/uploadApi';
import userApi from '../../api/userApi';
const config = {
    beforeUpload: () => {
        return false;
    },

}
const SecondFormRegister = ({ current, steps, prev, dataFirstForm }) => {
    const [avatar, setAvatar] = useState(null)
    const navigate = useNavigate()
    const [api, contextHolder] = notification.useNotification();
    const [loading, setLoading] = useState(false);
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
            setLoading(true);
            formData.append('file', avatar[0].originFileObj)
            const response = await uploadApi.upload(formData)
            const linkAvatar = response.link;
            let data = {
                username: dataFirstForm.username,
                password: dataFirstForm.password,
                avatarImg: linkAvatar,
                ...values
            }
            await userApi.updateAccount(data)
            api.error({
                message: `Đăng kí thành công`,
                description: "Chờ 2 giây để tự động sang cửa sổ đăng nhập",
                duration: 2,
            });

            setLoading(false)
            setTimeout(() => navigate('/login'), 2000)

        } catch (err) {

            setLoading(false)

            api.error({
                message: `Đăng kí thất bại`,
                description: "Hãy kiểm tra lại các trường thông tin",
                duration: 2,
            });
        }
        //post ,..

    };
    const onFinishFailed = (err) => {



        console.log(err)
    };
    return (
        <Spin spinning={loading} delay={200}>
            {contextHolder}
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
        </Spin>
    );
}

export default SecondFormRegister