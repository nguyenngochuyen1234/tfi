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
    const currentDay = dayjs().startOf('date')
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
            let lastDay = firstDay.add(9, 'd')
            let lastDayString = lastDay.year() + '-' + (lastDay.month() + 1) + '-' + lastDay.date()
            const data = await taskApi.getTaskTimeline(idGroup, { firstDayString, lastDayString })
            if (data.success) {
                const dataTaskItem = data.tasks.map(dt => getDayStartAndGetLength(dt))
                setDataTask(dataTaskItem)
            }
        } catch (err) {
            console.log(err.message)
        }
    }

    const getDayStartAndGetLength = (data) => {
        let dayStartTask = 0, lengthItem = 0
        let dayStartFormat = dayjs(data.dayStart).startOf('date') //Ngày bắt đầu deadline
        let deadlineFormat = dayjs(data.deadline).startOf('date') //Ngày kết thúc deadline

        let lastDay = firstDay.add(9, 'd').startOf('date')

        let deadlineDiffStart = deadlineFormat.diff(dayStartFormat, 'Day') // Khoảng cách giữa ngày bắt đầu deadline đến ngày kết thúc deadline 

        if (dayStartFormat.isSameOrAfter(firstDay, 'date')) {
            dayStartTask = (dayStartFormat.diff(firstDay, 'Day'))*110 + 10
            if (deadlineDiffStart === 0) lengthItem = 110
            else if (deadlineFormat.isAfter(lastDay)) {
                lengthItem = (10 - dayStartTask)*110 + 20
            }
            else { lengthItem = (deadlineDiffStart + 1)*110 - 20 }
        } else {
            dayStartTask = -10
            let deadlineDiffFirstDay = deadlineFormat.diff(firstDay, 'Day') //Khoảng cách giữa ngày kết thúc deadline với ngày đầu tiên
            console.log({deadlineDiffFirstDay})
            if (deadlineDiffFirstDay + 1 > 10) {
                lengthItem = 10*110 + 20
            } else if (deadlineDiffFirstDay < 2) {
                lengthItem = (deadlineDiffFirstDay + 1)*110
            }
            else {
                lengthItem = (deadlineDiffFirstDay + 1)*110 - 20
            }
        }

        return {
            dayStartTask,
            lengthItem,
            ...data
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
            <div className='table-timeline' style={{ display: "flex", justifyContent: "center" }}>
                <table style={{ position: "relative" }}>
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
                        <span style={{ position: "absolute", left: 0, overflow: "auto", width: "100%", height: "280px", overflowX:"hidden" }}>
                            {
                                dataTask.map((task, idx) => {
                                    return <TaskItem task={task} key={idx} marginItem={task.dayStartTask} widthItem={task.lengthItem} />
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