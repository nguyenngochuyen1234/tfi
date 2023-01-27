import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input } from 'antd';
import styles from "../styles.module.css";
FormInfor.propTypes = {
    data:PropTypes.object.isRequired,
    handleOk:PropTypes.func.isRequired,
};

function FormInfor({data,handleOk}) {
    const onFinish=(value)=>{
        console.log(value);
    }
    const onFinishFailed=(err)=>{
        console.log(err)
    }
    return (
        <Form
            className={styles["form-container"]}
            name="basic"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Tên"
                initialValue={data.name}
                
                name="name"
            >
                <Input placeholder="Your name" />
            </Form.Item>

            <Form.Item
                label="Gmail"
                initialValue={data.gmail}
                name="gmail"
            >
                <Input placeholder="Your gmail" />
            </Form.Item>
            <Form.Item
                label="Chuyên ngành/Lớp"
                initialValue={data.major}
                name="major"
            >
                <Input placeholder="Your major" />
            </Form.Item>
            <Form.Item
                label="Trường"
                initialValue={data.school}
                name="school"
            >
                <Input placeholder="Your school" />
            </Form.Item>
            <Form.Item
                label="Liên hệ"
                initialValue={data.phoneNumber}
                name="phoneNumber"
            >
                <Input placeholder="Your phone number" />
            </Form.Item>
            <Form.Item>
                <div className={styles["btn-form"]}>
                    <Button type="primary" htmlType="submit">
                        Edit
                    </Button>
                </div>
            </Form.Item>
        </Form>
    );
}

export default FormInfor;