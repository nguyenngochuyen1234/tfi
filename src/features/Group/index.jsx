import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd'
import BarItem from '../TaskList/components/BarItem';
import GroupJoined from './GroupJoined';
import GroupMade from './GroupMade';
import groupApi from '../../api/groupApi';
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
            label: <BarItem label="Group has been create" />,
            key: "group-made",
            children: <GroupMade dataGroupMade={dataGroupMade}/>,
        },
        {
            label: <BarItem label="Group has been joined" />,
            key: "group-joined",
            children: <GroupJoined dataGroupJoined={dataGroupJoined}/>,
        },

    ];

    return (
        <div>
            <Tabs
                defaultActiveKey="group-made"
                items={items}
            />
        </div>
    );
}

export default FeatureGroup;