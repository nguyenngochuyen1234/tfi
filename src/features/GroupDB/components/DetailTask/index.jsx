import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Col, Dropdown, Row, Typography } from "antd";
import { LeftOutlined, LinkOutlined, PaperClipOutlined, UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import TaskLog from "../../../../components/TaskLog";
import Options from "../../../../components/Options";
DetailTask.propTypes = {
    setRender: PropTypes.func.isRequired,
    data: PropTypes.object,
};
DetailTask.defaultProps = {
    data: null,
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
function DetailTask({ data, setRender }) {
    const navigate = useNavigate();
    const handleClickBack = () => {
        navigate("./tasks");
        if (setRender) setRender("");
    };
    const onClick = ({ key }) => {
        console.log(key);
    };
    const [task, setTask] = useState(data);
    useEffect(() => {
        if (!data) {
            //get data from api
        }
    }, []);
    return (
        <div className={styles["detail-task"]}>
            {task && (
                <div>
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
                        style={{ padding: "10px", overflowY: "auto", overflowX: "hidden" }}
                    >
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <TaskLog task={data} />
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
                        <Col className={styles.flex} xs={24} sm={24} md={12} lg={12} xl={12}>
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
                                        {data.comment || "No comment"}
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
                            </div>
                        </Col>
                    </Row>
                </div>
            )}
        </div>
    );
}

export default DetailTask;
