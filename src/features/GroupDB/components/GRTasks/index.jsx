import { FilterOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import taskApi from "../../../../api/taskApi";
import GRTaskList1 from "./components/GRTaskList1";
import styles from "./styles.module.css";
GRTasks.propTypes = {
    idGroup: PropTypes.string,
    handleTask: PropTypes.func,
  
};
GRTasks.defaultProps = {
    idGroup: "",
    handleTask: null,
};

function GRTasks({ idGroup, handleTask}) {
    const navigate = useNavigate();
    const handleAddTask = () => {
       
            navigate("./add");
    };
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        if (idGroup !== "")
            (async () => {
                try {
                    const {tasks} = await taskApi.getAllTask(idGroup);
                    setTasks(tasks);
                } catch (error) {
                    console.log(error);
                }
            })();
    }, []);
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
