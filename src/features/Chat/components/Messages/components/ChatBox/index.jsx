import { Input, Tooltip } from "antd";
import EmojiPicker from "emoji-picker-react";
import React, { useState } from "react";
import AttachIcon from "../../../../../../compoments/CustomIcon/AttachIcon";
import ImageIcon from "../../../../../../compoments/CustomIcon/ImageIcon";
import LaughIcon from "../../../../../../compoments/CustomIcon/LaughIcon";
import SendIcon from "../../../../../../compoments/CustomIcon/SendIcon";
import useComponentVisible from "../../../../../../customHook/ComponentVisible";
import styles from "./styles.module.css";
import PropTypes from "prop-types";

ChatBox.propTypes = {
    current: PropTypes.object.isRequired,
    handleChangeChat: PropTypes.func.isRequired,
};

function ChatBox({ current ,handleChangeChat}) {
    const userJson = localStorage.getItem("user")
    const userData=JSON.parse(userJson)

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
    
    const handleSend = () => {

        if (value === "") return;
        const configValue={
            id: "#"+Math.floor(Math.random()*1000),
            text:value
        }
        const createAt=new Date().getTime();
        handleChangeChat(configValue,"c123",createAt)
        setValue("");
        setSend(false);
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
                    placeholder={`Gửi tin nhắn đến ${current?.name}`}
                />
                <SendIcon handleSend={handleSend} width="32px" height="32px" active={send} />
            </div>
        </div>
    );
}

export default ChatBox;
