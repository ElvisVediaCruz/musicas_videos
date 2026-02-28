import { useState } from "react";
import { loginRequest } from "../services/authServices";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    usuario: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(form);
      const res = await loginRequest(form);
      console.log(res);
      // guardar token
      localStorage.setItem("token", res.data.token);
      console.log(localStorage);

      navigate("/dashboard");
    } catch (error) {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>

        <input
          type="text"
          name="usuario"
          placeholder="Usuario"
          value={form.usuario}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
        />

        <button type="submit">Entrar</button>

        {/* Si tienes error */}
        {/* <p className="login-error">Usuario o contraseña incorrectos</p> */}
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "300px",
  },
};

export default Login;