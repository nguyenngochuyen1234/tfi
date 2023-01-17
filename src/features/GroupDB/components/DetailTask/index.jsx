import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

DetailTask.propTypes = {
    setRender: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
};

function DetailTask({ data, setRender, }) {
    const navigate=useNavigate()
    const handleClickBack = () => {
        navigate("./");
    };
    return (
        <div>
            <div>
                <Button
                    type="link"
                    className="link-back"
                    onClick={handleClickBack}
                    icon={<LeftOutlined />}
                >
                    Back
                </Button>
            </div>
        </div>
    );
}

export default DetailTask;
