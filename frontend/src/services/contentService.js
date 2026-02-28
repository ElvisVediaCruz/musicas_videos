import axios from "axios";

const API = "http://localhost:3000/contenido";

export const getContenido = async (tipo) => {
  const token = localStorage.getItem("token");

  return await axios.get(`${API}/getContent/${tipo}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const createContenido = async (data) => {
  const token = localStorage.getItem("token");

  return await axios.post(`${API}/upload/1`, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};