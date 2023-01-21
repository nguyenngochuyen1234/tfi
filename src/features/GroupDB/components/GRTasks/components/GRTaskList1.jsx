import { DeleteOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Modal, Row, Tag, Typography } from "antd";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import taskApi from "../../../../../api/taskApi";
import GroupAvatar from "../../../../../components/Avatar/GroupAvatar";
import styles from "../styles.module.css";

GRTaskList1.propTypes = {
    tasks: PropTypes.array,
    handleTask: PropTypes.func,
    group: PropTypes.object.isRequired,
    handleDelete: PropTypes.func,
};
GRTaskList1.defaultProps = {
    tasks: null,
    handleDelete: null,

    handleTask: null,
};

function GRTaskList1({ tasks, handleTask, group, handleDelete }) {
    const userId =
        useSelector((state) => state.user.current?.account._id) || localStorage.getItem("user_id");
    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    };

    const hideModal = () => {
        setOpen(false);
    };
    const handleOk=async (id)=>{
        await handleDelete(id)
        hideModal();
    }
    const handleClickTask = (id) => {
        if (handleTask) handleTask(id);
    };

    return (
        <div className={styles.content}>
            <Row className={styles.header}>
                <Col className={styles.box_1} span={6}>
                    Name
                </Col>
                <Col className={styles.box_1} span={3}>
                    Status
                </Col>
                <Col className={styles.box_1} span={5}>
                    About
                </Col>
                <Col className={styles.box_1} span={5}>
                    Member
                </Col>
                <Col className={styles.box_1} span={3}>
                    Due on
                </Col>
            </Row>
            {tasks && (
                <div className={styles.main}>
                    {tasks.map((task) => {
                        return (
                            <Row key={task._id} className={styles.body}>
                                <Modal
                                    title="Bạn có chắc chắn muốn xóa"
                                    open={open}
                                    onOk={()=>handleOk(task._id)}
                                    onCancel={hideModal}
                                    okText="Ok"
                                    cancelText="Cancel"
                                >
                                    <p>
                                        Mọi dữ liệu về nhiệm vụ sẽ biến mất khi xóa bạn hãy cân nhắc
                                        điều này
                                    </p>
                                </Modal>
                                <Col
                                    onClick={() => handleClickTask(task._id)}
                                    className={styles.box_1}
                                    span={6}
                                >
                                    <Typography.Paragraph
                                        strong
                                        style={{ margin: 0 }}
                                        ellipsis={{ rows: 2 }}
                                    >
                                        {task.name}{" "}
                                    </Typography.Paragraph>
                                </Col>
                                <Col
                                    onClick={() => handleClickTask(task._id)}
                                    className={styles.box_1}
                                    span={3}
                                >
                                    {task.status === "uncomplete" && (
                                        <Tag color="magenta">Uncomplete</Tag>
                                    )}
                                    {task.status === "past-due" && <Tag color="red">Past Due</Tag>}
                                    {task.status === "completet" && (
                                        <Tag color="green">Completed</Tag>
                                    )}
                                </Col>
                                <Col className={styles.box_1} span={5}>
                                    <Typography.Paragraph
                                        style={{ margin: 0 }}
                                        ellipsis={{ rows: 2 }}
                                    >
                                        {task.description}
                                    </Typography.Paragraph>
                                </Col>
                                <Col
                                    onClick={() => handleClickTask(task._id)}
                                    className={styles.box_1}
                                    span={5}
                                >
                                    {task.member.length > 0 && (
                                        <GroupAvatar
                                            arrayId={task.member}
                                            size="default"
                                            config={5}
                                        />
                                    )}
                                    {task.member.length === 0 && "No member"}
                                </Col>
                                <Col
                                    onClick={() => handleClickTask(task._id)}
                                    className={styles.box_1}
                                    span={3}
                                >
                                    {dayjs(task.deadline).format("DD-MM-YYYY")}
                                </Col>
                                <Col span={2}>
                                    {group.leader === userId && (
                                        <Button
                                            type="text"
                                            size="large"
                                            shape="circle"
                                            onClick={showModal}
                                            icon={<DeleteOutlined />}
                                        />
                                    )}
                                </Col>
                            </Row>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default GRTaskList1;
