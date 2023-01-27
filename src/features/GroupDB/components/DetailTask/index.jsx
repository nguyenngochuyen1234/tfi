import {
    CloudUploadOutlined,
    LeftOutlined,
    LinkOutlined,
    PaperClipOutlined,
    UploadOutlined,
} from "@ant-design/icons";
import { Button, Col, Dropdown, Form, Input, Modal, Row, Typography, Upload } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import exerciseApi from "../../../../api/exerciseApi";
import taskApi from "../../../../api/taskApi";
import uploadApi from "../../../../api/uploadApi";
import Options from "../../../../components/Options";
import TaskLog from "../../../../components/TaskLog";
import styles from "./styles.module.css";
const rocket = require("../../../../Effects/rocket.gif");
DetailTask.propTypes = {};
DetailTask.defaultProps = {};
const items = [
    {
        key: "link",
        label: <Options icon={<LinkOutlined />} label="Link" config="sm" />,
    },
    {
        key: "upload",
        label: <Options icon={<UploadOutlined />} label="Upload from this device" config="sm" />,
    },
];
function DetailTask(props) {

    const params = useParams();
    const idTask = params.idTask


    const user =
        useSelector((state) => state.user.current.account) ||
        JSON.parse(localStorage.getItem("user"));
    const [loading, setLoading] = useState({ status: "", load: false });
    const location = useLocation();
    const upload = useRef(null);
    const navigate = useNavigate();
    const [data, setData] = useState();
    const [initData, setInitData] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [task, setTask] = useState();

    const showModal = () => {
        setIsModalOpen(true);
    };
    const onFinish = (value) => {
        setIsModalOpen(false);
        setInitData(value);
        console.log(initData)
    };
    const onFinishFailed = (e) => {
        console.log(e);
    };
    const handleChange = (file) => {
        setInitData({ data: file?.fileList || [], type: "file" });
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleClickBack = () => {
        navigate(-1);
    };
    const onClick = ({ key }) => {
        if (key === "upload") {
            upload.current.click();
        }
        if (key === "link") {
            showModal();
        }
    };
    const handleRemove =() => {
        setInitData(null);
        console.log(initData)
        return true;
    }
    useEffect(() => {
        (async () => {
            try {
                const param = location.pathname.split("/")[5];
                const response = await taskApi.getOnlyTask(param);
                setTask(response.task);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);
    console.log(task);
    const handleSubmit = () => {
        if (initData.type === "file") {
            (async () => {
                try {
                    let formData = new FormData();
                    setLoading({ ...loading, load: true });
                    formData.append("file", initData.data[0]?.originFileObj);
                    const { link } = await uploadApi.upload(formData);
                    await exerciseApi.submitExecrcise(idTask,{data:link, type:"file"})
                    setLoading({ status: "done", load: false });
                    setTimeout(() => {
                        setLoading({ status: "", load: false });
                    }, 4000);
                    // upload apu
                } catch (error) {
                    console.log(error);
                }
            })();
        }
        if (initData.type === "link") {
            const result = {
                createAt: Date.now(),
                name: user.name,
                avatar: user.avatar,
                file: {
                    type: "file",
                    data: initData.link,
                },
                _idUser: user.id,
                _id: Math.floor(Math.random() * 10),
            };
            console.log(result);
        }
    };
    return (
        <div className={styles["detail-task"]}>
            {task && (
                <div style={{ height: "100%" }}>
                    {loading.status === "done" && rocket && (
                        <img className={styles.rocket} src={rocket} alt="rocket" />
                    )}

                    <div className={styles["task-header"]}>
                        <Button
                            type="link"
                            className="link-back"
                            onClick={handleClickBack}
                            icon={<LeftOutlined />}
                        >
                            Back
                        </Button>
                            <Button
                                style={{ marginRight: "20px" }}
                                onClick={handleSubmit}
                                type="primary"
                                icon={<CloudUploadOutlined />}
                                loading={loading.load}
                                disabled={initData?.link || initData?.data ? false : true}
                            >
                                Submit
                            </Button>
                    </div>
                    <Row
                        gutter={[24, 24]}
                        style={{
                            padding: "10px 5px",
                            overflowY: "auto",
                            overflowX: "hidden",
                            height: "95%",
                            marginLeft: "1px",
                            marginRight: "1px",
                        }}
                    >
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <TaskLog task={task} />
                            <div>
                                <Typography.Text
                                    style={{ color: "var(--color--text-drop)", fontWeight: 500 }}
                                    className="text-sm"
                                >
                                    My task
                                </Typography.Text>
                            </div>

                            <Dropdown
                                overlayClassName={styles.main}
                                menu={{
                                    items,
                                    onClick,
                                }}
                                placement="bottomLeft"
                                arrow={false}
                                trigger={["click"]}
                            >
                                <div
                                    style={{
                                        cursor: "pointer",
                                        color: "var(--color--df-mess)",
                                        width: "fit-content",
                                        marginTop: "5px",
                                    }}
                                >
                                    <PaperClipOutlined style={{ marginRight: "5px" }} />
                                    Attach
                                </div>
                            </Dropdown>
                            <Upload
                                onChange={handleChange}
                                maxCount={1}
                                listType="picture"
                                className="uploadTask"
                                onRemove={handleRemove}
                                beforeUpload={() => false}
                            >
                                <span className={styles.upload} ref={upload}></span>
                            </Upload>
                            {initData?.link && (
                                <div style={{ marginTop: "-10px" }}>
                                    <a
                                        style={{ textDecoration: "underline" }}
                                        href={initData.link}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {initData.title}
                                        <LinkOutlined />
                                    </a>
                                </div>
                            )}
                            <Modal
                                title="Type your link"
                                open={isModalOpen}
                                onCancel={handleCancel}
                                footer={null}
                            >
                                <Form
                                    className={styles["form-container"]}
                                    name="basic"
                                    layout="vertical"
                                    onFinish={onFinish}
                                    onFinishFailed={onFinishFailed}
                                    autoComplete="off"
                                >
                                    <Form.Item
                                        label="Title"
                                        name="title"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please type your title for link!",
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Type your title" />
                                    </Form.Item>
                                    <Form.Item
                                        label="Link"
                                        name="link"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please type your link!",
                                            },
                                        ]}
                                    >
                                        <Input placeholder="https://...." />
                                    </Form.Item>
                                    <Form.Item>
                                        <div className={styles["btn-form"]}>
                                            <Button type="primary" htmlType="submit">
                                                Ok
                                            </Button>
                                        </div>
                                    </Form.Item>
                                </Form>
                            </Modal>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <div>
                                <div>
                                    <Typography.Text
                                        style={{
                                            color: "var(--color--text-drop)",
                                            fontWeight: 500,
                                        }}
                                        className="text-sm"
                                    >
                                        Comment
                                    </Typography.Text>
                                </div>
                                <div>
                                    <Typography.Paragraph>
                                        {task.comment || "No comment"}
                                    </Typography.Paragraph>
                                </div>
                            </div>

                            <div className={styles.result}>
                                <div>
                                    <Typography.Text
                                        style={{
                                            color: "var(--color--text-drop)",
                                            fontWeight: 500,
                                        }}
                                        className="text-sm"
                                    >
                                        Result
                                    </Typography.Text>
                                </div>
                                <div>
                                    {task.member.map((member) => (
                                        <div key={member} className={styles.wrap}>
                                            <Row gutter={[8, 8]}>
                                                <Col span={6}>
                                                    <img
                                                        width={"40px"}
                                                        src="https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2022/04/Anh-cute.jpg?ssl=1"
                                                        alt="avt"
                                                    />
                                                </Col>
                                                <Col span={8}>Tên</Col>
                                                <Col span={6}>
                                                    <Link to="">a.pdf</Link>
                                                </Col>
                                            </Row>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            )}
        </div>
    );
}

export default DetailTask;
