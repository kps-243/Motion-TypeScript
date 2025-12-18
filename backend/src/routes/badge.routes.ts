import { Router } from "express";
import * as badgeCtrl from "../controllers/badge.controller";
import auth from "../middlewares/auth";
import checkRoles from "../middlewares/checkRoles";
import ROLES from "../config/roles";

const router = Router();

// CREATE (ADMIN)
router.post("/", auth, checkRoles(ROLES.ADMIN), badgeCtrl.createBadge);

// READ ALL (ADMIN)
router.get("/", auth, checkRoles(ROLES.ADMIN), badgeCtrl.getAllBadges);

// READ MINE (auth)
router.get("/mine", auth, badgeCtrl.getMyBadges);

// READ ONE (ADMIN)
router.get("/:id", auth, checkRoles(ROLES.ADMIN), badgeCtrl.getOneBadge);

// UPDATE (ADMIN)
router.put("/:id", auth, checkRoles(ROLES.ADMIN), badgeCtrl.modifyBadge);

// DELETE (ADMIN)
router.delete("/:id", auth, checkRoles(ROLES.ADMIN), badgeCtrl.deleteBadge);

export default router;
