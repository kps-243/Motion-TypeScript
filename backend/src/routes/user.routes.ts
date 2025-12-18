import { Router } from "express";
import * as userCtrl from "../controllers/user.controller";
import auth from "../middlewares/auth";
import checkRoles from "../middlewares/checkRoles";
import ROLES from "../config/roles";

const router = Router();

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

router.get(
  "/",
  auth,
  checkRoles(ROLES.ADMIN),
  userCtrl.getAllUsers
);

router.get(
  "/:id",
  auth,
  checkRoles(ROLES.ADMIN),
  userCtrl.getOneUser
);

router.put(
  "/:id",
  auth,
  checkRoles(ROLES.ADMIN),
  userCtrl.modifyUser
);

router.delete(
  "/:id",
  auth,
  checkRoles(ROLES.ADMIN),
  userCtrl.deleteUser
);

export default router;
