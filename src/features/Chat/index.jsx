import classNames from "classnames";
import React, { useEffect, useState } from "react";
import userApi from "../../api/userApi";
import Contacts from "./components/Contacts";
import Messages from "./components/Messages";
import styles from "./styles.module.css";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import conversatioApi from "../../api/conversationApi";
import messageApi from "../../api/messageApi";

FeatureChat.propTypes = {};
function FeatureChat(props) {

    const user = useSelector((state) => state.user.current.account);
    const idUser = user?._id || localStorage.getItem("user_id");


    const [users, setUsers] = useState([])

    let socket = useSelector(state => state.socket.socket)

    const navigate = useNavigate()

    const [people, setPeople] = useState([])
    const [chatCurrent, setChatCurrent] = useState([]);

    const [conversationCurrent, setConversationCurrent] = useState()
    const [currentPeople, setCurrentPeople] = useState({});

    const [arrivalMessage, setArrivalMessage] = useState()
    const fechAllUser = async () => {
        try {
            const data = await userApi.getAllUser()
            if (data.success) {
                const dataFilter = data.allUser.filter(dt => dt._id !== idUser)
                setUsers(dataFilter)
            }
        } catch (err) {
            console.log(err.message)
        }
    }
    const fetchAllFriend = async () => {
        try {
            const data = await conversatioApi.getFriendData()
            if (data.success) {
                let dataUser = data.friendData.map(user => {
                    return {
                        id: user._id,
                        name: user.name,
                        avt: user.avatar,
                        lastSend: "",
                        active: true,
                    }
                })
                setPeople(dataUser)
            }
        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        fechAllUser()
        fetchAllFriend()
    }, [])

    useEffect(() => {
        if (socket) {
            socket.on("msg-recieve", (msg) => {
                setArrivalMessage(msg)
            })
        }
    }, [conversationCurrent])

    useEffect(() => {
        // Hi???n th??? tin nh???n realtime 
        const idSender = arrivalMessage && arrivalMessage.sender
        const existFriend = people?.find(pp => pp.id === idSender)
        if (!existFriend) {
            const newFriend = users?.find(user => user._id === idSender)
            if(newFriend) setPeople(prev => [...prev, {
                id: newFriend._id,
                name: newFriend.name,
                avt: newFriend.avatar,
                lastSend: "",
                active: true,
            }])
        }
        if (arrivalMessage && (arrivalMessage.conversationId === conversationCurrent)) {
            setChatCurrent((prev) => [...prev, arrivalMessage])
        }
    }, [arrivalMessage])



    const handleCurrentPeople = async (contact) => {
        try {
            navigate(`/home/chat/${contact.id}`)
            setCurrentPeople(contact);
            const data = await messageApi.getMessage(contact.id)
            if (data.success) {
                setConversationCurrent(data.conversationId)
                setChatCurrent(data.messages)
            }
            else {
                setConversationCurrent(null)
            }
        } catch (err) {
            setChatCurrent([])
            setConversationCurrent(null)
        }

    };

    // khi nguoi dung bam ender de chat
    const handleChangeChat = (value) => {
        setChatCurrent([...chatCurrent, value])
    };
    return (
        <div
            className={classNames({
                "feature-container_right": true,
                [styles.root]: true,
            })}
        >
            <div className={styles["contacts-container"]}>
                <Contacts
                    current={currentPeople}
                    handleCurrentPeople={handleCurrentPeople}
                    people={people}
                    setPeople={setPeople}
                    users={users}
                />
            </div>
            <div className={styles["messages-container"]}>
                <Messages
                    current={currentPeople}
                    chatCurrent={chatCurrent}
                    handleChangeChat={handleChangeChat}
                    conversationCurrent={conversationCurrent}
                    setConversationCurrent={setConversationCurrent}
                    socket={socket}
                />
            </div>
        </div>
    );
}

export default FeatureChat;
