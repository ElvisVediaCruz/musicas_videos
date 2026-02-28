import axios from "axios";

const API = "http://localhost:3000/User/obtenerUsers";

export const getUsers = async () => {
  const token = localStorage.getItem("token");

  return await axios.get(`${API}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const createUser = async (data) => {
  const token = localStorage.getItem("token");

  return await axios.post(`${API}/users`, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};