import dotenv from "dotenv";
import http from "http";
import app from "./app";
import connectDB from "./config/db";

dotenv.config();

const normalizePort = (val: string): number | string | false => {
  const port = parseInt(val, 10);
  if (isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);

const errorHandler = (error: NodeJS.ErrnoException) => {
  if (error.syscall !== "listen") throw error;

  const bind =
    typeof port === "string" ? "Pipe " + port : "Port " + port;

  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges.`);
      process.exit(1);
    case "EADDRINUSE":
      console.error(`${bind} is already in use.`);
      process.exit(1);
    default:
      throw error;
  }
};

connectDB()
  .then(() => {
    server.listen(port);
    server.on("error", errorHandler);
    server.on("listening", () => {
      console.log(`🚀 Serveur lancé sur le port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Impossible de démarrer le serveur :", err.message);
  });
