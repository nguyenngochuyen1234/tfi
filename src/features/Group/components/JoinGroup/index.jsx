import React from "react";
import PropTypes from "prop-types";
import { Button, Input, Typography } from "antd";
import styles from "./styles.module.css";
import { PlusOutlined } from "@ant-design/icons";

JoinGroup.propTypes = {
    handleClick: PropTypes.func,
};
JoinGroup.defaultProps = {
    handleClick: null,
};
function JoinGroup(props) {
    return (
        <div className={styles.box}>
            <div className={styles.box_1}>     
                 <img
                src="https://ik.imagekit.io/TLIT/Thang/team2.png?ik-sdk-version=javascript-1.4.3&updatedAt=1673205685609"
                alt="thang"
            />
            <Typography.Text className="text-md" style={{ fontWeight: "500" }}>
                    Join a group with code
                </Typography.Text>
            </div>
           
            <div className={styles.box_2}>
                
                <Input placeholder="Group code" style={{width:"120px",marginRight:"10px"}} />
                <Button type="primary">
                    Join
                </Button>
            </div>
        </div>
    );
}

export default JoinGroup;
