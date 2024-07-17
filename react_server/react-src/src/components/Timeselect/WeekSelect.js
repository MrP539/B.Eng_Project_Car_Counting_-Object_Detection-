import React, { Component } from 'react';
import { StateContext } from '../ToolbarDetect/StateContext';

class WeekSelect extends Component {
    static contextType = StateContext;

    constructor(props) {
        super(props);
        this.state = {
            selectedWeek: null,
            selectedDay: null,
            selectedDay1ago: null,
            selectedDay2ago: null,
            selectedDay3ago: null,
            selectedDay4ago: null,
            selectedDay5ago: null,
            selectedDay6ago: null
        };
    }

    handleWeekChange = (event) => {
        const { setSelectedWeek, setIsLoading } = this.context;
        const selectedWeek = event.target.value;
        this.setState({ selectedWeek });
        setSelectedWeek(selectedWeek);
        setIsLoading(true);
    };

    // คำนวณวันที่ของสัปดาห์
    getWeekDates = (weekNumber, year) => {
        const startDate = new Date(year, 0, 1 + (weekNumber - 1) * 7);
        const endDate = new Date(startDate.getTime() + 6 * 24 * 60 * 60 * 1000);
        return [startDate, endDate];
    };

    // componentDidMount() {
    //     const { selectedDate } = this.state;
    //     const { setSelectedDay, setSelectedDay1ago, setSelectedDay2ago, setSelectedDay3ago, setSelectedDay4ago, setSelectedDay5ago, setSelectedDay6ago } = this.context;

    //     const today = new Date();
    //     const [startDate, endDate] = this.getWeekDates(today.getDay(), today.getFullYear());

    //     setSelectedDay(this.formatDate(startDate));
    //     setSelectedDay1ago(this.formatDate(new Date(startDate.getTime() - 1 * 24 * 60 * 60 * 1000)));
    //     setSelectedDay2ago(this.formatDate(new Date(startDate.getTime() - 2 * 24 * 60 * 60 * 1000)));
    //     setSelectedDay3ago(this.formatDate(new Date(startDate.getTime() - 3 * 24 * 60 * 60 * 1000)));
    //     setSelectedDay4ago(this.formatDate(new Date(startDate.getTime() - 4 * 24 * 60 * 60 * 1000)));
    //     setSelectedDay5ago(this.formatDate(new Date(startDate.getTime() - 5 * 24 * 60 * 60 * 1000)));
    //     setSelectedDay6ago(this.formatDate(new Date(startDate.getTime() - 6 * 24 * 60 * 60 * 1000)));
    // }

    // กำหนดรูปแบบวันที่เป็น "วันที่/เดือน/ปี"
    formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
    };

    handleDropdownChange = (e, { value }) => {
        const { setSelectedDay, setSelectedDay1ago, setSelectedDay2ago, setSelectedDay3ago, setSelectedDay4ago, setSelectedDay5ago, setSelectedDay6ago } = this.context;
        setSelectedDay(value.day);
        setSelectedDay1ago(value.day1ago);
        setSelectedDay2ago(value.day2ago);
        setSelectedDay3ago(value.day3ago);
        setSelectedDay4ago(value.day4ago);
        setSelectedDay5ago(value.day5ago);
        setSelectedDay6ago(value.day6ago);
    };

    render() {
        const { selectedWeek } = this.state;
        const { selectedDate } = this.state;
        const { setSelectedDay, setSelectedDay1ago, setSelectedDay2ago, setSelectedDay3ago, setSelectedDay4ago, setSelectedDay5ago, setSelectedDay6ago } = this.context;

        const today = new Date();
        const [startDate, endDate] = this.getWeekDates(today.getDay(), today.getFullYear());

        setSelectedDay(this.formatDate(startDate));
        setSelectedDay1ago(this.formatDate(new Date(startDate.getTime() - 1 * 24 * 60 * 60 * 1000)));
        setSelectedDay2ago(this.formatDate(new Date(startDate.getTime() - 2 * 24 * 60 * 60 * 1000)));
        setSelectedDay3ago(this.formatDate(new Date(startDate.getTime() - 3 * 24 * 60 * 60 * 1000)));
        setSelectedDay4ago(this.formatDate(new Date(startDate.getTime() - 4 * 24 * 60 * 60 * 1000)));
        setSelectedDay5ago(this.formatDate(new Date(startDate.getTime() - 5 * 24 * 60 * 60 * 1000)));
        setSelectedDay6ago(this.formatDate(new Date(startDate.getTime() - 6 * 24 * 60 * 60 * 1000)));

        return (
            <div>
                <h2>Select a Week</h2>
                <select value={selectedWeek} onChange={this.handleWeekChange}>
                    <option value="">Select a week</option>
                    {/* สร้างตัวเลือกสำหรับแต่ละสัปดาห์ */}
                    {Array.from({ length: 52 }, (_, index) => {
                        const year = new Date().getFullYear();
                        const weekNumber = String(index + 1).padStart(2, '0');
                        const weekDates = this.getWeekDates(index + 1, year);
                        const startDateFormatted = this.formatDate(weekDates[0]);
                        const endDateFormatted = this.formatDate(weekDates[1]);
                        const dropdownValue = {
                            day: startDateFormatted,
                            day1ago: this.formatDate(new Date(weekDates[0].getTime() - 1 * 24 * 60 * 60 * 1000)),
                            day2ago: this.formatDate(new Date(weekDates[0].getTime() - 2 * 24 * 60 * 60 * 1000)),
                            day3ago: this.formatDate(new Date(weekDates[0].getTime() - 3 * 24 * 60 * 60 * 1000)),
                            day4ago: this.formatDate(new Date(weekDates[0].getTime() - 4 * 24 * 60 * 60 * 1000)),
                            day5ago: this.formatDate(new Date(weekDates[0].getTime() - 5 * 24 * 60 * 60 * 1000)),
                            day6ago: this.formatDate(new Date(weekDates[0].getTime() - 6 * 24 * 60 * 60 * 1000))
                        };
                        return (
                            <option key={index} value={dropdownValue}>
                                {`${startDateFormatted} - ${endDateFormatted}`}
                            </option>
                        );
                    })}
                </select>
                {selectedWeek && <p>Selected weekะะะ: {selectedWeek}</p>}
            </div>
        );
    }
}

export default WeekSelect;
