import React, { useEffect, useState } from "react";
import groupRecentlyApi from "../../../../../../../api/groupRecentlyApi";
import { useNavigate } from "react-router-dom";
import GroupAvatar from "../../../../../../../components/Avatar/GroupAvatar";
import classNames from "classnames";
import { Tooltip } from "antd";
import styles from "../styles.module.css";
ListRecentGroup.propTypes = {};

function ListRecentGroup(props) {

    const navigate = useNavigate()

    const [groupRecently, setGroupRecently] = useState([])
    const fetchGroupRecently = async () => {
        try {
            const data = await groupRecentlyApi.getGroupRecently()
            if (data.success) {
                let dataGroup = data.groups.map(item => item.group)
                setGroupRecently(dataGroup)
                console.log(data.groups)
            }
        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        fetchGroupRecently()
    }, [])
    const handleOnclick = async(idGroup) => {
        try{
            const result = await groupRecentlyApi.updateTimeGroup(idGroup)
            navigate(`/home/groups/${idGroup}/general`)
            console.log(result)
        }catch(err){
            console.log(err.message)
        }
    }

    return (
        <div className={styles["wrap"]}>
            <div className={styles["list-container"]}>
                {groupRecently?.map(group => {
                    return <div
                        id={group._id}
                        className={styles.item}
                        key={group._id}
                        onClick={()=>{handleOnclick(group._id)}}
                    >
                        <span
                            className={classNames({
                                [styles.name]: true,
                                "text-md": true,
                            })}
                        >
                            {group.name.length > 30 ? (
                                <Tooltip title={group.name} key={group.name}>
                                    {group.name.slice(0, 30)}...
                                </Tooltip>
                            ) : (
                                group.name
                            )}
                        </span>
                        <div
                            className={classNames({
                                [styles.describe]: true,
                                "text-sm": true,
                            })}
                        >
                            {/* {describe} */}
                        </div>
                        <div
                            style={{
                                position: "absolute",
                                bottom: "15px",
                            }}
                        >
                            <GroupAvatar arrayId={group.member} size="large" />
                        </div>
                    </div>
                })}
            </div>
        </div>
    );
}

export default ListRecentGroup;
