import React from "react";
import PropTypes from "prop-types";
import { Tabs } from "antd";
import styles from "./styles.module.css";

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
            className={styles.item}
            tabBarGutter="0px"
            defaultActiveKey={activeKey}
            onChange={onChange}
            size="middle"
            items={data}
        />
    );
}

export default TabBar;
