import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';
import Notification from './components/Notification';
import Profile from './components/Profile';
import { logOut } from '../../../../features/Auth/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

Header.propTypes = {
    
};

function Header(props) {
    const navigate = useNavigate();
    const dispatch=useDispatch()
    const handleLogOut=()=>{
        const action=logOut();
        dispatch(action)
    }
    return (
        <div className={styles.root}>
            <div className={styles["flex-container"]}>
                <img className={styles.logo} src="../../../../img/logo.png" alt='Logo'/>
                <span className={styles.project}>Task manager</span>
            </div>
            <div className={styles["flex-container"]}>
                <Notification/>
                <Profile handleLogOut={handleLogOut}/>
            </div>
        </div>
    );
}

export default Header;