import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";
import classNames from "classnames";
import Contacts from "./components/Contacts";
import Messages from "./components/Messages";
import { io } from 'socket.io-client'
import { useEffect } from "react";
import { STATIC_HOST } from "../../constants/common";
import conversatioApi from "../../api/conversationApi";
import { useNavigate } from "react-router";
import messageApi from "../../api/messageApi";

FeatureChat.propTypes = {};
function FeatureChat(props) {

    const userId = localStorage.getItem("user_id")
    const socket = useRef()

    const navigate = useNavigate()

    const [people, setPeople] = useState([])
    const [chatCurrent, setChatCurrent] = useState([]);
    
    const [conversationCurrent, setConversationCurrent] = useState()
    const [currentPeople, setCurrentPeople] = useState({});

    const [arrivalMessage, setArrivalMessage] = useState()
    
    const fetchAllUser = async () => {
        try {
            const data = await conversatioApi.getFriendData()
            if (data.success) {
                let dataUser = data.friendData.map(user => {
                    return {
                        id: user._id,
                        name: user.name,
                        avt: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZcEp9Hz-tfr5lcePsZXCIQMDVkykm8J8WlZZ171UTCw&s",
                        lastSend: "",
                        active: true,
                    }
                })
                console.log(dataUser);
                setPeople(dataUser)
            }
        } catch (err) {
            alert(err.message)
        }
    }

    useEffect(() => {
        fetchAllUser()
    }, [])
    
    useEffect(()=>{
        if(socket.current){
            socket.current.on("msg-recieve",(msg)=>{
                setArrivalMessage(msg)
            })
        }
    },[conversationCurrent])

    useEffect(()=>{
        if(arrivalMessage && (arrivalMessage.conversationId === conversationCurrent)){
            setChatCurrent((prev)=>[...prev, arrivalMessage])
        }
    },[arrivalMessage])

    useEffect(()=>{
        socket.current = io(STATIC_HOST)
        socket.current.emit("add-user",userId)
    },[userId])



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
