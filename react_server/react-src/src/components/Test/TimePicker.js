import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './TimePicker.css';

function TimePicker() {
    const [startTime, setStartTime] = useState(null);

    const handleStartTimeChange = (time) => {
        setStartTime(time);
    };

    return (
        <>
            <label>เวลาเริ่มต้น: </label>
            <DatePicker
                selected={startTime}
                onChange={handleStartTimeChange}
                showTimeSelect
                dateFormat="Pp"
            />
        </>
    );
}

export default TimePicker;
