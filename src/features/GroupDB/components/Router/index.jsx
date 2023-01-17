import React from 'react';
import PropTypes from 'prop-types';
import { Route, Routes } from 'react-router-dom';
import General from '../General';
import GRTasks from '../GRTasks';
import TimeLine from '../TimeLine';
import Files from '../Files';
import NotFound from '../../../../compoments/NotFound';

GRRouter.propTypes = {
    handleTask:PropTypes.func,
    dataTasks:PropTypes.array
};
GRRouter.defaultProps = {
    handleTask:null,
    dataTasks:[]
}

function GRRouter({handleTask,dataTasks}) {
    return (
        <div>
            
            <Routes>
                <Route path="/general" element={<General />} />
                <Route
                    path="/tasks"
                    element={<GRTasks handleTask={handleTask} tasks={dataTasks} />}
                />
                <Route path="/time-line" element={<TimeLine />} />
                <Route path="/files" element={<Files />} />
            </Routes>
        </div>
    );
}

export default GRRouter;