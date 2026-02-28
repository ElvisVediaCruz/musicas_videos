import axios from "axios";

const API = "http://localhost:3000/login"; // cambia si tu backend usa otro puerto

export const loginRequest = async (data) => {
  return await axios.post(`${API}`, data);
};