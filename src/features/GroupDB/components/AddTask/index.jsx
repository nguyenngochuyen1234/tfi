import React,{useState} from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";
import { Button, DatePicker, Form, Input, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import InputSearchMember from "../../../../components/InputSearchMember/InputSearchMember";
import moment from "moment/moment";
import taskApi from "../../../../api/taskApi";
import { useParams } from "react-router-dom";
AddTask.propTypes = {
};
AddTask.defaultProps = {
};


function AddTask(props) {
    const config = {
        rules: [
            {
                type: "object",
                required: true,
                message: "Please select time!",
            },
        ],
    };
    const navigate = useNavigate();

    const [memberFiltered, setMemberFiltered] = useState([]);
    const params = useParams();
    const idGroup = params.idGroup
    const handleClickBack = () => {
        navigate(-1);
     
    };
    const onFinish = async(values) => {
        try{
            const memberId = memberFiltered?.map(pp=>pp._id)
            const result = {
                ...values,
                member:memberId
            };
            console.log("Success:", result);
            const data = await taskApi.createTask(idGroup,result)
            if(data.success){
                alert("create task done")
            }
        }catch(err){
            console.log(err.message)
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    return (
        <div className={styles["add-task"]}>
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
            <div className={styles.form}>
                <Typography.Title level={3}>Create a new task</Typography.Title>
                <div style={{ minWidth: "400px", maxWidth: "600px" }}>
                    <Form
                        className={styles["form-container"]}
                        name="basic"
                        layout="vertical"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Task name"
                            name="name"
                            rules={[{ required: true, message: "Please input your task name!" }]}
                        >
                            <Input placeholder="Your task name" />
                        </Form.Item>

                        <Form.Item name="description" label="About">
                            <Input.TextArea placeholder="Let talk about description this task" />
                        </Form.Item>
                        <InputSearchMember
                            memberFiltered={memberFiltered}
                            setMemberFiltered={setMemberFiltered}
                        />
                        <Form.Item name="deadline" label="Due on" {...config}>
                            <DatePicker
                                disabledDate={(current) => {
                                    let customDate = moment().format("DD-MM-YYYY");
                                    return current && current <= moment(customDate, "DD-MM-YYYY");
                                }}
                                showTime
                                format="DD-MM-YYYY HH:mm"
                            />
                        </Form.Item>
                        <Form.Item>
                            <div className={styles["btn-form"]}>
                                <Button type="primary" htmlType="submit">
                                    Create
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default AddTask;
