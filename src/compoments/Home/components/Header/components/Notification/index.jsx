import { BellFilled } from "@ant-design/icons";
import { Badge, Button, Dropdown } from "antd";
import classNames from "classnames";
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
    const [show, setShow] = useState(false);

    return (
        <Dropdown
            menu={{
                items,
            }}
            open={show}
            placement="bottomRight"
            arrow={false}
            trigger={["click"]}
        >
            <Badge dot={!show} offset={[-16, 29]}>
                <Button onClick={()=>setShow(!show)} type="default" className={styles["btn-r-container"]}>
                     <BellFilled  className={classNames({
                        "text-md-1":true,
                        "isActive":show
                     })} />
                </Button>
            </Badge>
        </Dropdown>
    );
}

export default Notification;
