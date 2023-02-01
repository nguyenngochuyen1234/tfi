import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";
import { Button, Collapse, Input, Skeleton, Typography } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { CaretRightOutlined, LeftOutlined, UserAddOutlined } from "@ant-design/icons";
import groupApi from "../../../../api/groupApi";
import THeader from "./components/THeader";
import TItem from "./components/TItem";
Manager.propTypes = {};

function Manager(props) {
    const navigate = useNavigate();
    const [usersInGR, setUsersInGR] = useState();
    const [group, setgroup] = useState();
    const [admin, setAdmin] = useState();
    const handleClickBack = () => {
        navigate(-1);
    };
    const { idGroup } = useParams();
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
                    <Button type="primary" icon={<UserAddOutlined />}>
                        Add Members
                    </Button>
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
                                <TItem key={admin._id} data={admin} />
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
                                        <TItem key={item._id} data={item} />
                                    ))}
                                </>
                            ) : (
                                <Skeleton active paragraph={{ rows: 4, width: "100%" }} />
                            )}
                        </Collapse.Panel>
                    </Collapse>
                </div>
            </div>
        </div>
    );
}

export default Manager;
