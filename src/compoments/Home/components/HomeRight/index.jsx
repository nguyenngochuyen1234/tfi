
import PropTypes from 'prop-types';

import { Navigate, Route, Routes } from 'react-router-dom';
import FeatureDashBoard from '../../../../features/Dashboard';
import FeatureChat from '../../../../features/Chat';
import FeatureGroup from '../../../../features/Group';
import FeatureTaskList from '../../../../features/TaskList';
import GroupDashboard from '../../../../features/Group/GroupDashboard/GroupDashboard';


HomeRight.propTypes = {
    feature: PropTypes.string
};
HomeRight.defaultProps = {
    feature: ''
};

function HomeRight({ feature }) {
    return (

        <Routes>
            <Route path="/" element={<Navigate to="./dashboard" />} />
            <Route path="/dashboard" element={<FeatureDashBoard />} />
            <Route path="/chat" element={<FeatureChat />} />
            <Route path="/group" element={<FeatureGroup />} />
            <Route path="/group/:groupId" element={<GroupDashboard />} />
            <Route path="/tasklist" element={<FeatureTaskList />} />
        </Routes>

    );
}

export default HomeRight;