import { LeftOutlined, SettingOutlined, UserAddOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import groupApi from "../../api/groupApi";
import GroupAvatar from "../../components/Avatar/GroupAvatar";
import BarItem from "../../components/BarItem";
import TabBar from "../../components/TabBar";
import GRRouter from "./components/Router";
import styles from "./styles.module.css";
GroupDB.propTypes = {};

function GroupDB(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const id = location.pathname.split("/")[3];
    const [feature, setFeature] = useState();
    const user = useSelector((state) => state.user.current.account);
    const idUser = user?._id || localStorage.getItem("user_id");
    const [group, setGroup] = useState(null);
    const data = useSelector((state) => state.group.current);
    useEffect(() => {
        setFeature(location.pathname.split("/")[4]);
    }, [location]);

    useEffect(() => {
        if (JSON.stringify(data) !== "{}") {
            const result = {
                success: data.success,
                data: [...data.groupMade, ...data.groupJoined],
            };
            setGroup(result.data.filter((group) => group._id === id)[0]);
        } else {
            (async () => {
                try {
                    const { group } = await groupApi.getOnlyGroup(id);
                    if (group.member.find((mem) => mem === idUser)) {
                        setGroup(group);
                    } else {
                        navigate("/404");
                    }
                } catch (error) {
                    console.log(error);
                }
            })();
        }
    }, [data, id]);
    const onChange = (key) => {
        setFeature(key);
        navigate(`./${key.toLowerCase()}`);
    };
    const handleTask = (idTask) => {
        navigate(`./tasks/${idTask}`);
    };
    const handleClickBack = () => {
        navigate("/home/groups/");
    };

    const item = [
        {
            label: <BarItem typeSize={"sm"} label="General" />,
            key: "general",
            children: <GRRouter group={group}/>,
        },
        {
            label: <BarItem typeSize={"sm"} label="Tasks Overview" />,
            key: "tasks",
            children: <GRRouter handleTask={handleTask} idGroup={group?._id} group={group} />,
        },
        {
            label: <BarItem typeSize={"sm"} label="Timeline" />,
            key: "time-line",
            children: <GRRouter />,
        },
        {
            label: <BarItem typeSize={"sm"} label="Files" />,
            key: "files",
            children: <GRRouter />,
        },
    ];

    return (
        <div className="feature-container_right">
            {group && (
                <div id={group._id} style={{ backgroundColor: "var(--color--default)" }}>
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
                                style={{
                                    color: "var(--color--text-default)",
                                    margin: "0px",
                                    width: "70%",
                                    minWidth: "300px",
                                }}
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
                            style={{
                                fontSize: "12px",
                                color: "#555",
                                margin: "5px 0px 0px 15px",
                                width: "70%",
                                minWidth: "250px",
                            }}
                            ellipsis={true}
                        >
                            {group.description}
                        </Typography.Text>
                    </div>

                    <TabBar
                        onChange={onChange}
                        activeKey={feature}
                        data={item}
                        config={(()=>feature === "time-line" || feature === "general" ? false : true)()}
                    />
                </div>
            )}
        </div>
    );
}

export default GroupDB;
