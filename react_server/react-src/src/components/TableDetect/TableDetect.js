// Import ส่วนที่ต้องการ
import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import ModalDetect from '../ModalDetect/ModalDetect'

class TableDetect extends Component {
  formatDateTime(dateTimeString) {
    if (!dateTimeString) {
      return '-';
    }
    const dateTime = new Date(dateTimeString);
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: '2-digit', 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: false, // กำหนดให้ใช้รูปแบบ 24 ชั่วโมง
      locale: 'th-TH' // กำหนด locale เป็น 'th-TH' เพื่อแสดงเวลาในรูปแบบไทย
    };
  
    // หากเวลาเป็นตั้งแต่ 13:00 เป็นต้นไป ให้เพิ่มคำว่า " น." หลังเวลา
    let formattedDateTime = new Intl.DateTimeFormat('th-TH', options).format(dateTime);
    if (dateTime.getHours() >= 13) {
      formattedDateTime += ' น.';
    }
  
    return formattedDateTime;
  }
  

  render() {

    let cars = this.props.cars;

    // เรียงลำดับข้อมูลตามเวลาเข้า (timein) จากน้อยไปมาก
    cars.sort((a, b) => {
      // เรียงตามเวลาเข้า (timein)
      const timeinComparison = new Date(a.timein) - new Date(b.timein);
      if (timeinComparison !== 0) {
        return timeinComparison;
      }
      // ถ้าเวลาเข้าเท่ากัน ให้เรียงตาม gatein
      const gateinComparison = a.gatein.localeCompare(b.gatein);
      if (gateinComparison !== 0) {
        return gateinComparison;
      }
      // ถ้า gatein เท่ากัน ให้เรียงตาม gateout
      return a.gateout.localeCompare(b.gateout);
    });
    
    cars = cars.map((car, index) => 
      <Table.Row key={car._id}>
        <Table.Cell>{index + 1}</Table.Cell>
        <Table.Cell>{car.cartype || '-'}</Table.Cell>
        <Table.Cell>{car.licenseplatenumber || '-'}</Table.Cell>
        <Table.Cell>{this.formatDateTime(car.timein)}</Table.Cell>
        <Table.Cell>{car.gatein || '-'}</Table.Cell>
        <Table.Cell>{this.formatDateTime(car.timeout) || '-'}</Table.Cell>
        <Table.Cell>{car.gateout || '-'}</Table.Cell>
        {/* <ModalDetect
            headerTitle='Edit Detect'
            buttonTriggerTitle='Edit'
            buttonSubmitTitle='Save'
            buttonColor='blue'
            carID={cars._id}
            onDetectUpdated={this.props.onDetectUpdated}
            server={this.props.server}
            //socket={this.props.socket}
          /> */}
      </Table.Row>
    );

    return (
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ลำดับที่</Table.HeaderCell>
            <Table.HeaderCell>ประเภทรถ</Table.HeaderCell>
            <Table.HeaderCell>ป้ายทะเบียน</Table.HeaderCell>
            <Table.HeaderCell>เวลารถเข้า</Table.HeaderCell>
            <Table.HeaderCell>ประตูรถเข้า</Table.HeaderCell>
            <Table.HeaderCell>เวลารถออก</Table.HeaderCell>
            <Table.HeaderCell>ประตูรถเข้า</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {cars}
        </Table.Body>
      </Table>
    );
  }
}

export default TableDetect;
