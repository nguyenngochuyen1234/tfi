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
import { v4 as uuidv4 } from "uuid";
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
    const [menuProps, setMenuProps] = useState({ items: [] });
    const [notificationSocket, setNotificationSocket] = useState();
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
                    let id = uuidv4();
                    return {
                        key: id,
                        label: (
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    position: "relative",
                                }}
                                onClick={() => handleClickNotification(dt, id)}
                            >
                                {!dt.seen && (
                                    <div
                                        style={{
                                            width: "10px",
                                            height: "10px",
                                            borderRadius: "50%",
                                            position: "absolute",
                                            backgroundColor: "#0084ff",
                                            top: "85%",
                                            transform: "translateY(-50%)",
                                            right: "0px",
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

                setMenuProps({ items: itemsData });
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
                console.log({ msg });
                setNotificationSocket(msg);
            });
        }
    }, [socket]);
    useEffect(() => {
        if (notificationSocket) {
            console.log({ notificationSocket });
            setCountSeen(1);
            setMenuProps((prev) => {
                const prevNotification = [...prev.items];
                let id = uuidv4();
                return {
                    items: [
                        ...prevNotification,
                        {
                            key: id,
                            label: (
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        position: "relative",
                                    }}
                                    onClick={() => handleClickNotification(notificationSocket, id)}
                                >
                                    <div
                                        style={{
                                            width: "10px",
                                            height: "10px",
                                            borderRadius: "50%",
                                            position: "absolute",
                                            backgroundColor: "#0084ff",
                                            top: "85%",
                                            transform: "translateY(-50%)",
                                            right: "0px",
                                        }}
                                    ></div>
                                    <Notification data={notificationSocket} color={"#0084ff"} />
                                </div>
                            ),
                        },
                    ],
                };
            });
        }
    }, [notificationSocket]);
    const handleClickNotification = async (dt, key) => {
        console.log({ dt, key });
        try {
            const id = dt._id;
            if (!dt.seen) {
                setCountSeen((prev) => (prev - 1 < 0 ? 0 : prev - 1));
                await notificationApi.updateNotification(id, { seen: "true" });
                setMenuProps((prev) => {
                    return {
                        items: prev.items.map((item) =>
                            item.key == key
                                ? {
                                      key: item.key,
                                      label: (
                                          <div
                                              style={{
                                                  display: "flex",
                                                  flexDirection: "row",
                                                  backgroundColor: "#fff",
                                              }}
                                              onClick={() => handleClickNotification(dt, item.key)}
                                          >
                                              <Notification data={item} />
                                          </div>
                                      ),
                                  }
                                : item
                        ),
                    };
                });
            }
            navigate(dt.link);
            setShow(false);
        } catch (err) {
            console.log(err.message);
        }
    };
    console.log(menuProps);
    return (
        <Dropdown
            menu={menuProps}
            open={show}
            placement="bottomRight"
            arrow={false}
            overlayStyle={{
                overflow: "hidden auto",
                maxHeight: "80vh",
                borderRadius: "8px",
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
