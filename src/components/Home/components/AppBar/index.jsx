import { AppstoreAddOutlined, MessageOutlined, OrderedListOutlined, TeamOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HomeRight from "../HomeRight";
import SideBar from "../SideBar";
import styles from "./styles.module.css";
import PropTypes from "prop-types"
AppBar.propTypes = {
    items:PropTypes.array.isRequired,
    theme:PropTypes.string
};
AppBar.defaultProps = {
    theme:"light"
}

function AppBar({items,theme}) {
    const { pathname } = useLocation();
    const newPath = pathname.split('/')[2];
    const [feature, setFeature] = useState(newPath===""?"dashboard":newPath);
    const navigate = useNavigate();
    useEffect(()=>{
        setFeature(pathname.split('/')[2])
        console.log(pathname.split('/')[2])
    },[pathname])
    const handleClickFeature = (item) => {
        navigate(item);
    };

    return (
        <div className={styles.features}>
            <SideBar
                currentFeature={feature}
                handleClickFeature={handleClickFeature}
                items={items}
                theme={theme}
            />
            <HomeRight  feature={feature} />
        </div>
    );
}

export default AppBar;
