import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Checkbox, Drawer, Space, Switch, Typography } from "antd";
import classNames from "classnames";
import styles from "./styles.module.css";
import MoonIcon from "../../components/CustomIcon/MoonIcon";
import SunIcon from "../../components/CustomIcon/SunIcon";
ScreenSupport.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    setTheme:PropTypes.func.isRequired
};
const initSetting =JSON.parse(localStorage.getItem("config")) || {
    nightMode: false,
    assistantMode: false,
    soundMode: false,
    animationMode: false,
};
function ScreenSupport({ open, setOpen ,setTheme}) {
    const [setting, setSetting] = useState(initSetting);
    const onChange = (e) => {
        const target = e.target;
        const configSetting ={...setting, [target.value]: target.checked }
        setSetting({...configSetting});
        localStorage.setItem("config", JSON.stringify({...configSetting}));
        setTheme(configSetting?.nightMode?"dark":"light")

    };
    useEffect(()=>{
        if(setting.nightMode===true){
            document.body.classList.add("dark");
        }
        else{
            if (document.body.classList.contains("dark")) document.body.classList.remove("dark");
        
        }
    },[setting.nightMode])
    const onClose = () => {
        setOpen(false);
    };
  
    return (
        <Drawer
            title="Màn hình & Trợ năng"
            placement="right"
            size={400}
            onClose={onClose}
            open={open}
        >
            <div>
                <Typography.Title level={5}>Màn hình</Typography.Title>
                <div className="mg-b_10">
                    <span style={{marginRight:"10px"}}>Chế độ</span>
                    <Switch
                        checkedChildren={<MoonIcon width="20px" height="20px"/>}
                        unCheckedChildren={<SunIcon width="25px" height="25px"/>}
                        className={classNames({
                            [styles["switch-checked"]]:setting.nightMode,
                            [styles["switch"]]:!setting.nightMode

                        })}
                        onChange={(checked) =>
                            onChange({ target: { value: "nightMode" , checked} })
                        }
                        checked={setting.nightMode}
                    />
                </div>
                <div className="mg-b_10">
                    <Checkbox
                        value="animationMode"
                        onChange={onChange}
                        checked={setting.animationMode}
                    >
                        Hiệu ứng nâng cao
                    </Checkbox>
                </div>
            </div>
            <div>
                <Typography.Title level={5}>Trợ năng</Typography.Title>
                <div className="mg-b_10">
                    <Checkbox
                        value="assistantMode"
                        onChange={onChange}
                        checked={setting.assistantMode}
                    >
                        Trợ lý ảo
                    </Checkbox>
                </div>
                <div className="mg-b_10">
                    <Checkbox value="soundMode" onChange={onChange} checked={setting.soundMode}>
                        Giọng nói trợ lý
                    </Checkbox>
                </div>
            </div>
        </Drawer>
    );
}

export default ScreenSupport;
