import React, { useEffect, useState } from 'react'
import { Avatar } from 'antd'
import imageApi from '../../api/imageApi'
const SingleAvatar = ({username,size}) => {
    const [baseString, setBaseString] = useState('')
    const fetchSingleImage = async () => {
        try {
            const data = await imageApi.getSingleImage({ name: username })
            if (data.success) {
                console.log(data)
                const base64String = btoa(
                    String.fromCharCode(...new Uint8Array(data.data.img.data.data))
                )
                setBaseString(base64String)
            }
        } catch (err) {
            alert(err.message)
        }
    }
    useEffect(() => {
        fetchSingleImage()
    }, [])
    return (
        <Avatar  src={`data:image/png;base64,${baseString}`} size={size} />
    )
}

export default SingleAvatar