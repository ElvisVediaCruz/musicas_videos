import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getContenido, createContenido } from "../services/contentService";
import MusicaList from "../components/MusicaList";
import PeliculaList from "../components/PeliculaList";
import MusicaPlayer from "../components/MusicaPlayer";
import PeliculaPlayer from "../components/PeliculaPlayer";

function Contenido() {
  const navigate = useNavigate();
  const [contenido, setContenido] = useState([]);
  const [file, setFile] = useState(null);
  const [form, setForm] = useState({
    tipo: "musica",
    titulo: "",
    genero: "",
    artista: "",
    album: "",
    duracion: "",
    director: "",
    anio: "",
    clasificacion: ""
  });

  useEffect(() => {
    loadContenido();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const loadContenido = async () => {
    try {
      const res = await getContenido();
      setContenido(res.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const formData = new FormData();

    // 🔹 Agregar todos los campos del formulario
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    // 🔹 Agregar archivo
    if (file) {
      formData.append("archivo", file);
    }

    await createContenido(formData);

    alert("Contenido creado correctamente");
    loadContenido(); // Recargar lista
  } catch (error) {
    console.log(error);
    alert("Error al crear contenido");
  }
  };

  const musicas = contenido.filter(item => item.extencion === "mp3");
  const peliculas = contenido.filter(item => item.extencion !== "mp3"); // Ajustado para capturar videos

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Administrador de Contenido</h1>

      {/* Card del Formulario */}
      <div style={styles.card}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <select 
            name="tipo" 
            onChange={handleChange}
            value={form.tipo}
            style={styles.input}
          >
            <option value="musica">🎵 Música</option>
            <option value="pelicula">🎬 Película</option>
          </select>

          <input
            type="text"
            name="titulo"
            placeholder="Nombre del contenido"
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            type="text"
            name="genero"
            placeholder="Género"
            onChange={handleChange}
            style={styles.input}
          />

          {/* CAMPOS DINÁMICOS */}
          {form.tipo === "musica" ? (
            <>
              <input type="text" name="artista" placeholder="Artista" onChange={handleChange} style={styles.input} />
              <input type="text" name="album" placeholder="Álbum" onChange={handleChange} style={styles.input} />
              
            </>
          ) : (
            <>
              <input type="text" name="director" placeholder="Director" onChange={handleChange} style={styles.input} />
              <input type="number" name="anio" placeholder="Año de estreno" onChange={handleChange} style={styles.input} />
              <input type="text" name="clasificacion" placeholder="Clasificación" onChange={handleChange} style={styles.input} />
            </>
          )}

          <div style={styles.fileContainer}>
            <label style={styles.fileLabel}>Archivo multimedia:</label>
            <input
              type="file"
              name="archivo"
              accept={form.tipo === "musica" ? "audio/*" : "video/*"}
              onChange={handleFileChange}
              required
              style={styles.fileInput}
            />
          </div>

          <button type="submit" style={styles.button}>
            Guardar Contenido
          </button>
        </form>
      </div>

      <hr style={styles.divider} />
    <Link to="/dashboard/reproductor">
      <button>Ir al Reproductor</button>
    </Link>
      {/* Reproductores y Listas */}
      <div style={styles.section}>
        <h2 style={styles.subtitle}>🎧 Tu Música</h2>
        <div style={styles.listContainer}>
            <MusicaPlayer musicas={musicas} />
            <MusicaList musicas={musicas} />
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.subtitle}>🍿 Tus Películas</h2>
        <div style={styles.listContainer}>
            <PeliculaPlayer peliculas={peliculas} />
            <PeliculaList peliculas={peliculas} />
        </div>
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
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    
    // --- ESTA ES LA CLAVE ---
    marginLeft: "240px", // Debe ser igual al ancho de tu Sidebar
    width: "calc(100% - 240px)", // Para que no se desborde a la derecha
    boxSizing: "border-box" 
  },
  title: {
    fontSize: "36px",
    fontWeight: "bold",
    marginBottom: "30px",
    color: "#f8fafc"
  },
  subtitle: {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#38bdf8" // Un azul claro para distinguir secciones
  },
  card: {
    backgroundColor: "#1e293b",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
    maxWidth: "800px",
    marginBottom: "40px"
  },
  form: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px"
  },
  input: {
    padding: "12px 15px",
    borderRadius: "8px",
    border: "1px solid #334155",
    backgroundColor: "#0f172a",
    color: "white",
    fontSize: "16px",
    outline: "none"
  },
  fileContainer: {
    gridColumn: "1 / -1",
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },
  fileLabel: {
    fontSize: "14px",
    color: "#94a3b8"
  },
  fileInput: {
    color: "#94a3b8",
    fontSize: "14px"
  },
  button: {
    gridColumn: "1 / -1",
    padding: "14px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#2563eb",
    color: "white",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background 0.3s",
    marginTop: "10px"
  },
  divider: {
    border: "0",
    borderTop: "1px solid #334155",
    margin: "40px 0"
  },
  section: {
    marginBottom: "50px"
  },
  listContainer: {
    backgroundColor: "#1e293b",
    padding: "20px",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  }
};

export default Contenido;