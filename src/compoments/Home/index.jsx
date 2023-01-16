import React, { useEffect, useRef } from "react";
import AppBar from "./components/AppBar";
import Header from "./components/Header";
import styles from "./styles.module.css";
import { io } from 'socket.io-client'
import { STATIC_HOST } from "../../constants";
import { useDispatch } from "react-redux";
import { socketActions } from "../socketSlice";
import PropTypes from "prop-types"
Home.propTypes = {

};

function Home() {
    const userId = localStorage.getItem("user_id")
    const dispatch = useDispatch()

    const socket = useRef()

    useEffect(() => {
        socket.current = io(STATIC_HOST)
        socket.current.emit("add-user", userId)
        dispatch(socketActions.setSocket(socket.current))
    }, [userId])



    return (
        <div className={styles.root}>
            <Header />
            <AppBar />
        </div>
    );
}

export default Home;
