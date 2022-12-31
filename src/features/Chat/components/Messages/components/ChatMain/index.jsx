import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";
import ChatText from "./components/ChatText";
import classNames from "classnames";

ChatMain.propTypes = {
    current: PropTypes.object.isRequired,
    chatCurrent: PropTypes.array,
 
};
ChatMain.defaultProps = {
    chatCurrent: [],
  
};
function ChatMain({ current, chatCurrent, }) {
    const messagesEndRef = useRef(null);

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
                        key={eachData.id}
                        text={eachData.data}
                        pos={Object.hasOwn(eachData, "idPeople") ? "l" : "r"}
                        avt={current.avt}
                    />
                ))}
                <div ref={messagesEndRef}></div>
            </div>
        </div>
    );
}

export default ChatMain;
