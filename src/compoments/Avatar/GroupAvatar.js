import { Avatar, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import imageApi from '../../api/imageApi';
const GroupAvatar = ({ arrayId, size }) => {
   
    const [baseStringArray, setBaseStringArray] = useState({
        headerGroup: [],
        bodyGroup: null,
        hideGroup: []
    })
    const fetchGroupImage = async () => {
        try {
            const data = await imageApi.getGroupImage({ arrayId: arrayId })
            if (data.success) {
                let lengthData = data.groupName.length
                const base64StringLength = data.groupName.map(name => {
                    return (
                        btoa(
                            String.fromCharCode(...new Uint8Array(name.img.data.data))
                        )
                    )
                })
                if (lengthData <= 5) {
                    setBaseStringArray(prev => ({ ...prev, headerGroup: base64StringLength }))
                }
                else {
                    setBaseStringArray(prev => ({ headerGroup: base64StringLength.slice(0, 5), bodyGroup: base64StringLength[5], hideGroup: (base64StringLength.slice(6, lengthData) || []) }))

                }
            }
        } catch (err) {
            alert(err.message)
        }
    }
    useEffect(() => {
        fetchGroupImage()
    }, [])

    return (
        <>

            <Avatar.Group
                maxCount={5}
                size={size}
                maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
            >
                {baseStringArray.headerGroup?.map((baseString,idx) => <Avatar key={idx} src={`data:image/png;base64,${baseString}`} />)}
                <Tooltip title="Ant User" placement="top">
                    {baseStringArray.bodyGroup && <Avatar  src={`data:image/png;base64,${baseStringArray.bodyGroup}`} />}
                </Tooltip>
                {baseStringArray.hideGroup.length>0 && baseStringArray.hideGroup?.map((baseString,idx) => <Avatar key={idx} src={`data:image/png;base64,${baseString}`} />)}
            </Avatar.Group>
        </>
    );
}
export default GroupAvatar;