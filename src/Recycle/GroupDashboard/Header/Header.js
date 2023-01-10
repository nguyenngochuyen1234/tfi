import React from 'react'
import {SettingOutlined} from '@ant-design/icons';
import { Button } from 'antd';
import "./style.css"
import GroupAvatar from '../../../../compoments/Avatar/GroupAvatar';
const Header = () => {
    return (
        <div className='header-group-container'> 
            <div>
                <h1>Way Finder</h1>
                <p style={{margin:"10px 0"}}>description</p>
            </div>
            <div className='header-group-item'>
                <div>
                    AVATAR
                </div>
                <div className='header-group-line' ></div>
                <SettingOutlined />
                <Button style={{margin:"0 10px"}} type='primary'>+Add member</Button>
            </div>
        </div>
    )
}

export default Header