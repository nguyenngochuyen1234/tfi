<<<<<<< HEAD
import React,{ useContext, useEffect } from 'react'
=======
import React from 'react'
import { Link } from 'react-router-dom'
>>>>>>> features
import Loginform from '../compoments/auth/Loginform'
import Registerform from '../compoments/auth/Registerform'
import { useDispatch, useSelector } from "react-redux";
import { Navigate} from "react-router-dom";
import {useNavigate} from "react-router-dom"
import { Spin } from 'antd'
import "./style.css"
import { loadUser } from '../store/actions/authAction';
let isFirstRender = true;
const Auth = ({authRoute}) => {
    const navigate = useNavigate();
    const authLoading = useSelector((state) => state.auth.authLoading);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    useEffect(()=>{
        if(isFirstRender){
            isFirstRender = false;
            return;
        }
        dispatch(loadUser())
    },[dispatch,isFirstRender])
    let body
    if(authLoading){
        body = (
            <Spin />
        )
    }
    else if(isAuthenticated) return <Navigate to='/home'/>
    else{
        body = (
            <>
            {
                authRoute === 'login' && <div style={{height:"100%", minWidth:"400px", display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column"}}>
                <h1 style={{textAlign:"center"}}>Đăng nhập</h1>
                <Loginform />
                <p>Bạn chưa có tài khoản <a onClick={() => navigate("/register")}>Đăng ký</a></p>
            </div>
            }
            {
                authRoute === 'register' && <div style={{height:"100%", minWidth:"400px"}}>
                    <h1 style={{textAlign:"center"}}>Đăng ký</h1>
                    <Registerform />
                    <p>Bạn đã có tài khoản? <a onClick={() => navigate("/login")}>Đăng nhập</a></p>
                </div>
            }
            </>
        )
    }
  return (
    <div className='auth-body'>
        <img src='../../img/task.png' alt="login-img"/>
        <div className='form-container'>
            {body}
        </div>
    </div>
  )
}

export default Auth