import { Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import groupApi from '../../api/groupApi';
import BarItem from '../TaskList/components/BarItem';
FeatureGroup.propTypes = {

};

function FeatureGroup(props) {
    const [dataGroupMade, setDataGroupMade] = useState([])
    const [dataGroupJoined, setDataGroupJoined] = useState([])

    const fetchAllGroupUser = async() => {
        try{
            const data = await groupApi.getAllGroupUSer()
            if(data.success){
                setDataGroupMade(data.groupMade)
                setDataGroupJoined(data.GroupJoined)
            }
        }catch(err){
            alert(err.message)
        }
    }
    useEffect(()=>{
        fetchAllGroupUser()
    },[])
    const items = [
        {
            label: <BarItem label="Group has been created" />,
            key: "group-created",
            children:"group-created",
        },
        {
            label: <BarItem label="Group has been joined" />,
            key: "group-joined",
            children: "group-joined",
        },

    ];

    return (
        <div className="feature-container_right" >
            <Tabs
                defaultActiveKey="group-created"
                items={items}
            />
        </div>
    );
}

export default FeatureGroup;