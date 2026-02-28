import { useEffect, useRef, useState } from "react";
import "./VideoPlayer.css";
import { getContenido } from "../services/contentService";

function VideoPlayer() {
  const videoRef = useRef(null);

  const [peliculas, setPeliculas] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const currentVideo = peliculas[currentVideoIndex];

  // 🔥 Cargar videos desde backend
  const loadContenido = async () => {
    try {
      const res = await getContenido("video");
      console.log(res.data.result);
      setPeliculas(res.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadContenido();
  }, []);

  // 🎬 Eventos del video
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !currentVideo) return;

    const handleTimeUpdate = () => {
      setCurrentTime(Math.floor(video.currentTime));
    };

    const handleEnded = () => {
      setCurrentVideoIndex((prev) =>
        prev + 1 < peliculas.length ? prev + 1 : 0
      );
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
    };
  }, [currentVideoIndex, peliculas]);

  // ▶ Play / Pause
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.play().catch(() => setIsPlaying(false));
    } else {
      video.pause();
    }
  }, [isPlaying, currentVideoIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const handleProgressChange = (e) => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = e.target.value;
    setCurrentTime(e.target.value);
  };

  const requestFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.requestFullscreen) video.requestFullscreen();
  };

  const formatTime = (seconds) => {
    if (!seconds) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // 🔥 Evitar error si aún no carga contenido
  if (!currentVideo) return <p>Cargando videos...</p>;

  return (
    <div className="video-page">
      <div className="video-wrapper">
        <h1 className="header-title">Mis Películas</h1>

        <div className="video-container">
          <video
            ref={videoRef}
            src={`http://localhost:3000/${currentVideo.rutaAlmacenamiento.replace(/\\/g, "/")}`}
          />

          <div className="video-controls">
            <input
              type="range"
              min="0"
              max={currentVideo.duracion || 0}
              value={currentTime}
              onChange={handleProgressChange}
            />

            <div className="controls-row">
              <div className="left-controls">
                <button onClick={togglePlay}>
                  {isPlaying ? "⏸" : "▶"}
                </button>

                <span>
                  {formatTime(currentTime)} /{" "}
                  {formatTime(currentVideo.duracion)}
                </span>
              </div>

              <button onClick={requestFullscreen}>⛶</button>
            </div>
          </div>
        </div>

        <div className="video-info">
          <h2>{currentVideo.nombre}</h2>
          <p>{currentVideo.descripcion}</p>
        </div>

        <div className="playlist">
          {peliculas.map((video, index) => (
            <div
              key={video.id_contenido}
              className={`playlist-item ${
                index === currentVideoIndex ? "active" : ""
              }`}
              onClick={() => setCurrentVideoIndex(index)}
            >
              <p>{video.titulo}</p>
              <small>{formatTime(video.duracion)}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;