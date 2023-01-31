import { HeartFilled, HeartOutlined, MoreOutlined } from "@ant-design/icons";
import { Button, Collapse, Tooltip } from "antd";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import reactApi from "../../../../../api/reactApi";
import tick from "../../../../../Effects/assets_Effect_click.ogg";
import CommentPost from "./CommentPost";
import styles from "./styles.module.css";
import TypeComment from "./TypeComment";
PostDetail.propTypes = {
    post: PropTypes.object.isRequired,
};

function PostDetail({ post, arrName }) {
    const user =
        useSelector((state) => state.user.current?.account) || localStorage.getItem("user");
        const userName = user.name;
    const userId = user._id;
    
    const reacted = post.react.find(item=>item._id === userId)

    const [love, setLove] = useState(!!reacted);
    const [react, setReact] = useState(post.react);
    const handleLove = async () => {
        try {
            const sound = new Audio(tick);
            sound.play();
            if (!love) {
                const resultCreate = await reactApi.createReact(post.idPost)
                if (resultCreate.success) {
                    setReact([...react, { _id: userId, name: userName }]);
                }
            } else {
                const resultDelete = await reactApi.deleteReact(post.idPost)
                if (resultDelete.success) {
                    const reactClone = [...react];
                    const reactFilter = reactClone.filter((item) => item._id !== userId);
                    setReact(reactFilter);
                }
            }
            setLove(!love);

        } catch (err) {
            console.log(err.message)
        }
    };
    const [comment, setComment] = useState(post.comment);
    const [collapse, setCollapse] = useState(false);
    return (
        <div id={post.idPost} className={styles.post}>
            <div className={styles.post_header}>
                <div style={{ display: "flex" }}>
                    <img className={styles.avatar} src={post.avatar} alt="avt" />
                    <div className={styles.infor}>
                        <span style={{ color: "var(--color--text-default)", fontWeight: 500 }}>
                            {post.name}
                        </span>
                        <span
                            style={{ color: "var(--color--text-drop)", margin: 0 }}
                            className="text-ssm"
                        >
                            {post.createdAt}
                        </span>
                    </div>
                </div>
                <div style={{ display: "flex" }}>
                    <Button
                        className={styles.love}
                        onClick={handleLove}
                        type="link"
                        icon={
                            love ? (
                                <HeartFilled style={{ color: "red" }} className="text-md" />
                            ) : (
                                <HeartOutlined className="text-md" />
                            )
                        }
                    />
                    <Button
                        type="text"
                        className={styles.Tdot}
                        shape="circle"
                        icon={<MoreOutlined className="text-md" />}
                    />
                </div>
            </div>

            <div className={styles.post_body} dangerouslySetInnerHTML={{ __html: post.about }} />
            {react.length > 0 && (
                <div style={{ display: "flex", alignItems: "center", margin: "5px 0px 0px 0px" }}>
                    <Tooltip arrow={false} color="var(--color--tooltip)" title={<ul style={{ listStyleType: "none" }}>
                        {react.map((item, idx) => (idx < 20 && <li key={item._id} className="text-ssm">{item.name}</li>))}
                        {react.length > 20 && <li className="text-ssm">{react.length - 20} other peoples</li>}
                    </ul>}>

                        <div
                            style={{
                                border: "1px solid var(--color-bd-primary)",
                                padding: "0px 7px",
                                borderRadius: "10px",
                                cursor: "default",
                            }}
                        >
                            {react.length}
                            <span style={{ fontSize: "15px", marginLeft: "1px" }}>❤</span>
                        </div>
                    </Tooltip>

                </div>
            )}
            <div className={styles.post_footer}>
                <Collapse
                    bordered={false}
                    onChange={() => setCollapse(!collapse)}
                    accordion={collapse}
                >
                    <Collapse.Panel
                        header={
                            collapse ? (
                                "Collapse all"
                            ) : (
                                <span>{comment.length} comments available</span>
                            )
                        }
                    >
                        <CommentPost comment={comment} />
                        <TypeComment idPost={post.idPost} setComment={setComment} arrName={arrName}/>
                    </Collapse.Panel>
                </Collapse>
            </div>
        </div>
    );
}

export default PostDetail;
