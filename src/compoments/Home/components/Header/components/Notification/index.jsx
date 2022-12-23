import { BellOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";
import React from "react";
import styles from "../../styles.module.css";
Notification.propTypes = {};
const items = [
    {
        key: "1",
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                1st menu item
            </a>
        ),
    },
    {
        key: "2",
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                2nd menu item
            </a>
        ),
    },
    {
        key: "3",
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                3rd menu item
            </a>
        ),
    },
];
function Notification(props) {
    return (
        <Dropdown
            menu={{
                items,
            }}
            placement="bottomRight"
            arrow={false}
            trigger={["click"]}
        >
            <Button type="text" className={styles["btn-r-container"]}>
                <BellOutlined className="text-md-1" />
            </Button>
        </Dropdown>
    );
}

export default Notification;
