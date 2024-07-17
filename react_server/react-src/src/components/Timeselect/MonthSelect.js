import React, { Component, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { StateContext } from '../ToolbarDetect/StateContext';
import { FaCalendarAlt } from 'react-icons/fa'; // เพิ่มการนำเข้า FaCalendarAlt

class MonthSelect extends Component {
    static contextType = StateContext;

    constructor(props) {
        super(props);
        const today = new Date();
        this.state = {
            selectedMonth: today
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

    handleMonthChange = (month) => {
        const { setSelectedThisMonth, setIsLoading } = this.context;
        this.setState({ selectedMonth: month });
        setSelectedThisMonth(this.formatMonth(month));
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
          }, 25000); // 30 วินาที
    };

    formatMonth = (month) => {
        if (!month) return "";
        const year = month.getFullYear();
        const monthNumber = month.getMonth() + 1;
        return `${year}-${String(monthNumber).padStart(2, '0')}`;
    };

    handleClear = () => {
      const today = new Date();
      this.setState({ selectedMonth: today });
      const { setSelectedThisMonth,setIsLoading } = this.context;
      setSelectedThisMonth(this.formatMonth(today));
      setTimeout(() => {
        setIsLoading(false);
    }, 25000); // 25 วินาที
  };

    render() {
        const { selectedMonth } = this.state;
        
        return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnGap: '5px', alignItems: 'center' }}>
        <div>
        <div style={{ marginLeft: '5px', fontSize: '0.9vw', color: 'black'}}>
          <DatePicker
            selected={selectedMonth}
            onChange={this.handleMonthChange}
            dateFormat="yyyy-MM"
            showMonthYearPicker
            disabled={this.context.isLoading}
            customInput={
              <this.CustomInputButton
                value={selectedMonth ? this.formatMonth(selectedMonth) : ''}
                clear={this.handleClear}
              />
            }
          />
        </div>
      </div>
      </div>
    );                  
  }
}

export default MonthSelect;
