import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";
import ChatText from "./components/ChatText";
import classNames from "classnames";
import { useSelector } from "react-redux";

ChatMain.propTypes = {
    current: PropTypes.object.isRequired,
    chatCurrent: PropTypes.array,
 
};
ChatMain.defaultProps = {
    chatCurrent: [],
  
};
function ChatMain({ current, chatCurrent, }) {
    const messagesEndRef = useRef(null);    
    const idUser=useSelector((state)=>state.user.current._id);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView();
    };
    const [height, setHeight] = useState(1)
    const [scroll,setScroll]=useState(false)
    const ref = useRef(null)

  
    useEffect(() => {
        scrollToBottom();
        setHeight(ref.current.clientHeight)
        if(height===0 ){
            setScroll(true)
        }
    }, [chatCurrent, height]);

    return (
        <div className={styles["chat-container"]}>
            <div className={classNames({
                [styles.wrap]:!scroll
            }) }>
                <div ref={ref} className={styles.full}></div>

                {chatCurrent.map((eachData) => (
                    <ChatText
                        key={eachData._id}
                        text={eachData.text}
                        pos={eachData.sender!==idUser ? "l" : "r"}
                        id={eachData._id}
                        avt={current.avt}
                    />
                ))}
                <div ref={messagesEndRef}></div>
            </div>
        </div>
    );
}

export default ChatMain;
