import PropTypes from "prop-types";

import { Navigate, Route, Routes } from "react-router-dom";
import FeatureChat from "../../../../features/Chat";
import FeatureDashBoard from "../../../../features/Dashboard";
import FeatureGroup from "../../../../features/Group";
import GroupDB from "../../../../features/GroupDB";
import AddTask from "../../../../features/GroupDB/components/AddTask";
import DetailTask from "../../../../features/GroupDB/components/DetailTask";
import Manager from "../../../../features/GroupDB/components/Manager";
import FeatureInfor from "../../../../features/Infor";
import FeaturePassword from "../../../../features/Password";
import FeatureTaskList from "../../../../features/TaskList";
import NotFound from "../../../NotFound";

HomeRight.propTypes = {
    feature: PropTypes.string,
};
HomeRight.defaultProps = {
    feature: "",
};

function HomeRight({ feature }) {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="./dashboard" />} />
            <Route path="/dashboard" element={<FeatureDashBoard />} />
            <Route path="/chat/*" element={<FeatureChat />} />
            <Route path="/groups" element={<FeatureGroup />} />
            <Route path="/groups/:idGroup/tasks/:idTask" element={<DetailTask />} />
            <Route path="/groups/:idGroup/tasks/add" element={<AddTask />} />
            <Route path="/groups/:idGroup/setting" element={<Manager />} />

            <Route path="/groups/:idGroup/*" element={<GroupDB />} />
            <Route path="/tasklist" element={<FeatureTaskList />} />
            <Route path="/infor" element={<FeatureInfor/>}/>
            <Route path="/password" element={<FeaturePassword/>}/>
            <Route path="*" element={<NotFound/>} />
        </Routes>
    );
}

export default HomeRight;
