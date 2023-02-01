import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";
import { Button, DatePicker, Form, Input, notification, Spin, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import InputSearchMember from "../../../../components/InputSearchMember/InputSearchMember";
import moment from "moment/moment";
import taskApi from "../../../../api/taskApi";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import groupApi from "../../../../api/groupApi";
import notificationApi from "../../../../api/notificationApi";
import { useSelector } from "react-redux";

AddTask.propTypes = {};
AddTask.defaultProps = {};

function AddTask(props) {
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
    let socket = useSelector((state) => state.socket.socket);
    const [loading, setLoading] = useState(false);
    const [memberFiltered, setMemberFiltered] = useState([]);
    const [usersData, setUsersData] = useState([]);
    const [api, contextHolder] = notification.useNotification();

    const leader = localStorage.getItem("name_user");

    const params = useParams();
    const idGroup = params.idGroup;

    const fetchUserData = async () => {
        try {
            const data = await groupApi.getUsersByIds(idGroup);
            if (data.success) {
                setUsersData(data.users);
            }
        } catch (err) {
            console.log(err.message);
        }
    };
    useEffect(() => {
        fetchUserData();
    }, []);

    const handleClickBack = () => {
        navigate(-1);
    };
    const onFinish = async (values) => {
        try {
            const memberId = memberFiltered?.map((pp) => pp._id);
            const result = {
                ...values,
                member: memberId,
            };
            setLoading(true);
            const data = await taskApi.createTask(idGroup, result);
            console.log("Success:", data);

            for (let i = 0; i < memberId.length; i++) {
                let notification = {
                    receiver: memberId[i],
                    type: "task",
                    title: `${leader || "Có người"} đã thêm nhiệm vụ`,
                    description: values.name,
                    link: `groups/${idGroup}/tasks`,
                };
                console.log(notification);
                (async () => {
                    const resultNoti = await notificationApi.createNotification(notification);
                    socket.emit("send-notification", resultNoti.data);
                })();
            }
            setLoading(false);
            api.success({
                message: `Tạo task thành công`,
                description: "Chờ 3 giây để tự động trở về task overview",
                duration: 2.5,
            });
            setTimeout(()=>navigate(-1),3000)
            
        } catch (err) {
            console.log(err.message);
            api.success({
                message: `Tạo task không thành công`,
                description: "Vui lòng kiểm tra lại",
                duration: 3,
            });
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    return (
        <div className={styles["add-task"]}>
            {contextHolder}
            <Spin spinning={loading} tip="Tạo Task...">
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
                                name="name"
                                rules={[
                                    { required: true, message: "Please input your task name!" },
                                ]}
                            >
                                <Input placeholder="Your task name" />
                            </Form.Item>

                            <Form.Item name="description" label="About">
                                <Input.TextArea placeholder="Let talk about description this task" />
                            </Form.Item>
                            <InputSearchMember
                                memberFiltered={memberFiltered}
                                setMemberFiltered={setMemberFiltered}
                                usersData={usersData}
                            />
                            <Form.Item name="deadline" label="Due on" {...config}>
                                <DatePicker
                                    disabledDate={(current) => {
                                        let customDate = moment().format("DD-MM-YYYY");
                                        return (
                                            current &&
                                            current <= moment(customDate, "DD-MM-YYYY HH:MM:SS")
                                        );
                                    }}
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
            </Spin>
        </div>
    );
}

export default AddTask;
