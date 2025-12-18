import { Router } from "express";
import * as challengeCtrl from "../controllers/challenge.controller";
import auth from "../middlewares/auth";
import checkRoles from "../middlewares/checkRoles";
import ROLES from "../config/roles";

const router = Router();

/**
 * POST /api/challenges
 * Créer un challenge
 */
router.post(
  "/",
  auth,
  checkRoles(ROLES.CUSTOMER, ROLES.OWNER, ROLES.ADMIN),
  challengeCtrl.createChallenge
);

/**
 * GET /api/challenges
 * Récupérer tous les challenges
 */
router.get(
  "/",
  auth,
  challengeCtrl.getAllChallenges
);

/**
 * GET /api/challenges/:id
 * Récupérer un challenge
 */
router.get(
  "/:id",
  auth,
  challengeCtrl.getOneChallenge
);

/**
 * PUT /api/challenges/:id
 * Modifier un challenge
 */
router.put(
  "/:id",
  auth,
  checkRoles(ROLES.CUSTOMER, ROLES.OWNER, ROLES.ADMIN),
  challengeCtrl.modifyChallenge
);

/**
 * DELETE /api/challenges/:id
 * Supprimer un challenge
 */
router.delete(
  "/:id",
  auth,
  checkRoles(ROLES.CUSTOMER, ROLES.OWNER, ROLES.ADMIN),
  challengeCtrl.deleteChallenge
);

/**
 * POST /api/challenges/:id/complete
 * Compléter un challenge
 */
router.post(
  "/:id/complete",
  auth,
  checkRoles(ROLES.CUSTOMER, ROLES.ADMIN),
  challengeCtrl.completeChallenge
);

export default router;
