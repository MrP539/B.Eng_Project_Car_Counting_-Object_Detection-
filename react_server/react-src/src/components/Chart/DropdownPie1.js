import React, { useState, useContext } from 'react';
import { Dropdown, Grid } from 'semantic-ui-react';
import { StateContext } from '../ToolbarDetect/StateContext'; // นำเข้า StateContext จากไฟล์ที่เหมาะสม

class DropdownPie1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDate: new Date()
        };
    }
    
    render() {
        const { selectedDate } = this.state;
        const {
            setSelectedDay,
            setSelectedDay1ago,
            setSelectedDay2ago,
            setSelectedDay3ago,
            setSelectedDay4ago,
            setSelectedDay5ago,
            setSelectedDay6ago,
            setSelectedThisMonth,
            setSelectedMonthago,
            setSelectedTwoMonthago,
            setSelectedThreeMonthago,
            setSelectedFourMonthago,
            setSelectedFiveMonthago,
            setIsLoading,
        } = this.context; // ใช้งาน context และเรียกใช้ setter functions ใน StateContext

        // ฟังก์ชันแปลงเวลาไปยัง GMT+07
        const convertToGMT7 = (date) => {
            const offset = 7; // ชั่วโมง
            const utc = date.getTime() + (date.getTimezoneOffset() * 60000); // UTC 0
            return new Date(utc + (3600000 * offset)); // GMT+07
        };

        // ฟังก์ชันแปลงเวลากลับเป็นรูปแบบของวันที่
        const formatDate = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };

        // ฟังก์ชันแปลงเวลากลับเป็นรูปแบบของเดือน
        const formatMonth = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            return `${year}-${month}`;
        };

        // คำนวณวันที่ย้อนหลัง 6 วัน
        const sixDaysAgo = new Date(selectedDate);
        sixDaysAgo.setDate(sixDaysAgo.getDate() - 6);
        const gmt7SixDaysAgo = convertToGMT7(sixDaysAgo);
        const gmt7SixDaysAgoFormatted = formatDate(gmt7SixDaysAgo);

        // คำนวณวันที่ย้อนหลัง 5 วัน
        const fiveDaysAgo = new Date(selectedDate);
        fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);
        const gmt7fiveDaysAgo = convertToGMT7(fiveDaysAgo);
        const gmt7FiveDaysAgoFormatted = formatDate(gmt7fiveDaysAgo);

        // คำนวณวันที่ย้อนหลัง 4 วัน
        const fourDaysAgo = new Date(selectedDate);
        fourDaysAgo.setDate(fourDaysAgo.getDate() - 4);
        const gmt7fourDaysAgo = convertToGMT7(fourDaysAgo);
        const gmt7FourDaysAgoFormatted = formatDate(gmt7fourDaysAgo);

        // คำนวณวันที่ย้อนหลัง 3 วัน
        const threeDaysAgo = new Date(selectedDate);
        threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
        const gmt7threeDaysAgo = convertToGMT7(threeDaysAgo);
        const gmt7ThreeDaysAgoFormatted = formatDate(gmt7threeDaysAgo);

        // คำนวณวันที่ย้อนหลัง 2 วัน
        const twoDaysAgo = new Date(selectedDate);
        twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
        const gmt7twoDaysAgo = convertToGMT7(twoDaysAgo);
        const gmt7TwoDaysAgoFormatted = formatDate(gmt7twoDaysAgo);

        // คำนวณวันที่ย้อนหลัง 1 วัน
        const oneDayAgo = new Date(selectedDate);
        oneDayAgo.setDate(oneDayAgo.getDate() - 1);
        const gmt7oneDayAgo = convertToGMT7(oneDayAgo);
        const gmt7OneDayAgoFormatted = formatDate(gmt7oneDayAgo);

            // คำนวณวันที่ย้อนหลัง 1 เดือน
            const oneMonthAgo = new Date(selectedDate);
            oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
            const gmt7OneMonthAgo = convertToGMT7(oneMonthAgo);
            const gmt7OneMonthAgoFormatted = formatMonth(gmt7OneMonthAgo);

            // คำนวณวันที่ย้อนหลัง 2 เดือน
            const twoMonthsAgo = new Date(selectedDate);
            twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
            const gmt7TwoMonthsAgo = convertToGMT7(twoMonthsAgo);
            const gmt7TwoMonthsAgoFormatted = formatMonth(gmt7TwoMonthsAgo);

            // คำนวณวันที่ย้อนหลัง 3 เดือน
            const threeMonthsAgo = new Date(selectedDate);
            threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
            const gmt7ThreeMonthsAgo = convertToGMT7(threeMonthsAgo);
            const gmt7ThreeMonthsAgoFormatted = formatMonth(gmt7ThreeMonthsAgo);

            // คำนวณวันที่ย้อนหลัง 4 เดือน
            const fourMonthsAgo = new Date(selectedDate);
            fourMonthsAgo.setMonth(fourMonthsAgo.getMonth() - 4);
            const gmt7FourMonthsAgo = convertToGMT7(fourMonthsAgo);
            const gmt7FourMonthsAgoFormatted = formatMonth(gmt7FourMonthsAgo);

            // คำนวณวันที่ย้อนหลัง 5 เดือน
            const fiveMonthsAgo = new Date(selectedDate);
            fiveMonthsAgo.setMonth(fiveMonthsAgo.getMonth() - 5);
            const gmt7FiveMonthsAgo = convertToGMT7(fiveMonthsAgo);
            const gmt7FiveMonthsAgoFormatted = formatMonth(gmt7FiveMonthsAgo);

                

        // คำนวณเดือนปัจจุบัน
        const selectedDateFormatted = formatDate(selectedDate);
        const ThisMonthFormatted = formatMonth(selectedDate);

        // ข้อมูลประตู
        const doors = [
            {
                key: 'none',
                text: 'ทั้งหมด',
                value: {
                    day: null,
                    day1ago: null,
                    day2ago: null,
                    day3ago: null,
                    day4ago: null,
                    day5ago: null,
                    day6ago: null,
                    week: null,
                    month: ThisMonthFormatted,
                    oneMonthAgo: gmt7OneMonthAgoFormatted,
                    twoMonthAgo: gmt7TwoMonthsAgoFormatted,
                    threeMonthAgo: gmt7ThreeMonthsAgoFormatted,
                    fourMonthAgo: gmt7FourMonthsAgoFormatted,
                    fiveMonthAgo: gmt7FiveMonthsAgoFormatted,
                }
            },
            {
                key: 'gatein',
                text: `รายวัน`,
                value: {
                    day: selectedDateFormatted,
                    day1ago: null,
                    day2ago: null,
                    day3ago: null,
                    day4ago: null,
                    day5ago: null,
                    day6ago: null,
                    week: null,
                    month: ThisMonthFormatted,
                    isLoading:true
                }
            },
            {
                key: 'gateout',
                text: 'ย้อนหลัง 7 วัน',
                value: {
                    day: selectedDateFormatted,
                    day1ago: gmt7OneDayAgoFormatted,
                    day2ago: gmt7TwoDaysAgoFormatted,
                    day3ago: gmt7ThreeDaysAgoFormatted,
                    day4ago: gmt7FourDaysAgoFormatted,
                    day5ago: gmt7FiveDaysAgoFormatted,
                    day6ago: gmt7SixDaysAgoFormatted,
                    week: null,
                    month: null,
                    isLoading:true
                    
                }
            },
            {
                key: 'gateout',
                text: 'เดือนนี้',
                value: {
                    day: null,
                    day1ago:null,
                    day2ago: gmt7TwoDaysAgoFormatted,
                    day3ago: null,
                    day4ago: null,
                    day5ago: null,
                    day6ago: null,
                    week: null,
                    month: ThisMonthFormatted,
                    oneMonthAgo: null,
                    isLoading:true
                }
            }
        ];
        setTimeout(() => {
            doors[0].value.isLoading = false;
            doors[1].value.isLoading = false;
            doors[2].value.isLoading = false;
            doors[3].value.isLoading = false;
        }, 30000);

        const handleDropdownChange = (e, { value }) => {
            setSelectedDay(value.day);
            setSelectedDay1ago(value.day1ago);
            setSelectedDay2ago(value.day2ago);
            setSelectedDay3ago(value.day3ago);
            setSelectedDay4ago(value.day4ago);
            setSelectedDay5ago(value.day5ago);
            setSelectedDay6ago(value.day6ago);
            setSelectedThisMonth(value.month);
            setSelectedMonthago(value.oneMonthAgo);
            setSelectedTwoMonthago(value.twoMonthAgo);
            setSelectedThreeMonthago(value.threeMonthAgo);
            setSelectedFourMonthago(value.fourMonthAgo);
            setSelectedFiveMonthago(value.fiveMonthAgo);
            setIsLoading(value.isLoading)
            setTimeout(() => {
          setIsLoading(false);
        }, 25000);
        };
        // setTimeout(() => {
        //   setIsLoading(false);
        // }, 30000);
     
     

        return (
            <div className="dropdown">
              <Dropdown
                    placeholder="เลือกช่วงเวลา"style={{ 
                        marginLeft: '5px', 
                        height: 'auto', 
                        fontSize: '1vw', 
                        fontWeight: 'bold', 
                        color: 'black', 
                        fontcolor: 'black', 
                        lineHeight: 'center', 
                        textAlign: 'Left' 
                      }}
                    selection
                    // disabled={this.context.isLoading} // กำหนดให้ Datepicker ถูก disable ในขณะที่ isLoading เป็น true
                    options={doors.map((door) => ({
                        key: door.key,
                        text: door.text,
                        value: door.value,
                    }))}
                    className="white"
                    onChange={handleDropdownChange}
                />     
            </div>
        );
    }
}

DropdownPie1.contextType = StateContext;

export default DropdownPie1;