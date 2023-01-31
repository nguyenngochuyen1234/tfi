import {
    BellFilled,
    UsergroupAddOutlined,
    WechatOutlined,
    FileAddOutlined,
} from "@ant-design/icons";
import { Badge, Button, Dropdown } from "antd";
import classNames from "classnames";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import notificationApi from "../../../../../../api/notificationApi";
import styles from "../../styles.module.css";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
Notification.propTypes = {};

function IconNotification({ type, color }) {
    if (type === "group") {
        return (
            <UsergroupAddOutlined
                style={{ color: `${color}` }}
                className={styles.iconNotification}
            />
        );
    } else if (type === "message") {
        return <WechatOutlined style={{ color: `${color}` }} className={styles.iconNotification} />;
    } else if (type === "task") {
        return (
            <FileAddOutlined style={{ color: `${color}` }} className={styles.iconNotification} />
        );
    }
}
function Notification(props) {
    let socket = useSelector((state) => state.socket.socket);

    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [countSeen, setCountSeen] = useState(0);
    const handleOpenChange = (show) => {
        setShow(show);
    };

    const Notification = ({ data, color }) => {
        return (
            <>
                <IconNotification color={color} type={data.type} />
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <h3 style={{ color: `${color}` }}>{data.title}</h3>

                    <p style={{ color: `${color}` }}>
                        {data.description && <span>{data.description}</span>}{" "}
                        {dayjs(data.updatedAt).format("DD/MM/YYYY HH:mm")}
                    </p>
                </div>
            </>
        );
    };

    const fetchNotification = async () => {
        try {
            const data = await notificationApi.getAllNotification();
            if (data.success) {
                const countSeen = data.notifications?.filter((dt) => dt.seen === false);
                setCountSeen(countSeen.length || 0);
                const itemsData = data.notifications?.map((dt, idx) => {
                    return {
                        key: idx,
                        label: (
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    position: "relative",
                                }}
                                onClick={() => handleClickNotification(dt, idx)}
                            >
                                {!dt.seen && (
                                    <div
                                        style={{
                                            width: "12px",
                                            height: "12px",
                                            borderRadius: "50%",
                                            position: "absolute",
                                            backgroundColor: "#0084ff",
                                            top: "50%",
                                            transform: "translateY(-50%)",
                                            right: "20px",
                                        }}
                                    ></div>
                                )}
                                <Notification
                                    data={dt}
                                    color={!dt.seen ? "#0084ff" : "var(--color--text-default)"}
                                />
                            </div>
                        ),
                    };
                });
                setItems(itemsData);
            }
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        fetchNotification();
    }, []);

    useEffect(() => {
        if (socket) {
            socket.on("notification-recieve", (msg) => {
                setItems((prev) => [
                    ...prev,
                    {
                        key: prev.length,
                        label: (
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    backgroundColor: "#fff",
                                }}
                                onClick={() => handleClickNotification(msg, prev.length)}
                            >
                                <Notification data={msg} />
                            </div>
                        ),
                    },
                ]);
            });
        }
    }, [socket]);
    const handleClickNotification = async (dt, key) => {
        try {
            const id = dt._id;
            if (!dt.seen) {
                setCountSeen((prev) => (prev - 1 < 0 ? 0 : prev - 1));
                await notificationApi.updateNotification(id, { seen: "true" });
                setItems((prev) => {
                    return prev.map((item, idx) =>
                        item.key === key
                            ? {
                                  key: key,
                                  label: (
                                      <div
                                          style={{
                                              display: "flex",
                                              flexDirection: "row",
                                              backgroundColor: "#fff",
                                          }}
                                          onClick={() => handleClickNotification(dt, idx)}
                                      >
                                          <Notification data={item} />
                                      </div>
                                  ),
                              }
                            : item
                    );
                });
            }
            navigate(dt.link);
            setShow(false);
        } catch (err) {
            console.log(err.message);
        }
    };
    return (
        <Dropdown
            menu={{
                items,
            }}
            overlayClassName={styles.main}
            open={show}
            placement="bottomRight"
            arrow={false}
            overlayStyle={{
                overflow: "hidden scroll",
                maxHeight: "80vh",
                borderRadius:"8px",
                boxShadow:
                    "0 6px 16px 0 rgb(0 0 0 / 8%), 0 3px 6px -4px rgb(0 0 0 / 12%), 0 9px 28px 8px rgb(0 0 0 / 5%)",
            }}
            onOpenChange={handleOpenChange}
            trigger={["click"]}
        >
            <Badge dot={!(countSeen === 0)} offset={[-16, 29]}>
                <Button type="text" className={styles["btn-r-container"]}>
                    <BellFilled
                        className={classNames({
                            "text-md-1": true,
                            isActive: show,
                        })}
                    />
                </Button>
            </Badge>
        </Dropdown>
    );
}

export default Notification;
