import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./styles.module.css";
ChatText.propTypes = {
    text: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    pos: PropTypes.string.isRequired,
    avt: PropTypes.string.isRequired,
};

function ChatText({ text, pos, avt, id }) {

    return (
        <div className={styles.chatRow}>
            {pos === "r" && <div className={styles.box}></div>}
            {pos === "l" && <img className={styles.avt} src={avt} alt="avt" />}

            <div
                key={id}
                className={classNames({
                    [styles.text]: true,
                    "text-sm": true,

                    [styles[`color-${pos}`]]: true,
                })}
            >
                {text}
            </div>

            {pos === "l" && <div className={styles.box}></div>}
        </div>
    );
}

export default ChatText;
