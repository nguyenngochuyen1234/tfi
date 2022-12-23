import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";
import classNames from "classnames";

ItemDetail.propTypes = {
    _thisColor: PropTypes.string.isRequired,
    _thisCount: PropTypes.number.isRequired,
    _thisName: PropTypes.string.isRequired,
};
ItemDetail.defaultProps = {
    _thisColor: "#000",
    _thisCount: 0,
    _thisName: "Undefined",
};
function ItemDetail(props) {
    const { _thisName, _thisCount, _thisColor } = props;
    return (
        <div>
            <span
                className={classNames({
                    [[styles.name]]: true,
                    "text-sm": true,
                })}
            >
                {_thisName}
            </span>
            <div
                className={classNames({
                    [[styles.count]]: true,
                    "text-md-2": true,
                })}
                style={{ borderLeft: `3px solid ${_thisColor}` }}
            >
                {_thisCount}
            </div>
        </div>
    );
}

export default ItemDetail;
