import React from 'react'
import { useParams } from 'react-router-dom'
import GroupRight from './GroupRight/GroupRight';
import Header from './Header/Header';
import ListProject from './listProject/ListProject';

const GroupDashboard = () => {
    const params = useParams();
    const groupId = params.groupId
    return (
        <div style={{ width: "100%", display:"flex", flexDirection:"row"}}>
            <div style={{width:" calc(100% - 300px)"}}>
                <Header />
                <ListProject />
            </div>
            <GroupRight />
        </div>
    )
}

export default GroupDashboard