import React from 'react';
import PropTypes from 'prop-types';

BarItem.propTypes = {
    label:PropTypes.string.isRequired,
    typeSize:PropTypes.string,
};
BarItem.defaultProps = {
    typeSize:"df"
};

function BarItem({label,typeSize}) {
    return (
        <div className={`bar-item-${typeSize}`}>
            <span>{label}</span>
        </div>
    );
}

export default BarItem;