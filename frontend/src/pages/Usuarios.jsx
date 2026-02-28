import { useEffect, useState } from "react";
import { getUsers, createUser } from "../services/userService";

function Usuarios() {

  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    password: ""
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await getUsers();
      console.log("entro aqui")
      console.log(res.data.usuarios);
      setUsers(res.data.usuarios);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUser(form);
    loadUsers();
  };

  return (
  <div style={styles.container}>
    <h1 style={styles.title}>Administrador de Usuarios</h1>

    {/* Card Formulario */}
    <div style={styles.card}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          onChange={handleChange}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Crear Usuario
        </button>
      </form>
    </div>

    <h2 style={styles.subtitle}>Lista de Usuarios</h2>

    <div style={styles.userList}>
      {users.map(user => (
        <div key={user.id_user} style={styles.userCard}>
          <span style={styles.userName}>{user.usuario}</span>

          <div style={styles.badges}>
            <span
              style={{
                ...styles.badge,
                backgroundColor:
                  user.estado === "activo" ? "#16a34a" : "#dc2626"
              }}
            >
              {user.estado}
            </span>

            <span
              style={{
                ...styles.badge,
                backgroundColor:
                  user.rol === "administrador" ? "#2563eb" : "#9333ea"
              }}
            >
              {user.rol}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}

const styles = {
  container: {
    padding: "40px",
    backgroundColor: "#0f172a",
    minHeight: "100vh",
    color: "white",
    
    // --- AJUSTE PARA SIDEBAR FIXED ---
    marginLeft: "240px",      // Empuja el contenido a la derecha
    width: "calc(100% - 240px)", // Evita que el contenido se salga por la derecha
    boxSizing: "border-box"   // Asegura que el padding no rompa el ancho
    // ---------------------------------
  },

  title: {
    fontSize: "40px",
    marginBottom: "30px"
  },

  subtitle: {
    fontSize: "26px",
    marginTop: "40px",
    marginBottom: "20px"
  },

  card: {
    backgroundColor: "#1e293b",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
    maxWidth: "800px"
  },

  form: {
    display: "flex",
    gap: "15px",
    flexWrap: "wrap"
  },

  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #334155",
    backgroundColor: "#0f172a",
    color: "white",
    outline: "none",
    flex: "1",
    minWidth: "180px"
  },

  button: {
    padding: "12px 20px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#2563eb",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  },

  userList: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    maxWidth: "800px"
  },

  userCard: {
    backgroundColor: "#1e293b",
    padding: "15px 20px",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },

  userName: {
    fontSize: "18px",
    fontWeight: "bold"
  },

  badges: {
    display: "flex",
    gap: "10px"
  },

  badge: {
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: "bold"
  }
};

export default Usuarios;