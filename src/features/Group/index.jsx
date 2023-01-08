import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd'
import BarItem from '../TaskList/components/BarItem';
import GroupJoined from './GroupJoined';
import GroupMade from './GroupMade';
FeatureGroup.propTypes = {

};

function FeatureGroup(props) {
    const items = [
        {
            label: <BarItem label="Group has been created" />,
            key: "group-made",
            children: <GroupMade />,
        },
        {
            label: <BarItem label="Group has been joined" />,
            key: "group-joined",
            children: <GroupJoined />,
        },

    ];

    return (
        <div className="feature-container_right" >
            <Tabs
                defaultActiveKey="group-made"
                items={items}
            />
        </div>
    );
}

export default FeatureGroup;