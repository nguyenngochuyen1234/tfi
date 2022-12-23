import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';
import { Typography } from 'antd';
import TaskItem from './components/TaskItem';
TaskPinned.propTypes = {
    
};
const {Text}=Typography;
function TaskPinned(props) {
    return (
        <div className={styles.root}>
            <Text strong={true} className="text-md">Your Tasks Pinned</Text>
            <div className={styles["tasks-list"]}>
                <TaskItem/>
            </div>
        </div>
    );
}

export default TaskPinned;