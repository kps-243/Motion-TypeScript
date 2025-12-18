import GymEquipment, { IGymEquipment } from "../models/gymEquipment";
import { Types } from "mongoose";

/**
 * Ajouter un équipement à une salle
 */
export const addEquipmentToGym = async (
  data: {
    gym: Types.ObjectId | string;
    equipment: Types.ObjectId | string;
    quantity?: number;
  }
): Promise<IGymEquipment> => {
  const gymEquipment = new GymEquipment(data);
  return await gymEquipment.save();
};

/**
 * Récupérer tous les équipements d'une salle
 */
export const getEquipmentsForGym = async (
  gymId: string
): Promise<IGymEquipment[]> => {
  return await GymEquipment.find({ gym: gymId }).populate("equipment");
};

/**
 * Mettre à jour un équipement dans une salle
 */
export const updateGymEquipment = async (
  gymId: string,
  equipmentId: string,
  data: Partial<IGymEquipment>
): Promise<IGymEquipment | null> => {
  return await GymEquipment.findOneAndUpdate(
    { gym: gymId, equipment: equipmentId },
    data,
    { new: true, runValidators: true }
  );
};

/**
 * Supprimer un équipement d'une salle
 */
export const removeEquipmentFromGym = async (
  gymId: string,
  equipmentId: string
) => {
  return await GymEquipment.findOneAndDelete({
    gym: gymId,
    equipment: equipmentId,
  });
};
