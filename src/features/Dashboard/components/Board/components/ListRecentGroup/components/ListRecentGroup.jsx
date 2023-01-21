import React, { useEffect, useState } from "react";
import groupRecentlyApi from "../../../../../../../api/groupRecentlyApi";
import GroupBox from "../../../../../../../components/GroupBox";
import GroupAvatar from "../../../../../../../components/Avatar/GroupAvatar";
import classNames from "classnames";
import { Tooltip } from "antd";
import styles from "../styles.module.css";
ListRecentGroup.propTypes = {};

function ListRecentGroup(props) {
    const [groupRecently, setGroupRecently] = useState([])
    const fetchGroupRecently = async () => {
        try {
            const data = await groupRecentlyApi.getGroupRecently()
            if (data.success) {
                let dataGroup = data.groups.map(item => item.group)
                setGroupRecently(dataGroup)
                console.log(dataGroup)
            }
        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        fetchGroupRecently()
    }, [])

    return (
        <div className={styles["wrap"]}>
            <div className={styles["list-container"]}>
                {groupRecently.map(group => {
                    <div>GROUP</div>
                })}
            </div>
        </div>
    );
}

export default ListRecentGroup;
