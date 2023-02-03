import React, { useEffect, useRef, useState } from "react";
import AppBar from "./components/AppBar";
import Header from "./components/Header";
import styles from "./styles.module.css";
import { io } from "socket.io-client";
import { STATIC_HOST, HOST } from "../../constants/common";
import { useDispatch, useSelector } from "react-redux";
import { socketActions } from "../socketSlice";
import PropTypes from "prop-types";
import {
    AppstoreAddOutlined,
    LockOutlined,
    MessageOutlined,
    OrderedListOutlined,
    TeamOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import SettingPrivacy from "../../features/SettingPrivacy";
import ScreenSupport from "../../features/ScreenSupport";
Home.propTypes = {
    theme: PropTypes.string,
};
Home.defaultProps = {
    theme: "light",
};
function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
const items_1 = [
    getItem("Dashboard", "dashboard", <AppstoreAddOutlined />),
    getItem("Chat", "chat", <MessageOutlined />),
    getItem("Groups", "groups", <TeamOutlined />),
    getItem("Task List", "tasklist", <OrderedListOutlined />),
];
const items_2 = [
    getItem("Thông tin tài khoản", "infor", <UserOutlined />),
    getItem("Quản lý mật khẩu", "password", <LockOutlined />),
];

function Home({ theme }) {
    const { pathname } = useLocation();
    const [openSetting, setOpenSetting] = useState(false);
    const [openScreen, setOpenScreen] = useState(false);
    const [configTheme, setConfigTheme] = useState(theme);

    const user = useSelector((state) => state.user.current.account);
    const idUser = user?._id || localStorage.getItem("user_id");
    const socket = useRef();
    const dispatch = useDispatch();
    const [items, setItems] = useState(items_1);
    useEffect(() => {
        const param = pathname.split("/")[2];
        if (["dashboard", "chat", "groups", "tasklist"].includes(param)) {
            setItems(items_1);
        }
        if (["infor", "password"].includes(param)) {
            setItems(items_2);
        }
    }, [pathname]);
    useEffect(() => {
        if (idUser) {
            socket.current = io(STATIC_HOST,{origins:HOST});
            socket.current.emit("add-user", idUser);
            dispatch(socketActions.setSocket(socket.current));
        }
    }, [idUser]);
    return (
        <div className={styles.root}>
            <ScreenSupport open={openScreen} setOpen={setOpenScreen} setTheme={setConfigTheme} />
            <SettingPrivacy open={openSetting} setOpen={setOpenSetting} />
            <Header setOpenSetting={setOpenSetting} setOpenScreen={setOpenScreen} />
            <AppBar items={items} theme={configTheme} />
        </div>
    );
}

export default Home;
