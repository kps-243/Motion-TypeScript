import Equipment, { IEquipment } from "../models/Equipment";
import { Types } from "mongoose";

/**
 * Créer un équipement
 */
export const createEquipment = async (
  data: Partial<IEquipment>
): Promise<IEquipment> => {
  const equipment = new Equipment(data);
  return await equipment.save();
};

/**
 * Récupérer tous les équipements
 */
export const getAllEquipments = async (): Promise<IEquipment[]> => {
  return await Equipment.find();
};

/**
 * Récupérer un équipement par ID
 */
export const getOneEquipment = async (
  id: string
): Promise<IEquipment | null> => {
  return await Equipment.findById(id);
};

/**
 * Modifier un équipement
 */
export const modifyEquipment = async (
  id: string,
  data: Partial<IEquipment>
): Promise<IEquipment | null> => {
  return await Equipment.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

/**
 * Supprimer un équipement
 */
export const deleteEquipment = async (id: string): Promise<IEquipment | null> => {
  return await Equipment.findByIdAndDelete(id);
};
