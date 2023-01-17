import { DeleteOutlined,EditOutlined  } from "@ant-design/icons";
import { Avatar, Button, Col, Row, Tag, Typography } from "antd";
import PropTypes from "prop-types";
import React from "react";
import styles from "../styles.module.css";

GRTaskList1.propTypes = {
    tasks: PropTypes.array,
    handleTask:PropTypes.func.isRequired
};
GRTaskList1.defaultProps = {
    tasks: [],
};

function GRTaskList1({ tasks ,handleTask}) {
    const handleClickTask=(id)=>{
        if(handleTask) handleTask(id)
    }
    return (
        <div className={styles.content} >
            <Row className={styles.header}>
                <Col className={styles.box_1} span={6}>
                    Name
                </Col>
                <Col className={styles.box_1} span={3}>
                    Status
                </Col>
                <Col className={styles.box_1} span={6}>
                    About
                </Col>
                <Col className={styles.box_1} span={4}>
                    Member
                </Col>
                <Col className={styles.box_1} span={3}>
                    Due on
                </Col>
            </Row>

            <div className={styles.main}>
                {tasks.map((task) => {
                    return (
                        <Row onClick={()=>handleClickTask(task.id)}  key={task.id} className={styles.body}>
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
                                {task.status === "uncompleted" && (
                                    <Tag color="magenta">Uncompleted</Tag>
                                )}
                                {task.status === "past-due" && <Tag color="red">Past Due</Tag>}
                                {task.status === "completed" && <Tag color="green">Completed</Tag>}
                            </Col>
                            <Col className={styles.box_1} span={6}>
                                <Typography.Paragraph style={{ margin: 0 }} ellipsis={{ rows: 2 }}>
                                    {task.about}{" "}
                                </Typography.Paragraph>
                            </Col>
                            <Col className={styles.box_1} span={4}>
                                <Avatar.Group
                                    maxStyle={{
                                        color: "#f56a00",
                                        backgroundColor: "#fde3cf",
                                        cursor: "pointer",
                                    }}
                                    maxCount={5}
                                >
                                    {task.members.map((member,idx) => (
                                        <Avatar 
                                            key={idx}
                                            style={{ backgroundColor: "#87d068" }}
                                            src={member}
                                        />
                                    ))}
                                </Avatar.Group>
                            </Col>
                            <Col className={styles.box_1} span={3}>
                                {task.due}
                            </Col>
                            <Col span={2}>
                                <Button type="text"size="large" shape="circle" icon={<DeleteOutlined />}/>

                            </Col>
                        </Row>
                    );
                })}
            </div>
        </div>
    );
}

export default GRTaskList1;
