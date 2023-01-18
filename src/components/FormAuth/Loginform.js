import React, { useEffect, useState } from 'react'
import { Button, Spin, Steps, Form, Input, Checkbox, message } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { login } from '../../features/Auth/userSlice';
const Loginform = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleOnLogin = async (values) => {
    try {
        const action = login(values);
        const resultAction = await dispatch(action);
        if(resultAction.payload.success){
          alert("Đăng nhập thành công")
          navigate("/home");
        }else{
          alert("Đăng nhập khong thành công")
        }
    } catch (e) {
        console.log(e);
        alert("Đăng nhập khong thành công")

    }
};
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
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
    </>
  );
}

export default Loginform