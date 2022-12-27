import React from 'react';
import PropTypes from 'prop-types';
import styles from "../../styles.module.css";
import classNames from 'classnames';

ProfileItem.propTypes = {
    icon: PropTypes.node.isRequired,
    label: PropTypes.string.isRequired,
};
ProfileItem.defaultProps = {
    icon: null,
    label:""
};

function ProfileItem({icon,label}) {
    return (
        <div className={classNames({
            [styles.item]:true,
            "text-df":true,
        }) }>
            {icon} <span className={styles["m-l-5"]}>{label}</span>
        </div>
    );
}

export default ProfileItem;