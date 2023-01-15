import React from 'react';
import PropTypes from 'prop-types';
import styles from "../../styles.module.css";

GDBBody.propTypes = {
    data:PropTypes.string,
};

function GDBBody({data}) {
    return (
        <div className={styles["group-body"]}>
            {data}
        </div>
    );
}

export default GDBBody;