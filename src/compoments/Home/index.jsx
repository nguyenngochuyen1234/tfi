import React from "react";
import Header from "./components/Header";
import AppBar from "./components/AppBar";
import styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {useNavigate} from "react-router-dom"
Home.propTypes = {};

function Home(props) {
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    useEffect(()=>{
        if(!isAuthenticated) navigate("/login")
    },[])
    return (
        <div className={styles.root}>
            <Header />
            <AppBar />
        </div>
    );
}

export default Home;
