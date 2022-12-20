import React from 'react'
import Loginform from '../compoment/auth/Loginform'
import Registerform from '../compoment/auth/Registerform'
import "./style.css"

const Auth = ({authRoute}) => {
    let body
    body = (
        <>
        {
            authRoute === 'login' && <div style={{height:"100%"}}>
            <h1 style={{textAlign:"center"}}>Đăng nhập</h1>
            <Loginform />
            <p>Bạn chưa có tài khoản <a href='#'>Đăng ký</a></p>
        </div>
        }
        {
            authRoute === 'register' && <div style={{height:"100%"}}>
                <h1 style={{textAlign:"center"}}>Đăng ký</h1>
                <Registerform />
                <p>Bạn đã có tài khoản? <a href='#'>Đăng nhập</a></p>
            </div>
        }
        </>
    )
  return (
    <div className='auth-body'>
        <img src='../../img/task.png'/>
        <div className='form-container'>
            {body}
        </div>
    </div>
  )
}

export default Auth