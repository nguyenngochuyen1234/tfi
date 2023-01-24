import { Tabs } from "antd";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

TabBar.propTypes = {
    data: PropTypes.array,
    onChange: PropTypes.func,
    activeKey: PropTypes.string,
    config: PropTypes.bool,
};
TabBar.defaultProps = {
    data: [],
    onChange: null,
    config: true,
};

function TabBar(props) {
    const { data, onChange, activeKey, config } = props;
    return (
        <Tabs
            className={classNames({
                "wrap-container": config,
                "wrap-container_config": !config,
            })}
            tabBarGutter="0px"
            style={{ color: "var(--color--text-default)" }}
            activeKey={activeKey}
            onChange={(key) => {
                if (onChange) onChange(key);
            }}
            size="middle"
            items={data}
        />
    );
}

export default TabBar;
