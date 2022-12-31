import React from 'react';
import styles from './styles.module.css';
TaskPinned.propTypes = {
    
};
function TaskPinned(props) {
    return (
        <div className={styles.root}>
            <div className={styles.calendar}>
                This Schedule
            </div>
        </div>
    );
}

export default TaskPinned;