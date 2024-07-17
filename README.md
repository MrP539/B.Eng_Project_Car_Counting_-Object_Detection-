# react_server

ไปที่ react_server/config/db.js ก่อนที่จะรันโปรเจ็กต์ในเครื่องของคุณ ให้เปลี่ยนค่าของ db ตาม MongolDB ของผู้ใช้งาน ตรวจสอบให้แน่ใจว่าบริการ MongoDB กำลังทำงานอยู่ ดังเช่นตัวอย่าง
```js
module.exports = {
  db: 'mongodb://localhost/mern-crud'
};
```

## Back-end
ติดตั้ง dependencies ผ่านทาง terminal:

```bash
cd react_server
npm install
```

รัน main server:
```bash
node server
```

เปิด http://localhost:3000 ในเบราว์เซอร์


## Front-end
ถ้าต้องการแก้ไข front-end ไปที่โฟลเดอร์ react-src ผ่านทาง terminal:

```bash
cd react_server
cd react-src
```

ติดตั้ง dependencies ที่จำเป็นสำหรับ React:
```bash
npm install --force
```

รัน development server สำหรับ React:
```bash
npm start
```

เปิด http://localhost:4200 ในเบราว์เซอร์

# python server

## install Anaconda
1. ติดตั้ง Anaconda เพื่อติดตั้ง Python โดยเราจะทำการติดตั้งผ่าน Anaconda และเพื่อสร้างสภาพแวดล้อมที่จะแยกแต่ละโปรเจคออกจากกัน (Virtual Environment)
•	โดยดาวน์โหลดจาก https://www.anaconda.com/download
•	สร้างสภาพแวดล้อมเพื่อติดตั้ง ไลบรารี่ ต่างๆในโครงงาน
o	โดยเริ่มจากเปิด Anaconda prompt:

![image](https://github.com/user-attachments/assets/f8b8ab89-a33a-48bf-a715-aebd9214b3f1)



o	สร้างสภาพแวดล้อม
```bash
conda create -n my_eny python=3.10.11
```
or
```bash
conda create --prefix your\path\to\my_env python=3.10.11
```
o	activate สภาพแวดล้อม
```bash
conda activate my_eny
```
o	install pytorch for use GPU
```bash
conda install pytorch==2.3.0 torchvision==0.18.0 torchaudio==2.3.0 pytorch-cuda=12.1 -c pytorch -c nvidia
```

2.ดาวน์โหลดไฟล์ที่จำเป็นในระบบจดจำทะเบียนรถตรวจนับและบันทึกรถเข้าออก
โดยสามารถดาวน์โหลดจาก https://github.com/MrP539/MrP539-B.Eng_Project_Car_Cpunting


3.ติดตั้งไลบรารี่ทั้งหมด 
```bash
pip install -r "requirement_by_MrS.txt"
```

โดยไฟล์ requirement_by_MrS.txt นี้ผู้จัดทำได้ทำการสร้างไฟล์เพื่อติดตั้งไลบรารี่ทั้งหมดที่ต้องใช้ในระบบจดจำทะเบียนรถตรวจนับและบันทึกรถเข้าออกไว้แล้ว

## การเปิด Python Server 

o	โดยเริ่มจากเปิด Anaconda prompt:

![image](https://github.com/user-attachments/assets/f8b8ab89-a33a-48bf-a715-aebd9214b3f1)




o	activate สภาพแวดล้อม

```bash
conda activate my_eny
```

o	เปิดใช้งาน Python Server

```bash
python Main_API_Server.py
```





