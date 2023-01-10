import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Button, Form, Input, Modal, Select, Typography } from "antd";
import styles from "./styles.module.css";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import groupApi from "../../../../api/groupApi";

CreateGroup.propTypes = {};
CreateGroup.defaultProps = {};
function CreateGroup(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [values, setValues] = useState({});

    const user = useSelector((state) => state.user.current);
    const idUser = user._id;
    console.log(user, idUser);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    const onFinish = (values) => {
        const result = { name: values.groupname, description: values.description, leader: idUser ,member:[idUser],projects:[]};
    
        async function post(){
            try {
                

                await groupApi.createGroup(result);
                alert("created done");
            } catch (error) {
                console.log(error);
            }
        }
        post();

    };


    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    return (
        <div className={styles.box}>
            <div className={styles.box_1}>
                <img
                    src="https://ik.imagekit.io/TLIT/Thang/team1.png?ik-sdk-version=javascript-1.4.3&updatedAt=1673205148869"
                    alt="thang"
                />
                <Typography.Text className="text-md" style={{ fontWeight: "500" }}>
                    Create a group
                </Typography.Text>
            </div>

            <div>
                <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
                    Create a group
                </Button>
                <Modal
                    className={styles.form}
                    title={<Typography.Title level={3}>Create your group</Typography.Title>}
                    open={isModalOpen}
                    footer={null}
                    onCancel={handleCancel}
                >
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
                </Modal>
            </div>
        </div>
    );
}

export default CreateGroup;
