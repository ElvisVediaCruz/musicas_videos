import { useState } from "react";

function MusicaPlayer({ musicas }) {
  const [selected, setSelected] = useState(null);

  return (
    <div style={styles.container}>
      <h2 style={styles.subtitle}>🎧 Biblioteca de Música</h2>

      {/* Lista de Canciones */}
      <div style={styles.listContainer}>
        {musicas.map((musica, index) => (
          <div 
            key={musica.id || index} 
            style={{
              ...styles.songRow,
              backgroundColor: selected?.id === musica.id ? "#2d3a4f" : "transparent"
            }}
            onClick={() => setSelected(musica)}
          >
            <div style={styles.songInfo}>
              <span style={styles.index}>{index + 1}</span>
              <div>
                <div style={styles.songTitle}>{musica.titulo || musica.nombre}</div>
                <div style={styles.songSub}>{musica.genero || "Género"} • {musica.artista || "Artista"}</div>
              </div>
            </div>
            <button style={styles.playBtn}>
              {selected?.id === musica.id ? "⏸" : "▶"}
            </button>
          </div>
        ))}
      </div>

      {/* Reproductor Flotante o Fijo */}
      {selected && (
        <div style={styles.playerCard}>
            <div style={styles.playerInfo}>
            <div style={styles.iconBox}>🎵</div>
            <div>
                <h4 style={styles.currentTitle}>{selected.titulo}</h4>
                <p style={styles.currentArtist}>{selected.artista || "Reproduciendo"}</p>
            </div>
            </div>

            <div style={styles.audioWrapper}>
            {/* AGREGAMOS EL KEY AQUÍ */}
            <audio 
                key={selected.id_contenido} 
                controls 
                autoPlay 
                style={styles.nativeAudio}
            >
                <source 
                src={`http://localhost:3000/${selected.rutaAlmacenamiento.replace(/\\/g, "/")}`} 
                type="audio/mpeg" 
                />
                Tu navegador no soporta audio.
            </audio>
            </div>
        </div>
        )}
    </div>
  );
}
const styles = {
  playerCard: {
    backgroundColor: "#1e293b", // Mismo color que tus otras cards
    padding: "20px",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
    border: "1px solid #334155",
    marginBottom: "20px",
    flexWrap: "wrap"
  },
  infoContainer: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    flex: "1",
    minWidth: "200px"
  },
  iconContainer: {
    width: "50px",
    height: "50px",
    backgroundColor: "#2563eb",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3)"
  },
  songTitle: {
    margin: 0,
    fontSize: "18px",
    color: "#f8fafc",
    fontWeight: "600"
  },
  songArtist: {
    margin: 0,
    fontSize: "14px",
    color: "#94a3b8"
  },
  audioWrapper: {
    flex: "2",
    minWidth: "300px"
  },
  nativeAudio: {
    width: "100%",
    height: "40px",
    filter: "invert(100%) hue-rotate(180deg) brightness(1.5)", // Truco para que el reproductor nativo sea oscuro
  }
};
export default MusicaPlayer;