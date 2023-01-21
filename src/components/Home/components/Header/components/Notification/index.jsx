import { BellFilled, UsergroupAddOutlined, WechatOutlined } from "@ant-design/icons";
import { Badge, Button, Dropdown } from "antd";
import classNames from "classnames";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import notificationApi from "../../../../../../api/notificationApi";
import styles from "../../styles.module.css";
import { useSelector } from "react-redux";
Notification.propTypes = {};

function IconNotification({ type }) {
    if (type === "group") {
        return <UsergroupAddOutlined className={styles.iconNotification} />
    } else {
        return <WechatOutlined className={styles.iconNotification} />
    }
}
function Notification(props) {

    let socket = useSelector(state => state.socket.socket)

    const [show, setShow] = useState(false);
    const navigate = useNavigate()
    const [items, setItems] = useState([])
    const [countSeen, setCountSeen] = useState(0)
    const handleOpenChange = (show) => {
        setShow(show);
    };

    const fetchNotification = async () => {
        try {
            const data = await notificationApi.getAllNotification()
            if (data.success) {
                const countSeen = data.notifications?.filter(dt => dt.seen === false)
                setCountSeen(countSeen.length || 0)
                const itemsData = data.notifications?.map((dt, idx) => {
                    return {
                        key: idx,
                        label: (
                            <div style={{ display: "flex", flexDirection: "row", backgroundColor: dt.seen ? "#fff" : "rgba(0,0,0,0.2)" }} onClick={() => handleClickNotification(dt, idx)}>
                                <IconNotification type={dt.type} />
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <h3>{dt.title}</h3>
                                    <p>{dt.time}</p>
                                </div>
                            </div>

                        )
                    }
                })
                setItems(itemsData)
            }
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        fetchNotification()
    }, [])

    useEffect(() => {
        if (socket) {
            socket.on("notification-recieve", (msg) => {
                setItems(prev => [
                    ...prev,
                    {
                        key: prev.length,
                        label: (
                            <div style={{ display: "flex", flexDirection: "row", backgroundColor: "#fff" }} onClick={() => handleClickNotification(msg, prev.length)}>
                                <IconNotification type={msg.type} />
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <h3>{msg.title}</h3>
                                    <p>{msg.updatedAt}</p>
                                </div>
                            </div>
                        )
                    }
                ])
                
    
            })
            
            
        }
    }, [socket])
    const handleClickNotification = async (dt, key) => {
        try {
            const id = dt._id
            if (!dt.seen) {
                setCountSeen(prev => prev - 1 < 0 ? 0 : prev - 1)
                await notificationApi.updateNotification(id, { seen: "true" })
                setItems(prev => {
                    return prev.map((item, idx) => item.key === key ? {
                        key: key,
                        label: (
                            <div style={{ display: "flex", flexDirection: "row", backgroundColor: "#fff" }} onClick={() => handleClickNotification(dt, idx)}>
                                <IconNotification type={dt.type} />
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <h3>{dt.title}</h3>
                                    <p>{dt.updatedAt}</p>
                                </div>
                            </div>
                        )
                    } : item)
                })
            }
            navigate(dt.link)
            setShow(false)

        } catch (err) {
            console.log(err.message)
        }
    }
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
            <Badge dot={!(countSeen === 0)} offset={[-16, 29]}>
                <Button type="text" className={styles["btn-r-container"]}>
                    <BellFilled className={classNames({
                        "text-md-1": true,
                        "isActive": show
                    })} />
                </Button>
            </Badge>
        </Dropdown>
    );
}

export default Notification;
