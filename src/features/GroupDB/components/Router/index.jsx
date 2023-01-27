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
    group: PropTypes.object,
};
GRRouter.defaultProps = {
    handleTask: null,
    idGroup: "",
    group: null,
};

function GRRouter({ handleTask, idGroup, group }) {
    return (
        <Routes>
            <Route path="/general" element={<General group={group} />} />
            <Route
                path="/tasks"
                element={<GRTasks handleTask={handleTask} idGroup={idGroup} group={group} />}
            />
            <Route path="/time-line" element={<TimeLine />} />
            <Route path="/files" element={<Files />} />
        </Routes>
    );
}

export default GRRouter;
