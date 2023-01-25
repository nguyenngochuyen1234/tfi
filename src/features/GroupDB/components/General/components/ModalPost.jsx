import { Button, Modal } from "antd";
import _ from "lodash";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { formats, modules } from "../../../../../components/EditorToolbar";

ModalPost.propTypes = {
    isModalOpen: PropTypes.bool,
    handleAddPost: PropTypes.func,
    setIsModalOpen: PropTypes.func,
};
ModalPost.defaultProps = {
    isModalOpen: false,
    handleAddPost: null,
    setIsModalOpen: null,
};

function ModalPost({ isModalOpen, handleAddPost, setIsModalOpen }) {
    const [dataPost,setDataPost]=useState("")
    const onChangeValue = (value) => {
        console.log(value);
    };
    const onSubmit = (e) => {
        e.preventDefault();
        console.log(e)

    };
    const handleOk = () => {
        if (setIsModalOpen) setIsModalOpen(false);
        if (handleAddPost) handleAddPost();
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
            <form onSubmit={onSubmit} className="post__forms">
                <ReactQuill
                    theme={"snow"}
                    onChange={onChangeValue}
                    value={dataPost}
                    modules={modules()}
                    formats={formats}
                    bounds={".post"}
                    placeholder={"Start a new post. Type @ to mention member"}
                />
                <Button type="primary" size="large" style={{width:"100%",marginTop:"10px"}} >
                    Post
                </Button>
            </form>
        </Modal>
    );
}

export default ModalPost;