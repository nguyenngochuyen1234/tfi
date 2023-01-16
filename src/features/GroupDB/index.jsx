import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import BarItem from "../../compoments/BarItem";
import TabBar from "../../compoments/TabBar";
import DetailTask from "./components/DetailTask";
import GDBBody from "./components/GDBBody";
import GDBHeader from "./components/GDBHeader";
import GRTasks from "./components/GRTasks";
GroupDB.propTypes = {};

const dataTasks = [
    {
        id: "1",
        name: "Làm bài 10 trang 19 sách Giải Tích 5",
        about: "Mô tả về task",
        due: "14-01-2023",
        status: "completed",
        members: [
            "https://i.pinimg.com/564x/01/48/0f/01480f29ce376005edcbec0b30cf367d.jpg",
            "https://i.pinimg.com/564x/f5/ac/55/f5ac55bae4947f7ae9f352c43cf32fb2.jpg",
        ],
    },
    {
        id: "6",
        name: "Làm get dữ liệu từ api bằng Axios",
        status: "uncompleted",
        about: "Mô tả về task",
        due: "11-01-2023",
        members: [
            "https://i.pinimg.com/564x/01/48/0f/01480f29ce376005edcbec0b30cf367d.jpg",
            "https://i.pinimg.com/564x/f5/ac/55/f5ac55bae4947f7ae9f352c43cf32fb2.jpg",
            "https://i.pinimg.com/564x/56/bf/f1/56bff19cfb245a05abb29a0e6bbdd4e2.jpg",
        ],
    },
    {
        id: "2",
        name: "Sử dụng redux để quản lý state",
        status: "uncompleted",
        about: "Mô tả về task",
        due: "02-01-2023",
        members: [
            "https://i.pinimg.com/564x/01/48/0f/01480f29ce376005edcbec0b30cf367d.jpg",
            "https://i.pinimg.com/564x/56/bf/f1/56bff19cfb245a05abb29a0e6bbdd4e2.jpg",
            "https://i.pinimg.com/564x/fe/f6/71/fef671f5ce8657035b612dd84e5b21de.jpg",
        ],
    },
    {
        id: "3",
        name: "Dùng react-hook-form để quản lý form và check validate",
        status: "completed",
        about: "Mô tả về task",
        due: "09-01-2023",
        members: [
            "https://i.pinimg.com/564x/01/48/0f/01480f29ce376005edcbec0b30cf367d.jpg",
            "https://i.pinimg.com/564x/56/bf/f1/56bff19cfb245a05abb29a0e6bbdd4e2.jpg",
            "https://i.pinimg.com/564x/0e/24/99/0e2499390628ae8609356ef2b1cb918a.jpg",
            "https://i.pinimg.com/564x/f5/ac/55/f5ac55bae4947f7ae9f352c43cf32fb2.jpg"
        ],
    },
    {
        id: "4",
        name: "Viết giao diện Dashboard",
        status: "past-due",
        about: "Mô tả về task",
        due: "15-12-2022",
        members: [
            "https://i.pinimg.com/564x/01/48/0f/01480f29ce376005edcbec0b30cf367d.jpg",
            "https://i.pinimg.com/564x/bd/6f/e2/bd6fe2990a48ecdc23ed3a92c142f524.jpg",
            "https://i.pinimg.com/564x/0e/24/99/0e2499390628ae8609356ef2b1cb918a.jpg",
        ],
    },
    {
        id: "5",
        name: "Bài kiểm tra quá trình môn tin đại cương",
        status: "past-due",
        about: "Mô tả về task",
        due: "20-12-2022",
        members: [
            "https://i.pinimg.com/564x/97/fd/02/97fd028e9011d76b23627a9bcc5657cc.jpg",
            "https://i.pinimg.com/564x/0e/24/99/0e2499390628ae8609356ef2b1cb918a.jpg",
            "https://i.pinimg.com/564x/01/48/0f/01480f29ce376005edcbec0b30cf367d.jpg",
            "https://i.pinimg.com/564x/bd/6f/e2/bd6fe2990a48ecdc23ed3a92c142f524.jpg",
            "https://i.pinimg.com/564x/f5/ac/55/f5ac55bae4947f7ae9f352c43cf32fb2.jpg"
        ],
    },
    {
        id: "10",
        name: "UI design with ReactJS or AngularJS",
        status: "past-due",
        about: "Mô tả về task",
        due: "25-12-2022",
        members: [
            "https://i.pinimg.com/564x/97/fd/02/97fd028e9011d76b23627a9bcc5657cc.jpg",
            "https://i.pinimg.com/564x/0e/24/99/0e2499390628ae8609356ef2b1cb918a.jpg",
            "https://i.pinimg.com/564x/01/48/0f/01480f29ce376005edcbec0b30cf367d.jpg",
            "https://i.pinimg.com/564x/bd/6f/e2/bd6fe2990a48ecdc23ed3a92c142f524.jpg",
            "https://i.pinimg.com/564x/f5/ac/55/f5ac55bae4947f7ae9f352c43cf32fb2.jpg",
            "https://i.pinimg.com/564x/56/bf/f1/56bff19cfb245a05abb29a0e6bbdd4e2.jpg",

        ],
    },
];

function GroupDB(props) {
    const location = useLocation();
    const navigate=useNavigate();

    const id = location.pathname.split("/")[3];
    const data = useSelector((state) => state.group.current);

    const result = { success: data.success, data: [...data.groupMade, ...data.groupJoined] };
    const group = result.data.filter((group) => group._id === id)[0];
    const [feature, setFeature] = useState("general");

    const [render,setRender]=useState("")
    const [dataTaskClick,setDataTaskClick]=useState(null)
    const onChange = (key) => {

        setFeature(key);
    };
    const handleTask=(idTask)=>{
        navigate(`./?idTask=${idTask}`)
        setDataTaskClick(dataTasks.filter((task) => task.id ===idTask)[0])
        setRender("task");
    }
    const item = [
        {
            label: <BarItem typeSize={"sm"} label="General" />,
            key: "general",
            children: <GDBBody data="General" />,
        },
        {
            label: <BarItem typeSize={"sm"} label="Tasks Overview" />,
            key: "tasks",
            children: <GRTasks handleTask={handleTask} tasks={dataTasks} />,
        },
        {
            label: <BarItem typeSize={"sm"} label="Timeline" />,
            key: "time-line",
            children: <GDBBody data="Timeline" />,
        },
        {
            label: <BarItem typeSize={"sm"} label="Files" />,
            key: "files",
            children: <GDBBody data="Files" />,
        },
    ];
    return (
        <div
            id={group._id}
            style={{ backgroundColor: "var(--color--default)" }}
            className="feature-container_right"
        >
            {render==="" && <GDBHeader group={group} />}
            {render==="" && <TabBar onChange={onChange} activeKey={feature}  data={item} />}
            {render==="task" && <DetailTask  setRender={setRender} data={dataTaskClick}/>}
        </div>
    );
}

export default GroupDB;
