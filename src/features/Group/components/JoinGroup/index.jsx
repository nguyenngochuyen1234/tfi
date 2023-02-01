import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Input, Typography } from "antd";
import styles from "./styles.module.css";
import { PlusOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";

import groupApi from "../../../../api/groupApi";

JoinGroup.propTypes = {
    handleClick: PropTypes.func,
};
JoinGroup.defaultProps = {
    handleClick: null,
};
function JoinGroup(props) {
    const [code, setCode] = useState('')
    const handleChange = (e) => {
        console.log(e.target.value)
        setCode(e.target.value)
    }
    const handleJoinGroup = async () => {
        try {
            const result = await groupApi.joinGroupWithCode(code)
            alert(result.message)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className={styles.box}>
            <div className={styles.box_1}>
                <img
                    src="https://ik.imagekit.io/TLIT/Thang/team2.png?ik-sdk-version=javascript-1.4.3&updatedAt=1673205685609"
                    alt="thang"
                />
                <Typography.Text className="text-md" style={{ fontWeight: "500" , color:"var(--color--text-default)"}}>
                    Join a group with code
                </Typography.Text>
            </div>

            <div className={styles.box_2}>

                <Input placeholder="Group code" style={{ width: "120px", marginRight: "10px" }} onChange={handleChange} />
                <Button type="primary" onClick={handleJoinGroup}>
                    Join
                </Button>
            </div>
        </div>
    );
}

export default JoinGroup;
