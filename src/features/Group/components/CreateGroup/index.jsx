import React, { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal, Spin, Typography } from "antd";
import groupApi from "../../../../api/groupApi";
import { useSelector } from "react-redux";
import InputSearchMember from "../../../../components/InputSearchMember/InputSearchMember";
import FormGroup from "./components/FormGroup";
import notificationApi from "../../../../api/notificationApi";
import styles from "./styles.module.css";
import userApi from "../../../../api/userApi";
import timelineDashboardApi from "../../../../api/timelineDashboardApi";

CreateGroup.propTypes = {};
CreateGroup.defaultProps = {};
function CreateGroup(props) {
    let socket = useSelector((state) => state.socket.socket);
    const user = useSelector((state) => state.user.current?.account);
    const idUser = user._id || localStorage.getItem("user_id");

    const [memberFiltered, setMemberFiltered] = useState([]);
    const [leader, setLeader] = useState();
    const [usersData, setUsersData] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [dataGroup, setDataGroup] = useState({});
    const [step, setStep] = useState(1);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const nextStep = () => {
        setStep(2);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setStep(1);
    };

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    const handleAdd = async () => {
        console.log({dataGroup})
        const memberid = memberFiltered.map((member) => member._id);
        const updateMember = { member: [...dataGroup.member, ...memberid] };
        try {
            const idGroup = dataGroup._id
            const nameGroup = dataGroup.name
            const titleTimeline = `Bạn đã tạo group ${nameGroup}`
            await groupApi.updateGroup(idGroup, updateMember)
            await timelineDashboardApi.createTimelineDashboard({titleTimeline})
            for (let i = 0; i < memberid.length; i++) {
                let notification = {
                    receiver: memberid[i],
                    type: "group",
                    title: `${leader ? leader.name : "Có người"} đã thêm bạn vào nhóm`,
                    description: nameGroup,
                    link: `groups`,
                };
                const resultNotificaton = await notificationApi.createNotification(notification);
                console.log(resultNotificaton)
                socket.emit("send-notification", resultNotificaton.data);
            }
            handleCancel();
        } catch (err) {
            console.log(err);
        }
    };
    const fechAllUser = async () => {
        try {
            const data = await userApi.getAllUser();
            if (data.success) {
                const dataFilter = data.allUser.filter((dt) => dt._id !== idUser);
                const leader = data.allUser.find((dt) => dt._id === idUser);
                setLeader(leader);
                setUsersData(dataFilter);
            }
        } catch (err) {
            alert(err.message);
        }
    };
    useEffect(() => {
        fechAllUser();
    }, []);

    const onFinish = (values) => {
        const Notificaton = { name: values.groupname, description: values.description, member: [] };
        async function post() {
            try {
                setStep(3);
                const response = await groupApi.createGroup(Notificaton);
                setDataGroup(response.group);
                nextStep();
            } catch (error) {
                alert(error);
            }
        }
        post();
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    return (
        <div className={styles.box}>
            <div className={styles.box_1}>
                <img
                    src="https://ik.imagekit.io/TLIT/Thang/team1.png?ik-sdk-version=javascript-1.4.3&updatedAt=1673205148869"
                    alt="thang"
                />
                <Typography.Text className="text-md" style={{ fontWeight: "500", color:"var(--color--text-default)" }}>
                    Create a group
                </Typography.Text>
            </div>

            <div>
                <Button type="primary" onClick={showModal}  icon={<PlusOutlined />}>
                    Create a group
                </Button>
                <Modal
                    className={styles.form}
                    title={
                        <Typography.Title level={3} style={{color:"var(--color--text-default)"}}>
                            {step === 1 ? "Create your group" : "Add members to group"}
                        </Typography.Title>
                    }
                    open={isModalOpen}
                    footer={null}
                    onCancel={handleCancel}
                    width={1000}
                >
                    {step === 1 && (
                        <FormGroup
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            handleChange={handleChange}
                        />
                    )}
                    {step === 3 && (
                        <div style={{ height: "300px", display: "flex",alignItems:"center",justifyContent:"center" }}>
                            <Spin tip="Tạo group..." size="large"></Spin>
                        </div>
                    )}
                    {step === 4 && (
                        <div style={{ height: "300px", display: "flex",alignItems:"center",justifyContent:"center" }}>
                            <Spin tip="Thêm thành viên..." size="large"></Spin>
                        </div>
                    )}
                    {step === 2 && (
                        <div>
                            <Typography.Text style={{color:"var(--color--text-default)"}}>
                                Start typing a name, distribution list, or security group to add to
                                your team. You can also add people outside your organisation as
                                guests by typing their email addresses.
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
                            <div className={styles["btn-form"]}>
                                <Button
                                    type="default"
                                    onClick={handleCancel}
                                    style={{ marginTop: "50px" }}
                                >
                                    Skip
                                </Button>
                            </div>
                        </div>
                    )}
                </Modal>
            </div>
        </div>
    );
}

export default CreateGroup;
