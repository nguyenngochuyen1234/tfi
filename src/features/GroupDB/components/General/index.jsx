import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import groupApi from "../../../../api/groupApi";
import postApi from "../../../../api/postApi";
import ModalPost from "./components/ModalPost";
import PostDetail from "./components/PostDetail";
import styles from "./styles.module.css";
General.propTypes = {};

function General({group}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [initData, setInitData] = useState([])
    const [arrName, setArrName] = useState([])
    const params = useParams();
    const idGroup = params.idGroup

    const showModal = () => {
        setIsModalOpen(true);
    };

    const fetchData = async () => {
        try {
            const data = await groupApi.getUsersByIds(idGroup)
            if (data.success) {
                const names = data.users?.map(user=>user.name) 
                setArrName(names)
            }
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
                        createdAt: dayjs(comment.time).format("DD/MM/YYYY HH:mm"),
                        comment: [],

                    }))
                    return {
                        idPost: post._id,
                        idPeoplePost: user._id,
                        avatar: user.avatar,
                        name: user.name,
                        about: post.about,
                        createdAt: dayjs(post.time).format("DD/MM/YYYY HH:mm"),
                        react: reactFormat || [],
                        comment: commentFormat || [],

                    }
                })
                setInitData(dataUser)
            }
        } catch (err) {
            console.log(err.message)
        }
    }
    const [post,setPost]=useState(false)
    useEffect(() => {
        fetchData()
    }, [post])
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
                    setPost={setPost}
                    
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                />
            </div>
            <div className={styles.general_body}>
                {initData.map((data) => (
                    <PostDetail key={data.idPost} post={data} arrName={arrName} />
                ))}
            </div>
        </div>
    );
}

export default General;
