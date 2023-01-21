import PropTypes from "prop-types";
import React from "react";
import classNames from "classnames";
import styles from "./styles.module.css";
Options.propTypes = {
    icon: PropTypes.node.isRequired,
    config:PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
};
Options.defaultProps = {
    icon: null,
    label: "",
};

function Options({ icon, label,config }) {
    return (
        <div
            className={classNames({
                [styles.config]:true,
                [styles.item]: config==="df" ?true:false,
                [styles.item_sm]: config==="sm" ?true:false,
                "text-df":  config==="df" ?true:false,
                "text-sm":  config==="sm"?true:false,
            })}
        >
            {icon} <span className={styles["m-l-5"]}>{label}</span>
        </div>
    );
}

export default Options;
