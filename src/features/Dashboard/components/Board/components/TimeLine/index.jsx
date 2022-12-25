import React from "react";
import PropTypes from "prop-types";
import { Timeline } from "antd";
import styles from "./styles.module.css";
import classNames from "classnames";
TimeLine.propTypes = {};

function TimeLine(props) {
    return (
        <div className={styles.root}>
            <div className={styles["time-line"]}>
                <span
                    className={classNames({
                        [styles.title]: true,
                        "text-md": true,
                    })}
                >
                    Timeline for this week
                </span>
                <Timeline className={styles["time-list"]} mode="right">
                    <Timeline.Item label="25-12-2022 07:20:25">Task submitted successfully
                    </Timeline.Item>
                    <Timeline.Item label="25-12-2022 09:12:11">Task submitted successfully</Timeline.Item>
                    <Timeline.Item label="24-12-2022 20:12:11">
                        Task submitted successfully
                    </Timeline.Item>
                    <Timeline.Item label="24-12-2022 09:12:11">
                        You Joined TT34H2 team
                    </Timeline.Item>
                    <Timeline.Item label="24-12-2022 09:12:11">
                        You Joined TT34H2 team
                    </Timeline.Item>
                    <Timeline.Item label="24-12-2022 09:12:11">
                        You Joined TT34H2 team
                    </Timeline.Item>
                </Timeline>
            </div>
        </div>
    );
}

export default TimeLine;
