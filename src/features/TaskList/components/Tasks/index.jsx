import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";
import classNames from "classnames";
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
                    <li key={task.key}>
                        <div
                            className={classNames({
                                [styles.item]: true,
                                "text-sm": true,
                            })}
                        >
                            <span className={styles.name}>{task.name}</span>
                            <div
                                className={classNames({
                                    [styles["item-des"]]: true,
                                    "text-sm": true,
                                })}
                            >
                                {task.nameGroup}•{task.due}
                            </div>
                            {
                                (task.status === "completed" && (
                                    <span className={styles.status} style={{ color: "blue" }}>
                                        Completed
                                    </span>
                                ))
                            }
                            {
                                (task.status === "past-due" && (
                                    <span className={styles.status} style={{ color: "red" }}>
                                        Past due
                                    </span>
                                ))
                            }
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}

export default Tasks;
