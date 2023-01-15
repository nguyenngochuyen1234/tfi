import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useMatches } from 'react-router-dom';
GroupDB.propTypes = {
   
};

function GroupDB(props) {
    const location = useLocation()
    const id=location.pathname.split('/')[3]
    const data=useSelector(state=>state.group.current)
    const result={success:data.success,data:[...data.groupMade,...data.groupJoined]}
    const group=result.data.filter((group)=>group._id===id)[0];
    console.log(group);
   return (
        <div>
            GRDB 
        </div>
    );
}

export default GroupDB;