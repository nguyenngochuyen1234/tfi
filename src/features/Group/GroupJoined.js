import React, { useState, useEffect } from 'react'
import GroupBox from '../../compoments/GroupBox'
import groupApi from '../../api/groupApi'
import "./style.css"
const GroupJoined = ({dataGroupJoined}) => {


  return (
    <div className='group-container'>
      {
        dataGroupJoined?.map(group =>
          <GroupBox
            key={group._id}
            nameGroup={group.name}
            describe={group.description}
            members={group.member}
          />)
      }
    </div>
  )
}

export default GroupJoined