import { BulbOutlined, CrownOutlined, IdcardOutlined, LogoutOutlined, SettingOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";
import React from "react";
import styles from "../../styles.module.css";
import ProfileItem from "../ProfileItem";
import PropTypes from "prop-types"
Profile.propTypes = {
    handleLogOut: PropTypes.func.isRequired,
};
Profile.defaultProps = {
    handleLogOut:null,
};
const items = [
    {
        key: "1",
        label: <ProfileItem icon={<IdcardOutlined />} label="Thông tin tài khoản" />,
    },
    {
        key: "2",
        label: <ProfileItem icon={<SettingOutlined />} label="Cài đặt & Quyền riêng tư" />,
    },
    {
        key: "3",
        label: <ProfileItem icon={<CrownOutlined />} label="Màn hình & Trợ lí Doris" />,
    },
    {
        key: "4",
        label: <ProfileItem icon={<BulbOutlined />} label="Báo lỗi & Đóng góp ý kiến" />,
    },
    {
        key: "LogOut",
        label: <ProfileItem icon={<LogoutOutlined />}  label="Đăng xuất" />,
    },
];
function Profile(props) {
    const {handleLogOut}=props;
    const onClick=({key})=>{
        if(key==="LogOut"){
            handleLogOut();
        }
    }
    return (
        <Dropdown
            overlayClassName={styles.main}
            menu={{
                items,
                onClick
            }}
            placement="bottomRight"
            arrow={false}
            trigger={["click"]}
        >
            <Button type="default" className={styles["btn-r-container"]}>
                <img
                    src="https://scontent-hkg4-1.xx.fbcdn.net/v/t39.30808-1/316282375_830242631636324_4108120794133707327_n.jpg?stp=dst-jpg_p320x320&_nc_cat=100&ccb=1-7&_nc_sid=7206a8&_nc_ohc=f4GV-Hxai5sAX-5ap-m&_nc_ht=scontent-hkg4-1.xx&oh=00_AfA_fiktTwiQn5lGbqcF5S1lsE0wvQasf2s8aW_Lp49hlQ&oe=63BDE298"
                    alt="avt"
                />
            </Button>
        </Dropdown>
    );
}

export default Profile;
