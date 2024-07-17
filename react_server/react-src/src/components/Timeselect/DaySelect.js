import React, { Component, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { StateContext } from '../ToolbarDetect/StateContext';
import { Button } from 'semantic-ui-react'; // เพิ่ม Button จาก semantic-ui-react
import { FaCalendarAlt } from 'react-icons/fa'; // เพิ่มการนำเข้า FaCalendarAlt
import { format } from 'date-fns-tz';

class DaySelect extends Component {
    static contextType = StateContext;

    constructor(props) {
        super(props);
        const today = new Date();
        this.state = {
            selectedDate: today
        };
    }

    CustomInputButton = forwardRef(({ value, onClick, clear }, ref) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <button className="btn btn-primary" onClick={onClick} ref={ref}>
                <FaCalendarAlt /> {value || 'เลือกเวลาและวันที่'}
            </button>
            {value && (
                <button className="btn btn-secondary ms-2" onClick={clear}>
                    Clear
                </button>
            )}
        </div>
    ));

    handleDateChange = (date) => {
        const { setSelectedDay, setIsLoading } = this.context;
        this.setState({ selectedDate: date });
        setSelectedDay(this.formatDate(date));
        setIsLoading(true); // เรียกใช้ isLoading เพื่อตั้งค่าให้ isLoading เป็น true
        setTimeout(() => {
            setIsLoading(false);
        }, 25000); // 25 วินาที
    };

    formatDate = (date) => {
        if (!date) return "";
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    handleClear = () => {
        const { setSelectedDay, setIsLoading } = this.context;
        const today = new Date();
        setSelectedDay(this.formatDate(today));
        this.setState({ selectedDate: today });
        setIsLoading(true); // เรียกใช้ isLoading เพื่อตั้งค่าให้ isLoading เป็น true
        setTimeout(() => {
            setIsLoading(false);
        }, 25000); // 25 วินาที
    };

    formatDateThai = (date) => {
        const thaiMonths = [
          'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน',
          'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม',
          'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
        ];
        const day = format(date, 'dd');
        const month = thaiMonths[date.getMonth()];
        const year = date.getFullYear() + 543;
        const time = format(date, 'HH.mm');
        return `${day} ${month} ${year} เวลา ${time} น.`;
      };

    render() {
        const { selectedDate } = this.state;
        const { isLoading } = this.context;

        return (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnGap: '5px', alignItems: 'center' }}>
            <div>
            <div style={{ marginLeft: '5px', fontSize: '0.9vw', color: 'black'}}>
                <DatePicker
                    selected={selectedDate}
                    onChange={this.handleDateChange}
                    dateFormat="yyyy-MM-dd"
                    customInput={<this.CustomInputButton value={selectedDate ? this.formatDate(selectedDate) : ''} clear={this.handleClear} />}
                    disabled={isLoading} // กำหนดให้ Datepicker ถูก disable ในขณะที่ isLoading เป็น true
                    />
            </div>
            </div>
            </div>
        );
    }
}

export default DaySelect;
