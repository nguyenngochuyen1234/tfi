import React, { useEffect } from 'react'
import { UserOutlined, CloseOutlined } from '@ant-design/icons';
import { Input, Form, Avatar } from 'antd'
import { useState } from 'react'
import userApi from '../../api/userApi'
import "./style.css"
import SingleAvatar from '../Avatar/SingleAvatar';
import { useSelector } from 'react-redux';
const InputSearchMember = ({ memberFiltered, setMemberFiltered }) => {
    const [users, setUsers] = useState([])
    const [memberSearch, setMemberSearch] = useState([])

    const [valueInput, setValueInput] = useState("")
    const user = useSelector((state) => state.user.current.account);
    const idUser = user._id || localStorage.getItem("id_user");



    const fechAllUser = async () => {
        try {
            const data = await userApi.getAllUser()
            if (data.success) {
                const dataFilter = data.allUser.filter(dt => dt._id !== idUser)
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
            <label for="member">Member</label>
            <input
                onChange={onChangeHandle}
                value={valueInput}
                name="member"
                id="member"
                style={{
                    width: "100%",
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
    )
}

export default InputSearchMember