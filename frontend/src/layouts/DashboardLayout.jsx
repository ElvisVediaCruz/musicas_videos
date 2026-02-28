import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <div style={styles.container}>
      <Sidebar />
      <div style={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh"   // 🔥 ESTA ES LA CLAVE
  },
  content: {
    flex: 1,
    padding: "20px"
  }
};

export default DashboardLayout;