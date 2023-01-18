import { Input } from "antd";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import SingleAvatar from "../../../../components/Avatar/SingleAvatar";
import ContactItem from "../ContactItem";
import styles from "./styles.module.css";
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
    const { people, current, handleCurrentPeople, setPeople, users } = props;

    const navigate = useNavigate()

    const [memberSearch, setMemberSearch] = useState([])
    const [valueInput, setValueInput] = useState("")
    const [contactShow, setContactShow] = useState(true)


    const handleClickContact = (user) => {
        handleCurrentPeople(user);
    };


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
