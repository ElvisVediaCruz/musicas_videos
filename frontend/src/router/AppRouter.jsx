import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import DashboardLayout from "../layouts/DashboardLayout";
import Home from "../pages/Home";
import Usuarios from "../pages/Usuarios";
import Contenido from "../pages/Contenido";
import MusicPlayer2 from "../pages/MusicaPlayer2";
function Dashboard() {
  return <h1>Bienvenido al Dashboard</h1>;
}

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Home />} />
          <Route path="usuarios" element={<Usuarios />} />
          <Route path="contenido" element={<Contenido />} />
          <Route path="reproductor" element={<MusicPlayer2 />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;