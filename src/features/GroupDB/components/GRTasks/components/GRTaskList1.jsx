import { DeleteOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Row, Tag, Typography } from "antd";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import React from "react";
import styles from "../styles.module.css";

GRTaskList1.propTypes = {
    tasks: PropTypes.array,
    handleTask: PropTypes.func,
};
GRTaskList1.defaultProps = {
    tasks: [],
    handleTask: null,
};

function GRTaskList1({ tasks, handleTask }) {
    console.log(tasks);
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

            <div className={styles.main}>
                {tasks.map((task) => {
                    return (
                        <Row
                            onClick={() => handleClickTask(task._id)}
                            key={task._id}
                            className={styles.body}
                        >
                            <Col className={styles.box_1} span={6}>
                                <Typography.Paragraph
                                    strong
                                    style={{ margin: 0 }}
                                    ellipsis={{ rows: 2 }}
                                >
                                    {task.name}{" "}
                                </Typography.Paragraph>
                            </Col>
                            <Col className={styles.box_1} span={3}>
                                {task.status === "uncomplete" && (
                                    <Tag color="magenta">Uncomplete</Tag>
                                )}
                                {task.status === "past-due" && <Tag color="red">Past Due</Tag>}
                                {task.status === "completet" && <Tag color="green">Completed</Tag>}
                            </Col>
                            <Col className={styles.box_1} span={5}>
                                <Typography.Paragraph style={{ margin: 0 }} ellipsis={{ rows: 2 }}>
                                    {task.description}
                                </Typography.Paragraph>
                            </Col>
                            <Col className={styles.box_1} span={5}>
                                {task.member.length > 0 && (
                                    <Avatar.Group
                                        maxStyle={{
                                            color: "#f56a00",
                                            backgroundColor: "#fde3cf",
                                            cursor: "pointer",
                                        }}
                                        maxCount={5}
                                    >
                                        {task.member.map((member, idx) => (
                                            <Avatar
                                                key={idx}
                                                style={{ backgroundColor: "#87d068" }}
                                                src={member}
                                            />
                                        ))}
                                    </Avatar.Group>
                                )}
                                {task.member.length === 0 && "No member"}
                            </Col>
                            <Col className={styles.box_1} span={3}>
                                {dayjs(task.deadline).format('DD-MM-YYYY')}
                            </Col>
                            <Col span={2}>
                                <Button
                                    type="text"
                                    size="large"
                                    shape="circle"
                                    icon={<DeleteOutlined />}
                                />
                            </Col>
                        </Row>
                    );
                })}
            </div>
        </div>
    );
}

export default GRTaskList1;
