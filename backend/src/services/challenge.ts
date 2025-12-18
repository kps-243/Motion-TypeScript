import Challenge, { IChallenge } from "../models/Challenge";
import Practice from "../models/Practice";
import { Types } from "mongoose";

/**
 * Créer un challenge
 */
export const createChallenge = async (data: {
  name: string;
  description?: string;
  practices: Types.ObjectId[];
  createdBy: Types.ObjectId;
  gymId: Types.ObjectId;
}): Promise<IChallenge> => {
  const { name, description, practices, createdBy, gymId } = data;

  // Vérifier que toutes les practices existent et appartiennent à la salle
  const count = await Practice.countDocuments({
    _id: { $in: practices },
    gymId: gymId,
  });

  if (count !== practices.length) {
    throw new Error("Certaines practices n'appartiennent pas à cette salle");
  }

  const challenge = new Challenge({
    name,
    description,
    practices,
    createdBy,
    gymId,
  });

  return await challenge.save();
};

/**
 * Récupérer tous les challenges
 */
export const getAllChallenges = async (): Promise<IChallenge[]> => {
  return await Challenge.find()
    .populate("practices")
    .populate("createdBy");
};

/**
 * Récupérer un challenge par ID
 */
export const getOneChallenge = async (
  id: string
): Promise<IChallenge | null> => {
  return await Challenge.findById(id)
    .populate("practices")
    .populate("createdBy")
    .populate("completedBy");
};

/**
 * Modifier un challenge
 */
export const modifyChallenge = async (
  id: string,
  data: Partial<IChallenge>
) => {
  return await Challenge.updateOne({ _id: id }, data);
};

/**
 * Supprimer un challenge
 */
export const deleteChallenge = async (id: string) => {
  return await Challenge.deleteOne({ _id: id });
};

/**
 * Marquer un challenge comme complété par un utilisateur
 */
export const completeChallenge = async (
  challengeId: string,
  userId: Types.ObjectId
): Promise<IChallenge | null> => {
  return await Challenge.findByIdAndUpdate(
    challengeId,
    { $addToSet: { completedBy: userId } },
    { new: true }
  );
};
