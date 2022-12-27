import React from "react";
import PropTypes from "prop-types";
import { Typography } from "antd";
import styles from "./styles.module.css";
import classNames from "classnames";
import DeltailOverview from "./components/DetailOverview";
import TaskPinned from "./components/TaskPinned";

Overview.propTypes = {};
const { Text } = Typography;
function Overview(props) {
    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <Text
                    className={classNames({
                        [styles.hello]: true,
                        "text-md-2": true,
                    })}
                >
                    Hello,<Text strong={"true"}> Thang </Text><br/>
                    Welcome to your Dashboard!
                </Text>
                
            </div>
            <DeltailOverview />
            <TaskPinned/>
        </div>
    );
}

export default Overview;
