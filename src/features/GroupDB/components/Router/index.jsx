import React from "react";
import PropTypes from "prop-types";
import { Route, Routes } from "react-router-dom";
import General from "../General";
import GRTasks from "../GRTasks";
import TimeLine from "../TimeLine";
import Files from "../Files";

GRRouter.propTypes = {
    handleTask: PropTypes.func,
    idGroup: PropTypes.string,
};
GRRouter.defaultProps = {
    handleTask: null,
    idGroup: "",
};

function GRRouter({ handleTask, idGroup }) {
    return (
        <div>
            <Routes>
                <Route path="/general" element={<General />} />
                <Route
                    path="/tasks"
                    element={<GRTasks handleTask={handleTask} idGroup={idGroup} />}
                />
                <Route path="/time-line" element={<TimeLine />} />
                <Route path="/files" element={<Files />} />
            </Routes>
        </div>
    );
}

export default GRRouter;
