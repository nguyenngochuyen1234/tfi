import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input, Select } from 'antd';
import styles from "../styles.module.css";
FormGroup.propTypes = {
    onFinish:PropTypes.func.isRequired,
    onFinishFailed:PropTypes.func.isRequired,
    handleChange:PropTypes.func.isRequired
};

function FormGroup({onFinish,handleChange,onFinishFailed}) {
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
                            label="Group name"
                            name="groupname"
                            rules={[{ required: true, message: "Please input your group name!" }]}
                        >
                            <Input placeholder="Your group name" />
                        </Form.Item>

                        <Form.Item label="Description" name="description">
                            <Input placeholder="Let people know what this group is all about" />
                        </Form.Item>
                        <Form.Item label="Privacy" name="privacy" initialValue="Private">
                            <Select
                                defaultActiveFirstOption={true}
                                style={{
                                    width: "100%",
                                }}
                                onChange={handleChange}
                                options={[
                                    {
                                        value: "Private",
                                        label: "Private - Only leader's group can add members",
                                    },
                                    {
                                        disabled: true,
                                        value: "Public",
                                        label: "Public - Anyone can join your group",
                                    },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item>
                            <div className={styles["btn-form"]}>
                                <Button type="primary" htmlType="submit">
                                    Next
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
    );
}

export default FormGroup;