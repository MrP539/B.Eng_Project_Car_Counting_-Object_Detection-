import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Door from './components/ShowDoor/Door';
import VideoUploader from './components/VideoUploader/VideoUploader';
import Detect from './components/Detect/Detect';
import Evaluate from './components/Evaluate/Evaluate';
import Test from './components/Test/Test';
import { StateProvider } from './components/ToolbarDetect/StateContext'
import UserLogin from './components/Login/UserLogin'
import SignUp from './components/Login/SignUp'
import ForgotPassword from './components/Login/ForgotPassword';
import ResetPassword from './components/Login/ResetPassword';

ReactDOM.render(
  <React.StrictMode>
    <StateProvider>
    <Router>
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/dashboard/:UserId" element={<App />} />
        <Route path="/show/:UserId/:_id" element={<Door />} />
        <Route path="/upload/:UserId/:door" element={<VideoUploader />} />
        <Route path="/detect/:UserId" element={<Detect />} />
        <Route path="/test" element={<Test />} />
        <Route path="/evaluate/:UserId/:fileName" element={<Evaluate />} />
        <Route path="/" element={<UserLogin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

