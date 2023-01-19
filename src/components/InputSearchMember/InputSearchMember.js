import React, { useEffect, useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useSelector } from 'react-redux';
import groupApi from '../../api/groupApi';
import notificationApi from '../../api/notificationApi';
import userApi from '../../api/userApi';
import SingleAvatar from '../Avatar/SingleAvatar';
import "./style.css";

const InputSearchMember = ({ group, handleCancel }) => {

    let socket = useSelector(state => state.socket.socket)

    const [users, setUsers] = useState([])
    const [memberSearch, setMemberSearch] = useState([])
    const [memberFiltered, setMemberFiltered] = useState([]);
    const [valueInput, setValueInput] = useState("")
    const user = useSelector((state) => state.user.current);
    const idUser = user?._id || localStorage.getItem("id_user");
    const [leader, setLeader] = useState()



    const fechAllUser = async () => {
        try {
            const data = await userApi.getAllUser()
            if (data.success) {
                const dataFilter = data.allUser.filter(dt => dt._id !== idUser)
                const leader = data.allUser.find(dt => dt._id === idUser)

                setLeader(leader)
                setUsers(dataFilter)
            }
        } catch (err) {
            alert(err.message)
        }
    }
    const onChangeHandle = (e) => {
        let value = e.target.value
        setValueInput(value)
        const data = users.filter(user => {
            return user?.name.includes(value) || user?.username.includes(value);
        })
        setMemberSearch(data)
    }

    const handleOnclick = (userFilter) => {
        const newUsers = users.filter(user => user.username !== userFilter.username)
        setUsers(newUsers)
        setMemberSearch(newUsers)
        setMemberFiltered(prev => [...prev, userFilter])
        setValueInput("")
    }
    const handleAdd = async () => {
        const memberid = memberFiltered.map(member => member._id)
        const updateMember = {member: [...group.member, ...memberid]};
        try {
            const idGroup = group._id
            await groupApi.updateGroup(idGroup, updateMember)
            for(let i=0;i<memberid.length;i++){
                let notification = {
                    receiver:memberid[i],
                    type:"group",
                    title:`${leader ? leader.name : "Có người"} đã thêm bạn vào nhóm`,
                    link: `groups`,
                }
                socket.emit("send-notification",notification)
                await notificationApi.createNotification(notification)
            }
            handleCancel()
        } catch (err) {
            console.log(err)
        }
    }
    const deleteMember = (member) => {
        const newMemberFiltered = memberFiltered.filter(user => user.username !== member.username)
        setMemberFiltered(newMemberFiltered)
        setUsers(prev => [...prev, member])
    }
    useEffect(() => {
        fechAllUser()
    }, [])
    return (
        <div>
            {memberFiltered.length > 0 && <div className='search-member-filtered'>
                {memberFiltered.map(member => {
                    return (
                        <div key={member.username} className='search-member-filtered-item'>
                            <div style={{ padding: "5px" }}>
                                <SingleAvatar username={member.username} size="small" />
                            </div>
                            <h4 style={{ fontSize: 10, padding: "5px" }}>{member.name}</h4>
                            <p style={{ opacity: "0.6", fontSize: 10, padding: "5px" }}>{member.username}</p>
                            <CloseOutlined
                                style={{
                                    padding: 5
                                }}
                                onClick={() => deleteMember(member)}
                            />
                        </div>
                    )
                })}
            </div>}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "20px" }}>
                <div style={{ position: "relative", width: "80%" }}>
                    <input
                        onChange={onChangeHandle}
                        value={valueInput}
                        name="member"
                        placeholder='Add members'
                        id="member"
                        style={{
                            width: "100%",
                            padding: "0 10px",
                            height: 32,
                            border: "solid 1px #ccc",
                            borderRadius: 5,
                            outline: "none",
                        }}
                    />
                    <div className='search-member-container'>
                        {memberSearch.map(user => {
                            return (
                                <div key={user.username} className='search-member-item' onClick={() => handleOnclick(user)}>
                                    <div style={{ padding: "10px" }}>
                                        <SingleAvatar username={user.username} size="default" />
                                    </div>
                                    <div style={{ padding: "10px" }}>
                                        <h4>{user.name}</h4>
                                        <p style={{ opacity: "0.6" }}>{user.username}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <Button type="primary" onClick={handleAdd}>
                    Add
                </Button>
            </div>
        </div>
    )
}

export default InputSearchMember