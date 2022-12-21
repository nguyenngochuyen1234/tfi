import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

Header.propTypes = {
    
};

function Header(props) {
    return (
        <div className={styles.root}>

            <img className={styles.logo} src="../../../../img/logo.png" alt='Logo'/>
            <span className={styles.project}>Task manager</span>
        </div>
    );
}

export default Header;