import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";
import classNames from "classnames";
import { MoreOutlined } from "@ant-design/icons";

ContactItem.propTypes = {
    data: PropTypes.object.isRequired,
    current: PropTypes.object.isRequired,
    handleClickContact:PropTypes.func,
};
ContactItem.defautlProps = {
    handleClickContact:null,
};
function ContactItem({ data, current,handleClickContact }) {
    const contactClick=()=>{
        if(!!handleClickContact) handleClickContact(data);
    }
    return (
        <div onClick={contactClick}
            className={classNames({
                [styles.contactItem]: true,
                [styles["on-chat"]]: data.id===current.id
            })}
            id={data.id}
        >
            <img className={styles.avt} src={data.avt} alt="avt" />
            <div className={styles.contactDes}>
                <span
                    className={classNames({
                        [styles.name]: true,
                        "ellep-text": true,
                        "text-sm": true,

                    })}
                >
                    {data.name}
                </span>
               {data.lastSend && <span
                    className={classNames({
                        [styles.lastSend]: true,
                        "ellep-text": true,
                        "text-ssm": true,
                    })}
                >
                    {data.lastSend}
                </span>}
            </div>
            <div className={styles.settings}>
                <MoreOutlined />
            </div>
        </div>
    );
}

export default ContactItem;
