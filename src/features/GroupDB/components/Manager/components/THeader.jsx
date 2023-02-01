import React from "react";
import PropTypes from "prop-types";
import { Col, Row } from "antd";
import styles from "../styles.module.css";
THeader.propTypes = {};

function THeader(props) {
    return (
        <Row className={styles.header}>
            <Col className={styles.box_1} span={6}>
                Name
            </Col>
            <Col className={styles.box_1} span={5}>
                Gmail
            </Col>
            <Col className={styles.box_1} span={4}>
                Major
            </Col>
            <Col className={styles.box_1} span={5}>
                School
            </Col>
            <Col className={styles.box_1} span={4}>
                Contact
            </Col>
        </Row>
    );
}

export default THeader;
