import { Button, Form, Input } from 'antd';
import React from 'react';
import userApi from '../../api/userApi';
const FirstFormRegister = ({ next, setDataFirstForm }) => {
  

  const onFinish = async (values) => {
    const data = await userApi.register(values);
    if (data.success) {
      setDataFirstForm(values)
      next()
    }
    try {
    } catch (err) {
      alert(err.message)
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Form
      name="basic"
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
            message: 'Vui lòng nhập tên!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Mật khẩu"
        name="password"
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập mật khẩu !',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Nhập lại mật khẩu"
        name="rePassword"
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập lại mật khẩu!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>



      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" /* onClick={() => next()}  */ htmlType="submit">
          Next
        </Button>
      </Form.Item>
    </Form>
  );
}
export default FirstFormRegister