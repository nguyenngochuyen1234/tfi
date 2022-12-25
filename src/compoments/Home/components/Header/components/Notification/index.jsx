import { BellFilled } from "@ant-design/icons";
import { Badge, Button, Dropdown } from "antd";
import React, { useState } from "react";
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
    const [show, setShow] = useState(true);
    return (
        <Dropdown
            menu={{
                items,
            }}
            placement="bottomRight"
            arrow={false}
            trigger={["click"]}
        >
            <Badge dot={show} offset={[-16, 29]}>
                <Button type="default" className={styles["btn-r-container"]}>
                    <BellFilled className="text-md-1" />
                </Button>
            </Badge>
        </Dropdown>
    );
}

export default Notification;
