import { InfoCircleFilled } from "@ant-design/icons";
import { Image } from "antd";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import styles from "./styles.module.css";

ChatHeader.propTypes = {
    current: PropTypes.object,
};

function ChatHeader(props) {
    const { current } = props;
    return (
        <div className={styles.head}>
            <div style={{ display: "flex", alignItems: "center" }}>
                <div className={styles.avt}>
                    <Image src={current.avt} alt="avt" />
                </div>

                <span
                    className={classNames({
                        [styles.name]: true,
                        "text-md": true,
                    })}
                >
                    {current.name}
                </span>
            </div>
            <InfoCircleFilled
                style={{ marginRight: "20px", fontSize: "20px", cursor: "pointer" }}
            />
        </div>
    );
}

export default ChatHeader;
