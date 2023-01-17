import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal, Typography } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import groupApi from "../../../../api/groupApi";
import InputSearchMember from "../../../../compoments/InputSearchMember/InputSearchMember";
import FormGroup from "./components/FormGroup";
import styles from "./styles.module.css";

CreateGroup.propTypes = {};
CreateGroup.defaultProps = {};
function CreateGroup(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [memberFiltered, setMemberFiltered] = useState([])

    const [dataGroup,setDataGroup]=useState({});
    const [step, setStep] = useState(1);
    const user = useSelector((state) => state.user.current);
    const idUser = user._id;
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
    const onFinish = (values) => {
        const result = { name: values.groupname, description: values.description, leader: idUser ,member:memberFiltered,projects:[]};
        async function post(){
            try {
                const response=await groupApi.createGroup(result);
                alert("created done");
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
                                group={dataGroup}
                            />
                            <div className={styles["btn-form"]}>
                            <Button type="default" onClick={handleCancel} style={{marginTop:"50px"}}>
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
