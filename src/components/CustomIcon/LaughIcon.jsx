import React from "react";
import PropTypes from "prop-types";
import Icon from "@ant-design/icons/lib/components/Icon";
import classNames from "classnames";
import "./style.css";
LaughIcon.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    toggleEmoji: PropTypes.func,
};
LaughIcon.defaultProps = {
    width: "24px",
    height: "24px",
    toggleEmoji: null,
};

function LaughIcon({ width, height,toggleEmoji }) {
    const handleToggleEmoji =( )=>{
        if(toggleEmoji){
            toggleEmoji();
        }
    }
    const SendSgv = () => (
        <svg
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M14.6438 20.6063C13.7866 20.8667 12.8958 20.9994 12 21C10.22 21 8.47991 20.4722 6.99987 19.4832C5.51983 18.4943 4.36628 17.0887 3.68509 15.4442C3.0039 13.7996 2.82567 11.99 3.17294 10.2442C3.5202 8.49836 4.37737 6.89472 5.63604 5.63604C6.89472 4.37737 8.49836 3.5202 10.2442 3.17294C11.99 2.82567 13.7996 3.0039 15.4442 3.68509C17.0887 4.36628 18.4943 5.51983 19.4832 6.99987C20.4722 8.47991 21 10.22 21 12C20.9994 12.8958 20.8667 13.7866 20.6063 14.6438L14.6438 20.6063Z"
                stroke="#101828"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M8.625 11.25C9.24632 11.25 9.75 10.7463 9.75 10.125C9.75 9.50368 9.24632 9 8.625 9C8.00368 9 7.5 9.50368 7.5 10.125C7.5 10.7463 8.00368 11.25 8.625 11.25Z"
                fill="#101828"
            />
            <path
                d="M15.375 11.25C15.9963 11.25 16.5 10.7463 16.5 10.125C16.5 9.50368 15.9963 9 15.375 9C14.7537 9 14.25 9.50368 14.25 10.125C14.25 10.7463 14.7537 11.25 15.375 11.25Z"
                fill="#101828"
            />
            <path
                d="M15.9001 14.25C15.5036 14.9331 14.9347 15.5 14.2503 15.8941C13.5658 16.2882 12.7899 16.4956 12.0001 16.4956C11.2103 16.4956 10.4344 16.2882 9.74993 15.8941C9.0655 15.5 8.49658 14.9331 8.1001 14.25"
                stroke="#101828"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
    return <Icon onClick={handleToggleEmoji} className="icon-cursor" component={SendSgv} />;
}
export default LaughIcon;
