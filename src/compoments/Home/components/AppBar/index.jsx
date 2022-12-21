import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HomeRight from "./HomeRight";
import SideBar from "./SideBar";
import styles from "./styles.module.css";
AppBar.propTypes = {};

function AppBar(props) {
    const { pathname } = useLocation();
    const newPath = pathname.replace("/home/", "");
    const [feature, setFeature] = useState(newPath);
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
                className={styles["feature-container_left"]}
            />
            <HomeRight className={styles["feature-container_right"]} feature={feature} />
        </div>
    );
}

export default AppBar;
