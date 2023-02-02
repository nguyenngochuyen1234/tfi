import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import InforItem from '../../../components/InforItem/InforItem';

LayOutInFor.propTypes = {
    user:PropTypes.object.isRequired,
    handleSetUser:PropTypes.func.isRequired


};

function LayOutInFor({user,handleSetUser}) {
    console.log(user)
    const [data,setData]=useState()
    useEffect(()=>{
        setData([
            { label: "Tên", data: user.name, edit: true, name: "name" },
            { label: "Gmail", data: user.gmail, edit: true, name: "gmail" },
            { label: "Group đã tham gia", data: String(user.groupJoin.length), edit: false, name: "groupJoined" },
            { label: "Group đã tạo", data: String(user.groupMade.length), edit: false, name: "groupCreate" },
            { label: "Chuyên ngành/Lớp", data: user.major, edit: true, name: "groupJoined" },
            { label: "Trường", data: user.school, edit: true, name: "school" },
            { label: "Liên hệ", data: String(user.phoneNumber), edit: true, name: "phoneNumber" },
        ]);
    },[user])
    console.log({data})
    return (
        <>
            {data && data.map((item,idx)=><InforItem key={idx} label={item.label} data={item.data} edit={item.edit} name={item.name} handleSetUser={handleSetUser}/>)}
        </>
    );
}

export default LayOutInFor;