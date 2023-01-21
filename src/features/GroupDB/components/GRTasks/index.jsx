import { FilterOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import PropTypes from "prop-types";
import React from "react";
import { useNavigate } from "react-router-dom";
import GRTaskList1 from "./components/GRTaskList1";
import styles from "./styles.module.css";
GRTasks.propTypes = {
    tasks: PropTypes.array,
    handleTask: PropTypes.func,
    setRender: PropTypes.func,
};
GRTasks.defaultProps = {
    tasks: [],
    handleTask: null,
    setRender: null,
};

function GRTasks({ tasks, handleTask, setRender }) {
    const navigate = useNavigate();
    const handleAddTask = () => {
        if (setRender) {
            setRender("addTask");
            navigate("./?feature=add");
        }
    };
    return (
        <div className={styles.GRTasks}>
            <div className={styles.filter}>
                <div>
                    <Button type="default" icon={<FilterOutlined />}>
                        Filters
                    </Button>
                    <Button
                        style={{ marginLeft: "10px" }}
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={handleAddTask}
                    >
                        Add
                    </Button>
                </div>

                <div style={{ width: "200px" }}>
                    <Input.Group compact style={{ width: "90%" }}>
                        <Input.Search allowClear defaultValue="" placeholder="Find Tasks..." />
                    </Input.Group>
                </div>
            </div>

            <GRTaskList1 handleTask={handleTask} tasks={tasks} />
        </div>
    );
}

export default GRTasks;