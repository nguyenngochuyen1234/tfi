import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';
import Notification from './components/Notification';
import Profile from './components/Profile';

Header.propTypes = {
    
};

function Header(props) {
    return (
        <div className={styles.root}>
            <div className={styles["flex-container"]}>
                <img className={styles.logo} src="../../../../img/logo.png" alt='Logo'/>
                <span className={styles.project}>Task manager</span>
            </div>
            <div className={styles["flex-container"]}>
                <Notification/>
                <Profile/>
            </div>
        </div>
    );
}

export default Header;