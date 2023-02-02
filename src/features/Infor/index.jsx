import { EditOutlined } from "@ant-design/icons";
import { Button, Col, Image, Modal, Row, Skeleton, Upload } from "antd";
import Typography from "antd/es/typography/Typography";
import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import uploadApi from "../../api/uploadApi";
import userApi from "../../api/userApi";
import { updateInfor } from "../Auth/userSlice";
import FormInfor from "./components/FormInfor";
import LayOutInFor from "./components/LayOutInFor";
import styles from "./styles.module.css";
FeatureInfor.propTypes = {};

function FeatureInfor(props) {
    const [user, setUser] = useState();
    const userId =
        useSelector((state) => state.user.current?.account._id) || localStorage.getItem("user_id");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [changeAvt, setChangeAvt] = useState(false);
    const [avtLink, setAvtLink] = useState();
    const [avt, setAvt] = useState();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        (async () => {
            try {
                const { user } = await userApi.getOnlyUser(userId);
                setUser(user);
                setAvt(user.avatar);
                setAvtLink(user.avatar);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);
    const handleOk = (data) => {
        const newUser = { ...user, ...data };
        setUser(newUser);
        setIsModalOpen(false);
    };
    const showModal = () => {
        setIsModalOpen(true);
    };

    const upload = useRef(null);
    const uploadDOM = document.querySelector(".uploadAvt .ant-upload-list");

    const handleSetUser = (data) => {
        const newUser = { ...user, ...data };
        console.log(newUser);
        setUser(newUser);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const changeImage = (e) => {
        setAvt(e?.fileList);
    };
    const handleChangeAvt = () => {
        if (changeAvt === false) {
            setChangeAvt(true);
            upload.current.click();
        } else {
            // upload api ảnh
            (async () => {
                try {
                    setLoading(true);
                    let formData = new FormData();
                    formData.append("file", avt[0].originFileObj);
                    const { link } = await uploadApi.upload(formData);
                    console.log({ link: link });
                    const action = updateInfor({ avatar: link });
                    dispatch(action);
                    setChangeAvt(false);
                    setAvtLink(link);
                    await userApi.updatePatchAccount({ avatar: link });
                    const newUser = { ...user, avatar: link };
                    setUser(newUser);
                    setLoading(false);
                    uploadDOM.querySelector(".ant-upload-list-item-container").innerHTML = "";
                } catch (e) {
                    console.log(e);
                    setChangeAvt(false);
                    setLoading(false);
                    uploadDOM.querySelector(".ant-upload-list-item-container").innerHTML = "";
                }

                // Upload Patch Thong tin
            })();
        }
    };
    console.log(user);
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
                        <Col span={12}>
                            <Typography.Title
                                style={{ color: "var(--color--text-default)" }}
                                level={3}
                            >
                                Thông tin cá nhân
                            </Typography.Title>
                        </Col>
                        <Col span={12} style={{textAlign:"right"}}>
                            <Button type="link" onClick={showModal}  icon={<EditOutlined />}>
                                Chỉnh sửa tất cả
                            </Button>
                        </Col>
                            <Modal
                                title="Edit Your Information"
                                open={isModalOpen}
                                onCancel={handleCancel}
                                footer={null}
                            >
                                <FormInfor data={user} handleOk={handleOk} />
                            </Modal>
                    </Row>
                </div>

                {user ? (
                    <div
                        className={classNames({
                            [styles.wrap]: true,
                            [styles.container]: true,
                        })}
                    >
                        <LayOutInFor user={user} handleSetUser={handleSetUser} />
                        <div className={styles.tab}>
                            <Row gutter={[4, 4]} className={styles.content}>
                                <Col
                                    xs={24}
                                    sm={24}
                                    md={6}
                                    lg={6}
                                    xl={6}
                                    xxl={6}
                                    style={{ fontWeight: 500 }}
                                >
                                    Ảnh đại diện
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
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        {!changeAvt && (
                                            <Image
                                                src={avtLink}
                                                style={{ width: "150px", height: "150px" }}
                                                alt="avt"
                                            />
                                        )}

                                        <Upload
                                            maxCount={1}
                                            accept="image/png, image/jpeg,image/jpg"
                                            listType="picture-card"
                                            className="uploadAvt"
                                            onChange={changeImage}
                                            beforeUpload={() => false}
                                        >
                                            <span ref={upload}></span>
                                        </Upload>

                                        <Button
                                            type="link"
                                            onClick={handleChangeAvt}
                                            icon={!changeAvt && <EditOutlined />}
                                            loading={loading}
                                        >
                                            {!changeAvt ? "Chỉnh sửa" : "Lưu"}
                                        </Button>
                                        {changeAvt && (
                                            <Button
                                                type="link"
                                                onClick={() => {
                                                    setChangeAvt(false);
                                                    uploadDOM.querySelector(
                                                        ".ant-upload-list-item-container"
                                                    ).innerHTML = "";
                                                }}
                                            >
                                                Hủy
                                            </Button>
                                        )}
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                ) : (
                    <div
                        className={classNames({
                            [styles.wrap]: true,
                            [styles.container]: true,
                        })}
                    >
                        <Skeleton active paragraph={{ row: 2 }} />
                        <Skeleton active paragraph={{ row: 2 }} />
                        <Skeleton active paragraph={{ row: 2 }} />
                        <Skeleton active paragraph={{ row: 2 }} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default FeatureInfor;
