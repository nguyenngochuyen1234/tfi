import React from "react";
import GroupBox from "../../../../../../../compoments/GroupBox";
import styles from "../styles.module.css";
ListRecentGroup.propTypes = {};

function ListRecentGroup(props) {
    return (
        <div className={styles["wrap"]}>
            <div className={styles["list-container"]}>
                <GroupBox/>
                <GroupBox/>
                <GroupBox/>
                <GroupBox/>
                <GroupBox/>

            </div>
        </div>
    );
}

export default ListRecentGroup;
