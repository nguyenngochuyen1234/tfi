import { LeftOutlined, SettingOutlined, UserAddOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import groupApi from "../../api/groupApi";
import GroupAvatar from "../../compoments/Avatar/GroupAvatar";
import BarItem from "../../compoments/BarItem";
import TabBar from "../../compoments/TabBar";
import DetailTask from "./components/DetailTask";
import GRRouter from "./components/Router";
import styles from "./styles.module.css";
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
        file: "https://firebasestorage.googleapis.com/v0/b/api-manager-job.appspot.com/o/sunflower-6515860__340.jpg?alt=media",
        comment: "Hay quá em ơi anh cho 10 điểm nhé",
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
        file: "",
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
        comment: "Hay quá em ơi anh cho 10 điểm nhé",
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
            "https://i.pinimg.com/564x/f5/ac/55/f5ac55bae4947f7ae9f352c43cf32fb2.jpg",
        ],
        file: "https://firebasestorage.googleapis.com/v0/b/api-manager-job.appspot.com/o/MA111_BaiTapGiaiTich282022.pdf?alt=media",
        comment: "Hay quá em ơi anh cho 10 điểm nhé",
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
        comment: "Hay quá em ơi anh cho 10 điểm nhé",
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
            "https://i.pinimg.com/564x/f5/ac/55/f5ac55bae4947f7ae9f352c43cf32fb2.jpg",
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
    const [feature, setFeature] = useState("general");
    const [render, setRender] = useState("");
    const location = useLocation();
    const navigate = useNavigate();

    const id = location.pathname.split("/")[3];
    const user = useSelector((state) => state.user.current);
    const idUser = user?._id || localStorage.getItem("user_id");
    const [dataTaskClick, setDataTaskClick] = useState(null);
    const [group, setGroup] = useState(null);
    const data = useSelector((state) => state.group.current);

    
    useEffect(() => {
        if (JSON.stringify(data) !== "{}") {
            const result = {
                success: data.success,
                data: [...data.groupMade, ...data.groupJoined],
            };
            setGroup(result.data.filter((group) => group._id === id)[0]);
        } else {
            (async () => {
                try {
                    const { group } = await groupApi.getOnlyGroup(id);
                    if (group.member.find((mem) => mem === idUser)) {
                        setGroup(group);
                    } else {
                        navigate("/404");
                    }
                } catch (error) {
                    console.log(error);
                }
            })();
        }
    }, [data, id]);
    const onChange = (key) => {
        setFeature(key);
        navigate(`./${key.toLowerCase()}`);
    };
    const handleTask = (idTask) => {
        navigate(`./?idTask=${idTask}`);
        setDataTaskClick(dataTasks.filter((task) => task.id === idTask)[0]);
        setRender("task");
    };
    const handleClickBack = () => {
        navigate("/home/groups");
    };

    const item = [
        {
            label: <BarItem typeSize={"sm"} label="General" />,
            key: "general",
            children: <GRRouter />,
        },
        {
            label: <BarItem typeSize={"sm"} label="Tasks Overview" />,
            key: "tasks",
            children: <GRRouter handleTask={handleTask} dataTasks={dataTasks} />,
        },
        {
            label: <BarItem typeSize={"sm"} label="Timeline" />,
            key: "time-line",
            children: <GRRouter />,
        },
        {
            label: <BarItem typeSize={"sm"} label="Files" />,
            key: "files",
            children: <GRRouter />,
        },
    ];
    console.log(item)
    return (
        <div
            style={{ backgroundColor: "var(--color--default)" }}
            className="feature-container_right"
        >
            {group && (
                <div id={group._id}>
                    {render === "" && group && (
                        <div className={styles["group-header"]}>
                            <div>
                                <Button
                                    type="link"
                                    className="link-back"
                                    onClick={handleClickBack}
                                    icon={<LeftOutlined />}
                                >
                                    Back
                                </Button>
                            </div>
                            <div className={styles.box}>
                                <Typography.Title
                                    level={3}
                                    ellipsis={true}
                                    style={{ margin: "0px", width: "70%", minWidth: "300px" }}
                                >
                                    {group.name}
                                </Typography.Title>

                                <div className={styles.box_2}>
                                    <GroupAvatar arrayId={group.member} size="large" />
                                    <Button
                                        style={{ marginLeft: "40px" }}
                                        size="large"
                                        shape="circle"
                                        icon={<UserAddOutlined />}
                                    />
                                    <Button
                                        style={{ marginLeft: "20px" }}
                                        size="large"
                                        shape="circle"
                                        icon={<SettingOutlined />}
                                    />
                                </div>
                            </div>
                            <Typography.Text
                                style={{
                                    fontSize: "12px",
                                    color: "#555",
                                    margin: "5px 0px 0px 15px",
                                    width: "70%",
                                    minWidth: "250px",
                                }}
                                ellipsis={true}
                            >
                                {group.description}
                            </Typography.Text>
                        </div>
                    )}
                    {render === "" && (
                        <TabBar onChange={onChange} activeKey={feature} data={item} />
                    )}
                    {render === "task" && <DetailTask setRender={setRender} data={dataTaskClick} />}
                </div>
            )}
        </div>
    );
}

export default GroupDB;
