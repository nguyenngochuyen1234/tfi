import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";
import { Button, DatePicker, Form, Input, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import moment from "moment/moment";
AddTask.propTypes = {
    setRender: PropTypes.func,
};
AddTask.defaultProps = {
    setRender: null,
};
const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
        result.push(i);
    }
  
    return result;
};

function AddTask({ setRender }) {
    const config = {
        rules: [
            {
                type: "object",
                required: true,
                message: "Please select time!",
            },
        ],
    };
    const navigate = useNavigate();
    const handleClickBack = () => {
        navigate("./tasks");
        if (setRender) setRender("");
    };
    const onFinish = (values) => {
        const result = {
            ...values,
            due: values["due"].format("YYYY-MM-DD HH:mm"),
        };
        console.log("Success:", result);
    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    return (
        <div className={styles["add-task"]}>
            <div>
                <Button
                    type="link"
                    className="link-back"
                    onClick={handleClickBack}
                    icon={<LeftOutlined />}
                >
                    Back
                </Button>
            </div>
            <div className={styles.form}>
                <Typography.Title level={3}>Create a new task</Typography.Title>
                <div style={{ minWidth: "400px", maxWidth: "600px" }}>
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
                            label="Task name"
                            name="taskname"
                            rules={[{ required: true, message: "Please input your task name!" }]}
                        >
                            <Input placeholder="Your task name" />
                        </Form.Item>

                        <Form.Item name="about" label="About">
                            <Input.TextArea placeholder="Let talk about description this task" />
                        </Form.Item>
                        <Form.Item label="Add Member" name="add">
                            <Input placeholder="Find member" />
                        </Form.Item>
                        <Form.Item name="due" label="Due on" {...config}>
                            <DatePicker
                                disabledDate={(current) => {
                                    let customDate = moment().format("DD-MM-YYYY");
                                    return current && current < moment(customDate, "DD-MM-YYYY");
                                }}
                                disabledTime={()=>({
                                    disabledHours: () =>
                                        range(0,Number(moment().format("HH")) + 1),
                                })}
                                showTime
                                format="DD-MM-YYYY HH:mm"
                            />
                        </Form.Item>
                        <Form.Item>
                            <div className={styles["btn-form"]}>
                                <Button type="primary" htmlType="submit">
                                    Create
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default AddTask;
