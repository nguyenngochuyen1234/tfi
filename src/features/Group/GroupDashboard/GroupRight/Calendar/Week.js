import React, { useEffect } from 'react'
import "./style.css"
const Week = ({dayStartOfWeek}) => {

    let week = []
    for(let i=0;i<7;i++){
      week.push(dayStartOfWeek.add(i,'d'))
    }

  return (
    <tr>
      {week.map((day,id)=><td key={id}>{day.date()}</td>)}
    </tr>
  )
}

export default Week