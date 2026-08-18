import axios from "axios";

const api = axios.create({
  baseURL: "https://flaskapp-caaa.onrender.com",
});

export default api;