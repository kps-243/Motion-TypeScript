import express, { Request, Response, NextFunction } from "express";
import userRoutes from "./routes/user.routes";
import gymRoutes from "./routes/gym.routes";
import gymEquipmentRoutes from "./routes/gymEquipment.routes";
import practiceRoutes from "./routes/practice.routes";

const app = express();

app.use(express.json());

// CORS
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// Routes
app.use("/api/auth", userRoutes);
app.use("/api/gyms", gymRoutes);

// GymEquipment (nested)
app.use("/api/gyms/:gymId/equipments", gymEquipmentRoutes);

// Practices
app.use("/api/practices", practiceRoutes);

export default app;
