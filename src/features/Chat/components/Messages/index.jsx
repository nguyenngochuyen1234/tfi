import React from 'react';
import PropTypes from 'prop-types';
import styles from "./styles.module.css";
import ChatHeader from './components/ChatHeader';
import ChatMain from './components/ChatMain';
import ChatBox from './components/ChatBox';
import NotMess from '../../../../compoments/NotMess';

Messages.propTypes = {
    current:PropTypes.object.isRequired,
    chatCurrent: PropTypes.array,
    handleChangeChat:PropTypes.func.isRequired,
};
Messages.defaultProps = {
    chatCurrent: [],
};
function Messages(props) {
    
    const {current,chatCurrent,handleChangeChat}=props;

    return (
        <div className={styles.container}>
            <ChatHeader current={current} />
            {chatCurrent.length===0?<NotMess people={current?.name}/> : <ChatMain current={current} chatCurrent={chatCurrent}/>}
            <ChatBox current={current} handleChangeChat={handleChangeChat}/>
        </div>
    );
}

export default Messages;