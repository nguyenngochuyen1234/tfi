import React, { useEffect, useState } from "react";
import queryString from "query-string";
import PropTypes from "prop-types";
import { Button, Col, Collapse, Dropdown, Row, Typography } from "antd";
import { LeftOutlined, LinkOutlined, PaperClipOutlined, UploadOutlined } from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import TaskLog from "../../../../components/TaskLog";
import Options from "../../../../components/Options";
import taskApi from "../../../../api/taskApi";
import SingleAvatar from "../../../../components/Avatar/SingleAvatar";
import GroupAvatar from "../../../../components/Avatar/GroupAvatar";
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
    const location = useLocation();
    const navigate = useNavigate();
    const handleClickBack = () => {
        navigate(-1);
    };
    const onClick = ({ key }) => {
        console.log(key);
    };
    const [task, setTask] = useState();
    useEffect(() => {
        (async () => {
            try {
                const param = location.pathname.split("/")[5];

                const response = await taskApi.getOnlyTask(param);
                console.log(response);
                setTask(response.task);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);
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
                        <Button style={{ marginRight: "20px" }} type="primary">
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
                                            <Row gutter={[8,8]} >
                                                <Col span={6}>
                                                    <img width={"40px"} src="https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2022/04/Anh-cute.jpg?ssl=1" alt="avt"/>
                                                </Col>
                                                <Col span={8}>
                                                    Tên
                                                </Col>
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
