import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AppBar from "./components/AppBar";
import Header from "./components/Header";
import styles from "./styles.module.css";
Home.propTypes = {};

function Home(props) {
    
    
    return (
        <div className={styles.root}>
            <Header />
            <AppBar />
        </div>
    );
}

export default Home;
