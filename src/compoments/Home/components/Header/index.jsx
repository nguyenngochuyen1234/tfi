import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../../../features/Auth/userSlice';
import Notification from './components/Notification';
import Profile from './components/Profile';
import styles from './styles.module.css';

Header.propTypes = {
    
};

function Header(props) {
    const navigate = useNavigate();
    const dispatch=useDispatch()
    const handleLogOut=()=>{
        const action=logOut();
        dispatch(action)
        navigate('/login');
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