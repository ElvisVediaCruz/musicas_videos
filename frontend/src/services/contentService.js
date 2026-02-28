import axios from "axios";

const API = "http://localhost:3000/contenido/getContent";

export const getContenido = async () => {
  const token = localStorage.getItem("token");

  return await axios.get(`${API}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const createContenido = async (data) => {
  const token = localStorage.getItem("token");

  return await axios.post(`${API}/contenido`, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};