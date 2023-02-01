import { Typography } from "antd";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import React from "react";
import styles from "./styles.module.css";
TaskLog.propTypes = {
    task: PropTypes.object.isRequired,
};
TaskLog.defaultProps = {};

function TaskLog({ task }) {
    return (
        <div className={styles.main}>
            <div style={{ marginBottom: "40px" }}>
                <div>
                    <Typography.Title level={3} style={{ margin: 0,color:"var(--color--text-default" }}>
                        {task.name}
                    </Typography.Title>
                </div>

                <Typography.Text style={{ color: "var(--color--text-drop)" }} className="text-df">
                    Due on {dayjs(task.deadline).format("MMM D, YYYY h:mm A")}  
                </Typography.Text>
            </div>

            <div>
                <Typography.Text
                    style={{ color: "var(--color--text-drop)", fontWeight: 500 }}
                    className="text-sm"
                >
                    About
                </Typography.Text>
            </div>
            <div style={{ maxHeight: "200px", overflowY: "auto", overflowX: "hidden" }}>
                <Typography.Paragraph style={{ marginBottom: "10px",color:"var(--color--text-default" }}>
                    {task.description||"Không có mô tả"}
                </Typography.Paragraph>
            </div>
        </div>
    );
}

export default TaskLog;
