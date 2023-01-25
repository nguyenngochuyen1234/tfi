import { Avatar, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import imageApi from '../../api/imageApi';
const GroupAvatar = ({ arrayId, size = "default", config = 5 }) => {
    // console.log(arrayId)
    const [linksAvatar, setlinksAvatar] = useState({
        headerGroup: [],
        bodyGroup: null,
        hideGroup: []
    })

    const x = {
        id: 'default',
        name: "thang",

    }
    const fetchGroupImage = async () => {
        try {
            const data = await imageApi.getGroupImage({ arrayId: arrayId })
            if (data.success) {
                let groupImageLink = data.groupImg
                let lengthData = groupImageLink.length
                if (lengthData <= 5) {
                    setlinksAvatar(prev => ({ ...prev, headerGroup: groupImageLink }))
                }
                else {
                    setlinksAvatar(prev => ({ headerGroup: groupImageLink.slice(0, 5), bodyGroup: groupImageLink[5], hideGroup: (groupImageLink.slice(6, lengthData) || []) }))

                }
            }
        } catch (err) {
            alert(err.message)
        }
    }
    useEffect(() => {
        fetchGroupImage()
    }, [])
    console.log(linksAvatar)

    return (
        <>

            <Avatar.Group
                maxCount={config}
                size={size}
                maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
            >
                {linksAvatar.headerGroup?.map((linkAvatar, idx) => <Avatar key={idx} src={linkAvatar} />)}
                <Tooltip title="Ant User" placement="top">
                    {linksAvatar.bodyGroup && <Avatar src={linksAvatar.bodyGroup} />}
                </Tooltip>
                {linksAvatar.hideGroup.length > 0 && linksAvatar.hideGroup?.map((linkAvatar, idx) => <Avatar key={idx} src={linkAvatar} />)}
            </Avatar.Group>
        </>
    );
}
export default GroupAvatar;