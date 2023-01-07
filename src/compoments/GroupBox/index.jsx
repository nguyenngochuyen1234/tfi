import { AntDesignOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Tooltip } from "antd";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import GroupAvatar from "../Avatar/GroupAvatar";
import styles from "./styles.module.css";

GroupBox.propTypes = {
    nameGroup: PropTypes.string.isRequired,
    describe: PropTypes.string.isRequired,
    members: PropTypes.array.isRequired,
};
GroupBox.defaultProps = {
    nameGroup: "Undefined",
    describe: "No description",
    members: [
        "https://ik.imagekit.io/TLIT/a_VxvE5ClCm.png?ik-sdk-version=javascript-1.4.3&updatedAt=1671827651689",
        "https://ik.imagekit.io/TLIT/a_VxvE5ClCm.png?ik-sdk-version=javascript-1.4.3&updatedAt=1671827651689",
    ],
};
function GroupBox(props) {
    const { nameGroup, describe, members } = props;
    return (
        <div className={styles.item}>
            <span
                className={classNames({
                    [styles.name]: true,
                    "text-md": true,
                })}
            >
                {nameGroup.length > 30 ? (
                    <Tooltip title={nameGroup} key={nameGroup}>
                        {nameGroup.slice(0, 30)}...
                    </Tooltip>
                ) : (
                    nameGroup
                )}
            </span>
            <div
                className={classNames({
                    [styles.describe]: true,
                    "text-sm": true,
                })}
            >
                {describe}
            </div>
            <div style={{
                position: "absolute",
                bottom:"15px"
            }}>
            <GroupAvatar arrayId={members} size="large" />
            </div>

        </div>
    );
}

export default GroupBox;
