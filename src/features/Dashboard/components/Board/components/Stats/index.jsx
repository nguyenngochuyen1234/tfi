import { StarOutlined,CloudUploadOutlined,UsergroupAddOutlined ,RocketOutlined} from "@ant-design/icons";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import GradeRate from "./components/GradeRate";
import styles from "./styles.module.css";
Stats.propTypes = {
    userName: PropTypes.string.isRequired,
    star: PropTypes.number.isRequired,
    groupJoin: PropTypes.number.isRequired,
    groupCreated: PropTypes.number.isRequired,
    totalSubmited: PropTypes.number.isRequired,
};
Stats.defaultProps = {
    userName: "Undefined",
    star: 0,
    groupJoin: 0,
    groupCreated: 0,
    totalSubmited: 0,
};

function Stats(props) {
    const date = new Date();
    const statement = [
        "Total Starts Earned:",
        `Total Tasks Submitted (${date.getFullYear()}):`,
        "Total Groups joined:",
        "Total Groups Created:",
    ];
    const { userName, star, groupJoin, groupCreated, totalSubmited } = props;
    return (
        <div>
            <div className={styles["stats-container"]}>
                <span
                    className={classNames({
                        [styles.title]: true,
                        "text-md": true,
                    })}
                >
                    {userName}'s Task Manager Stats
                </span>
                <div style={{display:'flex',alignItems:'center'}}>
                    <div>
                        <ul className={styles["stat-list"]}>
                            <li>
                                <div className={styles["stat-container"]}>
                                    <span className={styles["stat-name"]}>
                                        <StarOutlined style={{ marginRight: "8px" }} />
                                        {statement[0]}
                                    </span>
                                    <span className={styles["stat-count"]}>{star}</span>
                                </div>
                            </li>
                            <li>
                                <div className={styles["stat-container"]}>
                                    <span className={styles["stat-name"]}>
                                        <CloudUploadOutlined style={{ marginRight: "8px" }} />
                                        {statement[1]}
                                    </span>
                                    <span className={styles["stat-count"]}>{totalSubmited}</span>
                                </div>
                            </li>
                            <li>
                                <div className={styles["stat-container"]}>
                                    <span className={styles["stat-name"]}>
                                        <RocketOutlined  style={{ marginRight: "8px" }} />
                                        {statement[2]}
                                    </span>
                                    <span className={styles["stat-count"]}>{groupJoin}</span>
                                </div>
                            </li>
                            <li>
                                <div className={styles["stat-container"]}>
                                    <span className={styles["stat-name"]}>
                                        <UsergroupAddOutlined style={{ marginRight: "8px" }} />
                                        {statement[3]}
                                    </span>
                                    <span className={styles["stat-count"]}>{groupCreated}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <GradeRate />
                </div>
            </div>
        </div>
    );
}

export default Stats;
