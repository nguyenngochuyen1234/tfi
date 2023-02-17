import React, { useState } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { Col, Row } from "antd";
import styles from "./styles.module.css";
Files.propTypes = {};
const initData = [
    {
        exercise:{
            avt:"",
            time:"2023-02-10T11:12:48.883Z",
            name:"test",
            data:"x",
            title:"x",
            
        },

        id:"123"
    },
    {
        exercise:{
            avt:"",
            time:"2023-02-10T11:12:48.883Z",
            name:"test",
            data:"x",
            title:"x",
            
        },

        id:"124"
    },
];
function Files(props) {
    const [tasks, setTasks] = useState(initData);
    return (
        <div className={styles.file}>
            {tasks.map((task) => {
                return (
                    <div key={task.id}>
                        {task.exercise ? (
                            <div className={styles.resultContent}>
                                <Row gutter={[8, 8]}>
                                    <Col span={4}>
                                        <img
                                            style={{
                                                width: "50px",
                                                height: "50px",
                                                borderRadius: "50%",
                                            }}
                                            src={task.exercise.avatar}
                                            alt="avt"
                                        />
                                    </Col>
                                    <Col span={8}>{task.exercise.name}</Col>
                                    <Col span={6}>
                                        {dayjs(task.exercise.time).format("DD-MM-YY HH:MM")}
                                    </Col>

                                    <Col span={6}>
                                        <a
                                            href={task.exercise.data}
                                            rel="noreferrer"
                                            target="_blank"
                                        >
                                            {task.exercise.title === ""
                                                ? "File"
                                                : task.exercise.title}
                                        </a>
                                    </Col>
                                </Row>
                            </div>
                        ) : (
                            "Chưa có file"
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default Files;
