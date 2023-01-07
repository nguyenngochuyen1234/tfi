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
            label: <BarItem label="Group has been create" />,
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
        <div>
            <Tabs
                defaultActiveKey="group-made"
                items={items}
            />
        </div>
    );
}

export default FeatureGroup;