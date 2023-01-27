import { Button, Input, Typography } from "antd";
import classNames from "classnames";
import React from "react";
import InforItem from "../../components/InforItem/InforItem";
import styles from "./styles.module.css";
FeaturePassword.propTypes = {};

function FeaturePassword(props) {
    const data = [
        {
            lable: "Mật khẩu hiện tại",
            data: (
                    <Input.Password  value="*********" disabled />
            ),
            edit: true,
            config:{
                width:"300px",
            }
        },
    ];
    return (
        <div className="feature-container_right">
            <div className={styles.main}>
                <div
                    className={styles.container}
                    style={{
                        borderBottom: "1px solid var( --color--text-default)",
                    }}
                >
                    <Typography.Title style={{color:"var(--color--text-default)"}} level={3}>Mật khẩu</Typography.Title>
                </div>
                <div
                    className={classNames({
                        [styles.wrap]: true,
                        [styles.container]: true,
                    })}
                >
                    {data.map((item, idx) => (
                        <InforItem key={idx} label={item.lable} data={item.data} edit={item.edit} config={item.config ||{}} />
                    ))}
                    <div style={{marginTop:"10px",padding:"2px 3px"}}>
                    <Button type="primary">
                        Quên mật khẩu
                    </Button>
                </div>
                </div>
                
            </div>
        </div>
    );
}

export default FeaturePassword;
