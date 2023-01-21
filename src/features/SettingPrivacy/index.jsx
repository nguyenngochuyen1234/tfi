import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Checkbox, Drawer, Form, Space } from "antd";
import Typography from "antd/es/typography/Typography";

SettingPrivacy.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
};
const initSetting = {
    hideAccount: false,
    hideMess: false,
    hideNoti: false,
    showDock:false,
    showFind:false,
};
function SettingPrivacy({ open, setOpen }) {
    const [setting, setSetting] = useState(initSetting);
    const onChange = (e) => {
        const target = e.target;
        setSetting({ ...setting, [target.value]: target.checked });
    };
    const onClose = () => {
        // handle api vs setting
        setOpen(false);
    };
    console.log(setting);
    return (
        <Drawer
            title="Cài đặt & Quyền riêng tư"
            placement="right"
            size={400}
            onClose={onClose}
            open={open}
            extra={
                <Space>
                    <Button type="primary" onClick={onClose}>
                        OK
                    </Button>
                </Space>
            }
        >
            <div>
                <Typography.Title level={5}>Tài khoản</Typography.Title>
                <div className="mg-b_10">
                    <Checkbox value="hideAccount" onChange={onChange} checked={setting.hideAccount}>
                        Ẩn thông tin người dùng
                    </Checkbox>
                </div>
                <div className="mg-b_10">
                    <Checkbox value="hideMess" onChange={onChange} checked={setting.hideMess}>
                        Hạn chế tin nhắn
                    </Checkbox>
                </div>
                <div className="mg-b_10">
                    <Checkbox value="hideNoti" onChange={onChange} checked={setting.hideNoti}>
                        Tắt thông báo
                    </Checkbox>
                </div>
            </div>
            <div>
                <Typography.Title level={5}>Giao diện</Typography.Title>
                <div className="mg-b_10">
                    <Checkbox value="showDock" onChange={onChange} checked={setting.showDock}>
                        Nút truy cập nhanh
                    </Checkbox>
                </div>
                <div className="mg-b_10">
                    <Checkbox value="showFind" onChange={onChange} checked={setting.showFind}>
                        Thanh tìm kiếm nhanh
                    </Checkbox>
                </div>
            </div>
        </Drawer>
    );
}

export default SettingPrivacy;
