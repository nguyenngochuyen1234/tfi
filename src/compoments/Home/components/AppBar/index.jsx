import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import SideBar from "./SideBar";
import HomeRight from "./HomeRight";
import styles from "./styles.module.css";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
AppBar.propTypes = {};

function AppBar(props) {
    const [feature, setFeature] = useState("dashboard");
    const {pathname} = useLocation();
    const navigate = useNavigate();
    const handleClickFeature=(item)=>{
        setFeature(item)
        navigate(item)
    }
   
    return (    
        <div className={styles.features}>
        
                
            <SideBar
                handleClickFeature={handleClickFeature}
                className={styles["feature-container_left"]}
            />
            <HomeRight className={styles["feature-container_right"]} feature={feature}/>
        </div>
    );
}

export default AppBar;
