import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";
import { Badge, Button, Collapse, Input, Modal, Skeleton, Typography } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { CaretRightOutlined, FrownOutlined, IdcardOutlined, LeftOutlined, PlusOutlined, StopOutlined, UserAddOutlined } from "@ant-design/icons";
import groupApi from "../../../../api/groupApi";
import THeader from "./components/THeader";
import TItem from "./components/TItem";
import InputSearchMember from "../../../../components/InputSearchMember/InputSearchMember";
import notificationApi from "../../../../api/notificationApi";
import { useSelector } from "react-redux";
import userApi from "../../../../api/userApi";
import Options from "../../../../components/Options";
Manager.propTypes = {};

const fakeData = [
    {
        avatar: "https://firebasestorage.googleapis.com/v0/b/storageapp-13725.appspot.com/o/1675352632284.b35d7780b7a811cf31556f341c9091a2.jpg?alt=media",
        createAt: "2023-02-02T15:43:55.312Z",
        gmail: "linh@gmail.com",
        groupJoin: ["63dcbebbd99db97f37771cef"],
        groupMade: [],
        major: "khoa học máy tính",
        name: "xxxxx",
        _id:"12312321",
        password:
            "$argon2id$v=19$m=65536,t=3,p=4$lpbfspaMb0BYOMLyn1SNEg$n1HhedkigWcKDoKHPOC1iQgQIjDYAe67rmchMyHFiDo",
        phoneNumber: "012354875",
        school: "Đại học Thăng Long",
        tasks: [],
        username: "linh",
    },
    {
        avatar: "https://firebasestorage.googleapis.com/v0/b/storageapp-13725.appspot.com/o/1675352632284.b35d7780b7a811cf31556f341c9091a2.jpg?alt=media",
        createAt: "2023-02-02T15:43:55.312Z",
        gmail: "linh@gmail.com",
        _id:"12312323",

        groupJoin: ["63dcbebbd99db97f37771cef"],
        groupMade: [],
        major: "khoa học máy tính",
        name: "xxxxx",
        password:
            "$argon2id$v=19$m=65536,t=3,p=4$lpbfspaMb0BYOMLyn1SNEg$n1HhedkigWcKDoKHPOC1iQgQIjDYAe67rmchMyHFiDo",
        phoneNumber: "012354875",
        school: "Đại học Thăng Long",
        tasks: [],
        username: "linh",
    },
];
const item1 = [
    {
        label: <Options icon={<IdcardOutlined />} label="Xem chi tiết" config="sm" />,
        key: "infor",
    },
    {
        label: <Options icon={<PlusOutlined />} label="Xác nhận thêm" config="sm" />,
        key: "add",
    },
    {
        label: <Options icon={<StopOutlined />} label="Từ chối" config="sm" />,
        key: "deny",
    },
];
const item2 = [
    {
        label: <Options icon={<IdcardOutlined />} label="Xem chi tiết" config="sm" />,
        key: "infor",
    },
    {
        label: <Options icon={<FrownOutlined />} label="Đuổi khỏi nhóm" config="sm" />,
        key: "kick",
    },
];
const item3 = [
    {
        label: <Options icon={<IdcardOutlined />} label="Xem chi tiết" config="sm" />,
        key: "infor",
    },

];
function Manager(props) {
    let socket = useSelector((state) => state.socket.socket);

    const navigate = useNavigate();
    const [usersInGR, setUsersInGR] = useState();
    const [group, setgroup] = useState();
    const [admin, setAdmin] = useState();
    const { idGroup } = useParams();
    const user =
        useSelector((state) => state.user.current?.account) ||
        JSON.parse(localStorage.getItem("user"));
    const leader =
        useSelector((state) => state.user.current?.account.name) ||
        localStorage.getItem("name_user");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [memberFiltered, setMemberFiltered] = useState([]);
    const [usersData, setUsersData] = useState();
    const [oldMember, setOldMember] = useState([]);
    const handleClickBack = () => {
        navigate(-1);
    };
    const showModal = () => {
        const oldUsers = group.member;
        setOldMember(oldUsers);
        (async () => {
            try {
                const { allUser } = await userApi.getAllUser();
                const newUsers = allUser?.filter((user) => !oldUsers.includes(user._id));
                setUsersData(newUsers);
                setIsModalOpen(true);
            } catch (err) {
                console.log(err);
            }
        })();
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleAdd = async () => {
        const memberid = memberFiltered.map((member) => member._id);
        const updateMember = { member: [...oldMember, ...memberid] };
        try {
            await groupApi.updateGroup(idGroup, updateMember);
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
    const handleClick= (key, value) => {
        console.log(key, value);
    }
    useEffect(() => {

        (async () => {
            try {
                const { users } = await groupApi.getUsersByIds(idGroup);
                const { group } = await groupApi.getOnlyGroup(idGroup);
                const configUserInGr = users.filter((item) => item._id !== group.leader);
                const configAdmin = users.find((item) => item._id === group.leader);

                setUsersInGR(configUserInGr);
                setAdmin(configAdmin);
                setgroup(group);
                console.log(usersInGR);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    return (
        <div className={styles.managerGroup}>
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
                {group ? (
                    <Typography.Title
                        level={3}
                        ellipsis={true}
                        style={{
                            color: "var(--color--text-default)",
                            width: "100%",
                            minWidth: "300px",
                        }}
                    >
                        {group.name}
                    </Typography.Title>
                ) : (
                    <Skeleton active paragraph={{ rows: 0, width: "100%" }} />
                )}

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "10px",
                        justifyContent: "space-between",
                    }}
                >
                    <div style={{ width: "400px" }}>
                        <Input.Group compact style={{ width: "90%" }}>
                            <Input.Search
                                allowClear
                                defaultValue=""
                                placeholder="Search For Member..."
                            />
                        </Input.Group>
                    </div>
                    {group?.leader === user._id && (
                        <Button type="primary" icon={<UserAddOutlined />} onClick={showModal}>
                            Add Members
                        </Button>
                    )}
                    <Modal
                        title="Add member"
                        open={isModalOpen}
                        onCancel={handleCancel}
                        footer={null}
                    >
                        <Typography.Text style={{ color: "var(--color--text-default)" }}>
                            Start typing a name, distribution list, or security group to add to your
                            team. You can also add people outside your organisation as guests by
                            typing their email addresses.
                        </Typography.Text>
                        <div className={styles.flex}>
                            <InputSearchMember
                                memberFiltered={memberFiltered}
                                setMemberFiltered={setMemberFiltered}
                                usersData={usersData}
                            />
                            <Button type="primary" onClick={handleAdd}>
                                Add
                            </Button>
                        </div>
                    </Modal>
                </div>

                <div
                    style={{
                        overflow: "hidden auto",
                        maxHeight: "calc(100vh - 230px)",
                    }}
                >
                    <Collapse
                        expandIcon={({ isActive }) => (
                            <CaretRightOutlined
                                style={{ color: "var(--color--text-default)" }}
                                rotate={isActive ? 90 : 0}
                            />
                        )}
                        defaultActiveKey={["owner"]}
                        ghost
                    >
                        <Collapse.Panel
                            header={
                                <span
                                    style={{ color: "var(--color--text-default)", fontWeight: 500 }}
                                >
                                    Owner
                                </span>
                            }
                            key="owner"
                        >
                            <THeader />
                            {admin ? (
                                <TItem key={admin._id} data={admin} items={item3} handleClick={handleClick} />
                            ) : (
                                <Skeleton active paragraph={{ rows: 1, width: "100%" }} />
                            )}
                        </Collapse.Panel>
                        <Collapse.Panel
                            header={
                                <span
                                    style={{ color: "var(--color--text-default)", fontWeight: 500 }}
                                >
                                    Members({usersInGR && usersInGR.length})
                                </span>
                            }
                            key="member"
                        >
                            <THeader />
                            {usersInGR ? (
                                <>
                                    {usersInGR.map((item) => (
                                        <TItem key={item._id} data={item} items={group?.leader === user._id?item2:item3} handleClick={handleClick} />
                                    ))}
                                </>
                            ) : (
                                <Skeleton active paragraph={{ rows: 4, width: "100%" }} />
                            )}
                        </Collapse.Panel>
                        {group?.leader === user._id &&<Collapse.Panel
                            header={
                                <span
                                    style={{ color: "var(--color--text-default)", fontWeight: 500 }}
                                >
                                     <Badge dot={(fakeData && fakeData.length>0)?true:false} offset={[10, 13]} color="rgb(52,141,255)"  >
                                     Pending({fakeData && fakeData.length})

                                     </Badge>
                                </span>
                            }
                            key="pending"
                        >
                            <THeader />
                            {fakeData ? (
                                <>
                                    {fakeData.map((item) => (
                                        <TItem key={item._id} data={item} items={item1} handleClick={handleClick} />
                                    ))}
                                </>
                            ) : (
                                <Skeleton active paragraph={{ rows: 4, width: "100%" }} />
                            )}
                        </Collapse.Panel>}
                    </Collapse>
                </div>
            </div>
        </div>
    );
}

export default Manager;
