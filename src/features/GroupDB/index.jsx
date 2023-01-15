import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import BarItem from "../../compoments/BarItem";
import TabBar from "../../compoments/TabBar";
import GDBBody from "./components/GDBBody";
import GDBHeader from "./components/GDBHeader";
GroupDB.propTypes = {};

function GroupDB(props) {
    const location = useLocation();
    const id = location.pathname.split("/")[3];
    const data = useSelector((state) => state.group.current);
    console.log(data);
    const result = { success: data.success, data: [...data.groupMade, ...data.groupJoined] };
    const group = result.data.filter((group) => group._id === id)[0];
    console.log(group);
    const [feature, setFeature] = useState("general");
    const onChange = (key) => {
        console.log(key);
        setFeature(key);
    };
    const item = [
        {
            label: <BarItem typeSize={"sm"} label="General" />,
            key: "general",
            children: <GDBBody data="General" />,
        },
        {
            label: <BarItem typeSize={"sm"} label="Overview" />,
            key: "overview",
            children: <GDBBody data="Overview" />,
        },
        {
            label: <BarItem typeSize={"sm"} label="Timeline" />,
            key: "time-line",
            children: <GDBBody data="Timeline" />,
        },
        {
            label: <BarItem typeSize={"sm"} label="Files" />,
            key: "files",
            children: <GDBBody data="Files" />,
        },
    ];
    return (
        <div
            id={group._id}
            style={{ backgroundColor: "var(--color--default)" }}
            className="feature-container_right"
        >
            <GDBHeader group={group} />
            <TabBar onChange={onChange} activeKey={feature} data={item} />
        </div>
    );
}

export default GroupDB;
