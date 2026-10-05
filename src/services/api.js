import axios from "axios";

const api = axios.create({
  baseURL: "https://car-showroom-api-552g.onrender.com/"
});

export default api;