import express from "express";
import morgan from "morgan"; // Ecma Script
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes/index.js";

import "./db.js"; // no se guarda la importacion en una variable, solo se importa para ejecutar el archivo

const server = express();

// Parsers
server.use(express.json({ limit: "10mb" }));
server.use(express.urlencoded({ extended: true }));

// Logs
server.use(morgan("dev"));

// CORS (localhost)
server.use(
  cors({
    origin: "http://localhost:5173", // o el puerto de tu front
    credentials: true,
  }),
);

// Cookies (opcional)
server.use(cookieParser());

// Routes
server.use("/api", routes);

// Error handler
server.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
  });
});

export default server;
