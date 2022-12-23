import React from 'react';
import { Button, message, Space } from 'antd';

const Notification = (type, content) => {
    const [messageApi, contextHolder] = message.useMessage();
    messageApi.open({
        type: type,
        content: content,
    });
    return(
        {contextHolder}
    )
}
export default Notification

