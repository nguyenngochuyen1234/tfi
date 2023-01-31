import React from "react";
import PropTypes from "prop-types";
import { Button, Result } from "antd";
import { Link } from "react-router-dom";

NotFound.propTypes = {};

function NotFound(props) {
    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Result
                status="404"
                title="404"
                subTitle="Xin lỗi có vẻ đường dẫn bạn tới không tìm thấy"
                extra={
                    <Button type="primary">
                        <Link to="/" style={{color:"#FFFFFF"}}>Back Home</Link>
                    </Button>
                }
            />
        </div>
    );
}

export default NotFound;
