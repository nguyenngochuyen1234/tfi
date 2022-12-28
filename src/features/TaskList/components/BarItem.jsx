import React from 'react';
import PropTypes from 'prop-types';

BarItem.propTypes = {
    label:PropTypes.string.isRequired
};

function BarItem({label}) {
    return (
        <div style={{padding:"5px 15px", fontWeight:"500"} }>
            <span>{label}</span>
        </div>
    );
}

export default BarItem;