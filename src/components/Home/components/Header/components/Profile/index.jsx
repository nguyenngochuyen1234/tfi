import {
    BulbOutlined,
    CrownOutlined,
    IdcardOutlined,
    LogoutOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import { Button, Dropdown } from "antd";
import React from "react";
import styles from "../../styles.module.css";

import PropTypes from "prop-types";
import Options from "../../../../../Options";
import { useSelector } from "react-redux";
Profile.propTypes = {
    handleLogOut: PropTypes.func.isRequired,
};
Profile.defaultProps = {
    handleLogOut: null,
};
const items = [
    {
        key: "Infor",
        label: <Options icon={<IdcardOutlined />} label="Thông tin tài khoản" config="df" />,
    },
    {
        key: "",
        label: <Options icon={<SettingOutlined />} label="Cài đặt & Quyền riêng tư" config="df" />,
    },
    {
        key: "3",
        label: <Options icon={<CrownOutlined />} label="Màn hình & Trợ lí Doris" config="df" />,
    },
    {
        key: "4",
        label: <Options icon={<BulbOutlined />} label="Báo lỗi & Đóng góp ý kiến" config="df" />,
    },
    {
        key: "LogOut",
        label: <Options icon={<LogoutOutlined />} label="Đăng xuất" config="df" />,
    },
];
function Profile(props) {
    const { handleLogOut,handleInfor } = props;
    const {avatar}=useSelector((state)=>state.user.current.account) || JSON.parse(localStorage.getItem('user'));

    const onClick = ({ key }) => {
        if (key === "LogOut") {
            handleLogOut();
        }
        if(key==="Infor"){
            handleInfor();
        }
    };
    return (
        <Dropdown
            overlayClassName={styles.main}
            menu={{
                items,
                onClick,
            }}
            placement="bottomRight"
            arrow={false}
            trigger={["click"]}
        >
            <Button type="default" className={styles["btn-r-container"]}>
                <img
                    src={avatar}
                    alt="avt"
                />
            </Button>
        </Dropdown>
    );
}

export default Profile;
