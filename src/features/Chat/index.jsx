import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";
import classNames from "classnames";
import Contacts from "./components/Contacts";
import Messages from "./components/Messages";
import {io} from 'socket.io-client'
import { useEffect } from "react";
import { STATIC_HOST } from "../../constants/common";
import userApi from "../../api/userApi";
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
// const chatData = {
//     "#124": [
//         {
//             id: "c101",
//             idPeople: "#124",
//             data: [
//                 { id: "#11312", text: "Hello, I am your girl friend" },
//                 { id: "#11313", text: "Nice to meet you 🧡" },
//             ],
//             createAt: 1672434618,
//         },
//     ],
//     "#125": [
//         {
//             id: "c001",
//             idPeople: "#125",
//             data: [
//                 { id: "#11342", text: "Làm bài tập giải tích chưa?" },
//                 { id: "#11345", text: "Alo" },
//                 { id: "#11363", text: "Tí đi sang nhà tao, tao chỉ cho" },
//             ],
//             createAt: 1672434617,
//         },
//         {
//             id: "c002",
//             idPeopleSend:"122",
//             data: [{ id: "#11313", text: "Ok đợi!" }],
//             createAt: 1672434706,
//         },
//         {
//             id: "c003",
//             idPeople: "#125",
//             data: [{ id: "#113523", text: "Nhanh" }],
//             createAt: 1672434750,
//         },
//         {
//             id: "c004",
//             idPeople: "#125",
//             data: [{ id: "#113523", text: "lên!" }],
//             createAt: 1672434750,
//         },
//     ],
// };
function FeatureChat(props) {

    const chatData = {
        "63ad79c3723874d6ee9ad68c":[],
        "63ad7a0b723874d6ee9ad68e":[],
        "63ad7a25723874d6ee9ad690":[],
        "63b2bbd21af58c28a6aedd03":[],
        "63b2bc1b1af58c28a6aedd05":[],
        "63b2bc591af58c28a6aedd07":[],
    }

    const [people, setPeople] = useState([])
    


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



    const [currentPeople, setCurrentPeople] = useState({
        id: "",
        name: "",
        avt: "",
        lastSend: "",
        active: true,
    },);
    const handleCurrentPeople = (contact) => {
        setCurrentPeople(contact);
        console.log(contact.id);
        setChatCurrent(chatData[contact.id]);
    };
    const [chatCurrent, setChatCurrent] = useState(
        chatData[currentPeople.id] ? chatData[currentPeople.id] : []
    );
    console.log(chatCurrent)
    const handleChangeChat = (value, key, createAt) => {
        if (chatCurrent.length === 0) {
            setChatCurrent([{
                id: key,
                data: [value],
                createAt: createAt,
            }]);
        } else {
            
            const dataClone = [...chatCurrent];
            if (key !== dataClone[dataClone.length - 1].id) {
                const dataItem = {
                    id: key,
                    data: [value],
                    createAt: createAt,
                };
                dataClone.push(dataItem);
            } else {
                dataClone[dataClone.length - 1].data = [
                    ...dataClone[dataClone.length - 1].data,
                    value,
                ];
            }
            setChatCurrent(dataClone);
        }
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
