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

function General(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [initData, setInitData] = useState([])
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
                let dataUser = result.posts.map(post => {
                    let user = post.userData[0]
                    return {
                        idPost: post._id,
                        idPeoplePost: user._id,
                        avatar: user.avatar,
                        name: user.name,
                        about: post.about,
                        createdAt: dayjs(post.time).format( "DD/MM/YYYY HH:mm"),
                        react: [],
                        comment: [],

                    }
                })
                setInitData(dataUser)
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
                {initData.map((data) => (
                    <PostDetail key={data.idPost} post={data} />
                ))}
            </div>
        </div>
    );
}

export default General;
