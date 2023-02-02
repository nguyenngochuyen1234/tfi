import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";
import { Button, Col, Row, Typography } from "antd";
import { EditOutlined } from "@ant-design/icons";
import userApi from "../../api/userApi";
import { useDispatch } from "react-redux";
import { updateInfor } from "../../features/Auth/userSlice";
import { useEffect } from "react";
InforItem.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    data: PropTypes.node.isRequired,
    handleSetUser: PropTypes.func.isRequired,
    edit: PropTypes.bool.isRequired,
    config: PropTypes.object,
};

function InforItem({ label, name, data, edit, config = {}, handleSetUser }) {
    const initText = data;
    const [editable, setEditable] = useState();
    useEffect(()=>{
        setEditable(data)
    },[data])
    const dispatch = useDispatch();
    const handleCancel = () => {
        setEditable(initText);
    };
    const handleEdit = async (value) => {
        console.log({ [name]: value });
        try {
            await userApi.updatePatchAccount({ [name]: value });
            dispatch(updateInfor({ [name]: value }));
            handleSetUser({ [name]: value });
            setEditable(value)
        } catch (err) {
            console.log(err.message);
        }
        //goi patch api
    };
    return (
        <div className={styles.tab}>
            <Row gutter={[4, 4]} className={styles.content}>
                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6} style={{ fontWeight: 500 }}>
                    {label}
                </Col>
                <Col
                    xs={24}
                    sm={24}
                    md={18}
                    lg={18}
                    xl={18}
                    xxl={18}
                    style={{ fontWeight: 500, color: "var(--color--text-drop)" }}
                >
                    <Typography.Text
                        editable={{
                            icon: (
                                <span>
                                    {edit && (
                                        <Button type="link" icon={<EditOutlined />}>
                                            Chỉnh sửa
                                        </Button>
                                    )}
                                </span>
                            ),
                            onChange: handleEdit,
                            onCancel: handleCancel,
                            text: editable,
                        }}
                        style={{
                            ...config,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            color: "var(--color--text-drop)",
                        }}
                    >
                        {editable}
                    </Typography.Text>
                </Col>
            </Row>
        </div>
    );
}

export default InforItem;
