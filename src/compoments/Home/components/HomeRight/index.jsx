
import PropTypes from 'prop-types';

import { Navigate, Route, Routes } from 'react-router-dom';
import FeatureChat from '../../../../features/Chat';
import FeatureDashBoard from '../../../../features/Dashboard';
import FeatureGroup from '../../../../features/Group';
import FeatureTaskList from '../../../../features/TaskList';


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
            <Route path="/chat*" element={<FeatureChat />} />
            <Route path="/chat/:idFriend" element={<FeatureChat />} />
            <Route path="/groups" element={<FeatureGroup />} />
            <Route path="/tasklist" element={<FeatureTaskList />} />
        </Routes>

    );
}

export default HomeRight;