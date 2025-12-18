import { Router } from "express";
import * as equipmentCtrl from "../controllers/equipment.controller";
import auth from "../middlewares/auth";
import checkRoles from "../middlewares/checkRoles";
import ROLES from "../config/roles";

const router = Router();

// CREATE (ADMIN)
router.post("/", auth, checkRoles(ROLES.ADMIN), equipmentCtrl.createEquipment);

// UPDATE (ADMIN)
router.put("/:id", auth, checkRoles(ROLES.ADMIN), equipmentCtrl.modifyEquipment);

// DELETE (ADMIN)
router.delete("/:id", auth, checkRoles(ROLES.ADMIN), equipmentCtrl.deleteEquipment);

// READ (public)
router.get("/", equipmentCtrl.getAllEquipments);
router.get("/:id", equipmentCtrl.getOneEquipment);

export default router;
