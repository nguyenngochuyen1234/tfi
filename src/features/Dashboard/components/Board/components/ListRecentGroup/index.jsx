import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';
import classNames from 'classnames';
import ListRecentGroup from './components/ListRecentGroup';
RecentGroup.propTypes = {
    
};

function RecentGroup(props) {
    return (
        <div className={styles["re-gr-container"]}>
            <div className={classNames({
                "text-md":true,
                [styles.title]:true
            })}>
                Recently access group
            </div>
            <ListRecentGroup/>
        </div>
    );
}

export default RecentGroup;