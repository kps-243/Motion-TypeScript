import { Request, Response } from "express";
import { Types } from "mongoose";
import * as equipmentService from "../services/equipment";

export const createEquipment = async (req: Request, res: Response) => {
  try {
    if (!req.auth?.userId) {
      return res.status(401).json({ message: "Non authentifié" });
    }

    const data = {
      ...req.body,
      createdBy: new Types.ObjectId(req.auth.userId),
    };

    const equipment = await equipmentService.createEquipment(data);
    return res.status(201).json(equipment);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const getAllEquipments = async (_req: Request, res: Response) => {
  try {
    const equipments = await equipmentService.getAllEquipments();
    return res.status(200).json(equipments);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const getOneEquipment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "id manquant" });

    const equipment = await equipmentService.getOneEquipment(id);
    if (!equipment) return res.status(404).json({ message: "Equipment non trouvé" });

    return res.status(200).json(equipment);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const modifyEquipment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "id manquant" });

    const equipment = await equipmentService.modifyEquipment(id, req.body);
    if (!equipment) return res.status(404).json({ message: "Equipment non trouvé" });

    return res.status(200).json(equipment);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const deleteEquipment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "id manquant" });

    const deleted = await equipmentService.deleteEquipment(id);
    if (!deleted) return res.status(404).json({ message: "Equipment non trouvé" });

    return res.status(200).json({ message: "Equipment supprimé !" });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};
