import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";
CommentPost.propTypes = {
    comment: PropTypes.array.isRequired,
};

function CommentPost({ comment }) {
    return (
        <div style={{ marginBottom: "5px" }}>
            {comment.length > 0 ? (
                <div className={styles.comment_container}>
                    {comment.map((item) => (
                        <div key={item.idComment} className={styles.comment}>
                            <img src={item.avatar} alt="avt" />
                            <div className={styles.comment_data}>
                                <div>
                                <span
                                    style={{ color: "var(--color--text-default)", fontWeight: 500 }}
                                >
                                    {item.name}
                                </span>
                                <span
                                    style={{ color: "var(--color--text-drop)", marginLeft: "10px" }}
                                    className="text-ssm"
                                >
                                    {item.createdAt}
                                </span>
                                </div>
                                
                                <div>{item.data}</div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                "No comments. Let become first people comment."
            )}
        </div>
    );
}

export default CommentPost;
