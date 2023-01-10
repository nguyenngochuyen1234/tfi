import React from 'react';
import PropTypes from 'prop-types';

BarItem.propTypes = {
    label:PropTypes.string.isRequired
};

function BarItem({label}) {
    return (
        <div className='bar-item'>
            <span>{label}</span>
        </div>
    );
}

export default BarItem;