import { Button, Form, Input, message } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const Loginform = ({handleOnSubmit}) => {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <div style={{ height: "100%", minWidth: "400px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <h1 style={{ textAlign: "center" }}>Đăng nhập</h1>
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
         onFinish={(value)=>{
          handleOnSubmit(value)}}
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
      <p>Bạn chưa có tài khoản <Link to="/register">Đăng kí</Link></p>
    </div>
  );
}

export default Loginform