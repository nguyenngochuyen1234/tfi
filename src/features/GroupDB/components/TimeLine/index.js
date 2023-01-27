import React, { useState, useRef } from 'react';
import { SearchOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Input, Button } from 'antd'
import dayjs from 'dayjs';
import { useEffect } from 'react';
import "./style.css";
import taskApi from '../../../../api/taskApi';
import { useParams } from "react-router-dom";
import TaskItem from './components/TaskItem';
const { Search } = Input;

function TimeLine(props) {
    const currentDay = dayjs()
    const params = useParams();
    const idGroup = params.idGroup
    const ref = useRef(null)

    const [dataTask, setDataTask] = useState([])
    const [widthTd, setWidthTd] = useState(0)

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
                const dataTaskItem = data.tasks.map(dt => getDayStartAndGetLength(dt))
                setDataTask(dataTaskItem)
            }
            console.log(data)
        } catch (err) {
            console.log(err.message)
        }
    }

    const getLengthTaskItem = (length) => {
        if (length === 0) {
            return 1;
        } else if (length > 15) {
            return length - 15;
        }
    }

    const getDayStartAndGetLength = (data) => {
        let dayStartFormat = dayjs(data.dayStart)
        let deadlineFormat = dayjs(data.deadline)
        if (dayStartFormat.isSameOrAfter(firstDay, 'date')) {
            return ({
                dayStartTask: dayStartFormat.diff(firstDay, 'Day'),
                lengthItem: deadlineFormat.diff(dayStartFormat, 'Day') === 0 ? 1 : deadlineFormat.diff(dayStartFormat, 'Day') + 2,
                ...data,
            })
        } else {
            return ({
                dayStartTask: 0,
                lengthItem: deadlineFormat.diff(dayStartFormat, 'Day') === 0 ? 1 : deadlineFormat.diff(dayStartFormat, 'Day') + 2,
                ...data,
            })
        }
    }
    useEffect(() => {
        setWidthTd(ref.current.clientWidth)
        console.log(ref.current.clientWidth)
    }, [])
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
                            {arrayDay?.map((day, id) => <td key={id} ref={ref}
                                style={{ borderRight: id === (numberOfDaysLastMonth - 1) ? "1px solid rgb(189 189 189)" : "none" }}>
                                {`${WeekDayNames[day.day()]} ${day.date()}`}
                            </td>)}
                        </tr>
                    </thead>
                    <tbody>
                        {arrayDay?.map((day, id) => <td key={id}>{
                        }</td>)}
                        <span style={{position:"absolute", left:0}}>
                            {
                                dataTask.map((task, idx) => {
                                    return <TaskItem task={task} key={idx}/>
                                })
                            }
                        </span>
                    </tbody>
                </table>

            </div>
        </div>
    );
}

export default TimeLine;