// app.ts
import express, { Request, Response, NextFunction } from "express";

import userRoutes from "./routes/user.routes";
import gymRoutes from "./routes/gym.routes";
import gymEquipmentRoutes from "./routes/gymEquipment.routes";
import practiceRoutes from "./routes/practice.routes";
import challengeRoutes from "./routes/challenge.routes";
import equipmentRoutes from "./routes/equipment.routes";
import badgeRoutes from "./routes/badge.routes";
import leaderboardRoutes from "./routes/leaderboard.routes";
import challengeInvite from "./routes/challengeInvite.routes";

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
app.use("/api/gyms/:gymId/equipments", gymEquipmentRoutes);
app.use("/api/practices", practiceRoutes);
app.use("/api/challenges", challengeRoutes);
app.use("/api/equipments", equipmentRoutes);
app.use("/api/badges", badgeRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api", challengeInvite);

export default app;
