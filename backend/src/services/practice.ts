import Practice, { IPractice } from "../models/Practice";

/**
 * Créer une pratique
 */
export const createPractice = async (
  data: Partial<IPractice>
): Promise<IPractice> => {
  const practice = new Practice(data);
  return await practice.save();
};

/**
 * Récupérer les pratiques (optionnellement par gym)
 */
export const getAllPractices = async (
  filters: Partial<Pick<IPractice, "gymId">> = {}
): Promise<IPractice[]> => {
  return await Practice.find(filters).exec();
};

/**
 * Récupérer une pratique
 */
export const getOnePractice = async (
  id: string
): Promise<IPractice | null> => {
  return await Practice.findById(id).exec();
};

/**
 * Modifier
 */
export const modifyPractice = async (
  id: string,
  data: Partial<IPractice>
): Promise<IPractice | null> => {
  return await Practice.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  }).exec();
};

/**
 * Supprimer
 */
export const deletePractice = async (id: string) => {
  return await Practice.findByIdAndDelete(id).exec();
};
