import { Router } from "express";
import * as leaderboardCtrl from "../controllers/leaderboard.controller";

const router = Router();

router.get("/", leaderboardCtrl.getLeaderboard);

export default router;
