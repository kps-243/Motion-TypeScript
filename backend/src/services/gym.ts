import Gym, { IGym } from "../models/gym";

/**
 * Créer une salle
 */
export const createGym = async (data: Partial<IGym>): Promise<IGym> => {
  const gym = new Gym(data);
  return await gym.save();
};

/**
 * Récupérer toutes les salles
 */
export const getAllGyms = async (): Promise<IGym[]> => {
  return await Gym.find();
};

/**
 * Récupérer une salle par ID
 */
export const getOneGym = async (id: string): Promise<IGym | null> => {
  return await Gym.findById(id);
};

/**
 * Modifier une salle
 */
export const modifyGym = async (
  id: string,
  data: Partial<IGym>
) => {
  return await Gym.updateOne({ _id: id }, { ...data, _id: id });
};

/**
 * Supprimer une salle
 */
export const deleteGym = async (id: string) => {
  return await Gym.deleteOne({ _id: id });
};
