import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../../../features/Auth/userSlice";
import Notification from "./components/Notification";
import Profile from "./components/Profile";
import styles from "./styles.module.css";
import PropTypes from "prop-types";
Header.propTypes = {
    setOpenSetting:PropTypes.func.isRequired,
    setOpenScreen:PropTypes.func.isRequired

};

function Header({setOpenSetting,setOpenScreen}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogOut = () => {
        const action = logOut();
        dispatch(action);
        navigate("/login");
    };
    const handleInfor = () => {
        navigate("./infor");
    };
    const handleSettingPrivacy = () => {
        setOpenSetting(true);
    };
    const handleScreen = () => {
        setOpenScreen(true);

    };
    return (
        <div className={styles.root}>
            <div className={styles["flex-container"]}>
                <img className={styles.logo} src="../../../../img/logo.png" alt="Logo" />
                <span className={styles.project}>Task manager</span>
            </div>
            <div className={styles["flex-container"]}>
                <Notification />
                <Profile
                    handleLogOut={handleLogOut}
                    handleInfor={handleInfor}
                    handleSettingPrivacy={handleSettingPrivacy}
                    handleScreen={handleScreen}
                />
            </div>
        </div>
    );
}

export default Header;
