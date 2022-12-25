import { PushpinFilled } from "@ant-design/icons";
import { Tag, Tooltip } from "antd";
import React, { useState } from "react";
import styles from "../styles.module.css";
TaskItem.propTypes = {};

function TaskItem(props) {
    const [tags, setTags] = useState(["Đưa người yêu đi chơi!", "Làm bài tập giải tích","Ăn chơi trên phố","Đi gặp Ronaldo","Siuuuuuuuu"]);
    const handleClose = (removedTag) => {
        const newTags = tags.filter((tag) => tag !== removedTag);
        setTags(newTags);
    };
    return (
        <>
            {tags.length !== 0
                ? tags.map((tag, index) => {
                      const isLongTag = tag.length > 20;
                      const tagElem = (
                          <Tag
                              className={styles["task-item"]}
                              key={tag}
                              closeIcon={
                                  <Tooltip title="Unpin">
                                      <PushpinFilled />
                                  </Tooltip>
                              }
                              closable
                              onClose={() => handleClose(tag)}
                          >
                              
                                  <span>{isLongTag ?<Tooltip title={tag} key={tag}>{tag.slice(0, 20)}...</Tooltip> : tag}</span>
                        
                          </Tag>
                      );
                      return isLongTag ? tagElem : tagElem;
                  })
                : "No tasks pinned"}
        </>
    );
}

export default TaskItem;
