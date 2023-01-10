import { LeftOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Typography } from "antd";
import React, { useEffect, useState } from "react";
import groupApi from "../../api/groupApi";
import BarItem from "../../compoments/BarItem";
import TabBar from "../../compoments/TabBar";
import styles from "./styles.module.css";
import FilterGroups from "./components/FilterGroups";
import CreateGroup from "./components/CreateGroup";
import JoinGroup from "./components/JoinGroup";
import { Link, useNavigate } from "react-router-dom";
FeatureGroup.propTypes = {};

function FeatureGroup(props) {

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
                const res = await groupApi.getAllGroupUser();
                setAllGroups(res);
                setFilterGroups(res.groupMade);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [setAllGroups]);
    const onChange = (key) => {
        setFilterGroups(allGroups[key]);
    };
    const items = [
        {
            label: <BarItem label="Groups has been created" />,
            key: "groupMade",
            children: <FilterGroups data={filterGroups} />,
        },
        {
            label: <BarItem label="Groups has been joined" />,
            key: "groupJoined",
            children: <FilterGroups data={filterGroups} />,
        },
    ];

    return (
        <div className="feature-container_right">
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
                    <Typography.Text className="text-xxl" style={{fontWeight:"300",margin:"0px 15px "}}>Join or create a group</Typography.Text>
                    <div  className={styles.content}>
                        <CreateGroup />
                        <JoinGroup />
                    </div>
                </div>
            )}
        </div>
    );
}

export default FeatureGroup;
