import { Tabs } from "antd";
import PropTypes from "prop-types";
import React from "react";

TabBar.propTypes = {
    data: PropTypes.array,
    onChange: PropTypes.func,
    activeKey: PropTypes.string,

};
TabBar.defaultProps = {
    data:[],
    onChange:null,

};

function TabBar(props) {
    const {data, onChange,activeKey} = props;
    return (
        <Tabs
            className="wrap-container"
            tabBarGutter="0px"
            activeKey={activeKey}
            onChange={(key)=>{if (onChange) onChange(key)}}
            size="middle"
            items={data}
        />
    );
}

export default TabBar;
