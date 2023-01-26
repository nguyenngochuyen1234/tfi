import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import PostDetail from "./components/PostDetail";
import ModalPost from "./components/ModalPost";
import { useEffect } from "react";
import postApi from "../../../../api/postApi";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
General.propTypes = {};

function General({group}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [iniiData, setIniiData] = useState([])
    const [arrName, setArrName] = useState([])
    const params = useParams();
    const idGroup = params.idGroup

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleAddPost = () => {
        console.log("add post");
    };
    const fetchData = async () => {
        try {
            const result = await postApi.getAllPost(idGroup)
            if (result.success) {
                console.log(result.posts)
                let dataUser = result.posts?.map(post => {
                    let user = post.userData[0]
                    const reactFormat = post.reacts.map(react => ({
                        _id: react.idUser,
                        name: react.username    
                    }))
                    const commentFormat = post.comments.map(comment => ({
                        idPeople: comment.idUser,
                        idComment: comment._id,
                        avatar: comment.avatar,
                        name: comment.name,
                        data: comment.data,
                        createdAt: dayjs(comment.time).format("DD/MM/YYYY HH:mm:ss"),
                        comment: [],

                    }))
                    return {
                        idPost: post._id,
                        idPeoplePost: user._id,
                        avatar: user.avatar,
                        name: user.name,
                        about: post.about,
                        createdAt: dayjs(post.time).format("DD/MM/YYYY HH:mm:ss"),
                        react: reactFormat || [],
                        comment: commentFormat || [],

                    }
                })
                setIniiData(dataUser)
            }
        } catch (err) {
            console.log(err.message)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div className={styles.general}>
            <div className={styles.general_header}>
                <Button
                    style={{ marginLeft: "10px" }}
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={showModal}
                >
                    New post
                </Button>
                <ModalPost
                    handleAddPost={handleAddPost}
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                />
            </div>
            <div className={styles.general_body}>
                {iniiData.map((data) => (
                    <PostDetail key={data.idPost} post={data} group={group} />
                ))}
            </div>
        </div>
    );
}

export default General;
