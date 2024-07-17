import React, { createContext, useState } from 'react';

const StateContext = createContext();

const StateProvider = ({ children }) => {
  const [selectedGate, setSelectedGate] = useState(null);
  const [selectedDirection, setSelectedDirection] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null); 
  const [selectedTime, setSelectedTime] = useState(null);
  const [searchTerm, setSearchTerm] = useState(null);
  // เพิ่ม state ที่ต้องการใช้ใน DropdownPie
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedDay1ago, setSelectedDay1ago] = useState(null);
  const [selectedDay2ago, setSelectedDay2ago] = useState(null);
  const [selectedDay3ago, setSelectedDay3ago] = useState(null);
  const [selectedDay4ago, setSelectedDay4ago] = useState(null);
  const [selectedDay5ago, setSelectedDay5ago] = useState(null);
  const [selectedDay6ago, setSelectedDay6ago] = useState(null);
  const [selectedThisMonth, setSelectedThisMonth] = useState(null);
  const [selectedMonthago, setSelectedMonthago] = useState(null);
  const [selectedTwoMonthago, setSelectedTwoMonthago] = useState(null);
  const [selectedThreeMonthago, setSelectedThreeMonthago] = useState(null);
  const [selectedFourMonthago, setSelectedFourMonthago] = useState(null);
  const [selectedFiveMonthago, setSelectedFiveMonthago] = useState(null);
  const [selectedWeek,setSelectedWeek] = useState(null);
  const [isLoading,setIsLoading] = useState(false);
  const [data,setData] = useState([]);
  const [userId,setUserId]=useState(null);
  const [userName,setUserName]=useState(null);
  const [startTime, setStartTime] = useState(null); 
  const [endTime, setEndTime] = useState(null); 
  const [count,setCount] = useState(0); 
  const [close,setClose] = useState(false); 

  return (
    <StateContext.Provider value={{ 
      selectedGate, 
      setSelectedGate, 
      selectedDirection, 
      setSelectedDirection,
      selectedType, 
      setSelectedType,
      selectedDate,
      setSelectedDate, 
      selectedTime, 
      setSelectedTime,
      searchTerm, 
      setSearchTerm,
      // ส่ง state ที่เพิ่มใหม่ในนี้
      selectedDay,
      setSelectedDay,
      selectedDay1ago,
      setSelectedDay1ago,
      selectedDay2ago,
      setSelectedDay2ago,
      selectedDay3ago,
      setSelectedDay3ago,
      selectedDay4ago,
      setSelectedDay4ago,
      selectedDay5ago,
      setSelectedDay5ago,
      selectedDay6ago,
      setSelectedDay6ago,
      selectedThisMonth,
      setSelectedThisMonth,
      selectedMonthago,
      setSelectedMonthago,
      selectedTwoMonthago,
      setSelectedTwoMonthago,
      selectedThreeMonthago,
      setSelectedThreeMonthago,
      selectedFourMonthago,
      setSelectedFourMonthago,
      selectedFiveMonthago,
      setSelectedFiveMonthago,
      selectedWeek,
      setSelectedWeek,
      isLoading,
      setIsLoading,
      data,
      setData,
      userId,
      setUserId,
      userName,
      setUserName,
      startTime, setStartTime,
      endTime, setEndTime,
      count,setCount,
      close,setClose,
    }}>
      {children}
    </StateContext.Provider>
  );
};

export { StateContext, StateProvider };
