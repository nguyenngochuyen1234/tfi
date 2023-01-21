import {
    DeleteOutlined,
    EyeInvisibleOutlined,
    LinkOutlined,
    MoreOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Tooltip } from "antd";
import classNames from "classnames";
import PropTypes from "prop-types";

import React from "react";
import { Link } from "react-router-dom";
import groupRecentlyApi from "../../api/groupRecentlyApi";
import GroupAvatar from "../Avatar/GroupAvatar";
import Options from "../Options";
import styles from "./styles.module.css";

GroupBox.propTypes = {
    nameGroup: PropTypes.string,
    describe: PropTypes.string,
    members: PropTypes.array,

    status: PropTypes.string.isRequired,
    handleFeatures: PropTypes.func,
    idGroup: PropTypes.string,
};
GroupBox.defaultProps = {
    click: null,
    handleFeatures: null,
    nameGroup: "Undefined",
    idGroup: "",
    describe: "",
    members: [
        "https://ik.imagekit.io/TLIT/a_VxvE5ClCm.png?ik-sdk-version=javascript-1.4.3&updatedAt=1671827651689",
        "https://ik.imagekit.io/TLIT/a_VxvE5ClCm.png?ik-sdk-version=javascript-1.4.3&updatedAt=1671827651689",
    ],
};

function GroupBox(props) {
    const { idGroup, nameGroup, describe, members, handleFeatures, status } = props;

    const items = [
        {
            label: <Options icon={<EyeInvisibleOutlined />} label="Hide" config="sm" />,
            key: "hide",
        },
        {
            label: <Options icon={<SettingOutlined />} label="Manage Group" config="sm" />,
            key: "manage",
        },
        {
            label: <Options icon={<LinkOutlined />} label="Get link to group" config="sm" />,
            key: "link",
        },
    ];
    if (status === "created") {
        items.push({
            label: <Options icon={<DeleteOutlined />} label="Delete group" config="sm" />,
            key: "delete",
        });
    }
    const handleOnclick = () => {
        (async () => {
            try {
                await groupRecentlyApi.updateTimeGroup(idGroup);
            } catch (err) {
                console.log(err.message);
            }
        })();
    };
    const onClick = ({ key }) => {
        if (handleFeatures) handleFeatures(key, idGroup);
    };
    return (
        <div style={{ position: "relative" }}>
            <Dropdown
                overlayClassName={styles.main}
                menu={{
                    items,
                    onClick,
                }}
                placement="bottomRight"
                arrow={false}
                trigger={["click"]}
            >
                <Button
                    type="text"
                    className={styles.Tdot}
                    shape="circle"
                    icon={<MoreOutlined />}
                />
            </Dropdown>
            <Link to={`./${idGroup}/general`}>
                <div
                    
                    id={idGroup}
                    className={styles.item}
                    onClick={handleOnclick}
                >
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
                    <div
                        style={{
                            position: "absolute",
                            bottom: "15px",
                        }}
                    >
                        <GroupAvatar arrayId={members} size="large" />
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default GroupBox;
