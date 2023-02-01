import { LeftOutlined, SettingOutlined, UserAddOutlined, CopyOutlined } from "@ant-design/icons";
import { Button, Typography, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import groupApi from "../../api/groupApi";
import GroupAvatar from "../../components/Avatar/GroupAvatar";
import BarItem from "../../components/BarItem";
import TabBar from "../../components/TabBar";
import GRRouter from "./components/Router";
import styles from "./styles.module.css";
import notificationApi from "../../api/notificationApi";
import InputSearchMember from "../../components/InputSearchMember/InputSearchMember";
import userApi from "../../api/userApi";
GroupDB.propTypes = {};

function GroupDB(props) {
    let socket = useSelector((state) => state.socket.socket);

    const location = useLocation();
    const navigate = useNavigate();
    const id = location.pathname.split("/")[3];
    const leader = localStorage.getItem("name_user");

    const [memberFiltered, setMemberFiltered] = useState([]);
    const [usersData, setUsersData] = useState([]);
    const [allUser, setAllUser] = useState([]);
    const [feature, setFeature] = useState();
    const [oldMember, setOldMember] = useState([]);

    const user = useSelector((state) => state.user.current?.account);
    const idUser = user?._id || localStorage.getItem("user_id");
    const [group, setGroup] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setFeature(location.pathname.split("/")[4]);
    }, [location]);
    useEffect(() => {
        fetchAllMember();
    }, []);
    useEffect(() => {
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
    }, [id]);

    const fetchAllMember = async () => {
        try {
            const allMember = await userApi.getAllUser();
            if (allMember.success) {
                setAllUser(allMember.allUser);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const showModal = () => {
        const oldUsers = group.member;
        setOldMember(oldUsers);
        const newUsers = allUser?.filter((user) => !oldUsers.includes(user._id));
        setUsersData(newUsers);
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
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
    const handleAdd = async () => {
        const memberid = memberFiltered.map((member) => member._id);
        const updateMember = { member: [...oldMember, ...memberid] };
        try {
            await groupApi.updateGroup(id, updateMember);
            for (let i = 0; i < memberid.length; i++) {
                let notification = {
                    receiver: memberid[i],
                    type: "group",
                    title: `${leader || "Có người"} đã thêm bạn vào nhóm`,
                    description: group.name,
                    link: `groups`,
                };
                const result = await notificationApi.createNotification(notification);
                socket.emit("send-notification", result);
            }
            alert("Add member done");
            handleCancel();
        } catch (err) {
            console.log(err);
        }
    };

    const item = [
        {
            label: <BarItem typeSize={"sm"} label="General" />,
            key: "general",
            children: <GRRouter group={group} />,
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
            <Modal
                title="Add member"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
            >
                <InputSearchMember
                    memberFiltered={memberFiltered}
                    setMemberFiltered={setMemberFiltered}
                    usersData={usersData}
                />
                <Button type="primary" onClick={handleAdd}>
                    Add
                </Button>
            </Modal>
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
                                    onClick={showModal}
                                />
                                <Button
                                    style={{ marginLeft: "20px" }}
                                    size="large"
                                    onClick={()=>navigate("./setting")}
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
                        config={(() =>
                            feature === "time-line" || feature === "general" ? false : true)()}
                    />
                </div>
            )}
        </div>
    );
}

export default GroupDB;
