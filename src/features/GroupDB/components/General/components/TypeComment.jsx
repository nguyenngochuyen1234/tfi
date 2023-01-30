import { Mentions } from "antd";
import dayjs from "dayjs";
import EmojiPicker from "emoji-picker-react";
import React, { useEffect, useState } from "react";
import commentApi from "../../../../../api/commentApi";
import ImageIcon from "../../../../../components/CustomIcon/ImageIcon";
import LaughIcon from "../../../../../components/CustomIcon/LaughIcon";
import SendIcon from "../../../../../components/CustomIcon/SendIcon";
import useComponentVisible from "../../../../../customHook/ComponentVisible";
import styles from "./styles.module.css";

TypeComment.propTypes = {};

function TypeComment({ idPost, setComment, arrName }) {
    const [value, setValue] = useState("")
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);
    const [send, setSend] = useState(false);
    const [options, setOptions] = useState([])



    const toggleEmoji = () => {
        setIsComponentVisible(!isComponentVisible);
    };
    const handleChangeInput = (value) => {
        if (value !== "" && send === false) {
            setSend(true);
        }
        if (value === "" && send === true) {
            setSend(false);
        }
        setValue(value);
    };
    const handleSend = async () => {
        try {
            const result = await commentApi.createComment(idPost, { data: value })
            if (result.success) {
                const dataComment = result.comment
                setComment(prev => [...prev, {
                    idPeoplePost: dataComment.idUser,
                    avatar: dataComment.avatar,
                    name: dataComment.name,
                    idComment: dataComment._id,
                    data: dataComment.data,
                    createdAt: dayjs(dataComment.time).format("DD/MM/YYYY HH:mm"),
                    comment: [],
                }])
            }
            setValue("")
        } catch (err) {
            console.log(err.meesage)
        }
    }
    const handleEmojiClick = (data) => {
        setValue((value) => {
            const newValue = value + data.emoji;
            return newValue;
        });
    };
    useEffect(() => {
        const optionsData = arrName?.map(name => ({
            value: name,
            label: name
        }))
        setOptions(optionsData)
    }, [])
    return (
        <div>
            <Mentions
                autoSize
                placeholder="Type your comment about post. Type @ to mention people"
                className={styles.comment_input}
                value={value}
                onChange={handleChangeInput}
                options={options}
            />
            <div className={styles.feature}>
                {isComponentVisible && (
                    <div ref={ref} style={{ position: "absolute", zIndex: 1 }}>
                        <EmojiPicker
                            onEmojiClick={handleEmojiClick}
                            emojiStyle="native"
                            height={350}
                            width={300}
                            skinTonesDisabled={true}
                            lazyLoadEmojis={true}
                            previewConfig={{ showPreview: false }}
                        />
                    </div>
                )}
                <div className="mg-r_5_ct">
                    <LaughIcon toggleEmoji={toggleEmoji} width="20px" height="20px" />
                    <ImageIcon width="20px" height="20px" />
                </div>
                <div>
                    <SendIcon handleSend={handleSend} width="32px" height="32px" active={send} />
                </div>
            </div>
        </div>
    );
}

export default TypeComment;
