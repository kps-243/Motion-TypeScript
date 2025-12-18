import { Router } from "express";
import * as practiceCtrl from "../controllers/practice.controller";
import auth from "../middlewares/auth";
import checkRoles from "../middlewares/checkRoles";
import ROLES from "../config/roles";

const router = Router();

router.post(
  "/",
  auth,
  checkRoles(ROLES.OWNER, ROLES.ADMIN),
  practiceCtrl.createPractice
);

router.get("/", practiceCtrl.getAllPractices);

router.get("/:id", practiceCtrl.getOnePractice);

router.put(
  "/:id",
  auth,
  checkRoles(ROLES.OWNER, ROLES.ADMIN),
  practiceCtrl.modifyPractice
);

router.delete(
  "/:id",
  auth,
  checkRoles(ROLES.ADMIN),
  practiceCtrl.deletePractice
);

export default router;
