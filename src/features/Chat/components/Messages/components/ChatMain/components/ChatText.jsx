import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./styles.module.css";
ChatText.propTypes = {
    text: PropTypes.array.isRequired,

    pos: PropTypes.string.isRequired,
    avt: PropTypes.string.isRequired,
};

function ChatText({ text, pos, avt }) {
    return (
        <div className={styles.chatRow}>
            {pos === "r" && <div className={styles.box}></div>}
            {pos === "l" && <img className={styles.avt} src={avt} alt="avt" />}
            <div className={styles[`flex-${pos}`]}>
                {text.map((eachText, i) => {
                    const status = () => {
                        if (text.length === 1) return "alone";
                        if (i === 0) return "first";
                        if (i === text.length - 1) return "last";
                        return "mid";
                    };

                    return (
                        <div
                            key={eachText.id}
                            className={classNames({
                                [styles.text]: true,
                                "text-sm": true,
                                [styles[`chatText-${status()}-${pos}`]]: true,
                                [styles[`color-${pos}`]]: true,
                            })}
                        >
                            {eachText.text}
                        </div>
                    );
                })}
            </div>

            {pos === "l" && <div className={styles.box}></div>}
        </div>
    );
}

export default ChatText;
