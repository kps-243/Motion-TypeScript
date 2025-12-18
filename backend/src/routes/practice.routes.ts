import { Router } from "express";
import * as practiceCtrl from "../controllers/practice.controller";
import auth from "../middlewares/auth";
import checkRoles from "../middlewares/checkRoles";
import ROLES from "../config/roles";

const router = Router();

// CREATE
router.post(
  "/",
  auth,
  checkRoles(ROLES.OWNER, ROLES.ADMIN),
  practiceCtrl.createPractice
);

// GET ALL
router.get("/", practiceCtrl.getAllPractices);

// GET ONE
router.get("/:id", practiceCtrl.getOnePractice);

// UPDATE
router.put(
  "/:id",
  auth,
  checkRoles(ROLES.OWNER, ROLES.ADMIN),
  practiceCtrl.modifyPractice
);

// DELETE
router.delete(
  "/:id",
  auth,
  checkRoles(ROLES.ADMIN),
  practiceCtrl.deletePractice
);

export default router;
