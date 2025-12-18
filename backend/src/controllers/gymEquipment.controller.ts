import { Request, Response } from "express";
import * as gymEquipmentService from "../services/gymEquipment";

export const addEquipmentToGym = async (req: Request, res: Response) => {
  try {
    const { gymId } = req.params;
    if (!gymId) return res.status(400).json({ message: "gymId manquant" });

    const created = await gymEquipmentService.addEquipmentToGym({
      gym: gymId,
      equipment: req.body.equipment,
      quantity: req.body.quantity,
    });

    return res.status(201).json(created);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const getEquipmentsForGym = async (req: Request, res: Response) => {
  try {
    const { gymId } = req.params;
    if (!gymId) return res.status(400).json({ message: "gymId manquant" });

    const equipments = await gymEquipmentService.getEquipmentsForGym(gymId);
    return res.status(200).json(equipments);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const updateGymEquipment = async (req: Request, res: Response) => {
  try {
    const { gymId, equipmentId } = req.params;
    if (!gymId || !equipmentId) {
      return res.status(400).json({ message: "gymId ou equipmentId manquant" });
    }

    const updated = await gymEquipmentService.updateGymEquipment(
      gymId,
      equipmentId,
      req.body
    );

    if (!updated) return res.status(404).json({ message: "Association non trouvée" });
    return res.status(200).json(updated);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const removeEquipmentFromGym = async (req: Request, res: Response) => {
  try {
    const { gymId, equipmentId } = req.params;
    if (!gymId || !equipmentId) {
      return res.status(400).json({ message: "gymId ou equipmentId manquant" });
    }

    const deleted = await gymEquipmentService.removeEquipmentFromGym(gymId, equipmentId);
    if (!deleted) return res.status(404).json({ message: "Association non trouvée" });

    return res.status(200).json({ message: "Équipement retiré de la salle" });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};
