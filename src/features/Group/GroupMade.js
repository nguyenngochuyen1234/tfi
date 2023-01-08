import React, { useEffect, useState } from 'react'
import groupApi from '../../api/groupApi'
import GroupBox from '../../compoments/GroupBox'
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import "./style.css"
import ModalGroup from './compoment/modalGroup/ModalGroup';

const GroupMade = ({dataGroupMade}) => {

  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };


  const idUser = localStorage.getItem("user_id")
  const handleClickGroup = (idGroup) => {
    navigate(`/home/group/${idGroup}`)
  }
  return (
    <>
      <Button type="dashed" onClick={showModal}>
        Create new group
      </Button>
      <ModalGroup title={"Create new group"} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <div className='group-container'>
        {
          dataGroupMade.map((group, idx) => 
          <div key={idx} onClick={() => handleClickGroup(group._id)}>
            <GroupBox
               nameGroup={group.name}
              describe={group.description}
              members={group.member}
            />
          </div>
          )
        }
      </div>
    </>
  )
}

export default GroupMade