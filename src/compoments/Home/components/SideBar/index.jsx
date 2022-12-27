import {
    AppstoreAddOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    MessageOutlined,
    OrderedListOutlined,
    TeamOutlined
} from "@ant-design/icons";
import { Button, Menu } from "antd";
import classNames from "classnames";
import PropTypes from 'prop-types';
import React, { useState } from "react";
import styles from "./styles.module.css";

SideBar.propTypes = {
  handleClickFeature: PropTypes.func,
  currentFeature: PropTypes.string
};
SideBar.defaultProps = {
  handleClickFeature:null,
  currentFeature: 'dashboard'

};
function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
function SideBar({handleClickFeature,currentFeature}) {
    const items = [
        getItem("Dashboard", "dashboard", <AppstoreAddOutlined />),
        getItem("Chat", "chat", <MessageOutlined />),
        getItem("Group", "group", <TeamOutlined />),
        getItem("Task List", "tasklist", <OrderedListOutlined />),
    ];
    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    const handleSelectMenu = (key) => {
      if(handleClickFeature) handleClickFeature(key)
    };
    
    return (
        <div
            className={classNames({
               
                [styles.root]: true,
                [styles["root-width"]]: !collapsed,
            })}
        >
            <Button value="large" type="text" onClick={toggleCollapsed} className={styles.btnSideBar}>
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
            <Menu
                className={styles.menu}
              
                defaultSelectedKeys={[currentFeature]}
                defaultOpenKeys={[currentFeature]}
                mode="inline"
                theme="light"
                inlineCollapsed={collapsed}
                items={items}
                onSelect={(item) => {
                    handleSelectMenu(item.key);
                   
                }}
            />
        </div>
    );
}

export default SideBar;
