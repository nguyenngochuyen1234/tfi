import React from 'react';
import RecentGroup from './components/ListRecentGroup';
import Stats from './components/Stats';
import TimeLine from './components/TimeLine';

import styles from './styles.module.css';

Board.propTypes = {
    
};

function Board(props) {
    return (
        <div className={styles.root}>
            <div>
            <RecentGroup/>

            </div>
            <div className={styles["group-under"]}>
                <Stats  userName='Thang' star={20} totalSubmited={42} groupCreated={4} groupJoin={4} />
                <TimeLine />
            </div>
        </div>
    );
}

export default Board;