import { DeleteOutlined } from "@ant-design/icons";
import { Button, Col, Modal, Row, Tag, Typography } from "antd";
import React, { useState } from "react";
import styles from "../styles.module.css";
import PropTypes from "prop-types";
import GroupAvatar from "../../../../../components/Avatar/GroupAvatar";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import StatusInterval from "../../DetailTask/StatusInterval";
TaskLogGR.propTypes = {
    leader: PropTypes.string.isRequired,
    task: PropTypes.object.isRequired,
    handleDelete:PropTypes.func.isRequired,
    handleTask:PropTypes.func.isRequired,
};

function TaskLogGR({ leader, task, handleDelete,handleTask}) {
    const userId =
        useSelector((state) => state.user.current?.account._id) || localStorage.getItem("user_id");
    const [open, setOpen] = useState(false);
    const [statusTask, setStatusTask] = useState(task.status);

    const showModal = () => {
        setOpen(true);
    };

    const hideModal = () => {
        setOpen(false);
    };
    const handleOk = async (id) => {
        await handleDelete(id);
        hideModal();
    };
    const handleClickTask = (id) => {
        if (handleTask) handleTask(id);
    };
    return (
        <Row
            onClick={(e) => {
                const target = e.target;
                if (!target.closest("button")) {
                    handleClickTask(task._id);
                }
            }}
            key={task._id}
            className={styles.body}
        >
            {leader === userId && (
                <Modal
                    title="Bạn có chắc chắn muốn xóa"
                    open={open}
                    onOk={() => handleOk(task._id)}
                    onCancel={hideModal}
                    okText="Ok"
                    cancelText="Cancel"
                >
                    <p>Mọi dữ liệu về nhiệm vụ sẽ biến mất khi xóa bạn hãy cân nhắc điều này</p>
                </Modal>
            )}
            <Col className={styles.box_1} span={6}>
                <Typography.Paragraph strong style={{ margin: 0 }} ellipsis={{ rows: 2 }}>
                    {task.name}{" "}
                </Typography.Paragraph>
            </Col>
            <Col className={styles.box_1} span={3}>
                <StatusInterval status={statusTask} setStatusTask={setStatusTask} time={task.deadline} idTask={task._id}/>
            </Col>
            <Col className={styles.box_1} span={5}>
                <Typography.Paragraph style={{ margin: 0 }} ellipsis={{ rows: 2 }}>
                    {task.description}
                </Typography.Paragraph>
            </Col>
            <Col className={styles.box_1} span={5}>
                {task.member.length > 0 && (
                    <GroupAvatar arrayId={task.member} size="default" config={5} />
                )}
                {task.member.length === 0 && "No member"}
            </Col>
            <Col className={styles.box_1} span={3}>
                {dayjs(task.deadline).format("DD-MM-YYYY")}
            </Col>
            <Col span={2}>
                {leader === userId && (
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
}

export default TaskLogGR;
