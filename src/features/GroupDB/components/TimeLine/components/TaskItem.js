import { DeleteOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Modal, Row, Tag, Typography } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import GroupAvatar from "../../../../../components/Avatar/GroupAvatar";
import StatusInterval from "../../DetailTask/StatusInterval";
import styles from "./styles.module.css";



function TaskItem({ task, marginItem, widthItem }) {
    const userId =
        useSelector((state) => state.user.current?.account._id) || localStorage.getItem("user_id");
    const [open, setOpen] = useState(false);
    const [status, setStatusTask] = useState(task.status)
    const onlyShowName = (!!(Math.abs(widthItem) < 220))
    console.log({ onlyShowName, widthItem })
    const showModal = () => {
        setOpen(true);
    };

    const hideModal = () => {
        setOpen(false);
    };
    // const handleOk = async (id) => {
    //     await handleDelete(id);
    //     hideModal();
    // };
    // const handleClickTask = (id) => {
    //     if (handleTask) handleTask(id);
    // };

    return (
        <Row
            // onClick={(e) => {
            //     const target = e.target;
            //     if (!target.closest("button")) {
            //         handleClickTask(task._id);
            //     }
            // }}
            key={task._id}
            style={{ marginLeft: `${marginItem}px`, width: `${widthItem}px` }}
            className={styles.body}
        >

            {onlyShowName ? <Col className={styles.box_1} style={{ position: "absolute" }} span={6}>
                <Typography.Paragraph
                    strong
                >
                    {task.name}{" "}
                </Typography.Paragraph>
            </Col> : <><Col className={styles.box_1} span={6}>
                <Typography.Paragraph
                    strong
                    style={{ margin: 0 }}
                    ellipsis={{ rows: 2 }}
                >
                    {task.name}{" "}
                </Typography.Paragraph>
            </Col>
                <Col className={styles.box_1} span={3}>
                    <StatusInterval status={status} setStatusTask={setStatusTask} time={task.deadline} />
                </Col>
                <Col className={styles.box_1} span={5}>
                    <Typography.Paragraph
                        style={{ margin: 0 }}
                        ellipsis={{ rows: 2 }}
                    >
                        {task.description}
                    </Typography.Paragraph>
                </Col>
                <Col className={styles.box_1} span={5}>
                    {task.member.length > 0 && (
                        <GroupAvatar
                            arrayId={task.member}
                            size="default"
                            config={5}
                        />
                    )}
                    {task.member.length === 0 && "No member"}
                </Col>
                <Col className={styles.box_1} span={3}>
                    {dayjs(task.deadline).format("DD-MM-YYYY")}
                </Col>
            </>}
            {/* <Col span={2}>
                {group.leader === userId && (
                    <Button
                        type="text"
                        size="large"
                        shape="circle"
                        onClick={showModal}
                        icon={<DeleteOutlined />}
                    />
                )}
            </Col> */}
        </Row>
    );
}

export default TaskItem;
