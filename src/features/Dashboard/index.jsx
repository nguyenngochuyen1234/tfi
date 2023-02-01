import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";
import { Layout } from "antd";
import classNames from "classnames";
import Board from "./components/Board";
import Overview from "./components/Overview";
import userApi from "../../api/userApi";
import { useSelector } from "react-redux";
import taskApi from "../../api/taskApi";
FeatureDashBoard.propTypes = {};

function FeatureDashBoard(props) {
    const { _id } =
        useSelector((state) => state.user.current?.account) ||
        JSON.parse(localStorage.getItem("user"));
    const [user, setUser] = useState();
    useEffect(() => {
        (async () => {
            try {
                const { user } = await userApi.getOnlyUser(_id);
                const { tasks } = await taskApi.getAllTaskOfUser();
                const configUser={...user,tasks}
                setUser(configUser);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);
    return (
        <div
            className={classNames({
                "feature-container_right": true,
                [styles.root]: true,
            })}
        >
            {user && (
                <Layout className={styles.board}>
                    <Board user={user} />
                </Layout>
            )}
            {user && (
                <div className={styles.overview}>
                    <Overview  user={user} />
                </div>
            )}
        </div>
    );
}

export default FeatureDashBoard;
