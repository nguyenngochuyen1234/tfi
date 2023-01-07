import React, { useState } from 'react';
import { Button, Form, Input, Select, Modal } from 'antd';
import InputSearchMember from '../../../../compoments/InputSearchMember/InputSearchMember';
import groupApi from '../../../../api/groupApi';

const ModalGroup = ({ title, isModalOpen, setIsModalOpen }) => {

  const [memberFiltered, setMemberFiltered] = useState([])
  const formRef = React.createRef();


  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 14,
      span: 16,
    },
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = async(values) => {
    const idMemberFiltered = memberFiltered?.map(member=>member._id)
    const data = {...values,member:idMemberFiltered}
    try{
      const dataCreate = await groupApi.createGroup(data)
      console.log(dataCreate)
      alert("Đã tạo nhóm thành công!")
    }catch(err){
      alert(err.message)
    }

  };
  const onReset = () => {
    formRef.current.resetFields();
  };
  return (
    <>
      <Modal title={title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <Form {...layout} ref={formRef} name="control-ref" onFinish={onFinish}>
          <Form.Item
            name="name"
            label="Name group"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
          >
            <Input />
          </Form.Item>

          <InputSearchMember memberFiltered={memberFiltered} setMemberFiltered={setMemberFiltered} />

          <Form.Item {...tailLayout}>
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
            <Button type="primary" htmlType="submit" style={{ margin: "0 15px" }}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ModalGroup;