import { useState, useRef, useEffect } from "react";
import { getContenido } from "../services/contentService"; // ajusta la ruta
import "./muisca.css";

function MusicPlayer2() {
  const [musicas, setMusicas] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const audioRef = useRef(null);

  const currentSong = musicas[currentSongIndex];

  // 🔥 Cargar música del backend
  const loadContenido = async () => {
    try {
      const res = await getContenido("audio");
      console.log(res.data.result);
      setMusicas(res.data.result); // porque tu getContenido ya devuelve data
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadContenido();
  }, []);

  // 🔥 Play / Pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  }, [isPlaying, currentSongIndex]);

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    setProgress((audio.currentTime / audio.duration) * 100);
  };

  const handleProgressChange = (e) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    audio.currentTime = (e.target.value / 100) * audio.duration;
    setProgress(e.target.value);
  };

  const handleEnded = () => {
    if (musicas.length === 0) return;
    setCurrentSongIndex((prev) => (prev + 1) % musicas.length);
  };

  if (musicas.length === 0) {
    return <p style={{ color: "white" }}>Cargando música...</p>;
  }

  return (
    <div className="player-container">
      <div className="player-card">
        <h2 className="player-title">Mi Música</h2>

        <div className={`vinyl ${isPlaying ? "spin" : ""}`}>
          <div className="vinyl-center"></div>
        </div>

        <div className="song-info">
          <h3>{currentSong.titulo}</h3>
          <p>{currentSong.artista || "Artista desconocido"}</p>
        </div>

        <input
          type="range"
          value={progress}
          onChange={handleProgressChange}
          className="progress-bar"
        />

        <div className="controls">
          <button
            onClick={() =>
              setCurrentSongIndex((prev) =>
                prev === 0 ? musicas.length - 1 : prev - 1
              )
            }
          >
            ⏮
          </button>

          <button
            className="play-btn"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? "⏸" : "▶"}
          </button>

          <button
            onClick={() =>
              setCurrentSongIndex((prev) => (prev + 1) % musicas.length)
            }
          >
            ⏭
          </button>
        </div>

        <div className="playlist">
          {musicas.map((song, index) => (
            <div
              key={song.id_contenido}
              className={`playlist-item ${
                index === currentSongIndex ? "active" : ""
              }`}
              onClick={() => setCurrentSongIndex(index)}
            >
              {song.titulo}
            </div>
          ))}
        </div>

        <audio
          ref={audioRef}
          src={`http://localhost:3000/${currentSong.rutaAlmacenamiento.replace(/\\/g, "/")}`} 
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
        />
      </div>
    </div>
  );
}

export default MusicPlayer2;