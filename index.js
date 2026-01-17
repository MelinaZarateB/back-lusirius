import server from "./src/app.js";
import { conn } from "./src/db.js";

const PORT = process.env.PORT || 3001;

conn.sync({ force: true }).then(() => {
  console.log("DATABASE CONNECTED");

  server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
