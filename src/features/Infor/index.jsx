import { EditOutlined } from "@ant-design/icons";
import { Button, Col, Image, Modal, Row, Upload } from "antd";
import Typography from "antd/es/typography/Typography";
import classNames from "classnames";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import uploadApi from "../../api/uploadApi";
import userApi from "../../api/userApi";
import InforItem from "../../components/InforItem/InforItem";
import FormInfor from "./components/FormInfor";
import styles from "./styles.module.css";
FeatureInfor.propTypes = {};

function FeatureInfor(props) {
    const user =
        useSelector((state) => state.user.current.account) ||
        JSON.parse(localStorage.getItem("user"));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [changeAvt, setChangeAvt] = useState(false);
    const [avtLink, setAvtLink] = useState(user.avatar);
    const [avt, setAvt] = useState(user.avatar);
    const [loading, setLoading] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const upload = useRef(null);
    const uploadDOM = document.querySelector(".uploadAvt .ant-upload-list");
    const handleOk = () => {
        setIsModalOpen(false);
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
                    setChangeAvt(false);
                    setAvtLink(link);
                    await userApi.updatePatchAccount({ avatar: link })
                    setLoading(false);
                    uploadDOM.querySelector(
                        ".ant-upload-list-item-container"
                    ).innerHTML = "";
                }
                catch (e) {
                    console.log(e);
                    setChangeAvt(false);
                    setLoading(false);
                    uploadDOM.querySelector(
                        ".ant-upload-list-item-container"
                    ).innerHTML = "";
                }

                // Upload Patch Thong tin
            })();
        }
    };
    const data = [
        { lable: "Tên", data: user.name, edit: true, name: "name" },
        { lable: "Gmail", data: user.gmail, edit: true, name: "gmail" },
        { lable: "Group đã tham gia", data: user.groupJoin.length, edit: false, name: "gmail" },
        { lable: "Group đã tạo", data: user.groupMade.length, edit: false, name: "groupCreate" },
        { lable: "Chuyên ngành/Lớp", data: user.major, edit: true, name: "groupJoined" },
        { lable: "Trường", data: user.school, edit: true, name: "school" },
        { lable: "Liên hệ", data: String(user.phoneNumber), edit: true, name: "phoneNumber" },
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
                            <Typography.Title
                                style={{ color: "var(--color--text-default)" }}
                                level={3}
                            >
                                Thông tin cá nhân
                            </Typography.Title>
                        </Col>
                        <Col span={5}>
                            <Button type="link" onClick={showModal} icon={<EditOutlined />}>
                                Chỉnh sửa tất cả
                            </Button>
                            <Modal
                                title="Edit Your Information"
                                open={isModalOpen}
                                onCancel={handleCancel}
                                footer={null}
                            >
                                <FormInfor data={user} handleOk={handleOk} />
                            </Modal>
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
                        <InforItem key={idx} name={item.name} label={item.lable} data={item.data} edit={item.edit} />
                    ))}
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
            </div>
        </div>
    );
}

export default FeatureInfor;
