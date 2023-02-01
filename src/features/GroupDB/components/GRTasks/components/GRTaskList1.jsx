import { Col, Row } from "antd";
import PropTypes from "prop-types";
import React from "react";
import styles from "../styles.module.css";
import TaskLogGR from "./TaskLogGR";

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
                    {tasks.map((task) => (
                        <TaskLogGR
                            key={task._id}
                            task={task}
                            leader={group.leader}
                            handleTask={handleTask}
                            handleDelete={handleDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default GRTaskList1;
