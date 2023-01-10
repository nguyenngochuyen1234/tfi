import React, { useEffect } from 'react'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import Week from './Week'
import { Button } from 'antd'
const Calendar = () => {
    const dayjs = require('dayjs')
    console.log(dayjs().format('MMMM'))
    var updateLocale = require('dayjs/plugin/updateLocale')
    dayjs.extend(updateLocale)

    dayjs.updateLocale('en', {
        months: [
            "January", "February", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December"
        ]
    })

    const dayStartOfMonth = dayjs().startOf('M')
    const dayLastOfMonth = dayjs().endOf('M')
    const dayStartOfWeekOfMonth = dayStartOfMonth.startOf('w')
    const weekNumberOfTheMonth = (dayLastOfMonth.startOf('w').date() - dayStartOfMonth.startOf('w').date()) / 7 + 1

    let arrayStartDayOfWeek = []
    for (let i = 0; i < weekNumberOfTheMonth; i++) {
        arrayStartDayOfWeek.push(dayStartOfWeekOfMonth.add(i, 'w'))
    }

    return (
        <div className='calendar-container'>
            <div className='header-calendar'>
                <Button icon={<LeftOutlined />} style={{border:"none"}}/>
                <p style={{margin:"0 10px"}}>{dayjs().format('MMMM')} {dayjs().year()}</p>
                
                <Button icon={<RightOutlined />} style={{border:"none"}}/>
            </div>
            <div className='body-calendar'>
                <table>
                    <thead>
                        <tr className='tr-name-week'>
                            <td>SU</td>
                            <td>MO</td>
                            <td>TU</td>
                            <td>WE</td>
                            <td>TH</td>
                            <td>PR</td>
                            <td>SA</td>
                        </tr>
                    </thead>
                    <tbody>
                        {arrayStartDayOfWeek.map((week, id) => <Week key={id} dayStartOfWeek={week} />)}
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default Calendar