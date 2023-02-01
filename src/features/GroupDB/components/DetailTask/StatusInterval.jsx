import { Tag } from "antd";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import taskApi from "../../../../api/taskApi";

StatusInterval.propTypes = {
    status: PropTypes.string.isRequired,
    setStatusTask: PropTypes.func.isRequired,
    time: PropTypes.string.isRequired,
};

function StatusInterval({ status, setStatusTask, time }) {
    const timeFormat = dayjs(time).format("YYYY-MM-DDTHH:mm:ss.sssZ");
    const { idTask } = useParams();
    useEffect(() => {
        const intervalId = setInterval(() => {
            if (status === "past-due") {
                clearInterval(intervalId);
            }
            const now = dayjs().format("YYYY-MM-DDTHH:mm:ss.sssZ");
            if (now > timeFormat) {
                (async () => {
                    try {
                        clearInterval(intervalId);

                        setStatusTask("past-due");
                        await taskApi.updateTaskPatch(idTask, { status: "past-due" });
                    } catch (error) {
                        console.log(error);
                    }
                })();
            }
        }, 1000);
        return () => {
            clearInterval(intervalId);
        };
    });
    return (
        <>
            {status === "uncomplete" && <Tag color="magenta">Uncomplete</Tag>}
            {status === "past-due" && <Tag color="red">Past Due</Tag>}
            {status === "completed" && <Tag color="green">Completed</Tag>}
            {status === "pending" && <Tag color="orange">Pending</Tag>}
        </>
    );
}

export default StatusInterval;
