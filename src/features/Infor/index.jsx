import { EditOutlined } from "@ant-design/icons";
import { Button, Col, Image, Row } from "antd";
import Typography from "antd/es/typography/Typography";
import classNames from "classnames";
import React from "react";
import { useSelector } from "react-redux";
import InforItem from "../../components/InforItem/InforItem";
import styles from "./styles.module.css";
FeatureInfor.propTypes = {};

function FeatureInfor(props) {
    const user =
        useSelector((state) => state.user.current.account) ||
        JSON.parse(localStorage.getItem("user"));
    console.log(user);
    const data = [
        { lable: "Tên", data: user.name, edit: true },
        { lable: "Gmail", data: user.gmail, edit: true },
        { lable: "Group đã tham gia", data: user.groupJoin.length, edit: false },
        { lable: "Group đã tạo", data: user.groupMade.length, edit: false },
        { lable: "Chuyên ngành/Lớp", data: user.major, edit: true },
        { lable: "Trường", data: user.school, edit: true },
        { lable: "Liên hệ", data: String(user.phoneNumber), edit: true },

        {
            lable: "Ảnh đại diện",
            data: <Image width="150px" src={user.avatar} />,
            edit: true,
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
                    <Row>
                        <Col span={19}>
                            <Typography.Title style={{color:"var(--color--text-default)"}} level={3}>Thông tin cá nhân</Typography.Title>
                        </Col>
                        <Col span={5}>
                            <Button type="link" icon={<EditOutlined />}>
                                Chỉnh sửa tất cả
                            </Button>
                        </Col>
                    </Row>
                </div>

                <div
                    className={classNames({
                        [styles.wrap]: true,
                        [styles.container]: true,
                    })}
                >
                    {data.map((item, idx) => (
                        <InforItem key={idx} label={item.lable} data={item.data} edit={item.edit} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FeatureInfor;
