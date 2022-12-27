import React, { useEffect, useState } from 'react'
import { Button, Spin, Steps, Form, Input, Checkbox, message } from 'antd';
import axios from 'axios';
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from '../../store/contants'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { loginUser } from '../../store/api/authThunk';
const Loginform = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const loginData = await dispatch(loginUser(values))
      console.log(loginData)
      if (loginData.success) {
        messageApi.open({
          type: 'success',
          content: loginData.message,
        });
        navigate("/home")
      }
      else {
        messageApi.open({
          type: "error",
          content: loginData.message,
        });
      }
    } catch (err) {
      alert(err.message)
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
        onFinish={onFinish}
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