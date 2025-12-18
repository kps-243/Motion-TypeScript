import { Router } from "express";
import * as gymCtrl from "../controllers/gym.controller";
import auth from "../middlewares/auth";
import checkRoles from "../middlewares/checkRoles";
import ROLES from "../config/roles";

const router = Router();

// CREATE (protégée: OWNER ou ADMIN)
router.post(
  "/",
  auth,
  checkRoles(ROLES.OWNER, ROLES.ADMIN),
  gymCtrl.createGym
);

// READ (public)
router.get("/", gymCtrl.getAllGyms);
router.get("/:id", gymCtrl.getOneGym);

// UPDATE (protégée: OWNER ou ADMIN)
router.put(
  "/:id",
  auth,
  checkRoles(ROLES.OWNER, ROLES.ADMIN),
  gymCtrl.modifyGym
);

// DELETE (protégée: ADMIN)
router.delete(
  "/:id",
  auth,
  checkRoles(ROLES.ADMIN),
  gymCtrl.deleteGym
);

export default router;
