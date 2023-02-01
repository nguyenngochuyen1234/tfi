import { DeleteOutlined, LeftOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { Button, Input, notification, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import groupApi from "../../api/groupApi";
import BarItem from "../../components/BarItem";
import TabBar from "../../components/TabBar";
import CreateGroup from "./components/CreateGroup";
import FilterGroups from "./components/FilterGroups";
import JoinGroup from "./components/JoinGroup";
import notificationApi from "../../api/notificationApi";

import styles from "./styles.module.css";
import timelineDashboardApi from "../../api/timelineDashboardApi";

FeatureGroup.propTypes = {};

function FeatureGroup(props) {
    const dispatch = useDispatch()
    let socket = useSelector(state => state.socket.socket)
    const [api, contextHolder] = notification.useNotification();
    const leaderName = localStorage.getItem("name_user")

    const [allGroups, setAllGroups] = useState([]);
    const [filterGroups, setFilterGroups] = useState([]);
    const [isCreateJoin, setIsCreateJoin] = useState(false);
    const handleClickCreateJoin = () => {
        setIsCreateJoin(true);
    };
    const handleClickBack = () => {
        setIsCreateJoin(false);
    };
    useEffect(() => {
        (async () => {
            try {

            } catch (error) {
                console.log(error);
            }
        })()
    }, [])
    useEffect(() => {
        (async () => {
            try {
               
               const data= await groupApi.getAllGroupUser();
                
                
                setAllGroups(data);
                setFilterGroups(data.groupMade);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [isCreateJoin]);
    const onChange = (key) => {
        setFilterGroups(allGroups[key]);

    };
    const handleClick = async (key, idGroup) => {
        if(key==="link"){
            navigator.clipboard.writeText(window.location.href+idGroup)
            api.success({
                message: `Copy thành công`,
                description: "Đã copy link group",
                duration:2,
              });
        }
        if (key === "delete") {
            try {
                const delGroup = await groupApi.delGroup(idGroup);
                const groupData = delGroup.group
                const memberGroup = groupData.member
                console.log(memberGroup.length)
                for (let i = 0; i < memberGroup.length; i++) {
                    let notification = {
                        receiver: memberGroup[i],
                        type: "group",
                        title: `${leaderName || "Có người"} đã xóa nhóm`,
                        description: groupData.name,
                        link: `groups`,
                    }
                    console.log(notification)
                    const resultNotificaton = await notificationApi.createNotification(notification)
                    if(resultNotificaton.success){
                        socket.emit("send-notification", resultNotificaton.data)
                    }
                }
                const titleTimeline = `Bạn đã xóa nhóm ${groupData.name}`
                await timelineDashboardApi.createTimelineDashboard({titleTimeline})
                const cloneFilterGroups = filterGroups.filter((group) => {
                    return group._id !== idGroup;
                });
                api.open({
                    message: `Xóa thành công`,
                    description: "Xóa group thành công",
                    duration: 2,
                    icon: < DeleteOutlined style={{ color: "var(--color--df-mess)" }} />
                });
                setFilterGroups(cloneFilterGroups);


            } catch (error) {
                console.log(error);
            }
        }
    };

    const items = [
        {
            label: <BarItem label="Groups has been created" />,
            key: "groupMade",
            children: (
                <FilterGroups data={filterGroups} handleClick={handleClick} status="created" />
            ),
        },
        {
            label: <BarItem label="Groups has been joined" />,
            key: "groupJoined",
            children: (
                <FilterGroups data={filterGroups} handleClick={handleClick} status="joined" />
            ),
        },
    ];

    return (
        <div className="feature-container_right">
            {contextHolder}
            {!isCreateJoin && (
                <div>
                    <div className={styles.features}>
                        <Input.Group compact style={{ width: "90%" }}>
                            <Input.Search allowClear defaultValue="" placeholder="Search groups" />
                        </Input.Group>
                        <Button
                            className={styles["btn-c_a"]}
                            type="default"
                            onClick={handleClickCreateJoin}
                            icon={<UsergroupAddOutlined />}
                        >
                            Join or create group
                        </Button>
                    </div>

                    <TabBar defaultActiveKey="groupMade" onChange={onChange} data={items} />
                </div>
            )}
            {isCreateJoin && (
                <div>
                    <div className={styles.nav}>
                        <Button
                            type="link"
                            className="link-back"
                            onClick={handleClickBack}
                            icon={<LeftOutlined />}
                        >
                            Back
                        </Button>
                    </div>
                    <Typography.Text
                        className="text-xxl"
                        style={{ fontWeight: "300", margin: "0px 15px ", color:"var(--color--text-default)" }}
                    >
                        Join or create a group
                    </Typography.Text>
                    <div className={styles.content}>
                        <CreateGroup />
                        <JoinGroup />
                    </div>
                </div>
            )}
        </div>
    );
}

export default FeatureGroup;
