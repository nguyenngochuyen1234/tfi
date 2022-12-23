import React from "react";
import PropTypes from "prop-types";
import styles from "../../styles.module.css";
import { Button, Dropdown } from "antd";

Profile.propTypes = {};
const items = [
    {
        key: "1",
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                1st menu item
            </a>
        ),
    },
    {
        key: "2",
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                2nd menu item
            </a>
        ),
    },
    {
        key: "3",
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                3rd menu item
            </a>
        ),
    },
];
function Profile(props) {
    return (
        <Dropdown
            menu={{
                items,
            }}
            placement="bottomRight"
            arrow={false}
            trigger={["click"]}
        >
            <Button className={styles["btn-r-container"]}>
                <img
                    src="https://scontent.fhan2-4.fna.fbcdn.net/v/t39.30808-1/316282375_830242631636324_4108120794133707327_n.jpg?stp=dst-jpg_p320x320&_nc_cat=100&ccb=1-7&_nc_sid=7206a8&_nc_ohc=fs9djFcHcncAX8bbdLm&_nc_ht=scontent.fhan2-4.fna&oh=00_AfB6zz13fZmLd94b4wbv8t1WKHxYirgOhkC_7BIPUqaczg&oe=63A821D8"
                    alt="avt"
                />
            </Button>
        </Dropdown>
    );
}

export default Profile;
