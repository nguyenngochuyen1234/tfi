import React, { useState, useEffect } from 'react'
import GroupBox from '../../compoments/GroupBox'
import groupApi from '../../api/groupApi'
import "./style.css"
const GroupJoined = () => {

  const [groupsJoined, setGroupJoined] = useState([])
  const fechAllGroupJoined = async () => {
    try {
      const data = await groupApi.getAllGroupJoined()
      console.log(data)
      if (data.success) {
        setGroupJoined(data.allGroupJoin)
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    fechAllGroupJoined()
  }, [])

  return (
    <div className='group-container'>
      {
        groupsJoined?.map(group =>
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