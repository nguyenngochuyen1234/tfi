import React from "react";
import Header from "./components/Header";
import AppBar from "./components/AppBar";
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
