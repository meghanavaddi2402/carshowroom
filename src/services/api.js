import axios from "axios";

const api = axios.create({
  baseURL: "https://car-showroom-backend-api.onrender.com/"
});

export default api;