import { Button, Modal } from "antd";
import _ from "lodash";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { formats, modules } from "../../../../../components/EditorToolbar";
import { useParams } from "react-router-dom";
import postApi from "../../../../../api/postApi";
import { useSelector } from "react-redux";
import notificationApi from "../../../../../api/notificationApi";
import timelineDashboardApi from "../../../../../api/timelineDashboardApi";



ModalPost.propTypes = {
    isModalOpen: PropTypes.bool,
    setPost: PropTypes.func.isRequired,
    setIsModalOpen: PropTypes.func,
};
ModalPost.defaultProps = {
    isModalOpen: false,
    setIsModalOpen: null,
};

function ModalPost({ isModalOpen, group, setPost, setIsModalOpen }) {
    const [dataPost, setDataPost] = useState("")
    let socket = useSelector(state => state.socket.socket)

    const leaderName = localStorage.getItem("name_user")
    const params = useParams();
    const idGroup = params.idGroup;

    const [load, setLoad] = useState(false)
    const onChangeValue = (value) => {
        setDataPost(value)
        console.log(value);
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoad(true)
            const result = await postApi.createPost(idGroup, { about: dataPost })
            if (result.success) {
                for (let i = 0; i < group.member.length; i++) {
                    let notification = {
                        receiver: group.member[i],
                        type: "group",
                        title: `${leaderName || "Có người"} đã thêm 1 bài viết mới`,
                        description: group.name,
                        link: `groups/${idGroup}/general`,
                    }
                    console.log(notification)
                    const resultNotificaton = await notificationApi.createNotification(notification)
                    if (resultNotificaton.success) {
                        console.log(resultNotificaton)
                        socket.emit("send-notification", resultNotificaton.data)
                    }
                }
                const titleTimeline = `Bạn đã thêm bài viết ${group.name}`
                await timelineDashboardApi.createTimelineDashboard({ titleTimeline })
                setPost(true)
                setTimeout(() => {
                    setLoad(false)
                    handleCancel()
                }, 500)
            }
        } catch (err) {
            console.log(err.message)
        }

    };

    const handleCancel = () => {
        if (setIsModalOpen) setIsModalOpen(false);
    };
    return (
        <Modal
            title="Create new post"
            className="post"
            okText={"Post"}
            open={isModalOpen}
            footer={null}
            onCancel={handleCancel}
        >
            <form className="post__forms">
                <ReactQuill
                    theme={"snow"}
                    onChange={onChangeValue}
                    value={dataPost}
                    modules={modules()}
                    formats={formats}
                    bounds={".post"}
                    placeholder={"Start a new post. Type @ to mention member"}
                />
                <Button type="primary" size="large" style={{ width: "100%", marginTop: "10px" }} loading={load} disabled={load} onClick={onSubmit}>
                    Post
                </Button>
            </form>
        </Modal>
    );
}

export default ModalPost;
