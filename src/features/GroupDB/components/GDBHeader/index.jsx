import { LeftOutlined, SettingOutlined, UserAddOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";
import PropTypes from "prop-types";
import React from "react";
import { useNavigate } from "react-router-dom";
import GroupAvatar from "../../../../compoments/Avatar/GroupAvatar";
import styles from "../../styles.module.css";
GDBHeader.propTypes = {
    group: PropTypes.object.isRequired,
};

function GDBHeader({ group }) {
    const navigate = useNavigate();
    const handleClickBack = () => {
        navigate("/home/groups");
    };

    return (
        <div className={styles["group-header"]}>
            <div>
                <Button
                    type="link"
                    className="link-back"
                    onClick={handleClickBack}
                    icon={<LeftOutlined />}
                >
                    Back
                </Button>
            </div>
            <div className={styles.box}>
                <Typography.Title
                    level={3}
                    ellipsis={true}
                    style={{ margin: "0px" , width: "70%", minWidth: "300px" }}
                >
                    {group.name}
                </Typography.Title>

                <div className={styles.box_2}>
                    <GroupAvatar arrayId={group.member} size="large" />
                    <Button
                        style={{ marginLeft: "40px" }}
                        size="large"
                        shape="circle"
                        icon={<UserAddOutlined />}
                    />
                    <Button
                        style={{ marginLeft: "20px" }}
                        size="large"
                        shape="circle"
                        icon={<SettingOutlined />}
                    />
                </div>
            </div>
            <Typography.Text
                style={{ fontSize: "12px", color: "#555", margin:"5px 0px 0px 15px", width: "70%", minWidth: "250px" }}
                ellipsis={true}
            >
                {group.description}
            </Typography.Text>
        </div>
    );
}

export default GDBHeader;
