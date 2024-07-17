const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const socket = require('socket.io');
const multer = require('multer');
const crypto = require('crypto');
const config = require('./config/db');
const nodemailer = require('nodemailer');
const User = require('./models/user'); // อิมพอร์ตโมเดล User


// Use Node's default promise instead of Mongoose's promise library
mongoose.Promise = global.Promise;

// Connect to the database
mongoose.connect(config.db);

let db = mongoose.connection;



db.on('open', () => {
  console.log('Connected to the database.');
});

db.on('error', (err) => {
  console.log(`Database error: ${err}`);
});

// Instantiate express
const app = express();

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Set body parser middleware
app.use(bodyParser.json());

// Enable cross-origin access through the CORS middleware
// NOTICE: For React development server only!
app.use(cors());

// Initialize routes middleware
app.use('/api/users', require('./routes/users'));
app.use('/api/gates', require('./routes/gates'));
app.use('/api/cars', require('./routes/cars'));
app.use('/api/inputs', require('./routes/inputs'));
app.use('/api/sums', require('./routes/sums'));

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve static files from the 'public/uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: function (req, video, cb) {
    cb(null, './uploads') // Upload files to the 'uploads/' directory
  },
  filename: function (req, video , cb) {
    cb(null, 'test1.mp4')
  } 
});

const upload = multer({ storage: storage });

// Route for file upload
app.post('/upload', upload.single('file'), (req, res) => {
  const { z, z1, k } = req.body; // ไม่ต้องใช้ []
  const formattedIntime = req.body.formattedIntime;
  console.log(req.body); // ใช้ req.body ในการเข้าถึงข้อมูลที่ส่งมากับ request body
  console.log('File uploaded:', req.file); // เข้าถึงไฟล์ที่อัปโหลดด้วย req.file
  console.log('Received data:');
  console.log(z, k, z1, formattedIntime);
  res.send('File uploaded successfully');
});




app.post('/api/inputs', (req, res) => {
  console.log(req)
  console.log('File uploaded:', req.file);
  res.send('File uploaded successfully');
});


app.post('/api/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 ชั่วโมง
    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password',
      },
    });
    
    transporter.verify((error, success) => {
      if (error) {
        console.error('Error with nodemailer:', error);
      } else {
        console.log('Nodemailer is ready to send emails');
      }
    });

    const mailOptions = {
      to: user.email,
      from: 'passwordreset@demo.com',
      subject: 'Password Reset',
      text: `Please click on the following link to reset your password: http://localhost:3000/reset-password/${token}`
    };

    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        console.error('Error sending email:', err); // เพิ่มข้อความ log
        return res.status(500).send({ message: 'Error sending email' });
      }
      res.status(200).send({ message: 'Reset email sent' });
    });
  } catch (error) {
    console.error('Internal Server Error:', error); // เพิ่มข้อความ log
    res.status(500).send({ message: 'Internal Server Error' });
  }
});



app.post('/api/reset-password/:token', async (req, res) => {
  try {
    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).send({ message: 'Password reset token is invalid or has expired' });
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).send({ message: 'Password has been reset' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});


// เริ่มต้นเซิร์ฟเวอร์
const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// Use express's default error handling middleware
app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
  res.status(400).json({ err: err });
});



