import React from "react";
import PropTypes from "prop-types";
import { Typography } from "antd";
import styles from "./styles.module.css";
import classNames from "classnames";
import DeltailOverview from "./components/DetailOverview";
import TaskPinned from "./components/Schedule";

Overview.propTypes = {
    user:PropTypes.object.isRequired,
};
const { Text } = Typography;
function Overview({user}) {
    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <Text
                    className={classNames({
                        [styles.hello]: true,
                        "text-md-2": true,
                    })}
                    style={{ color: "var(--color--text-default)" }}
                >
                    Hello,<Text strong={"true"} style={{ color: "var(--color--text-default)" }}> {user.name}</Text>. Welcome to your Dashboard!
                </Text>
            </div>
            <DeltailOverview data={user.tasks}/>
            {/* <TaskPinned /> */}
        </div>
    );
}

export default Overview;
