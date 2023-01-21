import { FilterOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import useSelection from "antd/es/table/hooks/useSelection";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import taskApi from "../../../../api/taskApi";
import GRTaskList1 from "./components/GRTaskList1";
import styles from "./styles.module.css";
GRTasks.propTypes = {
    idGroup: PropTypes.string,
    handleTask: PropTypes.func,
    group: PropTypes.object,
};
GRTasks.defaultProps = {
    idGroup: "",
    group: null,
    handleTask: null,
};

function GRTasks({ idGroup, handleTask, group }) {
    const userId =
        useSelector((state) => state.user.current?.account._id) || localStorage.getItem("user_id");
    const navigate = useNavigate();
    const handleAddTask = () => {
        navigate("./add");
    };
    const handleDelete = async (id) => {
        await taskApi.deleteTask(id);
    };
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        if (idGroup !== "")
            (async () => {
                try {
                    const { tasks } = await taskApi.getAllTask(idGroup);
                    setTasks(tasks);
                } catch (error) {
                    console.log(error);
                }
            })();
    }, [handleDelete]);
    return (
        <div className={styles.GRTasks}>
            {group && (
                <div>
                    <div className={styles.filter}>
                        <div>
                            <Button type="default" icon={<FilterOutlined />}>
                                Filters
                            </Button>
                            {group.leader === userId && (
                                <Button
                                    style={{ marginLeft: "10px" }}
                                    type="primary"
                                    icon={<PlusOutlined />}
                                    onClick={handleAddTask}
                                >
                                    Add
                                </Button>
                            )}
                        </div>

                        <div style={{ width: "200px" }}>
                            <Input.Group compact style={{ width: "90%" }}>
                                <Input.Search
                                    allowClear
                                    defaultValue=""
                                    placeholder="Find Tasks..."
                                />
                            </Input.Group>
                        </div>
                    </div>

                    <GRTaskList1
                        handleTask={handleTask}
                        tasks={tasks}
                        group={group}
                        handleDelete={handleDelete}
                    />
                </div>
            )}
        </div>
    );
}

export default GRTasks;
