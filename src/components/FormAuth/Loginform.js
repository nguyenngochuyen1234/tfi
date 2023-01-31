import { Button, Form, Input, notification, Spin } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from '../../features/Auth/userSlice';
const Loginform = () => {
  const [api, contextHolder] = notification.useNotification();
  const [loading,setLoading]=useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleOnLogin = async (values) => {
    try {
        const action = login(values);
        setLoading(true)
        const resultAction = await dispatch(action);
        setLoading(false)
        if(resultAction.payload.success){
          navigate("/home");
          
        }else{
        }
    } catch (e) {
        console.log(e);
        api.error({
          message: `Đăng nhập thất bại`,
          description: "Hãy kiểm tra lại tên đăng nhập hoặc mật khẩu",
          duration:2,
        });

    }
};
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Spin spinning={loading} delay={500}>
      {contextHolder}
      <Form
        name="basic"
        style={{ padding: "40px 0" }}
        labelCol={{
          span: 10,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={handleOnLogin}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Tên đăng nhập"
          name="username"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tên đăng nhập !',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập mật khẩu',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Đăng nhập</Button>
        </Form.Item>
      </Form>
    </Spin>
  );
}

export default Loginform