import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div style={styles.sidebar}>
      <h2 style={styles.title}>Mi App</h2>

      <nav>
        <ul style={styles.menu}>
          <li>
            <NavLink to="/dashboard" end style={styles.link}>
              Inicio
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/usuarios" style={styles.link}>
              Usuarios
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/contenido" style={styles.link}>
              Contenido
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/reproductor" style={styles.link}>Reproductor</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/peliculas" style={styles.link}>Peliculas</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "240px",
    background: "linear-gradient(180deg, #1e293b, #0f172a)",
    color: "white",
    
    // --- CONFIGURACIÓN FIXED ---
    position: "fixed",      // Se fija a la ventana del navegador
    top: 0,                 // Pegado arriba
    left: 0,                // Pegado a la izquierda
    height: "100vh",        // Ocupa toda la altura
    zIndex: 1000,           // Asegura que esté por encima de otros elementos
    // ---------------------------

    padding: "30px 20px",
    boxShadow: "4px 0 15px rgba(0,0,0,0.4)",
    display: "flex",
    flexDirection: "column"
  },
  title: {
    marginBottom: "40px",
    fontSize: "22px",
    fontWeight: "bold"
  },
  menu: {
    listStyle: "none",
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  },
  link: ({ isActive }) => ({
    textDecoration: "none",
    color: isActive ? "#ffffff" : "#94a3b8",
    backgroundColor: isActive ? "#2563eb" : "transparent",
    padding: "10px 15px",
    borderRadius: "8px",
    transition: "all 0.3s ease",
    display: "block",
    fontWeight: "500"
  })
};

export default Sidebar;