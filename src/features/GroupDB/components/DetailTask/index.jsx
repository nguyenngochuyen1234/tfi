import React from 'react';
import PropTypes from 'prop-types';

DetailTask.propTypes = {
    setRender:PropTypes.func.isRequired,
    data:PropTypes.object.isRequired,

};

function DetailTask({data,setRender}) {
    return (
        <div>
            {data.name}
        </div>
    );
}

export default DetailTask;