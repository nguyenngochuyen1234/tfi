import { Tabs } from "antd";
import PropTypes from "prop-types";
import React from "react";

TabBar.propTypes = {
    data: PropTypes.array,
    onChange: PropTypes.func.isRequired,
    activeKey: PropTypes.string

};
TabBar.defaultProps = {
    data:[]
};
function TabBar(props) {
    const {data, onChange,activeKey} = props;
    return (
        <Tabs
            className="wrap-container"
            tabBarGutter="0px"
            activeKey={activeKey}
            onChange={onChange}
            size="middle"
            items={data}
        />
    );
}

export default TabBar;
