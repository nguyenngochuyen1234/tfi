import React from 'react';
import PropTypes from 'prop-types';
import { Route, Routes } from 'react-router-dom';
import General from '../General';
import GRTasks from '../GRTasks';
import TimeLine from '../TimeLine';
import Files from '../Files';


GRRouter.propTypes = {
    handleTask:PropTypes.func,
    dataTasks:PropTypes.array,
    setRender:PropTypes.func,
};
GRRouter.defaultProps = {
    handleTask:null,
    dataTasks:[],
    setRender:null,
}

function GRRouter({handleTask,dataTasks,setRender}) {
    return (
        <div>
            
            <Routes>
                <Route path="/general" element={<General />} />
                <Route
                    path="/tasks"
                    element={<GRTasks handleTask={handleTask} tasks={dataTasks} setRender={setRender}/>}
                />
                <Route path="/time-line" element={<TimeLine />} />
                <Route path="/files" element={<Files />} />
            </Routes>
        </div>
    );
}

export default GRRouter;