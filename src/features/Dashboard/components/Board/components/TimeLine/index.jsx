import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Timeline } from "antd";
import styles from "./styles.module.css";
import classNames from "classnames";
import timelineDashboardApi from "../../../../../../api/timelineDashboardApi";
import dayjs from "dayjs";
import { useState } from "react";
TimeLine.propTypes = {};

function TimeLine(props) {
    const [dataTimeline, setDataTimeline] = useState([])
    const fetchData = async () => {
        try {
            const data = await timelineDashboardApi.getTimelineDashboard()
            if (data.success) {
                setDataTimeline(data.timelineDashboard)
                console.log(data.timelineDashboard)
            }
        } catch (err) {
            console.log(err.message)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div className={styles.root}>
            <div className={styles["time-line"]}>
                <span
                    className={classNames({
                        [styles.title]: true,
                        "text-md": true,
                    })}
                >
                    Timeline
                </span>
                <Timeline className={styles["time-list"]} mode="right">
                    {
                        dataTimeline.map(data => {
                            return <Timeline.Item key={data._id} label={dayjs(data.time).format("DD/MM/YYYY HH:mm")}>{data.title}</Timeline.Item>
                        })
                    }
                </Timeline>
            </div>
        </div>
    );
}

export default TimeLine;
