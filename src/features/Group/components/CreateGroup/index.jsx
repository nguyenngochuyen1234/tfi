import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal, Typography } from "antd";
import groupApi from "../../../../api/groupApi";
import { useSelector } from "react-redux";
import InputSearchMember from "../../../../components/InputSearchMember/InputSearchMember";
import FormGroup from "./components/FormGroup";
import notificationApi from "../../../../api/notificationApi";
import styles from "./styles.module.css";

CreateGroup.propTypes = {};
CreateGroup.defaultProps = {};
function CreateGroup(props) {

    let socket = useSelector(state => state.socket.socket)

    const [memberFiltered, setMemberFiltered] = useState([]);
    const [leader, setLeader] = useState()

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
        const memberid = memberFiltered.map(member => member._id)
        const updateMember = {member: [...dataGroup.member, ...memberid]};
        try {
            const idGroup = dataGroup._id
            await groupApi.updateGroup(idGroup, updateMember)
            for(let i=0;i<memberid.length;i++){
                let notification = {
                    receiver:memberid[i],
                    type:"group",
                    title:`${leader ? leader.name : "Có người"} đã thêm bạn vào nhóm`,
                    link: `groups`,
                }
                socket.emit("send-notification",notification)
                await notificationApi.createNotification(notification)
            }
            handleCancel()
        } catch (err) {
            console.log(err)
        }
    }
    const onFinish = (values) => {
        const result = { name: values.groupname, description: values.description, member: [] };
        async function post() {
            try {
                const response = await groupApi.createGroup(result);
                alert(response.message);
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
                <Typography.Text className="text-md" style={{ fontWeight: "500" }}>
                    Create a group
                </Typography.Text>
            </div>

            <div>
                <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
                    Create a group
                </Button>
                <Modal
                    className={styles.form}
                    title={
                        <Typography.Title level={3}>
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

                    {step === 2 && (
                        <div>
                            <Typography.Text>
                                Start typing a name, distribution list, or security group to add to
                                your team. You can also add people outside your organisation as
                                guests by typing their email addresses.
                            </Typography.Text>
                            <InputSearchMember
                                memberFiltered={memberFiltered}
                                setMemberFiltered={setMemberFiltered}
                                setLeader={setLeader}
                            />
                            <Button type="primary" onClick={handleAdd}>
                                Add
                            </Button>
                            <div className={styles["btn-form"]}>
                                <Button type="default" onClick={handleCancel} style={{ marginTop: "50px" }}>
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
