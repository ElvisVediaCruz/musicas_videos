import dotenv from "dotenv";

dotenv.config();


import app from "./src/app.js";

import sequelize from "./src/config/database.js";
import "./src/models/models.index.js";


try {
  await sequelize.sync();
  console.log("✅ Conexión a la base de datos exitosa");
} catch (error) {
  console.error(`❌ Error de conexión: ${process.env.DB_USER}`, error);
}


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT} ${process.env}`)
})

