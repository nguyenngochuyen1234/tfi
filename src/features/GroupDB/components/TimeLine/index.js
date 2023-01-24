import React, { useState } from 'react';
import { SearchOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Input, Button } from 'antd'
import dayjs from 'dayjs';
import { useEffect } from 'react';
import "./style.css";
import taskApi from '../../../../api/taskApi';
import { useParams } from "react-router-dom";
const { Search } = Input;

function TimeLine(props) {
    const currentDay = dayjs()
    const params = useParams();
    const idGroup = params.idGroup

    var isSameOrAfter = require('dayjs/plugin/isSameOrAfter')
    dayjs.extend(isSameOrAfter)

    const [firstDay, setFirstDay] = useState(currentDay.subtract(5, 'days'))


    const monthOfFirstDay = firstDay.month()


    const monthNames = [
        "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL",
        "AUG", "SEP", "OCT", "NOV", "DEC"
    ]
    const WeekDayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
    let numberOfDaysLastMonth = 1
    let numberOfDaysNextMonth = 0
    let arrayDay = []

    for (let i = 0; i < 10; i++) {
        let date = firstDay.add(i, 'd')
        if (date.month() === firstDay.month()) {
            numberOfDaysLastMonth = i + 1
        } else {
            numberOfDaysNextMonth = 10 - numberOfDaysLastMonth
        }
        arrayDay.push(firstDay.add(i, 'd'))
    }
    const fetchData = async () => {
        try {
            let firstDayString = firstDay.year() + '-' + (firstDay.month() + 1) + '-' + firstDay.date()
            let lastDay = firstDay.add(14, 'd')
            let lastDayString = lastDay.year() + '-' + (lastDay.month() + 1) + '-' + lastDay.date()
            const data = await taskApi.getTaskTimeline(idGroup, { firstDayString, lastDayString })
            if (data.success) {
                data.tasks.forEach(task => {
                    getDayStartAndGetLength(task)
                })
            }
            console.log(data)
        } catch (err) {
            console.log(err.message)
        }
    }
    const getDayStartAndGetLength = (data) => {
        let dayStart = ''
        let lengthItem = ''
        console.log(firstDay)
        if (firstDay.isSameOrAfter(data.dayStart, 'date')) {
            console.log("lon hon")
        }

    }
    useEffect(() => {
        fetchData()
    }, [firstDay])

    return (
        <div>
            <div style={{ display: "flex", padding: "10px 0" }}>
                <Search
                    placeholder="input search text"
                    allowClear
                    // onSearch={onSearch}
                    style={{
                        width: 200,
                    }}
                />
                <Button icon={<LeftOutlined />} onClick={() => { setFirstDay(prev => prev.subtract(10, "d")) }} />
                <Button icon={<RightOutlined />} onClick={() => { setFirstDay(prev => prev.add(10, "d")) }} />
            </div>
            <div className='table-timeline'>
                <table>
                    <thead>
                        <tr className='tr-month-name'>
                            <td colSpan={numberOfDaysLastMonth}>{monthNames[monthOfFirstDay]}</td>
                            {numberOfDaysNextMonth > 0 && <td colSpan={numberOfDaysNextMonth}>{monthNames[firstDay.add(1, 'M').month()]}</td>}
                        </tr>
                        <tr>
                            {arrayDay?.map((day, id) => <td key={id}
                                style={{ borderRight: id === (numberOfDaysLastMonth - 1) ? "1px solid rgb(189 189 189)" : "none" }}>
                                {`${WeekDayNames[day.day()]} ${day.date()}`}
                            </td>)}
                        </tr>
                    </thead>
                    <tbody>
                        {arrayDay?.map((day, id) => <td key={id}>{ }</td>)}
                    </tbody>
                </table>

            </div>
        </div>
    );
}

export default TimeLine;