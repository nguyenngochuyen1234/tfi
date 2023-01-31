import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { json, useNavigate } from "react-router-dom";
import Loginform from "../../components/FormAuth/Loginform";
import Registerform from "../../components/FormAuth/Registerform";
import "./style.css";

Auth.propTypes = {

    authRoute: PropTypes.string,
};
Auth.defaultProps = {

    authRoute: "",
};

function Auth({ authRoute }) {
    const navigate = useNavigate();
   

    return (
        <div className="auth-body">
            <img src="../../../img/task.png" alt="login-img" />
            <div className="form-container">
                {
                    authRoute === 'login' && <div style={{ height: "100%", minWidth: "400px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                        <h1 style={{ textAlign: "center" }}>Đăng nhập</h1>
                        <Loginform />
                        <p>Bạn chưa có tài khoản <a onClick={() => navigate("/register") }>Đăng ký</a></p>
                    </div>
                }
                {
                    authRoute === 'register' && <div style={{ height: "100%", minWidth: "400px" }}>
                        <h1 style={{ textAlign: "center" }}>Đăng ký</h1>
                        <Registerform />
                        <p>Bạn đã có tài khoản? <a onClick={() => navigate("/login")}>Đăng nhập</a></p>
                    </div>
                }
            </div>
        </div>
    );
}

export default Auth;
