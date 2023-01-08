import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";
import classNames from "classnames";
NotMess.propTypes = {
    mess:PropTypes.string.isRequired
};

function NotMess({mess="" }) {
    return (
        <div className={classNames({
            "text-md":true,
            [styles.notMess]:true,
        })}>
            <img style={{ width: "150px" }} src="../../../img/meo.png" alt="notMess" />
            {mess}
        </div>
    );
}

export default NotMess;
