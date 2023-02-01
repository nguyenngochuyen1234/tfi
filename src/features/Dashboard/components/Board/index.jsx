import React from 'react';
import RecentGroup from './components/ListRecentGroup';
import Stats from './components/Stats';
import TimeLine from './components/TimeLine';
import PropTypes from 'prop-types'
import styles from './styles.module.css';
import dayjs from 'dayjs';

Board.propTypes = {
    user:PropTypes.object.isRequired,
};

function Board({user}) {
    return (
        <div className={styles.root}>
            <div>
            <RecentGroup/>

            </div>
            <div className={styles["group-under"]}>
                <Stats  userName='Thang' star={user?.star ||0} totalSubmited={user.tasks.filter((item)=>item.status==="completed" &&dayjs(user.tasks[0]?.exercise.time).format("YYYY")===String(new Date().getFullYear())).length} groupCreated={user.groupMade.length} groupJoin={user.groupJoin.length} />
                <TimeLine />
            </div>
        </div>
    );
}

export default Board;