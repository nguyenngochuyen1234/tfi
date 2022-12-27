import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loginform from "../../compoments/FormAuth/Loginform";
import Registerform from "../../compoments/FormAuth/Registerform";
import "./style.css";
import { login } from "./userSlice";
import PropTypes from "prop-types";

Auth.propTypes = {
    
    authRoute: PropTypes.string,
};
Auth.defaultProps = {

    authRoute:"",
};

function Auth({ authRoute }) {
    const dispatch = useDispatch();

    const handleOnLogin = async (values) => {
        try {
            const action = login(values);
            const resultAction = await dispatch(action);
            unwrapResult(resultAction);
            alert("Đăng nhập thành công")
        } catch (e) {
            console.log(e);
            alert("Đăng nhập khong thành công")

        }
    };

    return (
        <div className="auth-body">
            <img src="../../../img/task.png" alt="login-img" />
            <div className="form-container">
                {authRoute === "login" && <Loginform handleOnSubmit={handleOnLogin} />}
                {authRoute === "register" && <Registerform />}
            </div>
        </div>
    );
}

export default Auth;
