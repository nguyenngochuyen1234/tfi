import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Menu } from "antd";
import classNames from "classnames";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import useWindowDimensions from "../../../../customHook/WindowDimensions";
import styles from "./styles.module.css";

SideBar.propTypes = {
    handleClickFeature: PropTypes.func,
    currentFeature: PropTypes.string,
    items: PropTypes.array.isRequired,
    theme:PropTypes.string,
};
SideBar.defaultProps = {
    handleClickFeature: null,
    theme: "light",
    currentFeature: "dashboard",
};

function SideBar({ handleClickFeature, currentFeature, items,theme }) {
    const { width } = useWindowDimensions();
   
    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    const handleSelectMenu = (key) => {
        if (handleClickFeature) handleClickFeature(key);
    };
    useEffect(() => {
        if (width < 1000 && collapsed === false) {
            setCollapsed(true);
        }
    }, [width]);

    return (
        <div
            className={classNames({
                [styles.root]: true,
                [styles["root-width"]]: !collapsed,
            })}
        >
            {width > 1000 && (
                <Button
                    value="large"
                    type="text"
                    
                    onClick={toggleCollapsed}
                    className={styles.btnSideBar}
                >
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </Button>
            )}
            <Menu
                className={styles.menu}
                defaultSelectedKeys={[currentFeature]}
                defaultOpenKeys={[currentFeature]}
                selectedKeys={[currentFeature]}
                mode="inline"
                theme={theme}
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
