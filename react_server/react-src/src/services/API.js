import axios from 'axios';

const API_URL = 'http://localhost:3000/api/gates'; // แทนที่ด้วย URL ของเซิร์ฟเวอร์ของคุณ

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const API = {
  uploadVideo: (videoFile) => {
    const formData = new FormData();
    formData.append('video', videoFile);

    return axiosInstance.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export default API;
