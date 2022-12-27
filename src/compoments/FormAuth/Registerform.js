import { Button, Form, Input, message, Steps } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const Firstform  = () => {

  const onFinish = (values) => {
    console.log('Success:', values);
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
        name="Tên"
        rules={[
          {
            required: true,
            message: 'Please input your Tên!',
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
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Confirm Password"
        name="confirm-password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
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
        {/* <Button type="primary" htmlType="submit">
          Submit
        </Button> */}
      </Form.Item>
      <p>Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link></p>

    </Form>
  );
}

const Secondform  = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
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
            message: 'Nhập tên của bạn',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Ngành"
        name="major"
        rules={[
          {
            required: true,
            message: 'Nhập ngành học của bạn',
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
            message: 'Nhập mã sinh viên của bạn',
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
            message: 'Nhập Trường của bạn',
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
            message: 'Nhập gmail của bạn',
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
            message: 'Nhập số điện thoại của bạn',
          },
        ]}
      >
       
      <Input />
      </Form.Item>
      <p>Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link></p>

    </Form>
    
  );
}

const steps = [
  {
    title: 'First',
    content: 'First-content',
  },
  {
    title: 'Second',
    content: 'Second-content',
  },
];
const Registerform = () => {
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  
  return (
    <div style={{height:"100%", minWidth:"400px"}}>
      <h1 style={{textAlign:"center"}}>Đăng ký</h1>
      <Steps style={{margin:"20px 0"}} current={current} items={items} />
      {steps[current].title === 'First' ? <Firstform /> : <Secondform />}
      <div className="steps-action" style={{margin:"20px 0"}}>
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success('Processing complete!')}>
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
    </div>
  );
};
  export default Registerform;