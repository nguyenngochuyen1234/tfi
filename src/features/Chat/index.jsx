import classNames from "classnames";
import React, { useEffect, useState } from "react";
import userApi from "../../api/userApi";
import Contacts from "./components/Contacts";
import Messages from "./components/Messages";
import styles from "./styles.module.css";

FeatureChat.propTypes = {};

/* const people = [
    {
        id: "#123",
        name: "Nguyễn Ngọc Huyền",
        avt: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZcEp9Hz-tfr5lcePsZXCIQMDVkykm8J8WlZZ171UTCw&s",
        lastSend: "",
        active: true,
    },
    {
        id: "#124",
        name: "Dương Thị Thùy Linh",
        avt: "https://toigingiuvedep.vn/wp-content/uploads/2022/01/hinh-avatar-cute-nu.jpg",
        lastSend: "Nice to meet you 🧡",
        active: false,
    },
    {
        id: "#125",
        name: "Tống Đức Luận",
        avt: "https://tourchaua.net/wp-content/uploads/2021/12/avatar-cute-gau-nau.jpg",
        lastSend: "You: Ok đợi!",
        active: true,
    },
]; */
const chatData = [
    {
        conversationId:"#1234",
        sender:"63ad79c3723874d6ee9ad68c",
        text:"Làm bài tập chưa",
        _id:"#1",
        createAt:1673327537391
    },
    {
        conversationId:"#1234",
        sender:"63ad79c3723874d6ee9ad68c",
        text:"Thắng ơi!!",
        _id:"#2",
        createAt:1673327537398
    },
    {
        conversationId:"#1234",
        sender:"63ad79c3723874d6ee9ad68c",
        text:"Thắng ơi!!",
        _id:"#3",
        createAt:1673327537500
    },
    {
        conversationId:"#1234",
        sender:"63ad7a0b723874d6ee9ad68e",
        text:"Tao đây!!",
        _id:"#4",
        createAt:1673327537900
    },
    {
        conversationId:"#1234",
        sender:"63ad7a0b723874d6ee9ad68e",
        text:"Làm rồi",
        _id:"#5",
        createAt:1673327537910
    },
    {
        conversationId:"#1234",
        sender:"63ad79c3723874d6ee9ad68c",
        text:"Oke",
        _id:"#6",
        createAt:1673327537911
    },
];
function FeatureChat(props) {

    

    const [people, setPeople] = useState([])
    const [chatCurrent, setChatCurrent] = useState(
        // chatData || 
        []
    );


    const fetchAllUser = async() =>{
        try{
            const data = await userApi.getAllUser()
            if(data.success){
                let dataUser = data.allUser.map(user=>{
                    return{
                        id: user._id,
                        name: user.name,
                        avt: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZcEp9Hz-tfr5lcePsZXCIQMDVkykm8J8WlZZ171UTCw&s",
                        lastSend: "",
                        active: true,
                    }
                })
                setPeople(dataUser)
            }
        }catch(err){
            alert(err.message)
        }
    } 

    useEffect(()=>{
        fetchAllUser()
    },[])



    const [currentPeople, setCurrentPeople] = useState({});
    const handleCurrentPeople = (contact) => {
        setCurrentPeople(contact);
        console.log(contact.id);
        if(contact.id==="63ad79c3723874d6ee9ad68c"){
            setChatCurrent(chatData);
        }else{
            setChatCurrent([]);
        }
        
    };
    
    console.log(chatCurrent)
    // khi nguoi dung bam ender de chat
    const handleChangeChat = (value) => {
        setChatCurrent([...chatCurrent,value])
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
                />
            </div>
            <div className={styles["messages-container"]}>
                <Messages
                    current={currentPeople}
                    chatCurrent={chatCurrent}
                    handleChangeChat={handleChangeChat}
                />
            </div>
        </div>
    );
}

export default FeatureChat;
