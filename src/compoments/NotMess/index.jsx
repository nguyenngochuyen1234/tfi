import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";
import classNames from "classnames";
NotMess.propTypes = {
    people: PropTypes.string.isRequired,
};

function NotMess({ people }) {
    return (
        <div className={classNames({
            "text-md":true,
            [styles.notMess]:true,
        })}>
            <img style={{ width: "150px" }} src="../../../img/meo.png" alt="notMess" />
            Oh! Có vẻ bạn vẫn chưa nhắn với <br/> {people}
        </div>
    );
}

export default NotMess;
