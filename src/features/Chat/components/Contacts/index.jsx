import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";
import { Input } from "antd";
import ContactItem from "../ContactItem";
import { useSelector } from "react-redux";
import SingleAvatar from "../../../../compoments/Avatar/SingleAvatar";
import userApi from "../../../../api/userApi";
import { useNavigate } from "react-router";
Contacts.propTypes = {
    people: PropTypes.array,
    current: PropTypes.object,
    handleCurrentPeople: PropTypes.func
};
Contacts.defaultProps = {
    people: null,
    current: null,
    handleCurrentPeople: null
};

function Contacts(props) {
    const { people, current, handleCurrentPeople, setPeople } = props;

    const navigate = useNavigate()

    const [memberSearch, setMemberSearch] = useState([])
    const [valueInput, setValueInput] = useState("")
    const [contactShow, setContactShow] = useState(true)
    const [users, setUsers] = useState([])
    const user = useSelector((state) => state.user.current);
    const idUser = user._id || localStorage.getItem("user_id");
    const handleClickContact = (user) => {
        handleCurrentPeople(user);
    };
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

    useEffect(() => {
        fechAllUser()
    }, [])

    const onChangeHandle = (e) => {
        let value = e.target.value
        setValueInput(value)
        const data = users.filter(user => {
            return user?.name.includes(value) || user?.username.includes(value);
        })
        console.log(data)
        setMemberSearch(data)
    }

    const handleOnclick = (user) => {
        const userExist = people.find(pp => pp.id === user._id)
        const newPeople = {
            id: user._id,
            name: user.name,
            avt: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZcEp9Hz-tfr5lcePsZXCIQMDVkykm8J8WlZZ171UTCw&s",
            lastSend: "",
            active: true,
        }
        console.log(newPeople)
        if (userExist) {

        } else {
            setPeople(prev => ([...prev, newPeople]))
        }
        setValueInput(null)
        setMemberSearch([])
        navigate(`/home/chat/${user._id}`)
    }
    return (
        <div className={styles.main}>
            <div className={styles.featuresContact}>
                <Input.Group compact style={{ width: "90%" }}>
                    <Input.Search
                        allowClear
                        defaultValue=""
                        placeholder="Search contacts"
                        value={valueInput}
                        onFocus={()=>setContactShow(false)}
                        onBlur={()=>setContactShow(true)}
                        onChange={onChangeHandle} />
                </Input.Group>
            </div>
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
            {contactShow&&<ul style={{ padding: "5px 10px", listStyleType: "none" }}>
                {people.map((x, idx) => (
                    <li key={idx}>
                        <ContactItem
                            current={current}
                            handleClickContact={
                                current.id !== x.id
                                    ? handleClickContact
                                    : () => {
                                        return;
                                    }
                            }
                            data={x}
                        />
                    </li>
                ))}
            </ul>}
        </div>
    );
}

export default Contacts;
