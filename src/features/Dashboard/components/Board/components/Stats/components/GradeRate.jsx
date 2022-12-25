import React from 'react';
import PropTypes from 'prop-types';
import { Progress } from 'antd';

GradeRate.propTypes = {
    
};

function GradeRate(props) {
    return (
        <div>
            <Progress className='text-lg' style={{fontWeight:"bold",marginLeft:'44px'}}  width={80} type="circle" percent={75} format={(percent) => `A +` }/>
        </div>
    );
}

export default GradeRate;