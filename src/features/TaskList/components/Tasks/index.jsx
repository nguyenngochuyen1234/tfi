import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";
import classNames from "classnames";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
Tasks.propTypes = {
    tasks: PropTypes.array,
};
Tasks.defaultProps = {
    tasks: null,
};

function Tasks({ tasks }) {
    return (
        <ul className={styles["list-item"]}>
            {tasks.map((task) => {
                return (
                    <li key={task?._id}>
                        <Link to={`/home/groups/${task.group?._id}/tasks/${task?._id}`}>
                            <div
                                className={classNames({
                                    [styles.item]: true,
                                    "text-sm": true,
                                })}
                            >
                                <span className={styles.name}>{task?.name}</span>
                                <div
                                    className={classNames({
                                        [styles["item-des"]]: true,
                                        "text-sm": true,
                                    })}
                                >
                                    {task.group?.name} • Due on{" "}
                                    {dayjs(task?.deadline).format("MMM D, YYYY h:mm A")}
                                </div>
                                {task?.status === "completed" && (
                                    <span className={styles.status} style={{ color: "blue" }}>
                                        Completed
                                    </span>
                                )}
                                {task?.status === "past-due" && (
                                    <span className={styles.status} style={{ color: "red" }}>
                                        Past due
                                    </span>
                                )}
                                {task?.status === "pending" && (
                                    <span className={styles.status} style={{ color: "orange" }}>
                                        Pending
                                    </span>
                                )}
                            </div>
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
}

export default Tasks;
