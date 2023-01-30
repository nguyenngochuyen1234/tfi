import React from 'react';
import RecentGroup from './components/ListRecentGroup';
import Stats from './components/Stats';
import TimeLine from './components/TimeLine';
import PropTypes from 'prop-types'
import styles from './styles.module.css';

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
                <Stats  userName='Thang' star={user?.star ||0} totalSubmited={user.tasks.map((item)=>item.status==="complete").length} groupCreated={user.groupMade.length} groupJoin={user.groupJoin.length} />
                <TimeLine />
            </div>
        </div>
    );
}

export default Board;