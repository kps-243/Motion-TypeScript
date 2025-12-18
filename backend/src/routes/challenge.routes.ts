import { Router } from "express";
import * as challengeCtrl from "../controllers/challenge.controller";
import auth from "../middlewares/auth";
import checkRoles from "../middlewares/checkRoles";
import ROLES from "../config/roles";

const router = Router();


router.post(
  "/",
  auth,
  checkRoles(ROLES.CUSTOMER, ROLES.OWNER, ROLES.ADMIN),
  challengeCtrl.createChallenge
);


router.get(
  "/",
  auth,
  challengeCtrl.getAllChallenges
);


router.get(
  "/:id",
  auth,
  challengeCtrl.getOneChallenge
);


router.put(
  "/:id",
  auth,
  checkRoles(ROLES.CUSTOMER, ROLES.OWNER, ROLES.ADMIN),
  challengeCtrl.modifyChallenge
);


router.delete(
  "/:id",
  auth,
  checkRoles(ROLES.CUSTOMER, ROLES.OWNER, ROLES.ADMIN),
  challengeCtrl.deleteChallenge
);


router.post(
  "/:id/complete",
  auth,
  checkRoles(ROLES.CUSTOMER, ROLES.ADMIN),
  challengeCtrl.completeChallenge
);

export default router;
