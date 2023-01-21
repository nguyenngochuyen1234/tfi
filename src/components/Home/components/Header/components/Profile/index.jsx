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
import { useSelector } from "react-redux";
import Options from "../../../../../Options";
Profile.propTypes = {
    handleLogOut: PropTypes.func.isRequired,
    handleSettingPrivacy: PropTypes.func.isRequired,
    handleInfor: PropTypes.func.isRequired,
    handleScreen: PropTypes.func.isRequired,
};
Profile.defaultProps = {};
const items = [
    {
        key: "Infor",
        label: <Options icon={<IdcardOutlined />} label="Thông tin tài khoản" config="df" />,
    },
    {
        key: "SettingPrivacy",
        label: <Options icon={<SettingOutlined />} label="Cài đặt & Quyền riêng tư" config="df" />,
    },
    {
        key: "Screen",
        label: <Options icon={<CrownOutlined />} label="Màn hình & Trợ năng" config="df" />,
    },
    {
        key: "Report",
        label: <Options icon={<BulbOutlined />} label="Báo lỗi & Đóng góp ý kiến" config="df" />,
    },
    {
        key: "LogOut",
        label: <Options icon={<LogoutOutlined />} label="Đăng xuất" config="df" />,
    },
];
function Profile(props) {
    const { handleLogOut, handleInfor, handleSettingPrivacy, handleScreen } = props;
    const { avatar } =
        useSelector((state) => state.user.current.account) ||
        JSON.parse(localStorage.getItem("user"));

    const onClick = ({ key }) => {
        if (key === "LogOut") {
            handleLogOut();
        }
        if (key === "Infor") {
            handleInfor();
        }
        if (key === "SettingPrivacy") {
            handleSettingPrivacy();
        }
        if (key === "Screen") {
            handleScreen();
        }
        if (key === "Report") {
            window.open("https://www.facebook.com/messages/t/100039517846789", "_blank");
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
            <Button  type="text" className={styles["btn-r-container"]}>
                <img src={avatar}  alt="avt" />
            </Button>
        </Dropdown>
    );
}

export default Profile;
