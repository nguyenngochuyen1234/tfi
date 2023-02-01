import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TabBar from "../../components/TabBar";
import BarItem from "../../components/BarItem";
import Tasks from "./components/Tasks";
import taskApi from "../../api/taskApi";
FeatureTaskList.propTypes = {};

function FeatureTaskList(props) {
    const location = useLocation();
    const navigate = useNavigate();

    const [filter, setFilter] = useState(() => {
        const param = queryString.parse(location.search);
        return param.status || "all";
    });
    const [tasksBase, setTasksBase] = useState([]);
    const [tasks, setTasks] = useState();

    useEffect(() => {
        const queryParam = queryString.parse(location.search);
        const key = queryParam.status || "all";

        setFilter(key);
        console.log(key)
        const myTasks = [...tasksBase];
        console.log(myTasks)
        const filterTasks = myTasks.filter((item) => item.status === key || key === "all");
        setTasks(filterTasks);
    }, [location.search,tasksBase]);
    useEffect(() => {
        (async () => {
            try {
                const { tasks } = await taskApi.getAllTaskOfUser();
                setTasksBase(tasks);
                
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);
    const onChange = (key) => {
        const param = queryString.stringify({ status: key });
        navigate(`./?${param}`);
    };

    const item = [
        {
            label: <BarItem label="All Tasks" />,
            key: "all",
            children: <Tasks tasks={tasks} />,
        },
        {
            label: <BarItem label="Past Due Tasks" />,
            key: "past-due",
            children: <Tasks tasks={tasks} />,
        },
        {
            label: <BarItem label="Uncomplete Task" />,
            key: "uncomplete",
            children: <Tasks tasks={tasks} />,
        },
        {
            label: <BarItem label="Completed Tasks" />,
            key: "completed",
            children: <Tasks tasks={tasks} />,
        },
        {
            label: <BarItem label="Pending Tasks" />,
            key: "pending",
            children: <Tasks tasks={tasks} />,
        },
    ];

    return (
        <div className="feature-container_right">
            {tasks && <TabBar onChange={onChange} activeKey={filter} data={item} />}
        </div>
    );
}

export default FeatureTaskList;
