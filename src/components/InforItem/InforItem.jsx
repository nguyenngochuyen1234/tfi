import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";
import { Button, Col, Row } from "antd";
import { EditOutlined } from "@ant-design/icons";
InforItem.propTypes = {
    label: PropTypes.string.isRequired,
    data: PropTypes.node.isRequired,
    edit: PropTypes.bool.isRequired,
    config: PropTypes.object,
};

function InforItem({ label, data, edit, config = {} }) {
    return (
        <div className={styles.tab}>
            <Row gutter={[4,4]} className={styles.content}>
                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6} style={{ fontWeight: 500 }}>
                    {label}
                </Col>
                <Col
                    xs={19}
                    sm={19}
                    md={13}
                    lg={13}
                    xl={13}
                    xxl={13}
                    style={{ fontWeight: 500, color: "var(--color--text-drop)" }}
                >
                    <div style={{ ...config }}>{data}</div>
                </Col>
                <Col span={5}>
                    {edit && (
                        <Button type="link" icon={<EditOutlined />}>
                            Chỉnh sửa
                        </Button>
                    )}
                </Col>
            </Row>
        </div>
    );
}

export default InforItem;
