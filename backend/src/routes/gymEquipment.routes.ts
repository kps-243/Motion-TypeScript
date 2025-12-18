import { Router } from "express";
import * as gymEquipmentCtrl from "../controllers/gymEquipment.controller";
import auth from "../middlewares/auth";
import checkRoles from "../middlewares/checkRoles";
import ROLES from "../config/roles";

const router = Router({ mergeParams: true });

router.post(
  "/",
  auth,
  checkRoles(ROLES.OWNER, ROLES.ADMIN),
  gymEquipmentCtrl.addEquipmentToGym
);

router.get("/", auth, gymEquipmentCtrl.getEquipmentsForGym);

router.patch(
  "/:equipmentId",
  auth,
  checkRoles(ROLES.OWNER, ROLES.ADMIN),
  gymEquipmentCtrl.updateGymEquipment
);

router.delete(
  "/:equipmentId",
  auth,
  checkRoles(ROLES.OWNER, ROLES.ADMIN),
  gymEquipmentCtrl.removeEquipmentFromGym
);

export default router;
