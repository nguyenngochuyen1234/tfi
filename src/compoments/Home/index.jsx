import React from "react";
import AppBar from "./components/AppBar";
import Header from "./components/Header";
import styles from "./styles.module.css";
import PropTypes from "prop-types"
Home.propTypes = {
    user: PropTypes.object.isRequired,
};

function Home({user}) {
    
    
    return (
        <div className={styles.root}>
            <Header />
            <AppBar />
        </div>
    );
}

export default Home;
