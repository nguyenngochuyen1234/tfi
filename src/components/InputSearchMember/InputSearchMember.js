import React, { useEffect, useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import userApi from '../../api/userApi';
import SingleAvatar from '../Avatar/SingleAvatar';
import "./style.css";
import { Input, Avatar } from 'antd';

const InputSearchMember = ({ memberFiltered, setMemberFiltered, usersData }) => {


    const [users, setUsers] = useState([])
    const [memberSearch, setMemberSearch] = useState([])
    const [valueInput, setValueInput] = useState("")


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
        setMemberSearch([])
        setMemberFiltered(prev => [...prev, userFilter])
        setValueInput("")
    }
    useEffect(() => {
        setUsers(usersData)
    }, [usersData])
    const deleteMember = (member) => {
        const newMemberFiltered = memberFiltered.filter(user => user.username !== member.username)
        setMemberFiltered(newMemberFiltered)
        setUsers(prev => [...prev, member])
    }
    return (
        <div>
            {memberFiltered.length > 0 && <div className='search-member-filtered'>
                {memberFiltered.map(member => {
                    return (
                        <div key={member.username} className='search-member-filtered-item'>
                            <div style={{ padding: "5px" }}>
                                <Avatar src={member.avatar} size={"small"} />
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
                    <Input
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
                                    <Avatar src={user.avatar} size="default" />
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


            </div>
        </div>
    )
}

export default InputSearchMember