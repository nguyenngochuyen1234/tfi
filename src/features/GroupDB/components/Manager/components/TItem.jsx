import React from "react";
import PropTypes from "prop-types";
import { Col, Row, Typography } from "antd";
import styles from "../styles.module.css";
TItem.propTypes = {
    data: PropTypes.object.isRequired,
};

function TItem({ data }) {
    return (
        <Row className={styles.item}>
            <Col className={styles.box_1} span={6}>
                <Typography.Text
                    style={{ margin: 0, color: "var(--color--text--default)",display:"flex", alignItems:"center" }}
                    ellipsis={true}
                >
                    <img style={{width:"40px",height:"40px",borderRadius:"50%", marginRight:"5px"}} src={data.avatar} alt="avt"/>{data.name}
                </Typography.Text>
            </Col>
            <Col className={styles.box_1} span={5}>
                <Typography.Text
                    style={{ margin: 0, color: "var(--color--text--default)" }}
                    ellipsis={true}
                >
                    {data.gmail}
                </Typography.Text>
            </Col>
            <Col className={styles.box_1} span={4}>
                <Typography.Text
                    style={{ margin: 0, color: "var(--color--text--default)" }}
                    ellipsis={true}
                >
                    {data.major}
                </Typography.Text>
            </Col>
            <Col className={styles.box_1} span={5}>
                <Typography.Text
                    style={{ margin: 0, color: "var(--color--text--default)" }}
                    ellipsis={true}
                >
                    {data.school}
                </Typography.Text>
            </Col>
            <Col className={styles.box_1} span={4}>
                <Typography.Text
                    style={{ margin: 0, color: "var(--color--text--default)" }}
                    ellipsis={true}
                >
                    {data.phoneNumber}
                </Typography.Text>
            </Col>
        </Row>
    );
}

export default TItem;
