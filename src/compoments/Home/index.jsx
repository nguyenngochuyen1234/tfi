import React, { useEffect, useRef } from "react";
import AppBar from "./components/AppBar";
import Header from "./components/Header";
import styles from "./styles.module.css";
import { io } from 'socket.io-client'
import { STATIC_HOST } from "../../constants/common";
import { useDispatch } from "react-redux";
import { socketActions } from "../socketSlice";
Home.propTypes = {

};

function Home() {
    const idUser = localStorage.getItem("user_id")
    const socket = useRef();
    const dispatch = useDispatch();
    useEffect(() => {
        if (idUser) {
          socket.current = io(STATIC_HOST);
          socket.current.emit("add-user", idUser);
          dispatch(socketActions.setSocket(socket.current))
        }
      }, [idUser]);
    return (
        <div className={styles.root}>
            <Header />
            <AppBar />
        </div>
    );
}

export default Home;
