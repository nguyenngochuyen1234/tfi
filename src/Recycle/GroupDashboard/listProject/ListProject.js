import React from 'react'
import { Tabs } from 'antd'
import Board from './Board/Board';
import CalendarWeek from './CalendarWeek/CalendarWeek';
const ListProject = () => {
  const onChange = (key) => {
    console.log(key);
  };
  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        onChange={onChange}
        items={[
          {
            label: `Board`,
            key: '1',
            children: <Board /> ,
          },
          {
            label: `Calendar`,
            key: '2',
            children: <CalendarWeek />,
          },
        ]}
      />
    </div>
  )
}

export default ListProject