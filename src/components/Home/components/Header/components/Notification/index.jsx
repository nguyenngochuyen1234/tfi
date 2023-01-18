import { BellFilled } from "@ant-design/icons";
import { Badge, Button, Dropdown } from "antd";
import classNames from "classnames";
import React, { useState } from "react";
import styles from "../../styles.module.css";
Notification.propTypes = {};
const items = [
    {
        key: "1",
        label:"Thông báo 1",
    },
    {
        key: "2",
        label: "Thông báo 2",
    },
    {
        key: "3",
        label: "Thông báo 3",
    },
];
function Notification(props) {
    const [show, setShow] = useState(false);
    const handleOpenChange = (show) => {
        setShow(show);
      };
    return (
        <Dropdown
            menu={{
                items,
            }}
            open={show}
            placement="bottomRight"
            arrow={false}
            onOpenChange={handleOpenChange}
            trigger={["click"]}
        >
            <Badge dot={!show} offset={[-16, 29]}>
                <Button  type="default" className={styles["btn-r-container"]}>
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
