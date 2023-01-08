import React, { useEffect, useState } from 'react'
import groupApi from '../../api/groupApi'
import GroupBox from '../../compoments/GroupBox'
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import "./style.css"
import ModalGroup from './compoment/modalGroup/ModalGroup';

const GroupMade = () => {

  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };


  const idUser = localStorage.getItem("user_id")
  const [groupsMade, setGroupMade] = useState([])
  const fechAllGroupMade = async () => {
    try {
      const data = await groupApi.getAllGroupMade()
      if (data.success) {
        setGroupMade(data.groups)
      }
    } catch (err) {
      console.log(err.message)
    }
  }
  const handleClickGroup = (idGroup) => {
    navigate(`/home/group/${idGroup}`)
  }
  useEffect(() => {
    fechAllGroupMade()
  }, [])

  return (
    <div>
      <Button type="dashed" onClick={showModal}>
        Create new group
      </Button>
      <ModalGroup title={"Create new group"} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <div className='group-container'>
        {
          groupsMade.map((group) => 
            <GroupBox
              key={group._id}
              idGroup={group._id}
              click={handleClickGroup}
              nameGroup={group.name}
              describe={group.description}
              members={group.member}
            />
          )
        }
      </div>
    </div>
  )
}

export default GroupMade