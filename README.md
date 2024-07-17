# react_server

The *config* folder contains a file named *db.js*. Before running locally, change the value of `db` as seen in the code below. *Make sure MongoDB service is running.*
```js
module.exports = {
  db: 'mongodb://localhost/mern-crud'
};
```

## Back-end
Install the dependencies via the terminal.

```bash
cd react_server
npm install
```

Run the *main server*.
```bash
node server
```

View [http://localhost:3000](http://localhost:3000) on the browser.

# Front-end
If you want to modify the front-end, go to *react-src* folder via the terminal.

```bash
cd react_server
cd react-src
```

Install the dependencies required by React.
```bash
npm install --force
```

Run the *development server* for React.
```bash
npm start
```

View [http://localhost:4200](http://localhost:4200) on the browser.

# python server

## install Anaconda
1. ติดตั้ง Anaconda เพื่อติดตั้ง Python โดยเราจะทำการติดตั้งผ่าน Anaconda และเพื่อสร้างสภาพแวดล้อมที่จะแยกแต่ละโปรเจคออกจากกัน (Virtual Environment)
•	โดยดาวน์โหลดจาก https://www.anaconda.com/download
•	สร้างสภาพแวดล้อมเพื่อติดตั้ง ไลบรารี่ ต่างๆในโครงงาน
o	โดยเริ่มจากเปิด Anaconda prompt
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
pip install -r "requirement.txt"
```

โดยไฟล์ requirement_by_MrS.txt นี้ผู้จัดทำได้ทำการสร้างไฟล์เพื่อติดตั้งไลบรารี่ทั้งหมดที่ต้องใช้ในระบบจดจำทะเบียนรถตรวจนับและบันทึกรถเข้าออกไว้แล้ว




