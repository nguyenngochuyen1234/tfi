import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    CloudUploadOutlined,
    LeftOutlined,
    LinkOutlined,
    PaperClipOutlined,
    PlusOutlined,
    UploadOutlined,
} from "@ant-design/icons";
import {
    Button,
    Checkbox,
    Col,
    Dropdown,
    Form,
    Input,
    Modal,
    Row,
    Tag,
    Typography,
    Upload,
} from "antd";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import exerciseApi from "../../../../api/exerciseApi";
import groupApi from "../../../../api/groupApi";
import taskApi from "../../../../api/taskApi";
import uploadApi from "../../../../api/uploadApi";
import Options from "../../../../components/Options";
import TaskLog from "../../../../components/TaskLog";
import styles from "./styles.module.css";
DetailTask.propTypes = {
    leader: PropTypes.string,
};
DetailTask.defaultProps = {
    leader: "",
};
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
function DetailTask({ leader }) {
    const params = useParams();
    const idTask = params.idTask;
    const [admin, setAdmin] = useState(leader);
    const user =
        useSelector((state) => state.user.current.account) ||
        JSON.parse(localStorage.getItem("user"));
    const [loading, setLoading] = useState({ status: "", load: false });
    const upload = useRef(null);
    const navigate = useNavigate();
    const [initData, setInitData] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModal2Open, setIsModal2Open] = useState(false);
    const [comment, setComment] = useState("");

    const [task, setTask] = useState();
    const handleSetCompleted = (e) => {
        const tg = e.target;
        console.log(tg.checked ? "complete" : "uncomplete");
    };
    const showModal = () => {
        setIsModalOpen(true);
    };
    const onFinish = (value) => {
        setIsModalOpen(false);
        const rs = { ...value, type: "link" };
        setInitData(rs);
        console.log(initData);
    };
    const onFinishComment = (value) => {
        console.log(value);
        setIsModal2Open(false);
        setComment(value.comment);
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
    const handleRemove = () => {
        setInitData(null);
        console.log(initData);
        return true;
    };
    useEffect(() => {
        (async () => {
            try {
                const { task } = await taskApi.getOnlyTask(idTask);
                setTask(task);
                setComment(task?.comment || "");
            } catch (error) {
                console.log(error);
            }
        })();
        if (!leader) {
            (async () => {
                try {
                    const { group } = await groupApi.getOnlyGroup(params.idGroup);
                    setAdmin(group.leader);
                } catch (error) {
                    console.log(error);
                }
            })();
        }
    }, []);
    console.log(task);
    const handleSubmit = () => {
        console.log(initData);
        if (initData.type === "file") {
            (async () => {
                try {
                    let formData = new FormData();
                    setLoading({ ...loading, load: true });
                    formData.append("file", initData.data[0]?.originFileObj);
                    const { link } = await uploadApi.upload(formData);
                    const response = await exerciseApi.submitExecrcise(idTask, {
                        data: link,
                        type: "file",
                        title: "",
                    });
                    setLoading({ status: "done", load: false });
                    const { task } = await taskApi.getOnlyTask(idTask);
                    setTask(task);
                    setComment(task?.comment || "");
                    console.log(response);
                } catch (error) {
                    console.log(error);
                }
            })();
        }
        if (initData.type === "link") {
            (async () => {
                try {
                    setLoading({ ...loading, load: true });
                    const response = await exerciseApi.submitExecrcise(idTask, {
                        data: initData.link,
                        type: "link",
                        title: initData.title,
                    });
                    setLoading({ status: "done", load: false });

                    console.log(response);
                    const { task } = await taskApi.getOnlyTask(idTask);
                    setTask(task);
                    setComment(task?.comment || "");
                } catch (error) {
                    console.log(error);
                }
            })();
        }
    };
    return (
        <div className={styles["detail-task"]}>
            {task && (
                <div style={{ height: "100%" }}>
                    <div className={styles["task-header"]}>
                        <Button
                            type="link"
                            className="link-back"
                            onClick={handleClickBack}
                            icon={<LeftOutlined />}
                        >
                            Back
                        </Button>
                        <div>
                            {task.status === "uncomplete" && <Tag color="magenta">Uncomplete</Tag>}
                            {task.status === "past-due" && <Tag color="red">Past Due</Tag>}
                            {task.status === "complete" && <Tag color="green">Completed</Tag>}
                            {task.member.includes(user._id) ? (
                                <Tag icon={<CheckCircleOutlined />} color="success">
                                    {admin === user._id ? "Trưởng nhóm" : "Thành viên"}
                                </Tag>
                            ) : (
                                <Tag icon={<CloseCircleOutlined />} color="error">
                                    Không là thành viên
                                </Tag>
                            )}
                            <Button
                                style={{ margin: "0px 20px" }}
                                onClick={handleSubmit}
                                type="primary"
                                icon={!task?.exercise?.data && <CloudUploadOutlined />}
                                loading={loading.load}
                                disabled={
                                    task.member.includes(user._id) &&
                                    ((initData?.link || initData?.data.length) !== 0 ||
                                        task?.exercise?.data)
                                        ? false
                                        : true
                                }
                            >
                                {task?.exercise?.data ? "Undo" : "Submit"}
                            </Button>
                        </div>
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
                                    name="LinkForm"
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
                                            display: "flex",
                                        }}
                                        className="text-sm"
                                    >
                                        Comment
                                        {user._id === admin && (
                                            <div style={{ marginLeft: "5px" }}>
                                                <Button
                                                    type="text"
                                                    size="small"
                                                    style={{ color: "inherit" }}
                                                    className="text-ssm"
                                                    onClick={() => setIsModal2Open(true)}
                                                    icon={<PlusOutlined />}
                                                ></Button>
                                                <Modal
                                                    title="Type your comment"
                                                    open={isModal2Open}
                                                    onCancel={() => setIsModal2Open(false)}
                                                    footer={null}
                                                >
                                                    <Form
                                                        className={styles["form-container"]}
                                                        name="CommentForm"
                                                        layout="vertical"
                                                        onFinish={onFinishComment}
                                                        onFinishFailed={onFinishFailed}
                                                        autoComplete="off"
                                                    >
                                                        <Form.Item label="Comment" name="comment">
                                                            <Input.TextArea
                                                                rows={4}
                                                                style={{
                                                                    maxHeight: "250px",
                                                                    overflow: "hidden auto",
                                                                }}
                                                                placeholder="Type your comment"
                                                            ></Input.TextArea>
                                                        </Form.Item>
                                                        <Form.Item>
                                                            <div
                                                                className={styles["btn-form"]}
                                                                style={{
                                                                    padding: "0px",
                                                                    marginBottom: "-15px",
                                                                }}
                                                            >
                                                                <Button
                                                                    type="primary"
                                                                    htmlType="submit"
                                                                >
                                                                    Ok
                                                                </Button>
                                                            </div>
                                                        </Form.Item>
                                                    </Form>
                                                </Modal>
                                            </div>
                                        )}
                                    </Typography.Text>
                                </div>
                                <div>
                                    <Typography.Paragraph>
                                        {comment || "No comment"}
                                    </Typography.Paragraph>
                                </div>
                            </div>
                            {admin === user._id && (
                                <div style={{ marginBottom: "16px" }}>
                                    <div>
                                        <Typography.Text
                                            style={{
                                                color: "var(--color--text-drop)",
                                                fontWeight: 500,
                                            }}
                                            className="text-sm"
                                        >
                                            Status
                                        </Typography.Text>
                                    </div>
                                    <div>
                                        <Checkbox
                                            onChange={handleSetCompleted}
                                            checked={task.status === "complete" ? true : false}
                                        >
                                            Completed
                                        </Checkbox>
                                    </div>
                                </div>
                            )}

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
                                {task.exercise ? (
                                    <div className={styles.resultContent}>
                                        <Row gutter={[8, 8]}>
                                            <Col span={4}>
                                                <img
                                                    style={{
                                                        width: "50px",
                                                        height: "50px",
                                                        borderRadius: "50%",
                                                    }}
                                                    src={task.exercise.avatar}
                                                    alt="avt"
                                                />
                                            </Col>
                                            <Col span={8}>{task.exercise.name}</Col>
                                            <Col span={6}>
                                                {dayjs(task.exercise.time).format("DD-MM-YY HH:MM")}
                                            </Col>

                                            <Col span={6}>
                                                <a
                                                    href={task.exercise.data}
                                                    rel="noreferrer"
                                                    target="_blank"
                                                >
                                                    {task.exercise.title === ""
                                                        ? "File"
                                                        : task.exercise.title}
                                                </a>
                                            </Col>
                                        </Row>
                                    </div>
                                ) : (
                                    "Chưa có ai nộp"
                                )}
                            </div>
                        </Col>
                    </Row>
                </div>
            )}
        </div>
    );
}

export default DetailTask;
