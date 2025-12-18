import { Types } from "mongoose";

import Badge, { IBadgeDocument } from "../models/Badge";
import UserBadge, { IUserBadgeDocument } from "../models/UserBadge";
import Challenge from "../models/Challenge";
import User from "../models/User";

/**
 * Créer un badge
 */
export const createBadge = async (
  data: Partial<IBadgeDocument>
): Promise<IBadgeDocument> => {
  const badge = new Badge(data);
  return await badge.save();
};

/**
 * Récupérer tous les badges
 */
export const getAllBadges = async (): Promise<IBadgeDocument[]> => {
  return await Badge.find();
};

/**
 * Récupérer un badge par ID
 */
export const getOneBadge = async (
  id: string
): Promise<IBadgeDocument | null> => {
  return await Badge.findById(id);
};

/**
 * Modifier un badge
 */
export const modifyBadge = async (
  id: string,
  data: Partial<IBadgeDocument>
): Promise<IBadgeDocument | null> => {
  return await Badge.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

/**
 * Supprimer un badge
 */
export const deleteBadge = async (
  id: string
): Promise<IBadgeDocument | null> => {
  return await Badge.findByIdAndDelete(id);
};

/**
 * Récupérer les badges d'un utilisateur
 */
export const getBadgesForUser = async (
  userId: string
): Promise<IUserBadgeDocument[]> => {
  return await UserBadge.find({ user: userId }).populate("badge");
};

/**
 * Vérifier et attribuer les badges à un utilisateur
 */
export const checkAndAwardBadgesForUser = async (
  userId: string
): Promise<IUserBadgeDocument[]> => {
  const badges = await Badge.find({ isActive: true });

  const totalCompleted = await Challenge.countDocuments({
    completedBy: userId,
  });

  const newlyAwarded: IUserBadgeDocument[] = [];

  for (const badge of badges) {
    let conditionOK = false;

    switch (badge.ruleType) {
      case "TOTAL_CHALLENGES_COMPLETED":
        conditionOK = totalCompleted >= badge.ruleValue;
        break;
      default:
        conditionOK = false;
    }

    if (!conditionOK) continue;

    const already = await UserBadge.findOne({
      user: userId,
      badge: badge._id,
    });

    if (already) continue;

    const userBadge = await UserBadge.create({
      user: new Types.ObjectId(userId),
      badge: badge._id,
    });

    newlyAwarded.push(userBadge);

    if (badge.points && badge.points > 0) {
      await User.findByIdAndUpdate(userId, { $inc: { score: badge.points } });
    }
  }

  return newlyAwarded;
};
