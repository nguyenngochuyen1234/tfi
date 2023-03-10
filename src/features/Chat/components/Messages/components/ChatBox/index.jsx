import { Input, Tooltip } from "antd";
import EmojiPicker from "emoji-picker-react";
import PropTypes from "prop-types";
import React, { useState } from "react";
import conversatioApi from "../../../../../../api/conversationApi";
import messageApi from "../../../../../../api/messageApi";
import { HOST } from "../../../../../../constants/common";
import notificationApi from "../../../../../../api/notificationApi";
import AttachIcon from "../../../../../../components/CustomIcon/AttachIcon";
import ImageIcon from "../../../../../../components/CustomIcon/ImageIcon";
import LaughIcon from "../../../../../../components/CustomIcon/LaughIcon";
import SendIcon from "../../../../../../components/CustomIcon/SendIcon";
import useComponentVisible from "../../../../../../customHook/ComponentVisible";
import styles from "./styles.module.css";

ChatBox.propTypes = {
    current: PropTypes.object.isRequired,
    handleChangeChat: PropTypes.func.isRequired,
};

function ChatBox({ current, handleChangeChat, conversationCurrent, setConversationCurrent, socket }) {
    const nameUser = localStorage.getItem("name_user")
    const idUser = localStorage.getItem("user_id")
    const [send, setSend] = useState(false);
    const [value, setValue] = useState("");
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);

    const handleChangeInput = (e) => {
        const value = e.target.value;
        if (value !== "" && send === false) {
            setSend(true);
        }
        if (value === "" && send === true) {
            setSend(false);
        }
        setValue(value);
    };

    const handleSend = async () => {
        let configValue = {}
        try {
            if (value === "") return;
            if (!conversationCurrent) {
                const newConversation = await conversatioApi.createConversation({
                    receiverId: current.id
                })
                setConversationCurrent(newConversation._id)
                configValue = await messageApi.createMessage(
                    {
                        conversationId: newConversation._id,
                        text: value
                    }
                )
            } else {
                configValue = await messageApi.createMessage(
                    {
                        conversationId: conversationCurrent,
                        text: value
                    }
                )

            }
            handleChangeChat(configValue);
            const notification = {
                receiver:current.id,
                type:"message",
                title:`${nameUser ? nameUser : "C?? ng?????i"} ???? nh???n tin cho b???n`,
                link: `chat/${idUser}`,
            }
            const resultNoti = await notificationApi.createNotification(notification)
            socket.emit("send-msg",{...configValue, receiverId: current.id})
            socket.emit("send-notification",resultNoti.data)
            setValue("");
            setSend(false);
        } catch (err) {
            console.log(err.message)
            // alert(err.message)
        }
    };

    const toggleEmoji = () => {
        setIsComponentVisible(!isComponentVisible);
    };

    const handleEmojiClick = (data) => {
        setValue((value) => {
            const newValue = value + data.emoji;
            return newValue;
        });
    };

    return (
        <div className={styles.chatBox}>
            <div className={styles.chat}>
                {isComponentVisible && (
                    <div ref={ref} style={{ position: "absolute", bottom: "55px" }}>
                        <EmojiPicker
                            onEmojiClick={handleEmojiClick}
                            emojiStyle="native"
                            height={350}
                            width={300}
                            skinTonesDisabled={true}
                            lazyLoadEmojis={true}
                            previewConfig={{ showPreview: false }}
                        />
                    </div>
                )}
                <div>
                    <Tooltip mouseEnterDelay={0.5} overlayClassName="text-ssm" title="Icons">
                        <span className={styles.icon}>
                            <LaughIcon toggleEmoji={toggleEmoji} width="20px" height="20px" />
                        </span>
                    </Tooltip>

                    <Tooltip mouseEnterDelay={0.5} overlayClassName="text-ssm" title="Attach Image">
                        <span className={styles.icon}>
                            <ImageIcon width="20px" height="20px" />
                        </span>
                    </Tooltip>
                    <Tooltip mouseEnterDelay={0.5} overlayClassName="text-ssm" title="Attach File">
                        <span className={styles.icon}>
                            <AttachIcon width="20px" height="20px" />
                        </span>
                    </Tooltip>
                </div>
                <Input
                    className={styles.typeMess}
                    onChange={handleChangeInput}
                    value={value}
                    onPressEnter={handleSend}
                    placeholder={`G???i tin nh???n ?????n ${current?.name}`}
                />
                <SendIcon handleSend={handleSend} width="32px" height="32px" active={send} />
            </div>
        </div>
    );
}

export default ChatBox;
