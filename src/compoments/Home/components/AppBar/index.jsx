import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HomeRight from "./HomeRight";
import SideBar from "./SideBar";
import styles from "./styles.module.css";
AppBar.propTypes = {};

function AppBar(props) {
    const { pathname } = useLocation();
    const newPath = pathname.slice(6);
    const [feature, setFeature] = useState(newPath===""?"dashboard":newPath);
    const navigate = useNavigate();
    const handleClickFeature = (item) => {
        setFeature(item);
        navigate(item);
    };

    return (
        <div className={styles.features}>
            <SideBar
                currentFeature={feature}
                handleClickFeature={handleClickFeature}
                
            />
            <HomeRight  feature={feature} />
        </div>
    );
}

export default AppBar;
