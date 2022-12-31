import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TabBar from "../../compoments/TabBar";
import BarItem from "./components/BarItem";
import Tasks from "./components/Tasks";
FeatureTaskList.propTypes = {};

const initTasks = [
    {
        key: "1",
        name: "Làm bài 10 trang 19 sách Giải Tích 5",
        status: "completed",
        nameGroup: "GT_2_Thanglong_K2N3_MA111",
        due: "10-01-2023",
    },
    {
        key: "6",
        name: "Làm get dữ liệu từ api bằng Axios",
        status: "uncompleted",
        nameGroup: "LT_UNGDUNGWEB_K2N3_IT",

        due: "11-01-2023",
    },
    {
        key: "2",

        name: "Sử dụng redux để quản lý state",
        status: "uncompleted",
        nameGroup: "LT_UNGDUNGWEB_K2N3_IT",

        due: "02-01-2023",
    },
    {
        key: "3",
        name: "Dùng react-hook-form để quản lý form và check validate",
        status: "completed",
        nameGroup: "LT_UNGDUNGWEB_K2N3_IT",

        due: "09-01-2023",
    },
    {
        key: "4",
        name: "Viết giao diện Dashboard",
        status: "past-due",
        nameGroup: "LT_UNGDUNGWEB_K2N3_IT",

        due: "15-12-2022",
    },
    {
        key: "5",
        name: "Bài kiểm tra quá trình môn tin đại cương",
        status: "past-due",

        nameGroup: "TINDC_ThangLong_Testing_K2N3",
        due: "20-12-2022",
    },
];

function FeatureTaskList(props) {
    const location = useLocation();
    const navigate = useNavigate();

    const [filter, setFilter] = useState(() => {
        const param = queryString.parse(location.search);
        return param.status || "all";
    });

    const [tasks, setTask] = useState(initTasks);

    useEffect(() => {
        const queryParam = queryString.parse(location.search);
        const key = queryParam.status || "all";

        setFilter(key);
        const myTasks = [...initTasks];
        const filterTasks = myTasks.filter((item) => item.status === key || key === "all");
        setTask(filterTasks);
    }, [location.search]);

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
            label: <BarItem label="Past Due Task" />,
            key: "past-due",
            children: <Tasks tasks={tasks} />,
        },
        {
            label: <BarItem label="Uncompleted Task" />,
            key: "uncompleted",
            children: <Tasks tasks={tasks} />,
        },
        {
            label: <BarItem label="Completed Tasks" />,
            key: "completed",
            children: <Tasks tasks={tasks} />,
        },
    ];

    return (
        <div className="feature-container_right" style={{ margin: "5px 15px 5px 10px " }}>
            <TabBar onChange={onChange} activeKey={filter} data={item} />
        </div>
    );
}

export default FeatureTaskList;
