import React,{ useEffect, useState } from "react";
import groupRecentlyApi from "../../../../../../../api/groupRecentlyApi";
import GroupBox from "../../../../../../../components/GroupBox";
import styles from "../styles.module.css";
ListRecentGroup.propTypes = {};

function ListRecentGroup(props) {
    const [groupRecently, setGroupRecently] = useState([])
    const fetchGroupRecently = async () => {
        try {
            const data = await groupRecentlyApi.getGroupRecently()
            if (data.success) {
                setGroupRecently(data.groups)
                console.log(data.groups)
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
                {/* {groupRecently.map(group => {

                })} */}
            </div>
        </div>
    );
}

export default ListRecentGroup;
