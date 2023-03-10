import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";
import ChatHeader from "./components/ChatHeader";
import ChatMain from "./components/ChatMain";
import ChatBox from "./components/ChatBox";
import NotMess from "../../../../components/NotMess";

Messages.propTypes = {
    current: PropTypes.object.isRequired,
    chatCurrent: PropTypes.array,
    handleChangeChat: PropTypes.func.isRequired,
};
Messages.defaultProps = {
    chatCurrent: [],
};
function Messages(props) {
    const { current, chatCurrent, handleChangeChat, conversationCurrent, setConversationCurrent, socket } = props;

    return (
        <div className={styles.container}>
            {!current.id && <NotMess mess="Hãy bắt đầu nhắn với bạn bè bạn" />}
            {current.id && (
                <div className={styles["flex-col"]}>
                    <ChatHeader current={current} />
                    {chatCurrent.length === 0 ? (
                        <NotMess mess={`Oh! Có vẻ bạn chưa nhắn tin với ${current?.name}`} />
                    ) : (
                        <ChatMain current={current} chatCurrent={chatCurrent} />
                    )}
                    <ChatBox current={current} handleChangeChat={handleChangeChat} conversationCurrent={conversationCurrent} setConversationCurrent={setConversationCurrent} socket={socket}/>
                </div>
            )}
        </div>
    );
}

export default Messages;
